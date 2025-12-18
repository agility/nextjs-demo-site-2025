# Agility CMS Next.js Demo Site

> Modern headless CMS website with AI-powered search, internationalization, and advanced caching

A production-ready Next.js demo site showcasing Agility CMS integration with React 19, TypeScript, Tailwind CSS v4, and AI-powered search capabilities.

## ✨ Features

- **Headless CMS Integration** - Full Agility CMS integration with dynamic page routing
- **AI-Powered Search** - Azure OpenAI + Algolia integration for intelligent content search
- **Internationalization** - Multi-locale support with clean URL routing
- **Advanced Caching** - Next.js cache tags with automatic revalidation
- **Preview Mode** - Draft content preview with Agility CMS integration
- **Audience & Region Personalization** - URL-based personalization system
- **View Transitions** - Smooth page transitions using React ViewTransition API
- **Type Safety** - Strongly-typed environment variables and CMS content
- **Modern Stack** - Next.js 15.5.3, React 19, Tailwind CSS v4, TypeScript

## 🚀 Quick Start

### Prerequisites

- Node.js 20+
- npm or yarn
- Agility CMS instance (get one at [agilitycms.com](https://agilitycms.com))

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd demosite2025

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Edit .env.local with your Agility CMS credentials
```

### Environment Variables

Create a `.env.local` file with the following required variables:

```env
# Agility CMS Configuration
AGILITY_GUID=your-instance-guid
AGILITY_API_FETCH_KEY=your-fetch-api-key
AGILITY_API_PREVIEW_KEY=your-preview-api-key
AGILITY_SECURITY_KEY=your-security-key
AGILITY_LOCALES=en-us,fr-ca,es-mx
AGILITY_SITEMAP=website
AGILITY_FETCH_CACHE_DURATION=60
AGILITY_PATH_REVALIDATE_DURATION=60

# PostHog Analytics (Optional)
NEXT_PUBLIC_POSTHOG_KEY=your-posthog-key
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com

# Node Environment
NODE_ENV=development

# Build Hook (Optional - for redirect rebuilds)
BUILD_HOOK_URL=https://your-build-hook-url
```

### Development

```bash
# Start development server with Turbopack
npm run dev

# Run prebuild (rebuilds redirect cache - required before production build)
npm run prebuild

# Build for production
npm run build

# Start production server
npm run start

# Run linter
npm run lint
```

**⚠️ Important**: Always run `npm run prebuild` before `npm run build` to rebuild the redirect cache.

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── [locale]/          # Internationalized routes
│   │   └── [...slug]/     # Dynamic page routes
│   └── api/               # API routes
│       ├── ai/            # AI search endpoints
│       ├── preview/       # Preview mode handling
│       ├── revalidate/    # Cache revalidation webhook
│       └── dynamic-redirect/ # Content ID redirects
├── components/
│   ├── agility-components/ # CMS-connected components
│   ├── agility-pages/      # Page templates
│   ├── ai-agent/          # AI chat interface
│   ├── ai-elements/       # AI-powered UI elements
│   ├── ai-search/         # AI search components
│   ├── header/            # Navigation components
│   └── footer/            # Footer components
├── lib/
│   ├── cms/               # Agility CMS SDK wrappers
│   ├── cms-content/       # Content processing utilities
│   ├── ai/                # AI integration utilities
│   ├── posthog/           # Analytics integration
│   ├── hooks/             # React hooks
│   ├── i18n/              # Internationalization config
│   ├── types/             # TypeScript definitions
│   └── utils/             # Utility functions
└── public/                # Static assets
```

## 🏗️ Architecture

### Headless CMS Pattern

Content managed in Agility CMS → API fetching → Next.js rendering

- **Page Routing**: Dynamic via Agility's sitemap
- **Content Zones**: `<ContentZone name="main-content-zone">` renders CMS modules
- **Module System**: Components auto-registered via `getModule()` function

### Key File Relationships

- `src/middleware.ts` → Handles preview, redirects, i18n routing
- `src/lib/cms/` → All CMS API abstractions with caching
- `src/components/agility-components/` → CMS-bound components

## 🎨 Technology Stack

- **Framework**: Next.js 15.5.3 (App Router)
- **React**: 19.1.0
- **TypeScript**: 5.x
- **Styling**: Tailwind CSS v4 (CSS-file based)
- **CMS**: Agility CMS (@agility/nextjs 15.0.7)
- **Animations**: Motion 12.23.0
- **AI**: Azure OpenAI + Algolia
- **Analytics**: PostHog
- **Icons**: Heroicons v2, React Icons

## 📝 Key Concepts

### CMS Component Registration

All Agility CMS components must be registered in `src/components/agility-components/index.ts`:

```typescript
import { ComponentName } from "./ComponentName"

const allModules = [
  { name: "ComponentName", module: ComponentName },
  // ... other modules
]
```

### Standard Component Pattern

```typescript
export const ComponentName = async ({ module, languageCode }: UnloadedModuleProps) => {
  const { fields, contentID } = await getContentItem<IComponentType>({
    contentID: module.contentid,
    languageCode,
  })

  return (
    <div data-agility-component={contentID}>
      <div data-agility-field="fieldName">{fields.fieldName}</div>
    </div>
  )
}
```

### Nested Content Fetching

```typescript
// Get parent content with nested reference
const { fields: { nestedRef: { referencename } } } = await getContentItem<MainType>({
  contentID: module.contentid,
  languageCode,
})

// Fetch nested collection separately
const nestedItems = await getContentList<NestedType>({
  referenceName: referencename,
  languageCode,
  take: 20
})
```

### Image Handling

Always use `<AgilityPic>` for Agility CMS images:

```typescript
import { AgilityPic } from "@agility/nextjs"

<AgilityPic
  image={imageField}
  fallbackWidth={600}
  className="w-full h-auto"
  data-agility-field="image"
/>
```

### Rich Text Rendering

Use `renderHTML()` from Agility SDK:

```typescript
import { renderHTML } from "@agility/nextjs"

<div
  data-agility-field="textblob"
  data-agility-html
  className="prose dark:prose-invert"
  dangerouslySetInnerHTML={renderHTML(htmlField)}
/>
```

## 🌍 Internationalization

The site supports multiple locales with clean URL routing:

- **Default Locale**: No path prefix (e.g., `/blog`)
- **Other Locales**: Explicit prefix (e.g., `/fr/blog`, `/es/blog`)

Locales are configured via `AGILITY_LOCALES` environment variable (comma-separated).

## 🎯 Audience & Region Personalization

URL-based personalization system using query parameters:

```typescript
// Client component
const { selectedAudience, setAudience } = useAudienceRegionParams(audiences, regions)

// Server component
const audienceContentID = await getAudienceContentID(searchParams, locale)
```

## 🔄 Caching & Revalidation

- **Automatic Cache Tags**: All CMS fetches include Next.js cache tags
- **Tag Format**: `agility-content-{contentID|referenceName}-{locale}`
- **Revalidation**: 60-second cache + tag-based invalidation
- **Webhook**: `/api/revalidate` receives Agility CMS publish events

## 🔍 AI Search

AI-powered search using Azure OpenAI and Algolia:

- **Endpoint**: `/api/ai/search`
- **Features**: Streaming responses, tool calling, rate limiting
- **Components**: Chat interface, message history, markdown rendering

## 🚢 Deployment

### Pre-build Steps

1. Set all required environment variables
2. Run `npm run prebuild` to rebuild redirect cache
3. Run `npm run build` for production build

### Environment-Specific Notes

- **Preview Mode**: Automatically enabled in development
- **Redirects**: Bloom filter cache must be rebuilt before production
- **Cache Revalidation**: Configure webhook in Agility CMS to point to `/api/revalidate`

## 📚 Documentation

### Quick Reference
- [Cursor Rules](.cursorrules) - Comprehensive development guidelines
- [Claude Context](CLAUDE.md) - Detailed project context
- [Copilot Instructions](.github/copilot-instructions.md) - AI assistant guidelines

### Full Documentation
- **[📖 Documentation Index](docs/README.md)** - Complete documentation guide

**Developer Docs:**
- [Codebase Guide](docs/developer/codebase/README.md) - Project structure and implementation
- [Environment Variables](docs/developer/ENVIRONMENT_VARIABLES.md) - Strongly typed env configuration
- [Multi-Locale Implementation](docs/developer/MULTI_LOCALE_IMPLEMENTATION.md) - i18n setup and routing
- [Audience & Region System](docs/developer/AUDIENCE_REGION_SYSTEM.md) - Personalization system
- [View Transitions](docs/developer/VIEW_TRANSITIONS.md) - Page transition implementation

**Agility CMS Training:**
- [Content Editor Guide](docs/agility-cms/content-editor/README.md) - Creating and managing content
- [Administrator Guide](docs/agility-cms/admin/README.md) - Instance configuration
- [Architect Guide](docs/agility-cms/architect/README.md) - Architecture decisions
- [URL Patterns](docs/agility-cms/AGILITY_CMS_URL_PATTERNS.md) - Agility CMS interface URLs

**External Resources:**
- [Official Agility CMS Docs](https://agilitycms.com/docs) - Agility CMS documentation
- [Official Training Guide](https://agilitycms.com/docs/training-guide) - Generic Agility CMS training

## 🐛 Common Issues

### Preview Mode Not Working
- Ensure `agilitypreviewkey` param is present (not just `AgilityPreview`)
- Check that `AGILITY_API_PREVIEW_KEY` is set correctly

### Redirects Not Working
- Run `npm run prebuild` before building
- Check that `data/redirections-bloom-filter.json` exists

### Components Not Rendering
- Verify component is registered in `src/components/agility-components/index.ts`
- Check that component name matches Agility CMS module name (case-insensitive)

### Cache Not Updating
- Verify webhook is configured in Agility CMS
- Check `/api/revalidate` endpoint is accessible
- Ensure `AGILITY_SECURITY_KEY` matches webhook configuration

## 🤝 Contributing

1. Follow existing code patterns and conventions
2. Register new components in `index.ts`
3. Use TypeScript for all new code
4. Follow Tailwind CSS v4 patterns
5. Add proper TypeScript interfaces for CMS content
6. Test with multiple locales if applicable

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Resources

- [Agility CMS Documentation](https://agilitycms.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS v4](https://tailwindcss.com/docs)
- [React 19](https://react.dev)

---

Built with ❤️ using Agility CMS and Next.js
