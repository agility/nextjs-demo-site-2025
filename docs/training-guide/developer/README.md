# Agility CMS Training Guide: Developer

> **Target Audience**: Developers integrating with Agility CMS and building custom components

## Overview

This guide is designed for developers who need to understand how Agility CMS works from a technical perspective, integrate with the CMS APIs, and develop custom components for frontend applications.

## Training Structure

This guide is split into two parts:

1. **[Generic Training Guide](./generic/README.md)** - Works for **any Agility CMS instance**
   - Learn how Agility CMS works in general
   - Understand APIs, SDKs, and development patterns
   - Apply to any Agility CMS project

2. **[Instance-Specific Guide](./instance-specific/README.md)** - Specific to **Demo Site** (`13f09fe2-u`)
   - Learn project structure and implementation details
   - Understand specific content models and components
   - Practice with real examples

## Quick Start

**New to Agility CMS?** Start with the [Generic Training Guide](./generic/README.md)

**Working on Demo Site?** Review the [Instance-Specific Guide](./instance-specific/README.md)

---

## Overview (Legacy Content)

## Learning Outcomes

By the end of this guide, you will be able to:
- Understand the Agility CMS data model and architecture
- Integrate Agility CMS with Next.js applications
- Develop custom React components that work with Agility CMS
- Understand the API structure and caching strategies
- Debug and troubleshoot integration issues

## Table of Contents

