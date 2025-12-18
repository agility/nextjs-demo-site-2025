# Audience & Region Query Parameter System

This system allows you to store and access audience and region selections through URL query parameters throughout your Next.js application.

> **Note**: The current query parameter approach is implemented for **testing purposes**. In production, a system would detect the user's region and audience at the edge (via middleware or edge functions) and then rewrite to the appropriate version of the site using query strings automatically, rather than requiring manual query parameter manipulation.

## How it works

The audience and region selections are stored as query parameters in the URL:
- `?audience=Enterprise&region=North%20America`
- These parameters persist across page navigation
- Any component can read and update these values

## Usage

### 1. In Client Components

Use the `useAudienceRegionParams` hook:

```tsx
"use client"

import { useAudienceRegionParams } from '@/lib/hooks/useAudienceRegionParams'

function MyComponent({ audiences, regions }) {
  const {
    selectedAudience,
    selectedRegion,
    setAudience,
    setRegion,
    clearAll,
    hasSelection,
    displayName
  } = useAudienceRegionParams(audiences, regions)

  return (
    <div>
      {hasSelection && <p>Current context: {displayName}</p>}
      <button onClick={() => setAudience(null)}>Clear Audience</button>
      <button onClick={clearAll}>Clear All</button>
    </div>
  )
}
```

### 2. In Server Components

Use the server-side utility function:

```tsx
import { getAudienceRegionFromPage } from '@/lib/utils/audienceRegionUtils'

export default function MyPage({
  searchParams
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const { selectedAudience, selectedRegion, hasSelection, displayName } =
    getAudienceRegionFromPage(searchParams, audiences, regions)

  return (
    <div>
      {hasSelection && <div>Viewing as: {displayName}</div>}
      <MyContent audienceFilter={selectedAudience} regionFilter={selectedRegion} />
    </div>
  )
}
```

### 2a. In Server Components (with ContentIDs)

When you need access to contentIDs for filtering or API calls:

```tsx
import {
  getAudienceRegionWithContentIDFromPage,
  getAudienceListingWithContentID,
  getRegionListingWithContentID
} from '@/lib/utils/audienceRegionUtils'

export default async function MyPage({
  searchParams
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  // Get audiences and regions with contentIDs
// Quick Example: Get audiences and regions with contentID
import {
  getAudienceListingWithContentID,
  getRegionListingWithContentID
} from '@/lib/cms-content/getAudienceListingWithContentID'

export async function ExampleComponent({ locale }: { locale: string }) {
  const audiencesWithContentID = await getAudienceListingWithContentID({ locale })
  const regionsWithContentID = await getRegionListingWithContentID({ locale })  const {
    selectedAudience,
    selectedRegion,
    audienceContentID,
    regionContentID,
    hasSelection
  } = getAudienceRegionWithContentIDFromPage(
    searchParams,
    audiencesWithContentID,
    regionsWithContentID
  )

  // Use contentIDs for content filtering
  const filteredContent = await getContentWithAudienceRegionFilter({
    audienceContentID,
    regionContentID
  })

  return (
    <div>
      {hasSelection && <div>Filtered for: {displayName}</div>}
      <ContentList items={filteredContent} />
    </div>
  )
}
```### 3. Conditional Content Rendering

#### Client-side:
```tsx
import { ConditionalContent } from '@/components/AudienceRegionUtils'

<ConditionalContent
  audiences={audiences}
  regions={regions}
  allowedAudiences={['Enterprise', 'Developer']}
  allowedRegions={['North America']}
>
  <div>This content only shows for Enterprise/Developer audiences in North America</div>
</ConditionalContent>
```

#### Server-side:
```tsx
import { shouldShowContentForAudienceRegion } from '@/lib/utils/audienceRegionUtils'

const shouldShow = shouldShowContentForAudienceRegion(
  selectedAudience,
  selectedRegion,
  ['Enterprise'], // allowed audiences
  ['North America', 'Europe'] // allowed regions
)

return (
  <div>
    {shouldShow && <SpecialContent />}
  </div>
)
```

### 4. Creating Links with Context

