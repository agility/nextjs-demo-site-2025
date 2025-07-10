import type { ImageField, URLField } from "@agility/nextjs"

export interface ITestimonial {
	name: string
	title: string
	quote: string
	image: ImageField
}

export interface ITestimonialsSection {
	subheading: string
	heading: string
	ctaText: string
	ctaLink: URLField
	testimonials: { referencename: string }
}

export interface ITestimonialsClient {
	subheading: string
	heading: string
	ctaText: string
	ctaLink: URLField
	testimonials: ITestimonial[]
	contentID: number
}
