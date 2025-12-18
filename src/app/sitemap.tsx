import { getAllDocFiles } from "@/lib/docs/getDocsFiles";
import type { MetadataRoute } from "next";

/**
 * Demo Site Sitemap
 *
 * ⚠️ IMPORTANT: This sitemap is specific to this demo site and only includes /docs pages.
 *
 * In a REAL Agility CMS site:
 * - The /docs section would NOT exist (it's demo-site-specific)
 * - The sitemap would be generated from Agility CMS pages using getSitemapFlat()
 * - You would iterate through locales and generate entries for each page in the sitemap
 * - Example code (commented out below) shows the complete implementation for a real site
 *
 * Example for a real Agility CMS site:
 * ```typescript
 * import { getSitemapFlat } from "@/lib/cms/getSitemapFlat";
 * import { locales, defaultLocale } from "@/lib/i18n/config";
 *
 * export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
 *   const allSitemapEntries: MetadataRoute.Sitemap = [];
 *   const baseUrl = "https://your-site.com";
 *
 *   // Generate sitemap entries for each locale
 *   for (const locale of locales) {
 *     const sitemap = await getSitemapFlat({
 *       channelName: process.env.AGILITY_SITEMAP || "website",
 *       languageCode: locale
 *     });
 *
 *     if (!sitemap) continue;
 *
 *     const localeEntries = Object.keys(sitemap).filter((path) => {
 *       const node = sitemap[path];
 *       if (node.isFolder || node.redirect) {
 *         return false;
 *       }
 *
 *       if (!node.visible.sitemap) {
 *         return false;
 *       }
 *       return true;
 *     }).map((path, index) => {
 *       // For default locale, don't add locale prefix to URL
 *       const localizedPath = locale === defaultLocale ? path : `/${locale}${path}`;
 *
 *       return {
 *         url: index === 0 && path === "/" ? baseUrl : `${baseUrl}${localizedPath}`,
 *         lastModified: new Date(),
 *         changeFrequency: "daily" as const,
 *         priority: 1
 *       };
 *     });
 *
 *     allSitemapEntries.push(...localeEntries);
 *   }
 *
 *   return allSitemapEntries;
 * }
 * ```
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const baseUrl = "https://demo.agilitycms.com";
	const docsEntries: MetadataRoute.Sitemap = [];
	const addedPaths = new Set<string>();

	// Generate sitemap entries for documentation pages
	// This is demo-site-specific - in a real site, you'd generate from Agility CMS pages
	const docFiles = getAllDocFiles();

	docFiles.forEach((file) => {
		const isReadme = file.slug[file.slug.length - 1] === 'README';

		if (isReadme) {
			// Skip root README (docs/README.md) - it's handled by the explicit docs index entry below
			if (file.slug.length === 1 && file.slug[0] === 'README') {
				return;
			}

			// For README files, add the folder path (without README)
			const folderPath = file.slug.slice(0, -1).join('/');
			if (folderPath && !addedPaths.has(folderPath)) {
				docsEntries.push({
					url: `${baseUrl}/docs/${folderPath}`,
					lastModified: new Date(),
					changeFrequency: "weekly" as const,
					priority: 0.8
				});
				addedPaths.add(folderPath);
			}
		} else {
			// For regular files, add the file path
			const filePath = file.slug.join('/');
			if (filePath && !addedPaths.has(filePath)) {
				docsEntries.push({
					url: `${baseUrl}/docs/${filePath}`,
					lastModified: new Date(),
					changeFrequency: "weekly" as const,
					priority: 0.8
				});
				addedPaths.add(filePath);
			}
		}
	});

	// Add docs index page
	docsEntries.unshift({
		url: `${baseUrl}/docs`,
		lastModified: new Date(),
		changeFrequency: "weekly" as const,
		priority: 0.9
	});

	return docsEntries;
}
