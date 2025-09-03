import type { ImageField, URLField } from "@agility/nextjs"
import type { IAudience } from "./IAudience"

export interface IPersonalizedBackgroundHero {
	heading: string
	description: string
	cta1?: URLField
	cta2?: URLField
	backgroundType?: string
	backgroundImage?: ImageField
	personalizedHeroItems: { referencename: string }
}

export interface IPersonalizedBackgroundHeroItem {
	heading: string
	description: string
	cta1?: URLField
	cta2?: URLField
	backgroundType?: string
	backgroundImage?: ImageField
	audience?: { contentID: number; fields: IAudience }
}