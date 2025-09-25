import { getPageTemplate } from "@/components/agility-pages"
import { type PageProps, getAgilityPage } from "@/lib/cms/getAgilityPage"
import { getAgilityContext } from "@/lib/cms/getAgilityContext"
import agilitySDK from "@agility/content-fetch"

import type { Metadata, ResolvingMetadata } from "next"

import { resolveAgilityMetaData } from "@/lib/cms-content/resolveAgilityMetaData"
import { type SitemapNode } from "@/lib/types/SitemapNode"
import { notFound } from "next/navigation"
import InlineError from "@/components/InlineError"
import { locales } from "@/lib/i18n/config"

export const revalidate = 60
export const runtime = "nodejs"

/**
 * Generate static params for all locales (root pages)
 */
export async function generateStaticParams() {
	return locales.map((locale) => ({
		locale,
	}));
}

/**
 * Generate metadata for this page
 */
export async function generateMetadata(
	props: PageProps,
	parent: ResolvingMetadata
): Promise<Metadata> {
	const { params } = props;
	const awaitedParams = await params;
	// Set slug to empty string for root page
	const paramsWithEmptySlug = { ...awaitedParams, slug: [""] };

	const { locale, sitemap, isDevelopmentMode, isPreview } = await getAgilityContext(awaitedParams.locale);
	const agilityData = await getAgilityPage({ params: Promise.resolve(paramsWithEmptySlug) });
	if (!agilityData.page) return {};
	return await resolveAgilityMetaData({
		agilityData,
		locale,
		sitemap,
		isDevelopmentMode,
		isPreview,
		parent,
	});
}

export default async function Page({ params, searchParams }: PageProps) {
	const awaitedParams = await params;
	// Set slug to empty string for root page
	const paramsWithEmptySlug = { ...awaitedParams, slug: [""] };

	const agilityData = await getAgilityPage({ params: Promise.resolve(paramsWithEmptySlug) });
	if (!agilityData.page) {
		// If no home page is found in Agility CMS, show a basic home page message
		return (
			<div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
				<div className="text-center">
					<h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
						Welcome to {awaitedParams.locale === 'fr' ? 'Agility Demo Site FR' : 'Agility Demo Site'}
					</h1>
					<p className="text-gray-600 dark:text-gray-400 mb-8">
						{awaitedParams.locale === 'fr'
							? 'La page d\'accueil n\'est pas encore configurée dans Agility CMS.'
							: 'Home page is not yet configured in Agility CMS.'}
					</p>
					<div className="space-x-4">
						<a
							href="/about-us"
							className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
						>
							{awaitedParams.locale === 'fr' ? 'À propos' : 'About Us'}
						</a>
						<a
							href="/blog"
							className="inline-block bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
						>
							Blog
						</a>
					</div>
				</div>
			</div>
		);
	}

	const AgilityPageTemplate = getPageTemplate(agilityData.pageTemplateName || "");

	// Await searchParams if it's a Promise (Next.js 15+)
	const resolvedSearchParams = searchParams ? await searchParams : {};
	agilityData.globalData = agilityData.globalData || {};
	agilityData.globalData["searchParams"] = resolvedSearchParams;

	return (
		<div data-agility-page={agilityData.page?.pageID} data-agility-dynamic-content={agilityData.sitemapNode.contentID}>
			{AgilityPageTemplate ? (
				<AgilityPageTemplate {...agilityData} searchParams={resolvedSearchParams} />
			) : (
				<InlineError message={`No template found for page template name: ${agilityData.pageTemplateName}`} />
			)}
		</div>
	);
}
