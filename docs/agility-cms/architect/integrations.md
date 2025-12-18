# Demo Site: Implemented Integrations

This guide documents the third-party integrations implemented in the Demo Site, including AI search, analytics, and other services.

## AI Search Integration

### Azure OpenAI + Algolia

**Purpose**: AI-powered search with context-aware responses

**Implementation:**
- Azure OpenAI for AI responses
- Algolia for content search
- Streaming responses
- CMS-configured prompts

**Configuration:**
- AI Search Configuration content model
- Configurable system prompts
- Search tool integration

**Features:**
- Natural language search
- Context-aware responses
- Streaming responses
- Search result integration

## Analytics Integration

### PostHog

**Purpose**: Analytics and A/B testing

**Features:**
- Feature flags for A/B testing
- Analytics tracking
- Server-side feature flag evaluation
- Client-side analytics

**Implementation:**
- PostHog Node.js client for server-side
- PostHog JS for client-side
- Feature flag evaluation in components
- Event tracking

## A/B Testing Integration

### PostHog Feature Flags

**Purpose**: A/B testing for components

**Implementation:**
- ABTestHero component
- Server-side feature flag evaluation
- Variant selection
- Analytics tracking

**Pattern:**
1. Component fetches variants from CMS
2. Evaluates PostHog feature flag server-side
3. Selects variant based on flag
4. Renders selected variant
5. Tracks analytics

## Internationalization

### Multi-Locale Support

**Locales:**
- English (en-us) - Default
- French (fr) - Secondary

**Implementation:**
- Locale-based routing
- Locale-specific content
- Fallback to default locale
- URL pattern: `/fr/blog` for French

## Performance Integrations

### CDN Integration

**Agility CDN:**
- Asset delivery via CDN
- Automatic image optimization
- Global edge locations

### Caching Integration

**Next.js Caching:**
- Cache tags for invalidation
- Time-based revalidation
- Webhook-triggered revalidation

## Integration Patterns

### API Route Pattern

Custom API routes for integrations:
- `/api/ai/search` - AI search endpoint
- `/api/ai/agent` - AI agent endpoint
- `/api/revalidate` - Cache revalidation

### Middleware Pattern

Middleware handles:
- Preview mode
- Redirects
- Locale routing
- Search params encoding

## Best Practices

1. **Environment Variables**: All keys in environment variables
2. **Type Safety**: TypeScript for integration types
3. **Error Handling**: Graceful error handling
4. **Monitoring**: Monitor integration health
5. **Documentation**: Document integration patterns

---

**Back to**: [Architecture Overview](./README.md)

