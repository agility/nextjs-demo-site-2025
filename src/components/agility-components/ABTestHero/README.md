# AB Test Hero Component (PPR-Ready)

This component provides server-side A/B testing functionality with Partial Prerendering (PPR) support using PostHog feature flags and Agility CMS content management.

## Structure

- `ABTestHero.tsx` - Main component with Suspense boundary for PPR
- `ABTestHeroDynamic.tsx` - Dynamic component that evaluates feature flags server-side
- `ABTestHeroClient.tsx` - Client component that renders the selected variant
- `ABTestHeroLoading.tsx` - Loading component that serves as the static shell
- `index.ts` - Export file for easier imports
- `../../lib/posthog/` - PostHog utilities (modular):
  - `client.ts` - PostHog client initialization
  - `feature-flags.ts` - Server-side feature flag evaluation
  - `tracking.ts` - Event tracking functions
  - `get-user-id.ts` - User identification utilities
  - `get-cookie-name.ts` - PostHog cookie name generation
  - `index.ts` - Centralized exports

## PPR Benefits for AB Testing

- **Static Shell** - Layout and structure prerendered for fast initial load
- **Dynamic Content** - AB testing logic streamed in after static shell
- **No Layout Shift** - Skeleton maintains layout while dynamic content loads
- **Better Performance** - Faster Time to First Byte (TTFB) and Largest Contentful Paint (LCP)
- **SEO Optimized** - Search engines get immediate content structure

## Content Model Setup in Agility CMS

### Main Hero Content Model
```
- experimentKey (Text) - The PostHog feature flag key
- heading (Text)
- description (Text)
- callToAction (URL)
- image (Image)
- imagePosition (Text) - "left" or "right"
- variants (Nested Linked List) - Reference to hero variant content items
```

### Hero Variant Content Model
```
- variant (Text) - The variant identifier (e.g., "variant-a", "variant-b")
- heading (Text)
- description (Text)
- callToAction (URL)
- image (Image)
- imagePosition (Text) - "left" or "right"
```

## PostHog Setup

### 1. Environment Variables
Add these to your `.env.local`:
```
NEXT_PUBLIC_POSTHOG_KEY=your_posthog_project_key
NEXT_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com
```

### 2. PostHog Server Setup
The component uses PostHog's Node.js client for server-side feature flag evaluation:
- Feature flags are evaluated on the server using user identification
- Client-side PostHog is used only for analytics tracking
- No provider setup needed - uses direct PostHog client initialization

### 3. User Identification
The component generates stable user IDs for anonymous users based on:
- IP address and User-Agent for consistent experience
- You can customize `getUserId()` to use your authentication system

### 4. Feature Flag Configuration
In PostHog:
1. Go to Feature Flags
2. Create a new feature flag with the key matching your `experimentKey`
3. Set up variants (e.g., "control", "variant-a", "variant-b")
4. Configure rollout percentages
5. Enable the flag

## Usage

### In Agility CMS Component Registration
```typescript
import { ABTestHero } from "@/components/agility-components/ABTestHero"

// Register the component
const AGILITY_COMPONENTS = {
  "ABTestHero": ABTestHero,
  // ... other components
}
```

### Content Setup
1. Create your main hero content with an `experimentKey` (e.g., "hero-cta-test")
2. Create variant content items with different content
3. Link variants to the main hero via the variants field
4. Set up corresponding feature flag in PostHog

## Features

- **PPR-Ready Architecture** with Suspense boundaries for optimal performance
- **Server-side feature flag evaluation** with PostHog Node.js client
- **Static shell prerendering** for immediate layout and structure
- **Streaming dynamic content** for AB test variant selection
- **Client-side analytics tracking** for experiment exposure and interactions
- **Zero layout shift** - skeleton maintains structure during loading
- **Responsive design** with mobile-first approach

## Enabling Full PPR

To enable full Partial Prerendering (when available in stable Next.js):

```javascript
// next.config.mjs
const nextConfig = {
  experimental: {
    ppr: true, // Enable when using Next.js canary
  },
}
```

The current implementation provides PPR-like benefits using Suspense boundaries and is ready for full PPR when it becomes stable.

## Analytics Events

The component automatically tracks:
- `$feature_flag_called` - When a variant is selected
- `ab_test_cta_click` - When the CTA button is clicked

## Example PostHog Feature Flag Setup

```json
{
  "key": "hero-cta-test",
  "name": "Hero CTA Test",
  "variants": [
    {
      "key": "control",
      "name": "Control",
      "rollout_percentage": 50
    },
    {
      "key": "variant-a",
      "name": "Variant A",
      "rollout_percentage": 25
    },
    {
      "key": "variant-b",
      "name": "Variant B",
      "rollout_percentage": 25
    }
  ]
}
```

## Data Attributes

The component adds these data attributes for tracking:
- `data-agility-component` - Agility content ID
- `data-experiment-key` - PostHog experiment key
- `data-variant` - Selected variant identifier

## Error Handling

- If variants fail to load, only the control variant is shown
- If PostHog is unavailable, defaults to the control variant
- Console warnings for debugging issues
