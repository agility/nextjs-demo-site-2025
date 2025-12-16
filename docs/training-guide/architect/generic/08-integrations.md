# Integration Patterns

This guide covers integration patterns for Agility CMS, including frontend frameworks, third-party services, and custom integrations.

## Frontend Framework Integration

### Next.js Integration

**SDK**: `@agility/nextjs`

**Features:**
- React Server Components support
- Automatic caching
- Preview mode support
- TypeScript support

**Pattern:**
```typescript
import { getContentItem } from "@/lib/cms/getContentItem"

const { fields } = await getContentItem<IPost>({
  contentID: 204,
  languageCode: "en-us"
})
```

### Other Framework Integrations

**Gatsby:**
- Static site generation
- GraphQL support
- Plugin-based architecture

**Nuxt:**
- Vue.js support
- Server-side rendering
- Module-based integration

**Eleventy:**
- Static site generation
- Template-based rendering
- Simple integration

## API Integration Patterns

### RESTful API

**Pattern:**
- Standard HTTP methods
- JSON responses
- Query parameters for filtering

**Example:**
```bash
GET /{instance-guid}/fetch/{locale}/list/posts?take=10&skip=0
```

### GraphQL API

**Pattern:**
- GraphQL queries
- Type-safe queries
- Flexible data fetching

**Example:**
```graphql
query {
  contentList(referenceName: "posts") {
    items {
      contentID
      fields {
        heading
        slug
      }
    }
  }
}
```

### SDK Integration

**Pattern:**
- TypeScript SDK for type safety
- Automatic caching
- Preview mode support

**Example:**
```typescript
const sdk = await getAgilitySDK()
const items = await sdk.getContentList({ referenceName: "posts" })
```

## Third-Party Integrations

### Analytics Integration

**PostHog:**
- Feature flags
- Analytics tracking
- A/B testing

**Google Analytics:**
- Page view tracking
- Event tracking
- Custom dimensions

### Search Integration

**Algolia:**
- Full-text search
- Faceted search
- Search analytics

**Custom Search:**
- Build custom search
- Integrate with AI services
- Custom ranking

### AI Integration

**Azure OpenAI:**
- AI-powered search
- Content generation
- Chat interfaces

**Custom AI:**
- Integrate custom AI services
- Build AI features
- Custom prompts

## Webhook Integration

### Webhook Pattern

**Setup:**
1. Configure webhook in Agility CMS
2. Create webhook endpoint
3. Validate webhook signatures
4. Process webhook events

**Events:**
- Content Published
- Page Published
- Content Updated
- Redirect Updated

### Webhook Handler

```typescript
export async function POST(request: Request) {
  // Validate signature
  // Process event
  // Revalidate cache
  // Return response
}
```

## Custom Integration Patterns

### Custom API Routes

Create custom API routes for:
- Custom business logic
- Third-party integrations
- Data transformations
- Custom workflows

### Middleware Integration

Use middleware for:
- Preview mode handling
- Redirect management
- Locale routing
- Authentication

## Best Practices

1. **Use SDKs**: Prefer SDKs over direct API calls
2. **Type Safety**: Use TypeScript for type safety
3. **Error Handling**: Handle errors gracefully
4. **Caching**: Leverage built-in caching
5. **Security**: Secure all integrations
6. **Monitoring**: Monitor integration health
7. **Documentation**: Document integration patterns

---

**Next**: See [Instance-Specific Guide](../instance-specific/README.md) for your specific Agility CMS instance

