# Agility CMS Training Guide: Architect

> **Instance**: Demo Site (`13f09fe2-u`)
> **Target Audience**: Solution architects and technical leads designing content management solutions

## Overview

This guide is designed for architects who need to understand Agility CMS from a system design perspective, plan content architecture, and make strategic decisions about content modeling and integration patterns.

## Learning Outcomes

By the end of this guide, you will be able to:
- Understand Agility CMS architecture and design principles
- Design effective content models and component structures
- Plan multi-channel content strategies
- Evaluate integration patterns and technical requirements
- Make informed decisions about content architecture

## Table of Contents

1. [Architecture Overview](#1-architecture-overview)
2. [Content Modeling Strategy](#2-content-modeling-strategy)
3. [Component Architecture](#3-component-architecture)
4. [Multi-Channel Strategy](#4-multi-channel-strategy)
5. [Integration Patterns](#5-integration-patterns)
6. [Instance Architecture Analysis](#6-instance-architecture-analysis)

---

## 1. Architecture Overview

### Headless CMS Architecture

Agility CMS follows a **headless architecture** pattern, separating content management from content delivery.

![Headless Architecture Diagram](../assets/concepts/Agility%20Headless%20Architecture.png)

*This diagram illustrates the headless architecture: Content is managed in the Content Manager, exposed via Content APIs, and consumed by frontend applications (Website, Apps) which deliver experiences to Devices. Assets are delivered via Asset CDN. This separation enables multi-channel publishing, technology independence, and independent scaling.*

**Key Architectural Principles:**

1. **Separation of Concerns**
   - Content management (backend) is independent of presentation (frontend)
   - Content APIs provide data, not HTML
   - Frontend applications consume APIs and render content

2. **API-First Design**
   - All content exposed via RESTful APIs
   - JSON-based data exchange
   - Stateless API interactions

3. **Multi-Channel Support**
   - Same content APIs serve multiple frontends
   - Website, mobile apps, IoT devices can consume the same content
   - Channel-specific presentation logic in frontend

4. **CDN Integration**
   - Assets delivered via Content Delivery Network
   - Optimized performance for global audiences
   - Automatic image optimization and resizing

### Data Model Architecture

![Data Model Diagram](../assets/concepts/Agility%20Data%20Model.png)

*This diagram shows the Agility data model structure: The Sitemap maps URLs to Pages, Pages contain Components, and Components display Content Items. Each entity has a corresponding Model (Page Model, Component Model, Content Model) that defines its schema. This three-layer model (Models → Instances → Relationships) enables content reusability and flexible presentation.*

**Three-Layer Model:**

1. **Models (Schema Layer)**
   - Page Models: Define page structure
   - Component Models: Define reusable UI components
   - Content Models: Define reusable content structures

2. **Instances (Data Layer)**
   - Pages: Actual page instances
   - Components: Component instances with data
   - Content Items: Standalone content pieces

3. **Relationships (Reference Layer)**
   - Sitemap organizes pages
   - Pages reference components
   - Components reference content items
   - Content items can reference other content items

### Benefits of This Architecture

- **Flexibility**: Change frontend without affecting content
- **Scalability**: Scale CMS and frontend independently
- **Reusability**: Content and components used across multiple pages/channels
- **Performance**: CDN delivery, caching strategies
- **Developer Experience**: Modern APIs, SDKs, TypeScript support

### Understanding the Agility CMS Interface

The Agility CMS interface is organized into four main functional areas:

![Agility Sections Diagram](../assets/concepts/Agility%20Sections.png)

*The Agility CMS interface is organized into four sections: Content (Lists/Items), Assets (Files/Images/PDFs), Pages (Sitemap/Pages/Components), and Web Studio (Preview). Understanding this organization helps architects plan content workflows and user access patterns.*

---

## 2. Content Modeling Strategy

### Content Model Types

Agility CMS supports two content model types:

#### Content Items
- Single, standalone pieces of content
- Best for: Authors, Categories, Global Settings
- Example: Author (name, headshot)

#### Content Lists
- Collections of related content items
- Best for: Blog Posts, Testimonials, Pricing Tiers
- Example: Posts (collection of blog articles)

### Content Modeling Best Practices

#### 1. Identify Reusability

**Ask:** Will this content be used in multiple places?

- **Yes → Content Model**: Create a reusable content model
- **No → Component Field**: Store directly in component

**Example:**
- Author information → Content Model (used in posts, team pages, author pages)
- Hero heading → Component Field (specific to one page)

#### 2. Consider Relationships

**Linked Content Fields:**
- Use for relationships between content items
- Supports one-to-one, one-to-many, many-to-many
- Example: Post → Author (many-to-one)

**Nested References:**
- Use for complex relationships
- Example: BentoSection → BentoCards (parent-child)

#### 3. Plan for Personalization

**Audience Targeting:**
- Create Audience content model
- Link content items to audiences
- Filter at query time

**Region Targeting:**
- Create Region content model
- Support multi-region content
- Example: Different pricing for different regions

### Instance Content Models

The Demo Site instance includes:

#### Blog System
- **Post** (Content List) - Blog articles
- **Author** (Content Item) - Post authors
- **Category** (Content Item) - Post categories
- **Tag** (Content List) - Post tags

#### Personalization
- **Audience** (Content List) - Target audiences
- **Region** (Content List) - Geographic regions
- **Customer Profile** (Content List) - Customer data

#### UI Components
- **Bento Card** (Content List) - Cards for Bento sections
- **Carousel Slide** (Content Item) - Carousel content
- **Logo Item** (Content List) - Logo assets
- **Testimonial Item** (Content List) - Customer testimonials
- **FAQ Item** (Content List) - FAQ entries
- **Stat** (Content List) - Statistics for Company Stats

#### Navigation & Structure
- **Header** (Content List) - Site header
- **Footer** (Content List) - Site footer
- **Nav Link** (Content List) - Navigation links
- **Top Level Nav** (Content List) - Top navigation

#### Configuration
- **Global Settings** (Content Item) - Site-wide settings
- **AI Search Configuration** (Content Item) - AI search settings

---

## 3. Component Architecture

### Component Model Design

Components (Modules) are reusable UI building blocks that:
- Define presentation structure
- Reference content items for data
- Can be used across multiple pages

### Component Types in the Demo Site

#### Content Display Components
- **Post Listing** - Displays blog post collections
- **Post Details** - Displays individual blog posts
- **Testimonials** - Displays testimonial collections
- **Team Listing** - Displays team members

#### Hero Components
- **Hero** - Basic hero with text and image
- **Background Hero** - Hero with background image/gradient
- **A/B Test Hero** - Hero with A/B testing support
- **Personalized Background Hero** - Hero with audience/region targeting

#### Interactive Components
- **Carousel** - Image/content carousel
- **Contact Us** - Contact form
- **Frequently Asked Questions** - FAQ accordion

#### Layout Components
- **Bento Section** - Grid of cards
- **Logo Strip** - Horizontal logo display
- **Personalized Logo Strip** - Logo strip with personalization

#### Data Display Components
- **Company Stats** - Animated statistics
- **Pricing Cards** - Pricing tier cards
- **Pricing Table** - Detailed pricing table

### Component Design Patterns

#### Pattern 1: Simple Content Display
```
Component → Content Item
Example: Hero → Hero content fields
```

#### Pattern 2: Content List Display
```
Component → Content List Reference
Example: PostListing → Posts content list
```

#### Pattern 3: Nested Content
```
Component → Content Item → Nested Content List
Example: BentoSection → BentoSection content → BentoCards list
```

#### Pattern 4: Personalization
```
Component → Filtered Content (by Audience/Region)
Example: PersonalizedBackgroundHero → Hero items filtered by audience
```

### Component Registration

All components must be registered in the frontend application:

```typescript
// src/components/agility-components/index.ts
const allModules = [
  { name: "ComponentName", module: ComponentName },
  // ... more components
]
```

**Critical:** Component names must match Agility CMS definitions (case-insensitive).

---

## 4. Multi-Channel Strategy

### Channel Types

Agility CMS supports multiple channel types:
- **Website** - Traditional web pages
- **Mobile App** - Native mobile applications
- **API** - Custom integrations

### Demo Site Configuration

- **Primary Channel**: Website (ID: 1)
- **Locales**: English (en-us), French (fr)
- **Sitemap**: "Website" channel

### Multi-Locale Strategy

**Default Locale Pattern:**
- Default locale (en-us) has no URL prefix: `/blog`
- Other locales have prefix: `/fr/blog`

**Content Strategy:**
- Shared content models across locales
- Locale-specific content instances
- Fallback to default locale if content missing

### Personalization Strategy

**Audience-Based:**
- Content filtered by audience query parameter
- Example: `?audience=enterprise`

**Region-Based:**
- Content filtered by region query parameter
- Example: `?region=north-america`

**Combined:**
- Multiple filters can be combined
- Example: `?audience=enterprise&region=north-america`

---

## 5. Integration Patterns

### Next.js Integration

The Demo Site uses Next.js 15.5.3 with App Router.

#### Integration Points

1. **Middleware** (`src/middleware.ts`)
   - Preview mode handling
   - Redirect management
   - Locale routing
   - Search params encoding

2. **CMS SDK** (`src/lib/cms/`)
   - API abstractions
   - Caching layer
   - Type-safe content fetching

3. **Component System** (`src/components/agility-components/`)
   - React Server Components
   - Async data fetching
   - TypeScript type safety

#### Caching Strategy

- **Cache Tags**: `agility-content-{id}-{locale}`
- **Revalidation**: 60 seconds default
- **Tag-based Invalidation**: Webhook-triggered
- **Static Generation**: Pre-render at build time

### API Integration Patterns

#### RESTful API
- Standard HTTP methods
- JSON responses
- Query parameters for filtering

#### SDK Integration
- TypeScript SDK for type safety
- Automatic caching
- Preview mode support

#### Webhook Integration
- Content publish triggers revalidation
- Path-based cache invalidation
- Tag-based cache invalidation

### Performance Considerations

1. **CDN Delivery**: Assets via CDN
2. **Image Optimization**: Automatic resizing and formats
3. **Caching**: Multi-layer caching strategy
4. **Static Generation**: Pre-render pages at build
5. **Incremental Static Regeneration**: Update pages on-demand

---

## 6. Instance Architecture Analysis

### Content Model Architecture

**Total Content Models**: 24

**Distribution:**
- Content Items: 4 (Author, Category, Carousel Slide, Global Settings, AI Search Configuration, Personalized Hero Item)
- Content Lists: 19 (Posts, Tags, Bento Cards, Testimonials, etc.)

**Key Patterns:**
- Blog system with linked content (Post → Author, Category, Tags)
- Personalization system (Audience, Region, Customer Profile)
- Reusable UI components (Bento Cards, Carousel Slides, Logo Items)

### Component Architecture

**Total Components**: 20

**Distribution:**
- Content Display: 4 (Post Listing, Post Details, Testimonials, Team Listing)
- Hero Variants: 4 (Hero, Background Hero, A/B Test Hero, Personalized Background Hero)
- Interactive: 3 (Carousel, Contact Us, FAQ)
- Layout: 3 (Bento Section, Logo Strip, Personalized Logo Strip)
- Data Display: 3 (Company Stats, Pricing Cards, Pricing Table)
- Navigation: 1 (Header)

### Page Architecture

**Page Model**: Main Template (ID: 2)

**Sitemap Structure:**
```
Home (/home)
About Us (/about-us)
Pricing (/pricing)
Blog (/blog)
  └── Post Details (/blog/post-details) [Dynamic: Posts]
Features (/features)
Contact Us (/contact-us)
```

**Page Types:**
- Static Pages: Home, About, Pricing, Features, Contact
- Dynamic Pages: Post Details (generated from Posts content)

### Integration Architecture

**Frontend Stack:**
- Next.js 15.5.3 (App Router)
- React 19.1.0
- TypeScript
- Tailwind CSS v4

**CMS Integration:**
- Agility CMS SDK (@agility/nextjs 15.0.7)
- Custom caching layer
- Preview mode support

**Additional Features:**
- AI Search (Azure OpenAI + Algolia)
- Analytics (PostHog)
- A/B Testing (PostHog feature flags)

### Scalability Considerations

**Content Scalability:**
- Content Lists support pagination
- Efficient querying with filters
- CDN for asset delivery

**Performance Scalability:**
- Static generation for most pages
- Incremental regeneration for dynamic content
- Multi-layer caching

**Multi-Locale Scalability:**
- Locale-specific content instances
- Efficient locale routing
- Fallback strategies

---

## Architectural Decision Framework

### When to Use Content Models vs Component Fields

**Use Content Models When:**
- Content is reused across multiple pages/components
- Content has relationships with other content
- Content needs to be managed independently
- Content supports personalization

**Use Component Fields When:**
- Content is specific to one component instance
- Content is simple (text, image, link)
- Content doesn't need relationships

### When to Use Content Items vs Content Lists

**Use Content Items When:**
- Single, standalone piece of content
- Example: Global Settings, Author profile

**Use Content Lists When:**
- Collection of related items
- Items need to be queried/filtered
- Example: Blog Posts, Testimonials

### Component Design Decisions

**Simple Components:**
- Direct field mapping
- Minimal data fetching
- Fast rendering

**Complex Components:**
- Nested content fetching
- Multiple data sources
- Client-side interactivity

**Personalized Components:**
- Audience/region filtering
- Query parameter handling
- Fallback content

---

## Best Practices for Architects

1. **Plan Content Models First**
   - Identify reusable content
   - Design relationships
   - Consider personalization needs

2. **Design Component Hierarchy**
   - Start with simple components
   - Build complex components from simple ones
   - Maintain consistency

3. **Consider Multi-Channel from Start**
   - Design content models for reuse
   - Avoid presentation-specific fields
   - Plan for API consumption

4. **Optimize for Performance**
   - Use appropriate content model types
   - Minimize nested queries
   - Leverage caching strategies

5. **Plan for Growth**
   - Scalable content models
   - Flexible component architecture
   - Extensible integration patterns

---

## Next Steps

After completing this guide, you should:
1. Analyze your content requirements
2. Design content models and relationships
3. Plan component architecture
4. Evaluate integration patterns
5. Consider scalability and performance

**You're ready when you can:**
- Design effective content models for new projects
- Plan multi-channel content strategies
- Evaluate and recommend integration patterns
- Make informed architectural decisions

---

*This guide is specific to the Demo Site instance (`13f09fe2-u`). For generic Agility CMS concepts, see the [Concept Guides](../assets/concepts/README.md).*

