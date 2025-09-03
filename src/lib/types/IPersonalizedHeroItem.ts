import type { ImageField, URLField } from "@agility/nextjs"

export interface IPersonalizedHeroItem {
	heading: string
	description: string
	cta1?: URLField
	cta2?: URLField
	backgroundType?: string
	backgroundImage?: ImageField
	audienceName: string
}