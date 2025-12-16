# Best Practices

This guide covers best practices for developing with Agility CMS, including code organization, performance, security, and maintainability.

## Code Organization

### Project Structure

Organize code logically:

```
src/
├── app/                    # Next.js App Router
├── components/
│   └── agility-components/ # Agility components
├── lib/
│   ├── cms/               # CMS utilities
│   └── types/             # TypeScript types
└── middleware.ts          # Middleware
```

### Component Organization

- Group related components
- Use consistent naming
- Keep components focused
- Extract reusable logic

### Type Definitions

- Define interfaces for all content types
- Use TypeScript for type safety
- Keep types in dedicated files
- Document complex types

## Type Safety

### Always Use TypeScript

```typescript
// ✅ Good
const { fields } = await getContentItem<IPost>({
  contentID: 204,
  languageCode: "en-us"
})

// ❌ Bad
const { fields } = await getContentItem({
  contentID: 204,
  languageCode: "en-us"
})
```

### Define Interfaces

```typescript
interface IPost {
  contentID: number
  fields: {
    heading: string
    slug: string
    content: string
    image: ImageField
  }
}
```

## Performance

### Image Optimization

- Always use `<AgilityPic>` for Agility images
- Set `priority` for above-the-fold images
- Use appropriate `fallbackWidth`
- Leverage CDN delivery

### Caching

- Use appropriate cache durations
- Leverage cache tags for invalidation
- Implement webhook revalidation
- Monitor cache performance

### Code Splitting

- Use dynamic imports for large components
- Split client and server components
- Lazy load non-critical content

## Error Handling

### Graceful Degradation

```typescript
try {
  const { fields } = await getContentItem<IPost>({
    contentID: 204,
    languageCode: "en-us"
  })
} catch (error) {
  // Handle gracefully
  return <div>Content not available</div>
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

## Security

### API Keys

- Never commit API keys to version control
- Use environment variables
- Rotate keys periodically
- Use different keys for different environments

### Preview Mode

- Validate preview keys
- Secure preview endpoints
- Limit preview access
- Log preview usage

### Input Validation

- Validate all user input
- Sanitize HTML content
- Use TypeScript for type safety
- Handle edge cases

## Accessibility

### Semantic HTML

- Use proper HTML elements
- Include alt text for images
- Provide ARIA labels when needed
- Ensure keyboard navigation

### Image Alt Text

```typescript
<AgilityPic
  image={imageField}
  alt={imageField.label || "Descriptive alt text"}
  data-agility-field="image"
/>
```

## SEO

### Meta Tags

- Set page titles and descriptions
- Use proper heading hierarchy
- Include Open Graph tags
- Implement structured data

### Semantic Markup

- Use semantic HTML elements
- Proper heading hierarchy (h1, h2, h3)
- Descriptive link text
- Image alt attributes

## Code Quality

### Consistency

- Follow consistent patterns
- Use consistent naming conventions
- Maintain code style
- Document complex logic

### Reusability

- Extract reusable components
- Create utility functions
- Share common types
- Avoid code duplication

### Testing

- Test components with different content
- Test error cases
- Test edge cases
- Test with different locales

## Documentation

### Code Comments

- Document complex logic
- Explain non-obvious decisions
- Include examples
- Keep comments up to date

### Type Documentation

```typescript
/**
 * Blog post content item
 * @interface IPost
 */
interface IPost {
  /** Post heading/title */
  heading: string
  /** URL-friendly slug */
  slug: string
  /** Post content (HTML) */
  content: string
}
```

## Common Pitfalls

### 1. Not Using TypeScript

Always use TypeScript for type safety.

### 2. Missing Error Handling

Always handle errors gracefully.

### 3. Not Caching

Leverage caching for performance.

### 4. Hardcoding Values

Use environment variables and configuration.

### 5. Not Testing

Test with different content and scenarios.

---

**Next**: See [Instance-Specific Guide](../instance-specific/README.md) for your specific Agility CMS instance

