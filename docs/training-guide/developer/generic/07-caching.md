# Caching Strategies

This guide covers caching strategies for Agility CMS content, including Next.js cache tags, revalidation, and performance optimization.

## Caching Overview

Agility CMS content is cached at multiple levels:

1. **CDN Cache**: Assets cached at edge locations
2. **API Cache**: API responses cached
3. **Application Cache**: Next.js cache tags and revalidation
4. **Browser Cache**: Client-side caching

## Next.js Caching

### Cache Tags

Cache tags allow granular cache invalidation:

```typescript
agilitySDK.config.fetchConfig = {
  next: {
    tags: [`agility-content-${contentID}-${languageCode}`],
    revalidate: 60,
  },
}
```

### Cache Tag Patterns

**Content Items:**
```
agility-content-{contentID}-{locale}
```

**Content Lists:**
```
agility-content-{referenceName}-{locale}
```

**Pages:**
```
agility-page-{pageID}-{locale}
```

**Sitemaps:**
```
agility-sitemap-flat-{locale}
agility-sitemap-nested-{locale}
```

## Revalidation

### Time-Based Revalidation

Revalidate after a specific time:

```typescript
agilitySDK.config.fetchConfig = {
  next: {
    tags: [`agility-content-${contentID}-${languageCode}`],
    revalidate: 60, // Revalidate every 60 seconds
  },
}
```

### On-Demand Revalidation

Revalidate via webhook:

```typescript
// API route: /api/revalidate
import { revalidateTag } from 'next/cache'

export async function POST(request: Request) {
  const { tag } = await request.json()
  revalidateTag(tag)
  return Response.json({ revalidated: true })
}
```

## Cache Configuration

### Default Configuration

```typescript
// lib/cms/getContentItem.ts
export const getContentItem = async <T>(params: ContentItemRequestParams) => {
  const agilitySDK = await getAgilitySDK()

  agilitySDK.config.fetchConfig = {
    next: {
      tags: [`agility-content-${params.contentID}-${params.languageCode}`],
      revalidate: 60, // 60 seconds default
    },
  }

  return await agilitySDK.getContentItem(params)
}
```

### Custom Revalidation

Override default revalidation:

```typescript
const { fields } = await getContentItem<IPost>({
  contentID: 204,
  languageCode: "en-us",
  // Custom revalidation (if supported by your wrapper)
})
```

## Webhook Revalidation

### Webhook Setup

Configure webhook in Agility CMS:

1. Navigate to Settings → Webhooks
2. Add webhook endpoint: `https://your-site.com/api/revalidate`
3. Configure events: Content Published, Content Updated
4. Set security key for validation

### Webhook Handler

```typescript
// app/api/revalidate/route.ts
import { revalidateTag, revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const body = await request.json()

  // Validate webhook signature
  const securityKey = process.env.AGILITY_SECURITY_KEY
  // ... validation logic

  // Revalidate cache tags
  if (body.contentID) {
    revalidateTag(`agility-content-${body.contentID}-${body.locale}`)
  }

  // Revalidate paths
  if (body.path) {
    revalidatePath(body.path)
  }

  return NextResponse.json({ revalidated: true })
}
```

## Static Generation

### Generate Static Params

Pre-render pages at build time:

```typescript
// app/[locale]/[...slug]/page.tsx
export async function generateStaticParams() {
  const sitemap = await getSitemapFlat({
    channelName: "website",
    languageCode: "en-us"
  })

  return sitemap.map((page) => ({
    slug: page.path.split('/').filter(Boolean),
  }))
}
```

### Incremental Static Regeneration

Update pages on-demand:

```typescript
export const revalidate = 60 // Revalidate every 60 seconds
```

## Preview Mode

### Draft Content

Preview mode bypasses cache:

```typescript
const isPreview = await draftMode().isEnabled

if (isPreview) {
  // Fetch draft content (bypasses cache)
  agilitySDK.config.fetchConfig = {
    next: { revalidate: 0 }
  }
}
```

## Performance Best Practices

### 1. Use Appropriate Cache Duration

- **Frequently changing content**: 60 seconds
- **Stable content**: 3600 seconds (1 hour)
- **Static content**: No revalidation

### 2. Leverage Cache Tags

Use specific cache tags for granular invalidation:

```typescript
tags: [`agility-content-${contentID}-${locale}`]
```

### 3. Batch Revalidation

Revalidate related content together:

```typescript
// Revalidate all posts when one is updated
revalidateTag('agility-content-posts-en-us')
```

### 4. Monitor Cache Performance

Track cache hit rates and adjust strategies:

```typescript
// Log cache misses
console.log('Cache miss for:', contentID)
```

## Common Issues

### Stale Content

**Problem**: Content not updating after changes

**Solutions:**
- Check cache tags are correct
- Verify webhook is configured
- Manually revalidate cache
- Check revalidation time

### Cache Not Working

**Problem**: Cache not being used

**Solutions:**
- Verify Next.js caching is enabled
- Check cache tags are set
- Ensure not in preview mode
- Verify revalidation settings

---

**Next**: [Preview Mode](./08-preview-mode.md) - Preview functionality

