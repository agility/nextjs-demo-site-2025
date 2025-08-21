import type { ContentItem, ImageField } from "@agility/nextjs"
import type { IAudience } from "./IAudience"

export interface ICustomerProfile {
	name: string
	audience: ContentItem<IAudience>
	logo: ImageField
	audience_TextField: string
	audience_ValueField: string
}