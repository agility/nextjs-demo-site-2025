import { getSitemapFlat } from "@/lib/cms/getSitemapFlat";
import type { MetadataRoute } from "next";


export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	//get the flat sitemap from Agility CMS and output it
	const sitemap = await getSitemapFlat({
		channelName: process.env.AGILITY_SITEMAP || "website",
		languageCode: process.env.AGILITY_LOCALES || "en-ca"
	})

	return Object.keys(sitemap).filter((path) => {
		const node = sitemap[path]
		if (node.isFolder || node.redirect) {
			return false;
		}

		if (!node.visible.sitemap) {
			return false;
		}
		return true
	}).map((path, index) => {



		return {
			url: index === 0 ? "https://nextjs-demo-site-2025.publishwithagility.com" : `https://nextjs-demo-site-2025.publishwithagility.com${path}`,
			lastModified: new Date(),
			changeFrequency: "daily",
			priority: 1
		}
	})
}
