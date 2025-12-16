# Internationalization

This guide covers implementing internationalization (i18n) with Agility CMS, including locale configuration, routing, and content management.

## i18n Overview

Agility CMS supports multiple locales, allowing you to manage content in different languages and regions.

### Locale Configuration

Configure locales in your environment:

```bash
AGILITY_LOCALES=en-us,fr-ca,es-mx
```

### Default Locale

The first locale in the list is the default locale:

```typescript
const locales = process.env.AGILITY_LOCALES?.split(',') || ['en-us']
const defaultLocale = locales[0]
```

## Locale Routing

### URL Patterns

**Default Locale (no prefix):**
```
/                    # English (default)
/blog
/about-us
```

**Other Locales (with prefix):**
```
/fr                  # French
/fr/blog
/fr/about-us
```

### Middleware Routing

Handle locale routing in middleware:

```typescript
// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  const locale = getLocaleFromPathname(pathname)

  // Rewrite to locale-prefixed path
  const newUrl = new URL(`/${locale}${pathname}`, request.url)
  return NextResponse.rewrite(newUrl)
}
```

## Content Fetching

### Specify Locale

Always specify locale when fetching content:

```typescript
const { fields } = await getContentItem<IPost>({
  contentID: 204,
  languageCode: "en-us" // or "fr-ca", "es-mx"
})
```

### Locale Detection

Detect locale from request:

```typescript
import { headers } from 'next/headers'

export default async function Page({ params }) {
  const locale = params.locale || 'en-us'

  const { fields } = await getContentItem<IPost>({
    contentID: 204,
    languageCode: locale
  })

  return <div>{fields.heading}</div>
}
```

## Locale-Specific Content

### Content Per Locale

Each locale has its own content instances:

- **English (en-us)**: Post with ID 204
- **French (fr-ca)**: Post with ID 205 (same content, different locale)
- **Spanish (es-mx)**: Post with ID 206

### Fallback Strategy

Implement fallback to default locale:

```typescript
async function getContentWithFallback<T>(
  contentID: number,
  locale: string,
  defaultLocale: string = 'en-us'
) {
  try {
    return await getContentItem<T>({
      contentID,
      languageCode: locale
    })
  } catch (error) {
    if (locale !== defaultLocale) {
      // Fallback to default locale
      return await getContentItem<T>({
        contentID,
        languageCode: defaultLocale
      })
    }
    throw error
  }
}
```

## Sitemap Per Locale

### Fetch Sitemap

Fetch sitemap for specific locale:

```typescript
const sitemap = await getSitemapFlat({
  channelName: "website",
  languageCode: "en-us"
})
```

### Generate Static Params

Generate static params for all locales:

```typescript
export async function generateStaticParams() {
  const locales = process.env.AGILITY_LOCALES?.split(',') || ['en-us']
  const params = []

  for (const locale of locales) {
    const sitemap = await getSitemapFlat({
      channelName: "website",
      languageCode: locale
    })

    for (const page of sitemap) {
      params.push({
        locale,
        slug: page.path.split('/').filter(Boolean),
      })
    }
  }

  return params
}
```

## Locale Utilities

### Locale Helpers

Create utility functions:

```typescript
// lib/i18n/utils.ts
export function isValidLocale(locale: string, locales: string[]): boolean {
  return locales.includes(locale)
}

export function getLocaleFromPathname(pathname: string): string {
  const segments = pathname.split('/').filter(Boolean)
  const firstSegment = segments[0]
  const locales = process.env.AGILITY_LOCALES?.split(',') || ['en-us']

  return isValidLocale(firstSegment, locales) ? firstSegment : locales[0]
}

export function removeLocaleFromPathname(pathname: string): string {
  const locale = getLocaleFromPathname(pathname)
  return pathname.replace(`/${locale}`, '') || '/'
}
```

## Best Practices

1. **Always Specify Locale**: Never fetch content without locale
2. **Implement Fallbacks**: Fallback to default locale if content missing
3. **Consistent Routing**: Use consistent URL patterns
4. **Locale Detection**: Detect locale from URL or headers
5. **Content Management**: Manage content per locale separately

---

**Next**: [Best Practices](./10-best-practices.md) - Development best practices

