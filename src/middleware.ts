import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { checkRedirect } from './lib/cms-content/checkRedirect'
import { defaultLocale, locales, isValidLocale, getLocaleFromPathname, removeLocaleFromPathname } from './lib/i18n/config'

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {


	/*****************************
	 * *** AGILITY MIDDLEWARE ***
	 * 1: Check if this is a preview request,
	 * 2: Check if we are exiting preview
	 * 3: Check if this is a direct to a dynamic page
	 *    based on a content id
	 *******************************/

	let pathname = request.nextUrl.pathname
	const previewQ = request.nextUrl.searchParams.get("AgilityPreview")
	let contentIDStr = request.nextUrl.searchParams.get("ContentID") as string || ""

	const ext = request.nextUrl.pathname.includes(".") ? request.nextUrl.pathname.split('.').pop() : null


	if (request.nextUrl.searchParams.has("agilitypreviewkey")) {
		//*** this is a preview request ***
		const agilityPreviewKey = request.nextUrl.searchParams.get("agilitypreviewkey") || ""
		//locale is also passed in the querystring on preview requests
		const locale = request.nextUrl.searchParams.get("lang")
		const slug = request.nextUrl.pathname
		//valid preview key: we need to redirect to the correct url for preview
		let redirectUrl = `${request.nextUrl.protocol}//${request.nextUrl.host}/api/preview?locale=${locale}&ContentID=${contentIDStr}&slug=${encodeURIComponent(slug)}&agilitypreviewkey=${encodeURIComponent(agilityPreviewKey)}`

		return NextResponse.redirect(redirectUrl)

	} else if (previewQ === "0") {
		//*** exit preview
		const locale = request.nextUrl.searchParams.get("lang")

		//we need to redirect to the correct url for preview
		const slug = request.nextUrl.pathname
		let redirectUrl = `${request.nextUrl.protocol}//${request.nextUrl.host}/api/preview/exit?locale=${locale}&ContentID=${contentIDStr}&slug=${encodeURIComponent(slug)}`

		return NextResponse.redirect(redirectUrl)
	} else if (contentIDStr) {
		const contentID = parseInt(contentIDStr)
		if (!isNaN(contentID) && contentID > 0) {
			//*** this is a dynamic page request ***

			let dynredirectUrl = `${request.nextUrl.protocol}//${request.nextUrl.host}/api/dynamic-redirect?ContentID=${contentID}`
			return NextResponse.rewrite(dynredirectUrl)

		}
	} else if ((!ext || ext.length === 0)) {
		/***
		 * CHECK FOR REDIRECT
		***/


		const redirection = await checkRedirect({ path: request.nextUrl.pathname })

		if (redirection) {
			//redirect to the destination url
			//cache the redirect for 10 minutes
			if (redirection.destinationUrl.startsWith("/")) {
				//handle relative paths
				const url = request.nextUrl.clone()
				url.pathname = redirection.destinationUrl
				return NextResponse.redirect(url, {
					status: redirection.statusCode,
					headers: {
						"Cache-Control": "public,maxage=600, stale-while-revalidate"
					}
				})
			} else {
				//handle absolute paths
				return NextResponse.redirect(redirection.destinationUrl, {
					status: redirection.statusCode,
					headers: {
						"Cache-Control": "public,maxage=3600, stale-while-revalidate"
					}
				})
			}
		}

		//grab the search params and add them to the path so we can pass them on when rewriting
		//this will help use keep static routing working for better performance
		let searchParams = request.nextUrl.searchParams.toString()
		let hasSearchParams = searchParams && searchParams.length > 0
		if (!hasSearchParams) {
			searchParams = ""
		}

		if (searchParams && searchParams.length > 0) {
			const searchParamPortion = `~~~${encodeURIComponent(searchParams)}~~~`
			//if we have search params, we need to include them in the path like this /path/->/path/~~~searchParams~~~
			pathname = pathname.endsWith("/") ? `${pathname}${searchParamPortion}` : `${pathname}/${searchParamPortion}`
		}

		/***
		 * LOCALE BASED ROUTING
		 ***/

		// Skip if already has locale prefix or is a static file
		const hasLocalePrefix = locales.some(locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`)
		const isStaticFile = pathname.includes('.') || pathname.startsWith('/_next')

		const baseUrl = request.nextUrl.origin

		if (!hasLocalePrefix && !isStaticFile) {

			const localeBasedUrl = new URL(`/${defaultLocale}${pathname}`, baseUrl)

			// For all paths (including root), rewrite to include default locale (no redirect)
			// This keeps the clean URL but internally routes to the locale-specific page
			return NextResponse.rewrite(localeBasedUrl)
		}

		if (hasSearchParams) {
			//if we have search params, we need to make sure we decode them before passing them on
			const searchParamUrl = new URL(pathname, baseUrl)
			return NextResponse.rewrite(searchParamUrl)
		}

	}

}



export const config = {
	matcher: [
		/*
		 * Match all request paths except for the ones starting with:
		 * - api (API routes)
		 * - assets (public assets)
		 * - _next/static (static files)
		 * - _next/image (image optimization files)
		 * - favicon.ico (favicon file)
		 */
		'/((?!api|assets|_next/static|_next/image|favicon.ico).*)',
	],
}