# Content Fetching Patterns

This guide covers advanced patterns for fetching content from Agility CMS, including filtering, sorting, pagination, and nested content.

## Basic Fetching

### Single Content Item

```typescript
import { getContentItem } from "@/lib/cms/getContentItem"

const { fields, contentID } = await getContentItem<IPost>({
  contentID: 204,
  languageCode: "en-us"
})
```

### Content List

```typescript
import { getContentList } from "@/lib/cms/getContentList"

const { items, totalCount } = await getContentList<IPost>({
  referenceName: "posts",
  languageCode: "en-us"
})
```

## Filtering

### Filter by Field

```typescript
const { items } = await getContentList<IPost>({
  referenceName: "posts",
  languageCode: "en-us",
  filter: "fields.categoryID:eq:5"
})
```

### Filter Operators

- `eq`: Equals
- `ne`: Not equals
- `gt`: Greater than
- `gte`: Greater than or equal
- `lt`: Less than
- `lte`: Less than or equal
- `in`: In array
- `contains`: Contains string

### Multiple Filters

```typescript
filter: "fields.categoryID:eq:5:and:fields.published:eq:true"
```

## Sorting

### Sort by Field

```typescript
const { items } = await getContentList<IPost>({
  referenceName: "posts",
  languageCode: "en-us",
  sort: "fields.postDate:desc"
})
```

### Sort Directions

- `asc`: Ascending
- `desc`: Descending

### Multiple Sort Fields

```typescript
sort: "fields.categoryID:asc,fields.postDate:desc"
```

## Pagination

### Basic Pagination

```typescript
const { items, totalCount } = await getContentList<IPost>({
  referenceName: "posts",
  languageCode: "en-us",
  take: 10,
  skip: 0
})
```

### Calculate Pages

```typescript
const pageSize = 10
const currentPage = 1
const skip = (currentPage - 1) * pageSize

const { items, totalCount } = await getContentList<IPost>({
  referenceName: "posts",
  languageCode: "en-us",
  take: pageSize,
  skip
})

const totalPages = Math.ceil(totalCount / pageSize)
```

## Nested Content

### Grid/Link Fields

Grid/link fields require separate fetching:

```typescript
// 1. Get parent with nested reference
const { fields: { bentoCards: { referencename } } } =
  await getContentItem<IBentoSection>({
    contentID: module.contentid,
    languageCode,
  })

// 2. Fetch nested collection
const bentoCards = await getContentList<IBentoCard>({
  referenceName: referencename, // Use referencename
  languageCode,
  take: 20
})
```

### Linked Content Fields

Linked content fields are auto-populated by the SDK:

```typescript
const { fields } = await getContentItem<IPost>({
  contentID: 204,
  languageCode: "en-us"
})

// Author is automatically populated
const authorName = fields.author.fields.name
```

## Content Link Depth

### Control Depth

Use `contentLinkDepth` to control how deeply linked content is populated:

```typescript
// API call with depth
const response = await fetch(
  `https://api.aglty.io/${guid}/fetch/en-us/item/204?contentLinkDepth=2`,
  { headers: { APIKey: key } }
)
```

### SDK Depth

The SDK automatically handles depth based on field types:
- Search list box/dropdown/checkbox: Auto-populated
- Grid/link fields: Require separate fetch

## Parallel Fetching

### Fetch Multiple Items

```typescript
const [page, posts, settings] = await Promise.all([
  getAgilityPage({ slug: ["home"], languageCode: "en-us" }),
  getContentList<IPost>({ referenceName: "posts", languageCode: "en-us" }),
  getContentItem<IGlobalSettings>({ contentID: 1, languageCode: "en-us" })
])
```

## Error Handling

### Handle Missing Content

```typescript
try {
  const { fields } = await getContentItem<IPost>({
    contentID: 999,
    languageCode: "en-us"
  })
} catch (error) {
  if (error.status === 404) {
    // Handle not found
    return <div>Post not found</div>
  }
  throw error
}
```

### Fallback Content

```typescript
const { fields } = await getContentItem<IPost>({
  contentID: 204,
  languageCode: "en-us"
}).catch(() => ({
  fields: {
    heading: "Default Heading",
    content: "Default content"
  }
}))
```

## Performance Optimization

### Limit Results

Always limit large lists:

```typescript
const { items } = await getContentList<IPost>({
  referenceName: "posts",
  languageCode: "en-us",
  take: 10 // Limit results
})
```

### Use Caching

Leverage built-in caching:

```typescript
// Caching is automatic with getContentItem/getContentList
// Cache tags: agility-content-{id}-{locale}
// Revalidation: 60 seconds default
```

### Parallel vs Sequential

Use parallel fetching when possible:

```typescript
// ✅ Parallel (faster)
const [item1, item2] = await Promise.all([
  getContentItem({ contentID: 1, languageCode: "en-us" }),
  getContentItem({ contentID: 2, languageCode: "en-us" })
])

// ❌ Sequential (slower)
const item1 = await getContentItem({ contentID: 1, languageCode: "en-us" })
const item2 = await getContentItem({ contentID: 2, languageCode: "en-us" })
```

---

**Next**: [Caching](./07-caching.md) - Caching strategies

