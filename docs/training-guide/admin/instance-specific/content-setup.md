# Demo Site: Content Model Setup

This guide documents the content models configured in the Demo Site.

## Content Model Overview

The Demo Site includes **24 content models**:

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

**Logo Items** (Content List)
- Logo assets

### Navigation & Structure (4 models)

**Header** (Content Item)
- Site header/navigation

**Footer** (Content Item)
- Site footer

**Nav Links** (Content List)
- Navigation link items

**Top Level Nav** (Content List)
- Top navigation items

### Configuration (2 models)

**Global Settings** (Content Item)
- Site-wide settings

**AI Search Configuration** (Content Item)
- AI search settings

### Personalization Content (2 models)

**Personalized Hero Item** (Content Item)
- Hero content for personalization

**A/B Test Hero Item** (Content Item)
- Hero content for A/B testing

## Content Model Administration

### Managing Blog Content

**Tasks:**
- Manage blog post content
- Create and maintain authors
- Organize categories and tags
- Configure post relationships

### Managing Personalization

**Tasks:**
- Define audience segments
- Configure regions
- Manage customer profiles
- Set up personalization rules

---

**Next**: [Component Setup](./component-setup.md) - Component setup

