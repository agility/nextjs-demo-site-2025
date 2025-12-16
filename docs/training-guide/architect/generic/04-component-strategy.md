# Component Architecture Strategy

This guide covers strategies for designing effective component architectures in Agility CMS, including component types, patterns, and best practices.

## Component Model Design

Components (formerly called "modules") are reusable UI building blocks that:
- Define presentation structure
- Reference content items for data
- Can be used across multiple pages

> **Note**: The Next.js SDK still uses "module" terminology in code (e.g., `allModules`, `module.contentid`). This is legacy naming. In Agility CMS, these are now called "components" and "component models."

## Component Types

### Simple Components

**Characteristics:**
- Direct field mapping
- Minimal data fetching
- Fast rendering

**Example**: Hero component
- Heading, description, image, CTA
- All fields stored directly in component

### Content-Linked Components

**Characteristics:**
- Link to content items or lists
- Display reusable content
- Support filtering and sorting

**Example**: Post Listing component
- Links to Posts content list
- Displays filtered/sorted posts

### Nested Components

**Characteristics:**
- Component has nested content
- Parent references child content list
- Children fetched separately

**Example**: Bento Section
- Component has nested Bento Cards
- Cards fetched using reference name

### Personalized Components

**Characteristics:**
- Audience/region filtering
- Query parameter handling
- Fallback content

**Example**: Personalized Background Hero
- Filters content by audience/region
- Falls back to default content

## Component Design Patterns

### Pattern 1: Simple Content Display

```
Component → Content Item
Example: Hero → Hero content fields
```

**Use When:**
- Content is specific to component
- No relationships needed
- Simple field mapping

### Pattern 2: Content List Display

```
Component → Content List Reference
Example: PostListing → Posts content list
```

**Use When:**
- Displaying collections
- Need filtering/sorting
- Pagination required

### Pattern 3: Nested Content

```
Component → Content Item → Nested Content List
Example: BentoSection → BentoSection content → BentoCards list
```

**Use When:**
- Parent-child relationships
- Complex nested structures
- Dynamic content organization

### Pattern 4: Personalization

```
Component → Filtered Content (by Audience/Region)
Example: PersonalizedBackgroundHero → Hero items filtered by audience
```

**Use When:**
- Audience targeting needed
- Region-specific content
- Multi-variant content

## Component Registration

All components must be registered in the frontend application:

```typescript
// src/components/agility-components/index.ts
const allModules = [
  { name: "ComponentName", module: ComponentName },
  // ... more components
]
```

> **Note**: The variable name `allModules` and property `module` are from the Next.js SDK's legacy terminology. In Agility CMS, these are now called "components" and "component models."

**Critical:** Component names must match Agility CMS definitions (case-insensitive).

## Component Hierarchy

### Design Principles

1. **Start Simple**: Begin with simple components
2. **Build Complex**: Build complex components from simple ones
3. **Maintain Consistency**: Keep component patterns consistent
4. **Reuse Components**: Reuse components across pages

### Component Composition

Combine components to build pages:
- **Page**: Contains multiple components in zones
- **Components**: Display content items
- **Content Items**: Provide data to components

## Best Practices

1. **Focused Components**: Each component should have a single, clear purpose
2. **Reusability**: Design components for reuse
3. **Type Safety**: Use TypeScript for type safety
4. **Performance**: Optimize for performance
5. **Accessibility**: Ensure accessibility
6. **Documentation**: Document component purpose and usage

---

**Next**: [Performance](./05-performance.md) - Performance considerations

