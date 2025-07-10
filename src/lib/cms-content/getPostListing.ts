import { DateTime } from "luxon"
import { type ContentList } from "@agility/content-fetch"
import { type ImageField } from "@agility/nextjs"
import { getContentList } from "@/lib/cms/getContentList"
import { getSitemapFlat } from "@/lib/cms/getSitemapFlat"
import { type IPost } from "../types/IPost"

export interface IPostMin {

	contentID: number
	title: string
	date: string
	url: string
	category: string
	image: ImageField
	author: string
	authorImage: ImageField | null
	excerpt: string
}

interface LoadPostsProp {
	sitemap: string
	locale: string
	skip: number
	take: number
}

/**
 * Get a list of posts and resolve the URLs for each post from the sitemap.
 * @param param0
 * @returns
 */
export const getPostListing = async ({ sitemap, locale, skip, take }: LoadPostsProp) => {


	try {
		// get sitemap...
		let sitemapNodes = await getSitemapFlat({
			channelName: sitemap,
			languageCode: locale,
		})

		// get posts...
		let rawPosts: ContentList = await getContentList<IPost>({
			referenceName: "posts",
			languageCode: locale,
			contentLinkDepth: 2,
			take,
			skip,
			locale
		})

		// resolve dynamic urls
		const dynamicUrls = resolvePostUrls(sitemapNodes, rawPosts.items)

		const posts: IPostMin[] = rawPosts.items.map((post: any) => {

			const category = post.fields.category?.fields.name || "Uncategorized"
			const author = post.fields.author?.fields.name || ""
			const authorImage = post.fields.author?.fields.headShot || null
			const date = DateTime.fromJSDate(new Date(post.fields.postDate)).toFormat("LLL. dd, yyyy")
			const url = dynamicUrls[post.contentID] || "#"

			//to get the excerpt, we can use the first 250 characters of the post "content" field
			//but we also have to convert it from HTML to plain text
			//we also want to ensure we end on a complete sentence, so we will truncate it to the last period before the 250th character
			//if there is no content, we will use an empty string
			//and append "..." to the end
			//this is a simple way to get an excerpt, but it may not be perfect
			let excerpt = post.fields.content || ""
			excerpt = excerpt.replace(/<[^>]*>/g, "") // remove HTML tags
			if (excerpt.length > 250) {
				const lastPeriodIndex = excerpt.lastIndexOf(".", 250)
				if (lastPeriodIndex !== -1) {
					excerpt = excerpt.substring(0, lastPeriodIndex + 1)
				} else {
					excerpt = excerpt.substring(0, 250) + "..."
				}
			}

			return {
				contentID: post.contentID,
				title: post.fields.heading,
				date,
				url,
				category,
				image: post.fields.image,
				author,
				authorImage,
				excerpt
			}
		})

		return {
			totalCount: rawPosts.totalCount,
			posts,
		}
	} catch (error) {
		throw new Error(`Error loading data for PostListing: ${error}`)
	}
}

const resolvePostUrls = function (sitemap: any, posts: any) {
	let dynamicUrls: any = {};
	posts.forEach((post: any) => {
		Object.keys(sitemap).forEach((path) => {
			if (sitemap[path].contentID === post.contentID) {
				dynamicUrls[post.contentID] = path;
			}
		});
	});
	return dynamicUrls;
};