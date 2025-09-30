import type { URLField } from "@agility/nextjs"

export interface IPricingTier {
	name: string
	description: string
	priceMonthly: string
	currency: string
	currencySymbol: string
	ctaButton: URLField
	highlights: string
	regionName?: string
	regionID?: string
}