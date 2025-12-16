# Demo Site: API Routes

This guide documents the custom API routes implemented in the Demo Site, including preview, revalidation, AI search, and other endpoints.

## API Routes Overview

The Demo Site includes **7 API routes**:

1. `/api/preview` - Preview mode
2. `/api/preview/exit` - Exit preview
3. `/api/revalidate` - Cache revalidation webhook
4. `/api/dynamic-redirect` - Dynamic content redirects
5. `/api/ai/search` - AI-powered search
6. `/api/ai/agent` - AI agent endpoint
7. `/api/contact` - Contact form submission

## Preview Routes

### `/api/preview`

Enables preview mode for draft content.

**Implementation:**
```typescript
// app/api/preview/route.ts
export async function GET(request: NextRequest) {
  const agilityPreviewKey = searchParams.get("agilitypreviewkey")

  // Validate preview key
  const validationResp = await validatePreview({
    agilityPreviewKey,
    slug
  })

  if (validationResp.error) {
    return NextResponse.json({ message: validationResp.message }, { status: 401 })
  }

  // Enable draft mode
  (await draftMode()).enable()

  // Redirect to preview URL
  return NextResponse.redirect(previewUrl)
}
```

**Usage:**
- Called from middleware when `agilitypreviewkey` is detected
- Validates preview key with Agility CMS
- Enables Next.js draft mode
- Redirects to preview URL

### `/api/preview/exit`

Exits preview mode.

**Implementation:**
```typescript
// app/api/preview/exit/route.ts
export async function GET(request: NextRequest) {
  (await draftMode()).disable()
  redirect('/')
}
```

## Revalidation Route

### `/api/revalidate`

Webhook endpoint for cache invalidation.

**Implementation:**
```typescript
// app/api/revalidate/route.ts
export async function POST(req: NextRequest) {
  const data = await req.json()

  // Only process publish events
  if (data.state === "Published") {
    // Revalidate content tags
    if (data.referenceName) {
      const itemTag = `agility-content-${data.referenceName.toLowerCase()}-${data.languageCode}`
      const listTag = `agility-content-${data.contentID}-${data.languageCode}`
      revalidateTag(itemTag)
      revalidateTag(listTag)
    }

    // Revalidate page tags
    if (data.pageID) {
      const pageTag = `agility-page-${data.pageID}-${data.languageCode}`
      revalidateTag(pageTag)

      // Also revalidate sitemaps
      revalidateTag(`agility-sitemap-flat-${data.languageCode}`)
      revalidateTag(`agility-sitemap-nested-${data.languageCode}`)
    }

    // Revalidate paths
    if (sitemapNode) {
      revalidatePath(sitemapNode.path)
    }
  }

  return new Response('OK', { status: 200 })
}
```

**Webhook Configuration:**
- URL: `https://your-site.com/api/revalidate`
- Events: Content Published, Page Published
- Security: Validate with `AGILITY_SECURITY_KEY`

## Dynamic Redirect Route

### `/api/dynamic-redirect`

Handles dynamic content redirects (e.g., `?ContentID=123`).

**Implementation:**
```typescript
// app/api/dynamic-redirect/route.ts
export async function GET(request: NextRequest) {
  const contentID = searchParams.get("ContentID")

  // Resolve content to page URL via sitemap
  const pageURL = await getDynamicPageURL({ contentID })

  if (pageURL) {
    return NextResponse.redirect(pageURL)
  }

  return NextResponse.json({ error: "Not found" }, { status: 404 })
}
```

## AI Search Routes

### `/api/ai/search`

AI-powered search using Azure OpenAI and Algolia.

**Implementation:**
```typescript
// app/api/ai/search/route.ts
export async function POST(request: Request) {
  const { messages } = await request.json()

  // Get AI search configuration from CMS
  const aiConfig = await getAISearchConfig({ locale: "en-us" })

  // Initialize AI with Azure OpenAI
  const ai = new AzureOpenAI({ ... })

  // Search Algolia index
  const searchResults = await algoliaClient.search(query)

  // Stream AI response with search context
  return streamText({ ... })
}
```

**Features:**
- Azure OpenAI integration
- Algolia search tool
- Streaming responses
- CMS-configured prompts

### `/api/ai/agent`

AI agent endpoint for conversational search.

**Implementation:**
Similar to `/api/ai/search` but with agent capabilities.

## Contact Route

### `/api/contact`

Handles contact form submissions.

**Implementation:**
```typescript
// app/api/contact/route.ts
export async function POST(request: Request) {
  const body = await request.json()

  // Validate form data
  // Send email or save to database
  // Return success response
}
```

## API Route Patterns

### Error Handling

```typescript
try {
  // API logic
} catch (error) {
  return NextResponse.json(
    { error: error.message },
    { status: 500 }
  )
}
```

### Authentication

```typescript
// Validate webhook security key
const securityKey = request.headers.get("x-agility-security-key")
if (securityKey !== process.env.AGILITY_SECURITY_KEY) {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
}
```

### Response Formatting

```typescript
// Success response
return NextResponse.json({ success: true, data: result })

// Error response
return NextResponse.json(
  { error: "Error message" },
  { status: 400 }
)
```

## Best Practices

1. **Validate Input**: Always validate request data
2. **Error Handling**: Handle errors gracefully
3. **Security**: Validate webhook signatures
4. **Logging**: Log important events
5. **Type Safety**: Use TypeScript for request/response types

---

**Next**: [Deployment](./deployment.md) - Deployment configuration

