# Agility CMS Next.js Demo Site

> Modern headless CMS website with AI-powered search, internationalization, and advanced caching

## Core Architecture

**Headless CMS Pattern**: Content managed in Agility CMS → API fetching → Next.js rendering

- **Page Routing**: Dynamic via Agility's sitemap (`src/components/agility-pages/MainTemplate.tsx`)
- **Content Zones**: `<ContentZone name="main-content-zone">` renders CMS modules
- **Module System**: CMS components auto-registered via `getModule()` function

**Essential File Relationships**:

- `src/middleware.ts` → Handles preview, redirects, i18n routing
- `src/lib/cms/` → All CMS API abstractions with caching
- `src/components/agility-components/` → CMS-bound components (see `BentoSection.tsx` for nested data pattern)

## Technology Stack

- **Next.js 15.5.3** with App Router, React 19, TypeScript, Turbopack dev server
- **Tailwind CSS v4** (CSS-file based, no config) + Motion animations
- **Agility CMS** (@agility/nextjs 15.0.7) with custom caching layer
- **AI Features**: Azure/OpenAI integration with Algolia search (`/api/ai/search`)
- **Analytics**: PostHog integration with environment validation

## Development Workflow

```bash
npm run dev          # Turbopack dev server
npm run prebuild     # Rebuilds redirect cache (run before build)
npm run build        # Production build
```

**Critical Pre-build Step**: `tsx node/prebuild.ts` rebuilds redirect cache from bloom filters

## CMS Integration Patterns

### Standard Component Structure

```typescript
// All CMS components follow this pattern
export const ComponentName = async ({ module, languageCode }: UnloadedModuleProps) => {
  const { fields: { field1, field2 }, contentID } = await getContentItem<IComponentType>({
    contentID: module.contentid,
    languageCode,
  })

  return (
    <div data-agility-component={contentID}>
      <div data-agility-field="field1">{field1}</div>
    </div>
  )
}
```

### Nested Content Fetching (Critical Pattern)

```typescript
// See BentoSection.tsx for complete example
const { fields: { nestedRef: { referencename } } } = await getContentItem<MainType>({...})
const nestedItems = await getContentList<NestedType>({
  referenceName: referencename,  // Key: use referencename from parent
  languageCode,
  take: 20
})
```

### Caching Strategy

- **Automatic**: All `getContentItem()`/`getContentList()` calls include Next.js cache tags
- **Revalidation**: 60-second cache + tag-based invalidation
- **Environment**: Use `src/lib/env.ts` for strongly-typed env vars (never `process.env` directly)

## Internationalization & Routing

**Middleware Flow** (`src/middleware.ts`):

1. Preview mode detection → `/api/preview`
2. Dynamic redirects → `/api/dynamic-redirect`
3. Locale routing → Rewrites to `/{locale}/path` (internal)
4. Search params encoding → `path/~~~params~~~` for static optimization

**Locale Strategy**: Default locale (no path prefix) + explicit locales (`/fr/`, `/es/`)

## Styling System

**Tailwind CSS v4 Features**:

- `@import 'tailwindcss'` in `src/styles/tailwind.css`
- CSS custom properties for theming (light/dark mode)
- `clsx()` for conditional classes
- Motion library for animations with staggered delays

**Component Patterns**:

- Container components for consistent layouts
- `data-agility-*` attributes for CMS inline editing
- Mobile-first responsive design (`lg:` breakpoints)

## AI & Search Integration

**AI Search API** (`/api/ai/search`):

- Azure OpenAI + Algolia search tool integration
- Content from CMS configures system prompts and behavior
- Streaming responses with tool calling support
- Rate limiting and environment validation

**Search Tool Pattern**: Algolia index → AI context → Streamed responses

## Type Safety

**Environment Variables**: Strongly typed via `src/lib/env.ts` (throws at runtime if missing)
**CMS Content**: Define interfaces for all content types (e.g., `IBentoSection`, `IBentoCard`)
**Image Fields**: Always type as `ImageField` from Agility SDK

## Key Debugging Commands

```bash
# View environment validation
node -e "console.log(require('./src/lib/env.ts').env.getAll())"

# Check redirect cache
npm run prebuild

# Test AI configuration
curl localhost:3000/api/ai/search -X POST -d '{"messages":[{"role":"user","content":"test"}]}'
```

## Common Gotchas

- **Preview Mode**: Requires `agilitypreviewkey` param, not just `AgilityPreview`
- **Nested Content**: Must use `referencename` field, not `contentid`
- **Caching**: Tags are auto-generated; manual cache invalidation via API routes
- **Search Params**: Encoded in path for static optimization (`~~~params~~~`)
- **Styling**: Dark mode uses `@custom-variant dark (&:where(.dark, .dark *))` syntax
