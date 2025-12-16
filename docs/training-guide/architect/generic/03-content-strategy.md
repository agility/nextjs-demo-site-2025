# Content Modeling Strategy

This guide covers strategies for designing effective content models in Agility CMS, including when to use different model types and how to structure relationships.

## Content Model Types

Agility CMS supports two content model types:

### Content Items

**Characteristics:**
- Single, standalone instances
- Best for: Authors, Categories, Global Settings
- Managed as individual items

**Use When:**
- Content is unique (one instance)
- Content doesn't need to be queried as a list
- Content is referenced by other content

### Content Lists

**Characteristics:**
- Collections of related items
- Best for: Blog Posts, Testimonials, Pricing Tiers
- Support querying, filtering, pagination

**Use When:**
- Multiple items with same structure
- Need to query/filter items
- Items form a logical collection

## Content Modeling Decision Framework

### Step 1: Identify Reusability

**Ask**: Will this content be used in multiple places?

- **Yes → Content Model**: Create reusable content model
- **No → Component Field**: Store directly in component

**Example:**
- Author information → Content Model (used in posts, team pages, author pages)
- Hero heading → Component Field (specific to one page)

### Step 2: Consider Relationships

**Ask**: Does this content relate to other content?

- **Yes → Linked Content Fields**: Use linked content fields
- **No → Standalone**: Keep content independent

**Example:**
- Post → Author (many-to-one)
- Post → Category (many-to-one)
- Post → Tags (many-to-many)

### Step 3: Evaluate Querying Needs

**Ask**: Do you need to query/filter this content?

- **Yes → Content List**: Use content list for querying
- **No → Content Item**: Use content item for single instance

**Example:**
- Blog Posts → Content List (need to query by category, date, etc.)
- Global Settings → Content Item (single instance, no querying)

### Step 4: Plan for Personalization

**Ask**: Does this content need personalization?

- **Yes → Audience/Region Fields**: Add personalization fields
- **No → Standard Content**: Use standard content model

**Example:**
- Hero content → Add audience/region targeting
- Pricing tiers → Add region-specific pricing

## Field Type Selection

### Text Fields

**Use For:**
- Headings, titles, labels
- Short text content
- Single-line input

### Rich Text Fields

**Use For:**
- Long-form content
- Formatted text
- HTML content

### Image Fields

**Use For:**
- Photos, graphics, icons
- Background images
- Featured images

### Linked Content Fields

**Use For:**
- Relationships between content
- One-to-one, one-to-many, many-to-many
- Reusable content references

### Date/Time Fields

**Use For:**
- Publication dates
- Event dates
- Timestamps

### Number Fields

**Use For:**
- Prices, quantities
- Ratings, scores
- Configuration values

### Boolean Fields

**Use For:**
- Toggle options
- Feature flags
- Yes/no settings

## Relationship Design

### One-to-One

**Pattern**: One content item links to one other item

**Example**: Post → Author
- One post has one author
- Author can have multiple posts (reverse: many-to-one)

**Implementation:**
```typescript
interface IPost {
  author: ContentItem<IAuthor>
}
```

### One-to-Many

**Pattern**: One content item links to multiple items

**Example**: Post → Tags
- One post has many tags
- Tags can be on multiple posts (reverse: many-to-many)

**Implementation:**
```typescript
interface IPost {
  tags: ContentItem<ITag>[]
}
```

### Many-to-Many

**Pattern**: Multiple items link to multiple items

**Example**: Post ↔ Tags
- Posts can have multiple tags
- Tags can be on multiple posts

**Implementation:**
```typescript
interface IPost {
  tags: ContentItem<ITag>[]
}

interface ITag {
  // Tags reference posts via reverse relationship
}
```

### Parent-Child (Nested)

**Pattern**: Parent component references child content list

**Example**: BentoSection → BentoCards
- Parent component has reference name
- Children fetched separately

**Implementation:**
```typescript
interface IBentoSection {
  bentoCards: { referencename: string }
}

// Fetch children separately
const cards = await getContentList({
  referenceName: referencename
})
```

## Content Organization

### Hierarchical Organization

Organize content hierarchically:
- **Categories**: Top-level organization
- **Tags**: Secondary organization
- **Content Items**: Individual pieces

### Flat Organization

Organize content flatly:
- **Content Lists**: All items at same level
- **Filtering**: Use filters to organize
- **Sorting**: Use sorting to order

## Best Practices

1. **Start with Content Models**: Design content models before components
2. **Identify Reusability**: Determine what should be reusable
3. **Design Relationships**: Plan how content relates
4. **Consider Queries**: Design for efficient querying
5. **Plan for Growth**: Design models that scale
6. **Document Models**: Document purpose and relationships
7. **Test Models**: Test with real content before building components

---

**Next**: [Component Strategy](./04-component-strategy.md) - Component architecture