1. [Understanding the Agility Data Model](#1-understanding-the-agility-data-model)
2. [Headless Architecture Overview](#2-headless-architecture-overview)
3. [Next.js Integration](#3-nextjs-integration)
4. [Understanding the Agility CMS Interface](#3-understanding-the-agility-cms-interface)
5. [Next.js Integration](#4-nextjs-integration)
6. [Component Development](#5-component-development)
7. [Content Fetching Patterns](#6-content-fetching-patterns)
8. [Instance-Specific Implementation](#7-instance-specific-implementation)
9. [API Reference](#8-api-reference)

---

## 1. Understanding the Agility Data Model

The Agility CMS data model follows a hierarchical structure that separates content from presentation.

![Agility Data Model Diagram](../assets/concepts/Agility%20Data%20Model.png)

*This diagram illustrates how Agility CMS organizes data: The Sitemap maps URLs to Pages, Pages contain Components, and Components display Content Items. Each entity has a corresponding Model that defines its structure. This separation enables content reusability and flexible presentation.*

### Core Entities

#### Sitemap
The sitemap defines the navigation structure and routing for your website. Each entry maps a URL path to a page.

**Example:**
```
/home: 1
/about-us: 2
/blog: 3
/blog/first-post: 4, content: 6
```

#### Page Model
Defines the structure/schema for pages. Pages are instances of page models.

**Page Example:**
```json
{
  "pageID": 2,
  "name": "home",
  "path": null,
  "title": "Home",
  "menuText": "Home",
  "pageType": "static",
  "templateName": "Main Template",
  "zones": {
    "main-content-zone": [
      {
        "module": "PersonalizedBackgroundHero",
        "item": {
          "contentID": 186,
          "properties": {
            "state": 2,
            "referenceName": "home_personalizedbackgroundh48f36e",
            "definitionName": "PersonalizedBackgroundHero"
          },
          "fields": {
            "heading": "Close Every Deal",
            "description": "Galaxy Tech helps you sell more...",
            "cta1": {
              "href": "/contact-us",
              "text": "Get started"
            }
          }
        }
      },
      {
        "module": "BentoSection",
        "item": {
          "contentID": 27,
          "properties": {
            "referenceName": "home_bentosection",
            "definitionName": "BentoSection"
          },
          "fields": {
            "heading": "Know everything your customers do...",
            "bentoCards": {
              "referencename": "home_bentosection_bentocard",
              "fulllist": true
            }
          }
        }
      }
    ]
  }
}
```

#### Component Model
Defines the structure/schema for reusable UI components. Components are instances of component models.

**Component Example (BentoSection):**
```json
{
  "contentID": 27,
  "properties": {
    "state": 2,
    "referenceName": "home_bentosection",
    "definitionName": "BentoSection",
    "itemOrder": 0
  },
  "fields": {
    "subheading": "Sales",
    "heading": "Know everything your customers do and so much more",
    "bentoCards": {
      "referencename": "home_bentosection_bentocard",
      "fulllist": true
    }
  }
}
```

#### Content Model
Defines the structure/schema for standalone content items. Content items are instances of content models.

**Content Example (Post):**
```json
{
  "contentID": 204,
  "properties": {
    "state": 2,
    "modified": "2025-12-08T15:12:10.883",
    "versionID": 1287,
    "referenceName": "posts",
    "definitionName": "Post",
    "itemOrder": 22
  },
  "fields": {
    "heading": "Changed Heading",
    "slug": "future-of-retail-ai-customer-intelligence",
    "postDate": "2025-10-08T04:00:00+00:00",
    "category": {
      "contentID": 61,
      "properties": {
        "referenceName": "categories",
        "definitionName": "Category"
      },
      "fields": {
        "name": "Knowledge"
      }
    },
    "categoryID": "61",
    "categoryName": "Knowledge",
    "tags": [
      {
        "contentID": 8,
        "fields": {
          "name": "A.I."
        }
      }
    ],
    "author": {
      "contentID": 59,
      "fields": {
        "name": "Emily Selman",
        "headShot": {
          "url": "https://cdn.agilitycms.com/...",
          "label": null
        }
      }
    },
    "content": "<p>The retail landscape has undergone...</p>",
    "image": {
      "label": "Man at a computer",
      "url": "https://cdn.agilitycms.com/..."
    }
  }
}
```

### Relationships

1. **Sitemap → Page**: Each sitemap entry references a page
2. **Page → Components**: Pages contain multiple components/modules
3. **Component → Content**: Components can display content items
4. **Content → Content**: Content items can link to other content items (e.g., Post → Author)

### Key Concepts

- **Separation of Concerns**: Content (data) is separate from Components (presentation)
- **Reusability**: Content items and components can be reused across multiple pages
- **Type Safety**: Each model defines a schema that enforces structure

---

## 2. Headless Architecture Overview

Agility CMS follows a headless architecture pattern, separating content management from content delivery.

![Headless Architecture Diagram](../assets/concepts/Agility%20Headless%20Architecture.png)

*This diagram shows the headless architecture flow: Content is created in the Content Manager, exposed through Content APIs, and consumed by frontend applications (Website, Apps) which deliver experiences to end-user Devices. Assets are delivered directly via Asset CDN for optimal performance. This architecture enables multi-channel publishing and technology independence.*

### Architecture Components

#### Backend (Agility CMS)
- **Content Manager**: Web-based interface for content editing
- **Content APIs**: RESTful APIs that expose content as JSON
- **Asset CDN**: Content delivery network for media assets

#### Frontend Applications
- **Website**: Next.js application consuming Agility APIs
- **Apps**: Mobile apps or other applications consuming the same APIs

#### User Devices
- Browsers, mobile devices accessing the frontend applications
- Can directly access Asset CDN for optimized media delivery

### Data Flow

1. **Content Creation**: Editors create content in Content Manager
2. **API Exposure**: Content is exposed via Content APIs
3. **Frontend Consumption**: Next.js app fetches content via APIs
4. **Asset Delivery**: Images/assets served via CDN for performance
5. **User Access**: Users access the rendered website/app

### Benefits of Headless Architecture

- **Multi-channel**: Same content for web, mobile, IoT devices
- **Technology Freedom**: Use any frontend framework
- **Performance**: CDN delivery for assets
- **Scalability**: Separate scaling of CMS and frontend
- **Developer Experience**: Modern APIs and SDKs

---

## 3. Understanding the Agility CMS Interface

Before diving into integration, it's helpful to understand how the Agility CMS interface is organized:

![Agility Sections Diagram](../assets/concepts/Agility%20Sections.png)

*The Agility CMS interface is organized into four main sections: Content (for managing Lists and Items), Assets (for Files, Images, PDFs), Pages (for Sitemap, Pages, and Components), and Web Studio (for Preview). As a developer, you'll primarily interact with the Content and Pages sections when configuring content models and components, but understanding all sections helps you work effectively with content editors and administrators.*

**Key Sections for Developers:**
- **Content**: Where content models are defined and content items are managed
- **Pages**: Where page models and components are configured
- **Components**: Where component definitions are created and managed
- **Assets**: Where media files are stored (referenced in your components)

---

## 4. Next.js Integration

The Demo Site uses Next.js 15.5.3 with the App Router and React Server Components.

### Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── [locale]/          # Internationalized routes
│   └── api/               # API routes
├── components/
│   └── agility-components/ # Agility CMS components
├── lib/
│   ├── cms/               # CMS API functions
│   └── types/             # TypeScript definitions
```

### Key Integration Points

#### 1. Middleware (`src/middleware.ts`)
Handles:
- Preview mode detection
- Redirects
- Internationalization routing
- Search params encoding

#### 2. CMS SDK (`src/lib/cms/`)
Abstractions for:
- `getAgilitySDK()` - SDK initialization
- `getContentItem()` - Fetch single content item
- `getContentList()` - Fetch content list
- `getAgilityPage()` - Fetch page data
- Caching with Next.js cache tags

#### 3. Component Registration (`src/components/agility-components/index.ts`)
All Agility components must be registered:

```typescript
const allModules = [
  { name: "RichTextArea", module: RichTextArea },
  { name: "BackgroundHero", module: BackgroundHero },
  // ... more components
]

export const getModule = (moduleName: string) => {
  const obj = allModules.find(
    m => m.name.toLowerCase() === moduleName.toLowerCase()
  )
  return obj?.module || NoComponentFound
}
```

> **Note**: The Next.js SDK still uses "module" terminology in code (e.g., `allModules`, `getModule`, `module.contentid`). This is a legacy naming convention from when components were called "modules" in Agility CMS. The UI and documentation now use "component" terminology, but the SDK maintains backward compatibility.

### Environment Variables

Required environment variables (see `src/lib/env.ts`):

```typescript
AGILITY_GUID=13f09fe2-u  # Demo Site instance GUID
AGILITY_API_FETCH_KEY=your-fetch-key
AGILITY_API_PREVIEW_KEY=your-preview-key
AGILITY_SECURITY_KEY=your-security-key
AGILITY_LOCALES=en-us,fr-ca,es-mx
AGILITY_SITEMAP=website
```

---

## 5. Component Development

### Standard Component Pattern

All Agility CMS components follow this pattern:

```typescript
import { getContentItem } from "@/lib/cms/getContentItem"
import type { UnloadedModuleProps, ImageField } from "@agility/nextjs"

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
      <AgilityPic
        image={fields.image}
        fallbackWidth={600}
        data-agility-field="image"
      />
    </div>
  )
}
```

### Component Requirements

1. **Async Function**: Components are async to fetch data
2. **UnloadedModuleProps**: Accepts `module`, `languageCode`, `isPreview`, etc.
   > **Note**: The `module` prop name is from the SDK's legacy terminology. It refers to the component instance data.
3. **getContentItem()**: Fetch content using the component's `contentid` (accessed via `module.contentid`)
4. **data-agility-* Attributes**: Required for inline editing support
5. **TypeScript Interfaces**: Define field types for type safety

### Registration

After creating a component:

1. Import it in `src/components/agility-components/index.ts`
2. Add to `allModules` array:
   ```typescript
   { name: "ComponentName", module: ComponentName }
   ```
3. Component name must match Agility CMS component model (case-insensitive)

### Image Handling

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

### Rich Text Rendering

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

---

## 6. Content Fetching Patterns

### Single Content Item

```typescript
const { fields, contentID } = await getContentItem<IComponentType>({
  contentID: module.contentid,
  languageCode: "en-us",
})
```

### Content List

```typescript
const items = await getContentList<IPost>({
  referenceName: "posts",
  languageCode: "en-us",
  take: 10,
  skip: 0,
})
```

### Nested Content (Critical Pattern)

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

**Important**:
- Grid/link fields require separate fetch using `referencename`
- Search list box/dropdown/checkbox fields are auto-populated by SDK

### Page Data

```typescript
const page = await getAgilityPage({
  slug: slugArray,
  languageCode: "en-us",
  channelName: "website",
  isPreview: false,
})
```

### Caching

All CMS functions include automatic caching:
- **Cache Tags**: `agility-content-{contentID}-{locale}`
- **Revalidation**: 60 seconds default
- **Tag-based Invalidation**: Via `/api/revalidate` webhook

---

## 7. Instance-Specific Implementation

### Available Components

The Demo Site includes **20 registered components**:

| Component | Purpose | Key Patterns | CMS ID |
|-----------|---------|--------------|--------|
| `RichTextArea` | Rich text content | `renderHTML()` | - |
| `BackgroundHero` | Hero with background | Image handling | 14 |
| `BentoSection` | Card grid | Nested content fetching | 16 |
| `PostListing` | Blog listings | Content list, filtering | 24 |
| `PostDetails` | Blog post detail | Single content item | 23 |
| `Testimonials` | Testimonial display | Content list | 33 |
| `PricingCards` | Pricing display | Content list | 30 |
| `Carousel` | Image carousel | Client component pattern | 50 |
| `ContactUs` | Contact form | Server + client split | 51 |
| `ABTestHero` | A/B testing | Feature flags, PPR | 40 |
| `PersonalizedBackgroundHero` | Personalization | Audience/region filtering | 61 |
| `Hero` | Basic hero | Text + image layout | 34 |
| `CompanyStats` | Statistics display | Animated numbers | 37 |
| `TeamListing` | Team members | Content list display | 36 |
| `LogoStrip` | Logo display | Horizontal logo list | 19 |
| `PersonalizedLogoStrip` | Personalized logos | Audience filtering | 57 |
| `Header` | Site header | Navigation | 25 |
| `PricingTable` | Pricing table | Detailed pricing | 31 |
| `FrequentlyAskedQuestions` | FAQ accordion | Expandable content | 27 |
| `Testimonial` | Single testimonial | Individual testimonial | 28 |

### Type Definitions

Content type interfaces in `src/lib/types/`:

- `IPost.ts` - Blog post structure (Content List, ID: 11)
- `IAuthor.ts` - Author information (Content Item, ID: 8)
- `ICategory.ts` - Blog categories (Content Item, ID: 9)
- `ITag.ts` - Blog tags (Content List, ID: 10)
- `IAudience.ts` - Audience targeting (Content List, ID: 42)
- `IRegion.ts` - Regional content (Content List, ID: 41)
- `IPricingTier.ts` - Pricing information (Content List, ID: 29)

**All Content Models in Instance:**
- 24 total content models
- 6 Content Items (Author, Category, Carousel Slide, Global Settings, AI Search Configuration, Personalized Hero Item)
- 18 Content Lists (Posts, Tags, Bento Cards, Testimonials, FAQ Items, Pricing Tiers, Stats, Audiences, Regions, etc.)

### Example: BentoSection Component

This component demonstrates nested content fetching:

```typescript:src/components/agility-components/BentoSection.tsx
export const BentoSection = async ({ module, languageCode }: UnloadedModuleProps) => {
  // 1. Get section content
  const { fields: { bentoCards: { referencename } }, contentID } =
    await getContentItem<IBentoSection>({
      contentID: module.contentid,
      languageCode,
    })

  // 2. Fetch nested cards
  const bentoCards = await getContentList<IBentoCard>({
    referenceName: referencename,
    languageCode,
    take: 20,
  })

  return (
    <Container data-agility-component={contentID}>
      {/* Render cards */}
    </Container>
  )
}
```

### Personalization System

The Demo Site supports audience/region personalization:

**Server Component:**
```typescript
import { getAudienceContentID, getRegionContentID } from '@/lib/utils/audienceRegionUtils'

const audienceContentID = await getAudienceContentID(searchParams, locale)
const regionContentID = await getRegionContentID(searchParams, locale)
```

**Client Component:**
```typescript
import { useAudienceRegionParams } from '@/lib/hooks/useAudienceRegionParams'

const { selectedAudience, setAudience } = useAudienceRegionParams(audiences, regions)
```

### Internationalization

**Configured Locales:**
- **English (en-us)** - Default locale
- **French (fr)** - Secondary locale

**Locale Configuration:**
- Locales configured in `AGILITY_LOCALES` env var
- Default locale (en-us) has no path prefix: `/blog`
- Other locales have prefix: `/fr/blog`
- Internal routing uses locale prefix
- Middleware handles locale detection and routing

**Sitemap:**
- Single sitemap: "Website" (ID: 1)
- All pages support both locales
- Dynamic pages (Post Details) work with all locales

---

## 8. API Reference

### getContentItem()

Fetch a single content item by content ID.

```typescript
const { fields, contentID } = await getContentItem<T>({
  contentID: number,
  languageCode: string,
})
```

**Returns:**
- `fields`: Typed content fields
- `contentID`: Content item ID

### getContentList()

Fetch a list of content items.

```typescript
const items = await getContentList<T>({
  referenceName: string,
  languageCode: string,
  take?: number,
  skip?: number,
  filter?: string,
  sort?: string,
})
```

**Returns:** Array of content items

### getAgilityPage()

Fetch page data including modules.

```typescript
const page = await getAgilityPage({
  slug: string[],
  languageCode: string,
  channelName: string,
  isPreview: boolean,
})
```

**Returns:** Page object with zones and modules

### getAgilitySDK()

Get initialized Agility SDK instance.

```typescript
const sdk = await getAgilitySDK(isPreview)
```

**Returns:** Agility SDK instance

---

## Development Workflow

### 1. Create Component

```bash
# Create component file
touch src/components/agility-components/MyComponent.tsx
```

### 2. Define TypeScript Interface

```typescript
interface IMyComponent {
  heading: string
  description: string
}
```

### 3. Implement Component

Follow standard component pattern with:
- Async function
- `getContentItem()` or `getContentList()`
- `data-agility-*` attributes
- Proper TypeScript types

### 4. Register Component

Add to `src/components/agility-components/index.ts`:

```typescript
import { MyComponent } from "./MyComponent"

const allModules = [
  // ... existing components
  { name: "MyComponent", module: MyComponent },
]
```

> **Note**: The variable name `allModules` and property `module` are from the SDK's legacy terminology. In Agility CMS, these are now called "components" and "component models."

### 5. Test Component

1. Create component in Agility CMS with matching name
2. Add component to a page
3. Preview in development mode
4. Test with different content

### 6. Deploy

Component is automatically available after deployment.

---

## Debugging Tips

### Common Issues

1. **Component Not Found**
   - Check component name matches Agility CMS (case-insensitive)
   - Verify component is registered in `index.ts`

2. **Type Errors**
   - Ensure TypeScript interface matches CMS content model
   - Check field names match exactly (case-sensitive in code)

3. **Content Not Loading**
   - Verify `contentID` is correct
   - Check `languageCode` matches content locale
   - Ensure content is published (not just saved as draft)

4. **Images Not Displaying**
   - Use `<AgilityPic>`, not Next.js `<Image>`
   - Check image field type is `ImageField`

5. **Nested Content Not Loading**
   - Use `referencename` from parent, not `contentid`
   - Verify reference name matches content list name

### Debugging Tools

```typescript
// Log component data
console.log('Component data:', module)

// Log fetched content
console.log('Content:', { fields, contentID })

// Check cache tags
// Cache tags are auto-generated: agility-content-{id}-{locale}
```

---

## Best Practices

1. **Type Safety**: Always define TypeScript interfaces for content
2. **Error Handling**: Handle missing content gracefully
3. **Performance**: Use `priority` prop for above-the-fold images
4. **Accessibility**: Include alt text for images
5. **SEO**: Use semantic HTML and proper heading hierarchy
6. **Caching**: Leverage Next.js caching, don't bypass unnecessarily
7. **Code Organization**: Keep components focused and reusable

---

## Next Steps

After completing this guide, you should:
1. Create a custom component following the patterns
2. Implement nested content fetching
3. Test with different locales
4. Understand the caching strategy
5. Set up preview mode testing

**You're ready when you can:**
- Create and register new Agility components
- Understand and implement content fetching patterns
- Debug integration issues independently
- Follow the established patterns and conventions

---

*This guide is specific to the Demo Site instance (`13f09fe2-u`). For generic Agility CMS concepts, see the [Concept Guides](../assets/concepts/README.md).*

