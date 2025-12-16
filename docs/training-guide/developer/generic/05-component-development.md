# Component Development

This guide covers how to develop custom components that work with Agility CMS, including patterns, best practices, and common scenarios.

## Component Basics

Components are reusable UI building blocks that display content from Agility CMS. They connect your frontend code to Agility CMS content.

### Component Structure

All Agility components follow this pattern:

```typescript
import { getContentItem } from "@/lib/cms/getContentItem"
import type { UnloadedModuleProps } from "@agility/nextjs"

interface IComponentType {
  heading: string
  description: string
  image: ImageField
}

export const ComponentName = async ({
  module,
  languageCode
}: UnloadedModuleProps) => {
  const { fields, contentID } = await getContentItem<IComponentType>({
    contentID: module.contentid,
    languageCode,
  })

  return (
    <div data-agility-component={contentID}>
      <h2 data-agility-field="heading">{fields.heading}</h2>
      <p data-agility-field="description">{fields.description}</p>
    </div>
  )
}
```

### Key Requirements

1. **Async Function**: Components must be async to fetch data
2. **UnloadedModuleProps**: Accept standard props from Agility
3. **getContentItem()**: Fetch content using component's `contentid`
4. **data-agility-* Attributes**: Required for inline editing support
5. **TypeScript Interfaces**: Define field types for type safety

> **Note**: The `module` prop name and `module.contentid` are from the SDK's legacy terminology. In Agility CMS, these are now called "components" and "component models."

## Component Registration

### Register in Index

All components must be registered:

```typescript
// components/agility-components/index.ts
import { ComponentName } from "./ComponentName"

const allModules = [
  { name: "ComponentName", module: ComponentName },
  // ... more components
]

export const getModule = (moduleName: string) => {
  const obj = allModules.find(
    m => m.name.toLowerCase() === moduleName.toLowerCase()
  )
  return obj?.module || NoComponentFound
}
```

### Naming Rules

- Component name must match Agility CMS definition (case-insensitive)
- Spaces are normalized (e.g., "Hero Section" → "HeroSection")
- Must match exactly after normalization

## Image Handling

### Using AgilityPic

**Always use `<AgilityPic>` for Agility images:**

```typescript
import { AgilityPic } from "@agility/nextjs"
import type { ImageField } from "@agility/nextjs"

<AgilityPic
  image={imageField}
  fallbackWidth={600}
  className="w-full h-auto"
  data-agility-field="image"
  priority={true} // For above-the-fold images
/>
```

**Never use Next.js `<Image>` or plain `<img>` for Agility images.**

### Image Field Structure

```typescript
interface ImageField {
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

## Rich Text Rendering

### Using renderHTML

**Always use `renderHTML()` from Agility SDK:**

```typescript
import { renderHTML } from "@agility/nextjs"

<div
  data-agility-field="content"
  data-agility-html
  className="prose dark:prose-invert"
  dangerouslySetInnerHTML={renderHTML(htmlField)}
/>
```

**Key Points:**
- Use `data-agility-html` attribute for inline editing
- Apply Tailwind Typography classes (`prose`) for styling
- Use `dark:prose-invert` for dark mode support
- `renderHTML()` sanitizes and processes Agility HTML

## Content Fetching Patterns

### Single Content Item

```typescript
const { fields, contentID } = await getContentItem<IComponentType>({
  contentID: module.contentid,
  languageCode: "en-us",
})
```

### Content List

```typescript
const { items } = await getContentList<IPost>({
  referenceName: "posts",
  languageCode: "en-us",
  take: 10,
})
```

### Nested Content

For grid/link fields that reference other content:

```typescript
// 1. Get parent content with nested reference
const { fields: { bentoCards: { referencename } } } =
  await getContentItem<IBentoSection>({
    contentID: module.contentid,
    languageCode,
  })

// 2. Fetch nested collection separately
const bentoCards = await getContentList<IBentoCard>({
  referenceName: referencename, // Use referencename, not contentid
  languageCode,
  take: 20
})
```

**Important:**
- Grid/link fields require separate fetch using `referencename`
- Search list box/dropdown/checkbox fields are auto-populated by SDK

## Component Types

### Simple Component

Displays content directly from component fields:

```typescript
export const Hero = async ({ module, languageCode }: UnloadedModuleProps) => {
  const { fields } = await getContentItem<IHero>({
    contentID: module.contentid,
    languageCode,
  })

  return (
    <section data-agility-component={module.contentid}>
      <h1 data-agility-field="heading">{fields.heading}</h1>
      <p data-agility-field="description">{fields.description}</p>
    </section>
  )
}
```

### List Component

Displays a list of content items:

```typescript
export const PostListing = async ({ module, languageCode }: UnloadedModuleProps) => {
  const { items } = await getContentList<IPost>({
    referenceName: "posts",
    languageCode,
    take: 10,
  })

  return (
    <div data-agility-component={module.contentid}>
      {items.map((post) => (
        <article key={post.contentID}>
          <h2>{post.fields.heading}</h2>
        </article>
      ))}
    </div>
  )
}
```

### Nested Component

Fetches nested content:

```typescript
export const BentoSection = async ({ module, languageCode }: UnloadedModuleProps) => {
  // Get section with nested reference
  const { fields: { bentoCards: { referencename } } } =
    await getContentItem<IBentoSection>({
      contentID: module.contentid,
      languageCode,
    })

  // Fetch nested cards
  const bentoCards = await getContentList<IBentoCard>({
    referenceName: referencename,
    languageCode,
    take: 20,
  })

  return (
    <section data-agility-component={module.contentid}>
      {bentoCards.items.map((card) => (
        <div key={card.contentID}>{card.fields.title}</div>
      ))}
    </section>
  )
}
```

## Best Practices

1. **Type Safety**: Always define TypeScript interfaces
2. **Error Handling**: Handle missing content gracefully
3. **Performance**: Use `priority` prop for above-the-fold images
4. **Accessibility**: Include alt text for images
5. **SEO**: Use semantic HTML and proper heading hierarchy
6. **Code Organization**: Keep components focused and reusable

---

**Next**: [Content Fetching](./06-content-fetching.md) - Advanced content fetching patterns

