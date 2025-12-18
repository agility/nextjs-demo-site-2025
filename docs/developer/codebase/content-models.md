# Demo Site: Content Model Implementations

This guide documents how content models are implemented in the Demo Site codebase, including TypeScript interfaces and usage patterns.

## Content Model Overview

The Demo Site has **24 content models**:

- **6 Content Items**: Single instances (Author, Category, etc.)
- **18 Content Lists**: Collections (Posts, Tags, Bento Cards, etc.)

## TypeScript Interfaces

All content models have corresponding TypeScript interfaces in `src/lib/types/`:

### Blog Content Models

#### IPost

```typescript
// src/lib/types/IPost.ts
export interface IPost {
  heading: string
  slug: string
  postDate: string
  content: string
  image: ImageField
  category: ContentItem<ICategory>
  author: ContentItem<IAuthor>
  tags: ContentItem<ITag>[]
}
```

**Usage:**
```typescript
import type { IPost } from "@/lib/types/IPost"

const { fields } = await getContentItem<IPost>({
  contentID: 204,
  languageCode: "en-us"
})
```

#### IAuthor

```typescript
// src/lib/types/IAuthor.ts
export interface IAuthor {
  name: string
  title?: string
  headShot: ImageField
}
```

#### ICategory

```typescript
// src/lib/types/ICategory.ts
export interface ICategory {
  name: string
  description?: string
}
```

#### ITag

```typescript
// src/lib/types/ITag.ts
export interface ITag {
  name: string
}
```

### Personalization Content Models

#### IAudience

```typescript
// src/lib/types/IAudience.ts
export interface IAudience {
  name: string
  description?: string
  icon?: ImageField
}
```

#### IRegion

```typescript
// src/lib/types/IRegion.ts
export interface IRegion {
  name: string
  description?: string
}
```

### Component Content Models

#### IBentoCard

```typescript
interface IBentoCard {
  eyebrow: string
  title: string
  description: string
  graphic: ImageField
}
```

#### ITestimonialItem

```typescript
interface ITestimonialItem {
  name: string
  title: string
  quote: string
  image: ImageField
}
```

## Content Model IDs

### Content Lists

- **Posts**: Reference name `posts`
- **Tags**: Reference name `tags`
- **Bento Cards**: Reference name varies (e.g., `home_bentosection_bentocard`)
- **Testimonials**: Reference name `testimonials`
- **FAQ Items**: Reference name `faq-items`
- **Pricing Tiers**: Reference name `pricing-tiers`
- **Stats**: Reference name `stats`
- **Audiences**: Reference name `audiences`
- **Regions**: Reference name `regions`

### Content Items

- **Author**: Content ID varies per author
- **Category**: Content ID varies per category
- **Global Settings**: Content ID 1 (typically)
- **AI Search Configuration**: Content ID varies

## Usage Patterns

### Fetching Single Content Item

```typescript
import { getContentItem } from "@/lib/cms/getContentItem"
import type { IPost } from "@/lib/types/IPost"

const { fields, contentID } = await getContentItem<IPost>({
  contentID: 204,
  languageCode: "en-us"
})
```

### Fetching Content List

```typescript
import { getContentList } from "@/lib/cms/getContentList"
import type { IPost } from "@/lib/types/IPost"

const { items, totalCount } = await getContentList<IPost>({
  referenceName: "posts",
  languageCode: "en-us",
  take: 10
})
```

### Accessing Linked Content

Linked content is automatically populated by the SDK:

```typescript
const { fields } = await getContentItem<IPost>({
  contentID: 204,
  languageCode: "en-us"
})

// Author is automatically populated
const authorName = fields.author.fields.name
const categoryName = fields.category.fields.name

// Tags are automatically populated as array
fields.tags.forEach(tag => {
  console.log(tag.fields.name)
})
```

## Field Naming

**Important**: Field names are **case-insensitive** in Agility CMS, but **case-sensitive** in TypeScript code.

- CMS field: `Heading` or `heading` → TypeScript: `heading`
- CMS field: `Post Date` → TypeScript: `postDate` (camelCase)
- CMS field: `CTA Button` → TypeScript: `ctaButton`

## Image Fields

All image fields use the `ImageField` type:

```typescript
import type { ImageField } from "@agility/nextjs"

interface IComponent {
  image: ImageField
}

// ImageField structure:
{
  url: string
  label: string | null
  target: string | null
  filesize: number
  pixelHeight: string
  pixelWidth: string
  height: number
  width: number
}
```

## Rich Text Fields

Rich text fields are strings containing HTML:

```typescript
interface IPost {
  content: string // HTML content
}

// Render with renderHTML()
import { renderHTML } from "@agility/nextjs"

<div
  dangerouslySetInnerHTML={renderHTML(fields.content)}
  data-agility-html
/>
```

## Best Practices

1. **Always Define Interfaces**: Create TypeScript interfaces for all content models
2. **Use Type Parameters**: Pass type parameter to `getContentItem<T>()`
3. **Handle Nulls**: Check for null/undefined values
4. **Type Safety**: Let TypeScript catch field name errors
5. **Document Fields**: Comment complex field structures

---

**Next**: [Components](./components.md) - Component implementations

