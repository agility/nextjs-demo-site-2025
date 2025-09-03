import type { ContentItem, ImageField, URLField } from "@agility/nextjs"
import type { IAudience } from "./IAudience"

export interface IPersonalizedHeroVariant {
  heading: string
  description: string
  cta1?: URLField
  cta2?: URLField
  backgroundType?: string
  backgroundImage?: ImageField
  audience: ContentItem<IAudience>
}
