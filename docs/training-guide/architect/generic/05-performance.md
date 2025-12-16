# Performance Considerations

This guide covers performance optimization strategies for Agility CMS implementations, including caching, CDN usage, and optimization techniques.

## Performance Architecture

### Multi-Layer Caching

1. **CDN Cache**: Assets cached at edge locations
2. **API Cache**: API responses cached
3. **Application Cache**: Next.js cache tags and revalidation
4. **Browser Cache**: Client-side caching

### Optimization Strategies

1. **CDN Delivery**: Assets via CDN
2. **Image Optimization**: Automatic resizing and formats
3. **Caching**: Multi-layer caching strategy
4. **Static Generation**: Pre-render pages at build time
5. **Incremental Regeneration**: Update pages on-demand

## Caching Strategy

### Cache Tags

Use cache tags for granular invalidation:

```typescript
tags: [`agility-content-${contentID}-${locale}`]
```

### Cache Patterns

**Content Items:**
```
agility-content-{contentID}-{locale}
```

**Content Lists:**
```
agility-content-{referenceName}-{locale}
```

**Pages:**
```
agility-page-{pageID}-{locale}
```

**Sitemaps:**
```
agility-sitemap-flat-{locale}
agility-sitemap-nested-{locale}
```

### Revalidation

**Time-Based:**
- Revalidate after specific time (60 seconds default)
- Balance freshness with performance

**On-Demand:**
- Webhook-triggered revalidation
- Immediate updates when content changes

## CDN Strategy

### Asset Delivery

- **Images**: Delivered via CDN
- **Optimization**: Automatic resizing and formats
- **Performance**: Global edge locations

### Image Optimization

- **Automatic Resizing**: CDN handles resizing
- **Format Optimization**: WebP, AVIF support
- **Lazy Loading**: Load images on demand

## Static Generation

### Pre-rendering

Generate static pages at build time:

```typescript
export async function generateStaticParams() {
  const sitemap = await getSitemapFlat({ ... })
  return sitemap.map(page => ({ slug: page.path }))
}
```

### Incremental Regeneration

Update pages on-demand:

```typescript
export const revalidate = 60 // Revalidate every 60 seconds
```

## Query Optimization

### Efficient Queries

- **Limit Results**: Always limit large lists
- **Use Filters**: Filter at API level
- **Pagination**: Implement pagination
- **Selective Fields**: Fetch only needed fields

### Parallel Fetching

Fetch multiple items in parallel:

```typescript
const [page, posts, settings] = await Promise.all([
  getAgilityPage({ ... }),
  getContentList({ ... }),
  getContentItem({ ... })
])
```

## Performance Best Practices

1. **Use Appropriate Cache Duration**: Balance freshness with performance
2. **Leverage Cache Tags**: Use specific cache tags for granular invalidation
3. **Optimize Images**: Use CDN and appropriate formats
4. **Limit Queries**: Always limit large content lists
5. **Parallel Fetching**: Fetch multiple items in parallel when possible
6. **Static Generation**: Pre-render pages when possible
7. **Monitor Performance**: Track cache hit rates and response times

---

**Next**: [Scalability](./06-scalability.md) - Scaling strategies

