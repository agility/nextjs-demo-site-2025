# Multi-Locale Implementation in Next.js Demo Site

This Next.js site implements multi-locale support through a combination of URL-based routing, environment configuration, and middleware processing. Here's how it works:

## 1. Configuration
**[`src/lib/i18n/config.ts`](https://github.com/agility/nextjs-demo-site-2025/blob/main/src/lib/i18n/config.ts)**
- Locales are defined via the `AGILITY_LOCALES` environment variable (e.g., `"en-us,fr"`)
- First locale is the **default locale** (e.g., `en-us`)
- Provides utility functions: `isValidLocale()`, `getLocaleFromPathname()`, `removeLocaleFromPathname()`

## 2. Route Structure
**[`src/app/[locale]/`](https://github.com/agility/nextjs-demo-site-2025/blob/main/src/app/[locale]/)**
- Uses Next.js **dynamic route segment** `[locale]`
- Default locale URLs: `/about`, `/blog` (no prefix)
- Non-default locale URLs: `/fr/about`, `/fr/blog` (with prefix)
- All pages live under [`src/app/[locale]/[...slug]/page.tsx`](https://github.com/agility/nextjs-demo-site-2025/blob/main/src/app/[locale]/[...slug]/page.tsx)

## 3. Middleware Processing
**[`src/middleware.ts`](https://github.com/agility/nextjs-demo-site-2025/blob/main/src/middleware.ts)**

The middleware handles locale routing in this order:

**Step 1:** Preview mode detection (Agility CMS)  
**Step 2:** Redirect checking  
**Step 3:** `?lang=xx` query parameter handling
- If `?lang=fr` is passed, redirects to `/fr/path` (or root path for default locale)
- Removes `lang` param from URL after redirect

**Step 4:** Search params encoding  
- Converts `?q=search` → `/path/~~~q=search~~~` for static optimization

**Step 5:** Locale-based rewriting
- If URL has no locale prefix, **rewrites** (not redirects) to `/{defaultLocale}/path`
- This keeps URLs clean while routing internally to localized pages

## 4. Static Generation
**[`src/app/[locale]/[...slug]/page.tsx`](https://github.com/agility/nextjs-demo-site-2025/blob/main/src/app/[locale]/[...slug]/page.tsx)**

`generateStaticParams()` function:
- Loops through all configured locales
- Fetches sitemap from Agility CMS for each locale
- Generates static paths like `{ locale: "en-us", slug: ["about"] }` and `{ locale: "fr", slug: ["about"] }`
- Pre-renders all pages at build time

## 5. URL Localization Helpers
**[`src/lib/i18n/localizeUrl.ts`](https://github.com/agility/nextjs-demo-site-2025/blob/main/src/lib/i18n/localizeUrl.ts)**

Helper functions for generating locale-specific URLs:
- `localizeUrl()`: Returns `/path` for default locale, `/fr/path` for others
- `localizeUrlField()`: Works with Agility's URLField type
- Used throughout components for navigation links

## 6. Language Switcher
**[`src/components/footer/language-toggle.tsx`](https://github.com/agility/nextjs-demo-site-2025/blob/main/src/components/footer/language-toggle.tsx)**

Client-side component that:
- Shows current language with flag emoji
- Dropdown menu for other locales
- On switch: strips current locale, adds new locale prefix, navigates to equivalent page
- Example: `/fr/about` → `/about` (switching to default locale)

## 7. Layout Integration
**[`src/app/[locale]/layout.tsx`](https://github.com/agility/nextjs-demo-site-2025/blob/main/src/app/[locale]/layout.tsx)**
- Receives `locale` from route params
- Passes locale to all data fetching functions
- Footer receives `locale`, `locales`, and `defaultLocale` props for language switcher

## 8. CMS Context
**[`src/lib/cms/getAgilityContext.ts`](https://github.com/agility/nextjs-demo-site-2025/blob/main/src/lib/cms/getAgilityContext.ts)**
- Validates locale from route params
- Falls back to default locale if invalid
- Passes validated locale to all Agility CMS API calls

---

## Key Files Reference

| File | Purpose |
|------|---------|
| [`src/lib/i18n/config.ts`](https://github.com/agility/nextjs-demo-site-2025/blob/main/src/lib/i18n/config.ts) | Locale configuration and utilities |
| [`src/middleware.ts`](https://github.com/agility/nextjs-demo-site-2025/blob/main/src/middleware.ts) | URL routing and locale rewriting |
| [`src/app/[locale]/[...slug]/page.tsx`](https://github.com/agility/nextjs-demo-site-2025/blob/main/src/app/[locale]/[...slug]/page.tsx) | Dynamic page rendering and static generation |
| [`src/components/footer/language-toggle.tsx`](https://github.com/agility/nextjs-demo-site-2025/blob/main/src/components/footer/language-toggle.tsx) | User-facing language switcher |
| [`src/lib/i18n/localizeUrl.ts`](https://github.com/agility/nextjs-demo-site-2025/blob/main/src/lib/i18n/localizeUrl.ts) | URL generation helpers |
| [`src/lib/cms/getAgilityContext.ts`](https://github.com/agility/nextjs-demo-site-2025/blob/main/src/lib/cms/getAgilityContext.ts) | CMS context with locale validation |

## Flow Diagram

```
User Request → Middleware
                  ↓
            Check Preview Mode
                  ↓
            Check Redirects
                  ↓
            Handle ?lang= param
                  ↓
            Encode Search Params
                  ↓
            Rewrite to /[locale]/path
                  ↓
            Next.js Router
                  ↓
            [locale]/[...slug]/page.tsx
                  ↓
            Fetch CMS Content (with locale)
                  ↓
            Render Page
```

## Environment Setup

To add additional locales, update your `.env.local`:

```bash
AGILITY_LOCALES=en-us,fr,es,de
```

The first locale in the list will be the default locale (URLs without prefix).
