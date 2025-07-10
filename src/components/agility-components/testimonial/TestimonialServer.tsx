import type { UnloadedModuleProps, ImageField } from "@agility/nextjs"
import { getContentItem } from "@/lib/cms/getContentItem"
import { TestimonialClient } from './TestimonialClient'

interface ITestimonial {
	quote: string
	authorName: string
	authorTitle: string
	authorImage: ImageField
	backgroundPattern?: string
}

export const Testimonial = async ({ module, languageCode }: UnloadedModuleProps) => {
	const {
		fields: {
			quote,
			authorName,
			authorTitle,
			authorImage,
			backgroundPattern = "/dot-texture.svg"
		},
		contentID,
	} = await getContentItem<ITestimonial>({
		contentID: module.contentid,
		languageCode,
	})

	return <TestimonialClient
		quote={quote}
		authorName={authorName}
		authorTitle={authorTitle}
		authorImage={authorImage}
		backgroundPattern={backgroundPattern}
		contentID={contentID}
	/>
}
