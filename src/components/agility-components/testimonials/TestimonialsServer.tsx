import type { UnloadedModuleProps } from "@agility/nextjs"
import { getContentItem } from "@/lib/cms/getContentItem"
import { getContentList } from "@/lib/cms/getContentList"

import type { ITestimonialsSection, ITestimonial } from './types'
import { TestimonialsClient } from "./TestimonialsClient"

export const Testimonials = async ({ module, languageCode }: UnloadedModuleProps) => {
	const {
		fields: {
			subheading,
			heading,
			ctaText,
			ctaLink,
			testimonials: { referencename: testimonialsReferenceName },
		},
		contentID,
	} = await getContentItem<ITestimonialsSection>({
		contentID: module.contentid,
		languageCode,
		contentLinkDepth: 0
	})

	// Fetch the testimonials list
	let testimonials = await getContentList<ITestimonial>({
		referenceName: testimonialsReferenceName,
		languageCode,
		take: 20, // adjust as needed
	})

	return (
		<TestimonialsClient
			subheading={subheading}
			heading={heading}
			ctaText={ctaText}
			ctaLink={ctaLink}
			testimonials={testimonials.items.map(testimonial => testimonial.fields)}
			contentID={contentID}
		/>
	)
}
