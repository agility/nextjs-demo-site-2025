import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { checkRedirect } from './lib/cms-content/checkRedirect'
import { defaultLocale, locales, isValidLocale, getLocaleFromPathname, removeLocaleFromPathname } from './lib/i18n/config'

/**
 * MIDDLEWARE DEBUGGING
 *
 * To enable diagnostic logging, add to your .env.local file:
 *   MIDDLEWARE_DEBUG=true
 *
 * This will log:
 * - All incoming requests (pathname, method, user-agent, etc.)
 * - Route classification (static file, docs route, sitemap/robots, etc.)
 * - Middleware decisions (rewrites, redirects, early returns)
 * - Response actions taken
 *
 * Debug headers are also added to responses when enabled:
 * - X-Middleware-Debug: Indicates middleware processing
 * - X-Middleware-Path: The pathname being processed
 * - X-Middleware-Reason: Why certain actions were taken
 *
 * View logs in:
 * - Development: Terminal/console where `npm run dev` is running
 * - Production: Your hosting provider's function logs (Vercel, Netlify, etc.)
 */
const DEBUG_MIDDLEWARE = true

function logDebug(message: string, data?: Record<string, any>) {
	if (DEBUG_MIDDLEWARE) {
		const timestamp = new Date().toISOString()
		const logData = data ? ` ${JSON.stringify(data)}` : ''
		console.log(`[MIDDLEWARE ${timestamp}] ${message}${logData}`)
	}
}

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
	logDebug('=== MIDDLEWARE REQUEST START ===', {
		pathname: request.nextUrl.pathname,
		method: request.method,
		userAgent: request.headers.get('user-agent'),
		referer: request.headers.get('referer'),
		host: request.nextUrl.host,
		searchParams: Object.fromEntries(request.nextUrl.searchParams.entries()),
	})


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

	logDebug('Path analysis', {
		pathname,
		extension: ext,
		hasPreviewKey: request.nextUrl.searchParams.has("agilitypreviewkey"),
		hasContentID: !!contentIDStr,
	})


	if (request.nextUrl.searchParams.has("agilitypreviewkey")) {
		//*** this is a preview request ***
		const agilityPreviewKey = request.nextUrl.searchParams.get("agilitypreviewkey") || ""
		//locale is also passed in the querystring on preview requests
		const locale = request.nextUrl.searchParams.get("lang")
		const slug = request.nextUrl.pathname
		//valid preview key: we need to redirect to the correct url for preview
		let redirectUrl = `${request.nextUrl.protocol}//${request.nextUrl.host}/api/preview?locale=${locale}&ContentID=${contentIDStr}&slug=${encodeURIComponent(slug)}&agilitypreviewkey=${encodeURIComponent(agilityPreviewKey)}`

		logDebug('Preview request detected', { redirectUrl })
		return NextResponse.redirect(redirectUrl)

	} else if (previewQ === "0") {
		//*** exit preview
		const locale = request.nextUrl.searchParams.get("lang")

		//we need to redirect to the correct url for preview
		const slug = request.nextUrl.pathname
		let redirectUrl = `${request.nextUrl.protocol}//${request.nextUrl.host}/api/preview/exit?locale=${locale}&ContentID=${contentIDStr}&slug=${encodeURIComponent(slug)}`

		logDebug('Exit preview request', { redirectUrl })
		return NextResponse.redirect(redirectUrl)
	} else if (contentIDStr) {
		const contentID = parseInt(contentIDStr)
		if (!isNaN(contentID) && contentID > 0) {
			//*** this is a dynamic page request ***

			let dynredirectUrl = `${request.nextUrl.protocol}//${request.nextUrl.host}/api/dynamic-redirect?ContentID=${contentID}`
			logDebug('Dynamic content request', { contentID, rewriteUrl: dynredirectUrl })
			return NextResponse.rewrite(dynredirectUrl)

		}
	} else if ((!ext || ext.length === 0)) {

		/**********************
		 * CHECK FOR REDIRECT *
		***********************/
		const redirection = await checkRedirect({ path: request.nextUrl.pathname })

		if (redirection) {
			logDebug('Redirect found', {
				from: request.nextUrl.pathname,
				to: redirection.destinationUrl,
				statusCode: redirection.statusCode,
			})
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



		/**************************************
		 * SPECIAL CASE FOR lang= QUERY PARAM *
		 **************************************/

		//handle the case where ?lang=xx is passed in the querystring
		const langQ = request.nextUrl.searchParams.get("lang")
		const langParam = request.nextUrl.searchParams.get("lang")
		//get the current locale from the pathname (if any)

		const currentLocale = getLocaleFromPathname(pathname, locales) || defaultLocale

		//if we have a lang query and it's valid and it's different from the current locale in the path
		if (langParam && isValidLocale(langParam, locales) && langParam !== currentLocale) {

			//we have a locale specified in the querystring and it's valid
			if (langParam === defaultLocale) {
				//default locale - redirect to root path (no locale in path)
				const redirectUrl = new URL(request.nextUrl.toString())
				redirectUrl.pathname = removeLocaleFromPathname(pathname, currentLocale)
				//remove lang param from querystring
				redirectUrl.searchParams.delete("lang")
				return NextResponse.redirect(redirectUrl)
			} else {
				//non-default locale - redirect to include locale in path
				const redirectUrl = new URL(request.nextUrl.toString())
				//add the locale to the pathname
				const pathnameWithoutLocale = removeLocaleFromPathname(pathname, currentLocale)
				redirectUrl.pathname = `/${langParam}${pathnameWithoutLocale}`
				//remove lang param from querystring
				redirectUrl.searchParams.delete("lang")
				return NextResponse.redirect(redirectUrl)
			}
		}
		/************************
		 * HANDLE SEARCH PARAMS *
		 ************************/

		// Only process query parameters that are expected/used within the app
		// This prevents issues with long tracking query strings (e.g., Google Analytics)
		const ALLOWED_QUERY_PARAMS = ['audience', 'region', 'q'] // Whitelist of allowed query params
		const MAX_QUERY_STRING_LENGTH = 500 // Maximum length for query string encoding

		// Filter search params to only include whitelisted parameters
		const filteredParams = new URLSearchParams()
		for (const [key, value] of request.nextUrl.searchParams.entries()) {
			if (ALLOWED_QUERY_PARAMS.includes(key.toLowerCase())) {
				filteredParams.append(key, value)
			}
		}

		// Only encode if we have allowed params and they're within reasonable length
		let searchParams = filteredParams.toString()
		let hasSearchParams = searchParams && searchParams.length > 0 && searchParams.length <= MAX_QUERY_STRING_LENGTH

		if (hasSearchParams) {
			const searchParamPortion = `~~~${encodeURIComponent(searchParams)}~~~`
			//if we have search params, we need to include them in the path like this /path/->/path/~~~searchParams~~~
			pathname = pathname.endsWith("/") ? `${pathname}${searchParamPortion}` : `${pathname}/${searchParamPortion}`
		} else {
			searchParams = ""
		}

		/************************
		 * LOCALE BASED ROUTING *
		 ************************/

		// Skip if already has locale prefix or is a static file or docs route
		const hasLocalePrefix = locales.some(locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`)
		const isStaticFile = pathname.includes('.') || pathname.startsWith('/_next')
		const isDocsRoute = pathname.startsWith('/docs')
		const isSitemapOrRobots = pathname === '/sitemap.xml' || pathname === '/robots.txt'

		logDebug('Route classification', {
			pathname,
			hasLocalePrefix,
			isStaticFile,
			isDocsRoute,
			isSitemapOrRobots,
			hasSearchParams: hasSearchParams,
		})

		// Skip locale routing for docs routes, sitemap, and robots.txt
		if (isDocsRoute || isSitemapOrRobots) {
			logDebug('Skipping middleware processing - early return', {
				reason: isDocsRoute ? 'docs route' : 'sitemap/robots',
				action: 'NextResponse.next()',
			})
			const response = NextResponse.next()
			if (DEBUG_MIDDLEWARE) {
				response.headers.set('X-Middleware-Debug', 'skipped-early-return')
				response.headers.set('X-Middleware-Path', pathname)
				response.headers.set('X-Middleware-Reason', isDocsRoute ? 'docs-route' : 'sitemap-robots')
			}
			return response
		}

		const baseUrl = request.nextUrl.origin

		if (!hasLocalePrefix && !isStaticFile) {

			const localeBasedUrl = new URL(`/${defaultLocale}${pathname}`, baseUrl)

			logDebug('Locale rewrite', {
				originalPath: pathname,
				rewriteTo: localeBasedUrl.pathname,
				defaultLocale,
				action: 'NextResponse.rewrite()',
			})

			// For all paths (including root), rewrite to include default locale (no redirect)
			// This keeps the clean URL but internally routes to the locale-specific page
			return NextResponse.rewrite(localeBasedUrl)
		}

		if (hasSearchParams) {
			//if we have search params, we need to make sure we decode them before passing them on
			const searchParamUrl = new URL(pathname, baseUrl)
			logDebug('Search params rewrite', {
				pathname,
				searchParams,
				rewriteTo: searchParamUrl.pathname,
				action: 'NextResponse.rewrite()',
			})
			return NextResponse.rewrite(searchParamUrl)
		}

		// If we reach here, let Next.js handle the request normally
		logDebug('No special handling - passing through', {
			pathname,
			action: 'NextResponse.next()',
		})
		return NextResponse.next()

	}

	logDebug('=== MIDDLEWARE REQUEST END (no match) ===', {
		pathname: request.nextUrl.pathname,
		action: 'NextResponse.next() - no conditions matched',
	})

	return NextResponse.next()
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
		 * - sitemap.xml (sitemap file)
		 * - robots.txt (robots file)
		 */
		'/((?!api|assets|_next/static|_next/image|favicon\\.ico|sitemap\\.xml|robots\\.txt).*)',
	],
}