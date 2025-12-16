# Preview Mode

This guide covers implementing preview mode in Agility CMS, allowing content editors to preview draft content before publishing.

## Preview Mode Overview

Preview mode allows content editors to see draft content changes in your application before publishing. This provides a seamless editing experience.

### How It Works

1. Editor clicks "Preview" in Agility CMS
2. Agility redirects to your preview endpoint
3. Your application enables Next.js draft mode
4. Application fetches draft content using preview API key
5. Editor sees draft content in your application

## Preview API Setup

### Preview Endpoint

Create a preview API route:

```typescript
// app/api/preview/route.ts
import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
import { validatePreview } from '@agility/nextjs'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const agilityPreviewKey = searchParams.get('agilitypreviewkey')

  if (!agilityPreviewKey) {
    return new Response('Preview key required', { status: 401 })
  }

  // Validate preview key
  const isValid = await validatePreview({
    previewKey: agilityPreviewKey,
    instanceGuid: process.env.AGILITY_GUID!,
  })

  if (!isValid) {
    return new Response('Invalid preview key', { status: 401 })
  }

  // Enable draft mode
  const draft = await draftMode()
  draft.enable()

  // Redirect to preview URL
  const redirectUrl = searchParams.get('slug') || '/'
  redirect(redirectUrl)
}
```

### Exit Preview

Create exit preview endpoint:

```typescript
// app/api/preview/exit/route.ts
import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'

export async function GET(request: Request) {
  const draft = await draftMode()
  draft.disable()

  redirect('/')
}
```

## SDK Configuration

### Preview Detection

Detect preview mode in SDK:

```typescript
// lib/cms/getAgilitySDK.ts
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

## Development Mode

### Automatic Preview

In development mode, preview is automatically enabled:

```typescript
const isDevelopmentMode = process.env.NODE_ENV === "development"
const isPreview = isDevelopmentMode || isDraftMode
```

This allows you to see draft content during development.

## Preview URL Patterns

### Standard Preview

```
https://your-site.com/api/preview?agilitypreviewkey={key}&slug=/blog/my-post
```

### Dynamic Page Preview

```typescript
// Handle dynamic page previews
const { searchParams } = new URL(request.url)
const contentID = searchParams.get('ContentID')

if (contentID) {
  // Resolve content to page URL
  const pageURL = await getDynamicPageURL(contentID)
  redirect(pageURL)
}
```

## Preview Indicators

### Show Preview Badge

Display preview indicator to editors:

```typescript
import { draftMode } from 'next/headers'

export default async function Layout({ children }) {
  const { isEnabled } = await draftMode()

  return (
    <>
      {isEnabled && (
        <div className="preview-badge">
          Preview Mode Active
        </div>
      )}
      {children}
    </>
  )
}
```

## Best Practices

1. **Validate Preview Keys**: Always validate preview keys
2. **Secure Endpoints**: Protect preview endpoints
3. **Clear Indicators**: Show preview mode to editors
4. **Handle Errors**: Gracefully handle preview failures
5. **Exit Preview**: Provide easy way to exit preview

---

**Next**: [Internationalization](./09-internationalization.md) - i18n implementation

