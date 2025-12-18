import { getSitemapFlat } from "@/lib/cms/getSitemapFlat";
import { getAllDocFiles } from "@/lib/docs/getDocsFiles";
import type { MetadataRoute } from "next";
import { locales, defaultLocale } from "@/lib/i18n/config";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const allSitemapEntries: MetadataRoute.Sitemap = [];
	const baseUrl = "https://demo.agilitycms.com";

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

			return {
				url: index === 0 && path === "/" ? baseUrl : `${baseUrl}${localizedPath}`,
				lastModified: new Date(),
				changeFrequency: "daily" as const,
				priority: 1
			};
		});

		allSitemapEntries.push(...localeEntries);
	}

	// Add docs pages to sitemap
	const docFiles = getAllDocFiles();
	const docsEntries: MetadataRoute.Sitemap = [];
	const addedPaths = new Set<string>();

	docFiles.forEach((file) => {
		const isReadme = file.slug[file.slug.length - 1] === 'README';

		if (isReadme) {
			// For README files, add the folder path (without README)
			const folderPath = file.slug.slice(0, -1).join('/');
			if (!addedPaths.has(folderPath)) {
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
			if (!addedPaths.has(filePath)) {
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

	allSitemapEntries.push(...docsEntries);

	return allSitemapEntries;
}
