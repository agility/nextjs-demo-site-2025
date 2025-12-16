# API Basics

This guide covers the fundamentals of working with Agility CMS APIs, including authentication, endpoints, and common patterns.

## API Overview

Agility CMS provides several APIs for different use cases:

- **Content Fetch API**: Retrieve published content
- **Content Management API**: Create, update, and manage content programmatically
- **Content Sync API**: Bulk content synchronization
- **GraphQL API**: Query content using GraphQL

## Content Fetch API

### Base URL

```
https://api.aglty.io/{instance-guid}/fetch
```

### Authentication

Include your API key in the request header:

```bash
APIKey: your-fetch-key
```

### Common Endpoints

#### Get Page

```bash
GET /{instance-guid}/fetch/{locale}/page/{pageID}
```

**Example:**
```bash
curl -X GET "https://api.aglty.io/13f09fe2-u/fetch/en-us/page/2" \
  -H "accept: application/json" \
  -H "APIKey: your-fetch-key"
```

#### Get Content List

```bash
GET /{instance-guid}/fetch/{locale}/list/{referenceName}
```

**Example:**
```bash
curl -X GET "https://api.aglty.io/13f09fe2-u/fetch/en-us/list/posts" \
  -H "accept: application/json" \
  -H "APIKey: your-fetch-key"
```

#### Get Content Item

```bash
GET /{instance-guid}/fetch/{locale}/item/{contentID}
```

**Example:**
```bash
curl -X GET "https://api.aglty.io/13f09fe2-u/fetch/en-us/item/204" \
  -H "accept: application/json" \
  -H "APIKey: your-fetch-key"
```

### Query Parameters

#### Content Link Depth

Control how deeply linked content is populated:

```bash
?contentLinkDepth=1  # Populate first level of linked content
?contentLinkDepth=2  # Populate two levels deep
```

#### Filtering

Filter content lists:

```bash
?filter=fields.categoryID:eq:5
```

#### Sorting

Sort content lists:

```bash
?sort=fields.postDate:desc
```

#### Pagination

Paginate content lists:

```bash
?take=10&skip=0
```

## Using the SDK

### Get Content Item

```typescript
import { getContentItem } from "@/lib/cms/getContentItem"

const { fields, contentID } = await getContentItem<IPost>({
  contentID: 204,
  languageCode: "en-us"
})
```

### Get Content List

```typescript
import { getContentList } from "@/lib/cms/getContentList"

const { items, totalCount } = await getContentList<IPost>({
  referenceName: "posts",
  languageCode: "en-us",
  take: 10,
  skip: 0
})
```

### Get Page

```typescript
import { getAgilityPage } from "@/lib/cms/getAgilityPage"

const page = await getAgilityPage({
  slug: ["blog", "my-post"],
  languageCode: "en-us",
  channelName: "website",
  isPreview: false
})
```

## Response Structure

### Content Item Response

```json
{
  "contentID": 204,
  "properties": {
    "state": 2,
    "modified": "2025-12-08T15:12:10.883",
    "versionID": 1287,
    "referenceName": "posts",
    "definitionName": "Post"
  },
  "fields": {
    "heading": "My Post Title",
    "content": "<p>Post content...</p>",
    "image": {
      "url": "https://cdn.agilitycms.com/...",
      "label": "Image label"
    }
  }
}
```

### Content List Response

```json
{
  "items": [
    {
      "contentID": 204,
      "fields": { ... }
    }
  ],
  "totalCount": 10
}
```

### Page Response

```json
{
  "pageID": 2,
  "name": "home",
  "title": "Home",
  "zones": {
    "main-content-zone": [
      {
        "module": "Hero",
        "item": {
          "contentID": 123,
          "fields": { ... }
        }
      }
    ]
  }
}
```

## Error Handling

### Common Errors

**401 Unauthorized:**
- Invalid or missing API key
- Check API key in request header

**404 Not Found:**
- Content item doesn't exist
- Wrong content ID or reference name
- Content not published

**400 Bad Request:**
- Invalid parameters
- Check query parameters

### Error Handling Pattern

```typescript
try {
  const { fields } = await getContentItem({
    contentID: 123,
    languageCode: "en-us"
  })
} catch (error) {
  if (error.status === 404) {
    // Handle not found
  } else if (error.status === 401) {
    // Handle unauthorized
  } else {
    // Handle other errors
  }
}
```

## Best Practices

1. **Use SDKs**: Prefer SDKs over direct API calls
2. **Type Safety**: Use TypeScript for type-safe responses
3. **Error Handling**: Always handle errors gracefully
4. **Caching**: Leverage built-in caching strategies
5. **Rate Limiting**: Be mindful of API rate limits

---

**Next**: [Component Development](./05-component-development.md) - Building components

