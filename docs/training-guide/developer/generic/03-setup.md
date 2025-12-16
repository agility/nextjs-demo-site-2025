# Project Setup

This guide covers setting up Agility CMS in your development project, including installation, configuration, and initial setup.

## Installation

### Next.js Projects

Install the Agility Next.js SDK:

```bash
npm install @agility/nextjs @agility/content-fetch
```

### Other Frameworks

**Gatsby:**
```bash
npm install @agility/gatsby-source-agilitycms
```

**Nuxt:**
```bash
npm install @agility/agilitycms-nuxt-module
```

**JavaScript/TypeScript:**
```bash
npm install @agility/content-fetch
```

## Environment Variables

Create a `.env.local` file with your Agility CMS credentials:

```bash
# Instance Configuration
AGILITY_GUID=your-instance-guid
AGILITY_API_FETCH_KEY=your-fetch-key
AGILITY_API_PREVIEW_KEY=your-preview-key
AGILITY_SECURITY_KEY=your-security-key

# Locale Configuration
AGILITY_LOCALES=en-us,fr-ca,es-mx
AGILITY_SITEMAP=website

# Cache Configuration (optional)
AGILITY_FETCH_CACHE_DURATION=60
AGILITY_PATH_REVALIDATE_DURATION=60
```

### Getting Your Credentials

1. **Instance GUID**: Found in your Agility CMS instance URL
2. **API Keys**: Found in Settings → API Keys
   - **Fetch Key**: For production content access
   - **Preview Key**: For draft content access
   - **Security Key**: For webhook validation
3. **Locales**: Comma-separated list of locale codes
4. **Sitemap**: Name of your sitemap channel

## SDK Initialization

### Next.js Setup

Create an SDK initialization file:

```typescript
// lib/cms/getAgilitySDK.ts
import "server-only"
import agility from '@agility/content-fetch'
import { draftMode } from 'next/headers'

export const getAgilitySDK = async () => {
  const isDevelopmentMode = process.env.NODE_ENV === "development"
  const { isEnabled: isDraftMode } = await draftMode()
  const isPreview = isDevelopmentMode || isDraftMode

  const apiKey = isPreview
    ? process.env.AGILITY_API_PREVIEW_KEY
    : process.env.AGILITY_API_FETCH_KEY

  return agility.getApi({
    guid: process.env.AGILITY_GUID,
    apiKey,
    isPreview
  })
}
```

### Configuration File

Create an Agility configuration file:

```typescript
// lib/agility.config.ts
import { agilityConfig } from "@agility/nextjs"

export const config = agilityConfig({
  guid: process.env.AGILITY_GUID!,
  fetchAPIKey: process.env.AGILITY_API_FETCH_KEY!,
  previewAPIKey: process.env.AGILITY_API_PREVIEW_KEY!,
  locales: process.env.AGILITY_LOCALES?.split(',') || ['en-us'],
  channelName: process.env.AGILITY_SITEMAP || 'website',
})
```

## Project Structure

### Recommended Structure

```
src/
├── app/                    # Next.js App Router
│   ├── [locale]/          # Internationalized routes
│   └── api/               # API routes
├── components/
│   └── agility-components/ # Agility CMS components
├── lib/
│   ├── cms/               # CMS API functions
│   │   ├── getAgilitySDK.ts
│   │   ├── getContentItem.ts
│   │   ├── getContentList.ts
│   │   └── getAgilityPage.ts
│   └── types/             # TypeScript definitions
└── middleware.ts          # Next.js middleware
```

## TypeScript Configuration

### Type Definitions

Create TypeScript interfaces for your content:

```typescript
// lib/types/IPost.ts
export interface IPost {
  contentID: number
  fields: {
    heading: string
    slug: string
    postDate: string
    content: string
    image: ImageField
    author: {
      contentID: number
      fields: {
        name: string
      }
    }
  }
}
```

### Type Safety

Use TypeScript for type-safe content access:

```typescript
import { getContentItem } from "@/lib/cms/getContentItem"
import type { IPost } from "@/lib/types/IPost"

const { fields } = await getContentItem<IPost>({
  contentID: 123,
  languageCode: "en-us"
})

// TypeScript knows the structure of fields
console.log(fields.heading) // ✅ Type-safe
```

## Component Registration

### Register Components

Create a component registry:

```typescript
// components/agility-components/index.ts
import { ComponentName } from "./ComponentName"
import { AnotherComponent } from "./AnotherComponent"

const allModules = [
  { name: "ComponentName", module: ComponentName },
  { name: "AnotherComponent", module: AnotherComponent },
]

export const getModule = (moduleName: string) => {
  const obj = allModules.find(
    m => m.name.toLowerCase() === moduleName.toLowerCase()
  )
  return obj?.module || NoComponentFound
}
```

> **Note**: The variable name `allModules` and property `module` are from the Next.js SDK's legacy terminology. In Agility CMS, these are now called "components" and "component models."

## Middleware Setup

### Next.js Middleware

Set up middleware for preview mode and routing:

```typescript
// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Handle preview mode
  if (request.nextUrl.searchParams.has('agilitypreviewkey')) {
    // Redirect to preview API
  }

  // Handle locale routing
  // Handle redirects
  // Handle search params encoding

  return NextResponse.next()
}
```

## Testing Setup

### Development Mode

In development mode, Agility CMS automatically uses preview mode:

```typescript
const isDevelopmentMode = process.env.NODE_ENV === "development"
const isPreview = isDevelopmentMode || isDraftMode
```

This allows you to see draft content during development.

### Preview Mode

Enable preview mode for testing:

1. Add preview API route: `/api/preview`
2. Validate preview key
3. Enable Next.js draft mode
4. Redirect to preview URL

## Verification

### Test Connection

Create a test script to verify your setup:

```typescript
// scripts/test-connection.ts
import { getAgilitySDK } from "@/lib/cms/getAgilitySDK"

async function testConnection() {
  const sdk = await getAgilitySDK()
  const sitemap = await sdk.getSitemap({
    channelName: "website",
    languageCode: "en-us"
  })
  console.log("✅ Connection successful!")
  console.log("Sitemap:", sitemap)
}
```

### Common Setup Issues

1. **Missing Environment Variables**
   - Check `.env.local` file exists
   - Verify all required variables are set
   - Restart development server after changes

2. **Invalid API Keys**
   - Verify keys in Agility CMS Settings → API Keys
   - Check for typos or extra spaces
   - Ensure correct key type (fetch vs preview)

3. **SDK Initialization Errors**
   - Check instance GUID is correct
   - Verify API keys match instance
   - Ensure SDK is imported correctly

---

**Next**: [API Basics](./04-api-basics.md) - Understanding Agility APIs

