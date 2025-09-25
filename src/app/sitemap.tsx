import { getSitemapFlat } from "@/lib/cms/getSitemapFlat";
import type { MetadataRoute } from "next";
import { locales, defaultLocale } from "@/lib/i18n/config";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const allSitemapEntries: MetadataRoute.Sitemap = [];

	// Generate sitemap entries for each locale
	for (const locale of locales) {
		const sitemap = await getSitemapFlat({
			channelName: process.env.AGILITY_SITEMAP || "website",
			languageCode: locale
		});

		if (!sitemap) continue;

		const localeEntries = Object.keys(sitemap).filter((path) => {
			const node = sitemap[path];
			if (node.isFolder || node.redirect) {
				return false;
			}

			if (!node.visible.sitemap) {
				return false;
			}
			return true;
		}).map((path, index) => {
			// For default locale, don't add locale prefix to URL
			const localizedPath = locale === defaultLocale ? path : `/${locale}${path}`;
			const baseUrl = "https://nextjs-demo-site-2025.publishwithagility.com";

			return {
				url: index === 0 && path === "/" ? baseUrl : `${baseUrl}${localizedPath}`,
				lastModified: new Date(),
				changeFrequency: "daily" as const,
				priority: 1
			};
		});

		allSitemapEntries.push(...localeEntries);
	}

	return allSitemapEntries;
}
