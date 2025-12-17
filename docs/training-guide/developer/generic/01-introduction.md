# Introduction to Agility CMS for Developers

Agility CMS is a **headless content management system** designed for developers who want flexibility, performance, and modern development workflows.

## What is a Headless CMS?

A headless CMS separates content management from content presentation:

- **Content Management**: Editors create and manage content in the CMS
- **Content Delivery**: Your frontend application fetches content via APIs
- **Presentation**: Your code controls how content is displayed

This separation gives you:
- **Technology Freedom**: Use any frontend framework (React, Vue, Next.js, etc.)
- **Multi-Channel Publishing**: Same content for web, mobile, IoT
- **Performance**: CDN delivery, optimized caching
- **Developer Control**: Full control over presentation and user experience

## Understanding Headless Architecture

![Headless Architecture Diagram](https://cdn.aglty.io/agility-cms-docs/images/training-guide/assets/concepts/Agility%20Headless%20Architecture.png)

*In a headless architecture, content is created in the Content Manager, exposed through Content APIs, and consumed by frontend applications which deliver experiences to end-user devices. Assets are delivered directly via a CDN for optimal performance.*

**Key Components:**

1. **Content Manager**: Web-based interface for content editing
2. **Content APIs**: RESTful APIs that expose content as JSON
3. **Asset CDN**: Content delivery network for media assets
4. **Frontend Application**: Your website, mobile app, or other application
5. **User Devices**: Browsers, mobile devices accessing your application

## Understanding the Data Model

![Data Model Diagram](https://cdn.aglty.io/agility-cms-docs/images/training-guide/assets/concepts/Agility%20Data%20Model.png)

*The Agility data model shows how a Sitemap organizes Pages, Pages contain Components, and Components display Content Items. Each entity (Page, Component, Content) has a corresponding Model that defines its structure.*

**Core Concepts:**

- **Sitemap**: Maps URLs to pages
- **Pages**: Contain multiple components in content zones
- **Components**: Reusable UI building blocks that display content
- **Content Items**: Standalone, reusable pieces of content
- **Models**: Define the structure (schema) for pages, components, and content

## Developer Workflow

### 1. Content Modeling (Setup Phase)

Content editors and administrators define:
- **Content Models**: Structure for reusable content (e.g., Blog Post, Author)
- **Component Models**: Structure for UI components (e.g., Hero, Card Grid)
- **Page Models**: Structure for pages (content zones, layout)

### 2. Content Creation (Editor Phase)

Content editors create:
- **Content Items**: Actual content instances (e.g., "My First Blog Post")
- **Components**: Component instances with data
- **Pages**: Page instances with components

### 3. Content Consumption (Developer Phase)

Your application:
- Fetches content via APIs
- Renders components based on page structure
- Displays content items in components
- Handles routing, caching, and optimization

## Agility CMS APIs

Agility CMS provides several APIs:

### Content Fetch API
- **Purpose**: Retrieve published content
- **Use Case**: Production websites and applications
- **Base URL**: `https://api.aglty.io/{instance-guid}/fetch`

### Content Management API
- **Purpose**: Create, update, and manage content programmatically
- **Use Case**: Automated content workflows, migrations
- **Base URL**: `https://api.aglty.io/{instance-guid}/content`

### Content Sync API
- **Purpose**: Bulk content synchronization
- **Use Case**: Offline solutions, reduced build times
- **Base URL**: `https://api.aglty.io/{instance-guid}/sync`

### GraphQL API
- **Purpose**: Query content using GraphQL
- **Use Case**: Complex queries, specific data requirements
- **Base URL**: `https://api.aglty.io/{instance-guid}/graphql`

## SDKs and Frameworks

Agility CMS provides official SDKs for popular frameworks:

- **Next.js**: `@agility/nextjs` - React Server Components support
- **Gatsby**: `@agility/gatsby-source-agilitycms` - Static site generation
- **Nuxt**: `@agility/agilitycms-nuxt-module` - Vue.js support
- **Eleventy**: `@agility/eleventy-agilitycms` - Static site generation
- **JavaScript**: `@agility/content-fetch` - Core JavaScript SDK
- **Python**: `agilitycms` - Python SDK
- **.NET**: `Agility.Web` - .NET SDK

## Key Developer Benefits

### 1. Type Safety
- TypeScript support
- Type-safe content access
- Compile-time error checking

### 2. Performance
- CDN delivery for assets
- Built-in caching strategies
- Optimized API responses

### 3. Developer Experience
- Modern APIs and SDKs
- Comprehensive documentation
- Active community support

### 4. Flexibility
- Use any frontend framework
- Custom component development
- Full control over presentation

### 5. Preview Mode
- Preview draft content
- Test changes before publishing
- Seamless editor experience

## Common Use Cases

### Website Development
- Marketing websites
- Corporate websites
- E-commerce sites
- Documentation sites

### Multi-Channel Publishing
- Websites + mobile apps
- Digital displays
- IoT devices
- API consumers

### Content-First Development
- Start with content structure
- Build components to display content
- Iterate on presentation independently

## What You'll Learn

This guide will teach you:

1. **How to set up** Agility CMS in your project
2. **How to fetch** content from Agility APIs
3. **How to build** custom components
4. **How to implement** caching and performance optimization
5. **How to handle** preview mode and draft content
6. **How to implement** internationalization
7. **How to follow** best practices for development

Each section focuses on **how Agility CMS works** in general, not how a specific instance is configured. This knowledge will apply to any Agility CMS instance you work with.

---

**Next**: [Architecture](./02-architecture.md) - Deep dive into headless architecture and data model

