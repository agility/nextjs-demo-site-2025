# Demo Site: Content Architecture

This guide documents the content model architecture of the Demo Site, including all 24 content models and their relationships.

## Content Model Overview

The Demo Site has **24 content models**:

- **6 Content Items**: Single instances
- **18 Content Lists**: Collections

## Content Model Categories

### Blog System (4 models)

**Posts** (Content List)
- Main blog content
- Links to: Author, Category, Tags
- Fields: heading, slug, postDate, content, image

**Authors** (Content Item)
- Blog post authors
- Fields: name, title, headShot

**Categories** (Content Item)
- Blog categories
- Fields: name, description

**Tags** (Content List)
- Blog tags
- Fields: name

### Personalization System (3 models)

**Audiences** (Content List)
- Target audience segments
- Fields: name, description, icon

**Regions** (Content List)
- Geographic regions
- Fields: name, description

**Customer Profiles** (Content List)
- Customer data for personalization
- Fields: Various customer profile fields

### Component Content (7 models)

**Bento Cards** (Content List)
- Cards for Bento sections
- Fields: eyebrow, title, description, graphic

**Testimonials** (Content List)
- Customer testimonials
- Fields: name, title, quote, image

**FAQ Items** (Content List)
- Frequently asked questions
- Fields: question, answer

**Pricing Tiers** (Content List)
- Pricing information
- Fields: tier name, price, features, CTA

**Stats** (Content List)
- Statistics and metrics
- Fields: number, label, icon

**Carousel Slides** (Content Item)
- Carousel slide content
- Fields: image, caption, link

**Logo Items** (Content List)
- Logo assets
- Fields: logo image, name

### Navigation & Structure (4 models)

**Header** (Content Item)
- Site header/navigation
- Fields: logo, navigation links, CTA buttons

**Footer** (Content Item)
- Site footer
- Fields: footer links, social links, copyright

**Nav Links** (Content List)
- Navigation link items
- Fields: label, URL, order

**Top Level Nav** (Content List)
- Top navigation items
- Fields: label, URL, order

### Configuration (2 models)

**Global Settings** (Content Item)
- Site-wide settings
- Fields: site name, contact info, social links

**AI Search Configuration** (Content Item)
- AI search settings
- Fields: search configuration, AI settings

### Personalization Content (2 models)

**Personalized Hero Item** (Content Item)
- Hero content for personalization
- Fields: heading, description, image, CTA, audience/region targeting

**A/B Test Hero Item** (Content Item)
- Hero content for A/B testing
- Fields: variant content, experiment key

## Content Relationships

### Blog Relationships

- **Post → Author**: Many-to-one (many posts to one author)
- **Post → Category**: Many-to-one (many posts to one category)
- **Post → Tags**: Many-to-many (posts can have multiple tags)

### Component Relationships

- **BentoSection → BentoCards**: Parent-child via reference name
- **Testimonials Component → Testimonial Items**: One component to many testimonials
- **Pricing Component → Pricing Tiers**: One component to many tiers

### Personalization Relationships

- **Personalized Components → Audiences**: Filter by audience
- **Personalized Components → Regions**: Filter by region

## Content Model Design Decisions

### Why Content Lists vs Content Items?

**Content Lists Used For:**
- Collections that need querying (Posts, Tags, Testimonials)
- Items that form logical groups
- Content that needs filtering/sorting

**Content Items Used For:**
- Single instances (Author, Category, Global Settings)
- Content that doesn't need querying
- Configuration content

### Relationship Design

**Linked Content Fields:**
- Used for direct relationships (Post → Author)
- Auto-populated by SDK
- Type-safe access

**Nested References:**
- Used for parent-child relationships (BentoSection → BentoCards)
- Require separate fetch using reference name
- More flexible for complex structures

## Best Practices Applied

1. **Reusability**: Content models designed for reuse
2. **Relationships**: Clear relationship patterns
3. **Querying**: Content lists support efficient querying
4. **Personalization**: Audience/region support built-in
5. **Scalability**: Models designed to scale

---

**Next**: [Component Architecture](./component-architecture.md) - Component design

