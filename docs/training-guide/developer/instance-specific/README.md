# Demo Site: Developer Guide

> **Instance**: Demo Site (`13f09fe2-u`)
> **Website**: https://nextjs-demo-site-2025.publishwithagility.com/

This guide provides instance-specific information for developers working with the Demo Site. For generic Agility CMS development concepts, see the [Generic Training Guide](../generic/README.md).

## Demo Site Overview

The Demo Site is a comprehensive Next.js application powered by Agility CMS, showcasing modern headless CMS patterns, AI-powered search, internationalization, and advanced caching.

### Technology Stack

- **Framework**: Next.js 15.5.3 with App Router
- **React**: 19.1.0
- **TypeScript**: Full type safety
- **Styling**: Tailwind CSS v4
- **CMS**: Agility CMS (@agility/nextjs 15.0.7)
- **Animations**: Motion (Framer Motion alternative)
- **AI**: Azure OpenAI + Algolia integration
- **Analytics**: PostHog integration

### Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── [locale]/          # Internationalized routes
│   └── api/               # API routes (ai, preview, revalidate)
├── components/
│   ├── agility-components/ # Agility CMS components (20 components)
│   ├── header/            # Header components
│   ├── footer/            # Footer components
│   ├── ai-agent/          # AI search components
│   └── ...
├── lib/
│   ├── cms/               # CMS API functions
│   ├── cms-content/        # Content processing utilities
│   ├── ai/                # AI integration
│   ├── posthog/           # Analytics integration
│   └── types/             # TypeScript definitions
└── middleware.ts          # Next.js middleware
```

## Quick Links

- [Project Structure](./project-structure.md) - Codebase organization
- [Content Models](./content-models.md) - Content model implementations
- [Components](./components.md) - Component implementations
- [API Routes](./api-routes.md) - Custom API routes
- [Deployment](./deployment.md) - Deployment configuration

## Getting Started

1. **Review Generic Training**: Start with the [Generic Training Guide](../generic/README.md)
2. **Understand Project Structure**: Review [Project Structure](./project-structure.md)
3. **Learn Content Models**: See [Content Models](./content-models.md)
4. **Study Components**: Review [Components](./components.md)

---

**Next**: [Project Structure](./project-structure.md) - Codebase organization

