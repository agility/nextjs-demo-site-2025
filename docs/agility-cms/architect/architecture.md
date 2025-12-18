# Demo Site: Architecture

This guide documents the overall architecture of the Demo Site, including technology stack, project structure, and architectural decisions.

## Technology Stack

### Frontend Framework

- **Next.js**: 15.5.3 with App Router
- **React**: 19.1.0
- **TypeScript**: Full type safety
- **Turbopack**: Development server

### Styling

- **Tailwind CSS**: v4 (CSS-file based, no config file)
- **Motion**: 12.23.0 (Framer Motion alternative)
- **Heroicons**: v2
- **React Icons**: Icon library

### CMS Integration

- **Agility CMS**: @agility/nextjs 15.0.7
- **Content Fetch**: @agility/content-fetch 2.0.9
- **Custom Caching**: Next.js cache tags

### Additional Features

- **AI Search**: Azure OpenAI + Algolia
- **Analytics**: PostHog integration
- **A/B Testing**: PostHog feature flags
- **Internationalization**: Multi-locale support

## Project Architecture

### Directory Structure

```
src/
├── app/                    # Next.js App Router
│   ├── [locale]/          # Internationalized routes
│   └── api/               # API routes
├── components/
│   ├── agility-components/ # 20 Agility components
│   ├── header/            # Header components
│   ├── footer/            # Footer components
│   └── ai-agent/          # AI search components
├── lib/
│   ├── cms/               # CMS API functions
│   ├── cms-content/        # Content processing
│   ├── ai/                # AI integration
│   └── types/             # TypeScript definitions
└── middleware.ts          # Next.js middleware
```

## Integration Architecture

### CMS Integration

**SDK Initialization:**
- Automatic preview mode detection
- Environment-based API key selection
- Cache configuration

**Content Fetching:**
- Type-safe content access
- Automatic caching with tags
- Preview mode support

### AI Integration

**AI Search:**
- Azure OpenAI integration
- Algolia search tool
- Streaming responses
- CMS-configured prompts

### Analytics Integration

**PostHog:**
- Feature flags for A/B testing
- Analytics tracking
- Server-side evaluation

## Performance Architecture

### Caching Strategy

- **Cache Tags**: Tag-based invalidation
- **Revalidation**: 60 seconds default
- **Webhook Revalidation**: On-demand invalidation
- **Static Generation**: Pre-render at build time

### CDN Strategy

- **Assets**: Delivered via Agility CDN
- **Image Optimization**: Automatic resizing
- **Global Delivery**: Edge locations worldwide

## Scalability Architecture

### Content Scalability

- **Pagination**: Content lists support pagination
- **Filtering**: Efficient query filtering
- **Caching**: Multi-layer caching

### Performance Scalability

- **Static Generation**: Pre-render pages
- **Incremental Regeneration**: Update on-demand
- **CDN Delivery**: Global asset delivery

### Multi-Locale Scalability

- **Locale-Specific Content**: Separate instances per locale
- **Efficient Routing**: Locale-based routing
- **Fallback Strategy**: Fallback to default locale

---

**Next**: [Content Architecture](./content-architecture.md) - Content model design