```tsx
import { createUrlWithAudienceRegion } from '@/lib/utils/audienceRegionUtils'

const linkUrl = createUrlWithAudienceRegion(
  '/products',
  selectedAudience?.name,
  selectedRegion?.name,
  { category: 'software' } // additional params
)

<Link href={linkUrl}>View Products</Link>
```

### 5. Working with ContentIDs

When you need to access the Agility CMS contentID for audiences or regions (useful for content filtering, API calls, etc.):

```tsx
import {
  getAudienceContentIDByName,
  getRegionContentIDByName,
  getSelectedContentIDs
} from '@/lib/utils/audienceRegionUtils'

// Get individual contentIDs
const audienceContentID = getAudienceContentIDByName('Enterprise', audiencesWithContentID)
const regionContentID = getRegionContentIDByName('North America', regionsWithContentID)

// Get both at once from current selection
const { audienceContentID, regionContentID } = getSelectedContentIDs(
  selectedAudienceName,
  selectedRegionName,
  audiencesWithContentID,
  regionsWithContentID
)

// Use contentIDs for content filtering
if (audienceContentID || regionContentID) {
  const filteredContent = await getContentList({
    referenceName: "products",
    filter: {
      audienceContentID,
      regionContentID
    }
  })
}
```

To get audiences/regions with contentIDs, use the enhanced listing methods:

```tsx
import {
  getAudienceListingWithContentID,
  getRegionListingWithContentID
} from '@/lib/cms-content/getAudienceListingWithContentID'

const audiencesWithContentID = await getAudienceListingWithContentID({
  locale: 'en-us'
})

const regionsWithContentID = await getRegionListingWithContentID({
  locale: 'en-us'
})
```

## Available Hooks and Utilities

### Client-side Hook: `useAudienceRegionParams`

```tsx
const {
  // Current selections
  selectedAudience,
  selectedRegion,
  selectedAudienceName,
  selectedRegionName,

  // Actions
  setAudience,
  setRegion,
  updateParams,
  clearAll,
  clearAudience,
  clearRegion,

  // Computed values
  hasSelection,
  displayName,

  // Passed-through data
  audiences,
  regions,
} = useAudienceRegionParams(audiences, regions)
```

### Server-side Utilities

- `getAudienceRegionFromPage()` - Extract values from page searchParams
- `getAudienceRegionWithContentIDFromPage()` - Extract values including contentIDs
- `shouldShowContentForAudienceRegion()` - Check if content should show
- `createUrlWithAudienceRegion()` - Generate URLs with context
- `getAudienceContentIDByName()` - Get audience contentID by name
- `getRegionContentIDByName()` - Get region contentID by name
- `getSelectedContentIDs()` - Get both audience and region contentIDs
- `transformContentItemsWithContentID()` - Transform ContentItems to include contentID

## Components

### `AudienceRegionIndicator`
Shows current selection with a clear button.

### `ConditionalContent`
Wrapper component that conditionally renders children based on audience/region.

## Preview Bar Integration

The preview bar in `src/components/preview-bar.tsx` manages the query parameters and provides the UI for selecting audience and region. It automatically:

- Reads current selections from URL
- Updates URL when selections change
- Shows visual indication when context is active
- Provides clear functionality

## Benefits

1. **URL-based state**: Selections persist across page reloads and navigation
2. **Shareable URLs**: Users can share links with specific audience/region context
3. **Server and client compatibility**: Works in both Server and Client Components
4. **No additional dependencies**: Uses only Next.js built-in functionality
5. **Clean separation**: Query parameter logic is abstracted into reusable hooks/utilities

## Production Implementation

In a production environment, the system would work differently:

- **Edge Detection**: User's region and audience would be detected at the edge (middleware or edge functions) based on:
  - IP geolocation for region detection
  - User profile data, cookies, or authentication context for audience detection
- **Automatic Rewriting**: The edge layer would automatically rewrite requests to include the appropriate query parameters
- **Transparent to Users**: Users wouldn't need to manually add query parameters; the system would handle it automatically
- **Testing**: The current query parameter approach allows developers and content editors to easily test different audience/region combinations by manually adding parameters to URLs