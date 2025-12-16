# Architecture Deep Dive

Understanding Agility CMS architecture is essential for effective development. This guide covers the headless architecture pattern and how it applies to your applications.

## Headless Architecture

![Headless Architecture Diagram](../../../assets/concepts/Agility%20Headless%20Architecture.png)

Agility CMS follows a **headless architecture** pattern that separates content management from content delivery.

### Architecture Components

#### 1. Content Management Layer (Backend)
- **Content Manager**: Web-based interface for content editing
- **Content APIs**: RESTful APIs exposing content as JSON
- **Asset CDN**: Content delivery network for media assets
- **Database**: Content storage and management

#### 2. Content Delivery Layer (Frontend)
- **Your Application**: Website, mobile app, or other frontend
- **API Consumption**: Fetching content from Agility APIs
- **Rendering**: Displaying content in your application
- **Caching**: Optimizing content delivery

#### 3. User Layer
- **End Users**: Accessing your application
- **Content Editors**: Managing content in CMS
- **Developers**: Building and maintaining the application

### Data Flow

1. **Content Creation**: Editors create content in Content Manager
2. **API Exposure**: Content is exposed via Content APIs
3. **Frontend Consumption**: Your app fetches content via APIs
4. **Asset Delivery**: Images/assets served via CDN
5. **User Access**: Users access the rendered application

### Benefits

- **Multi-Channel**: Same content for web, mobile, IoT
- **Technology Freedom**: Use any frontend framework
- **Performance**: CDN delivery, optimized caching
- **Scalability**: Independent scaling of CMS and frontend
- **Developer Experience**: Modern APIs and SDKs

## Data Model Architecture

![Data Model Diagram](../../../assets/concepts/Agility%20Data%20Model.png)

The Agility data model uses a three-layer architecture:

### Layer 1: Models (Schema Layer)

**Purpose**: Define structure and schema

- **Page Models**: Define page structure (content zones, layout)
- **Component Models**: Define reusable UI component structure
- **Content Models**: Define reusable content item structure

Models are like blueprints—they define what fields exist and what types of data they hold.

### Layer 2: Instances (Data Layer)

**Purpose**: Actual data instances

- **Pages**: Page instances created from page models
- **Components**: Component instances with actual data
- **Content Items**: Standalone content pieces created from content models

Instances are the actual data—the filled-out forms, the real content.

### Layer 3: Relationships (Reference Layer)

**Purpose**: Connect entities together

- **Sitemap**: Organizes pages and defines URLs
- **Page → Components**: Pages contain references to components
- **Component → Content**: Components display content items
- **Content → Content**: Content items can link to other content items

### Key Relationships

1. **Sitemap → Page**: Each URL maps to a page
2. **Page → Components**: Pages contain multiple components in zones
3. **Component → Content**: Components display content items
4. **Content → Content**: Content items can reference other content items

## API Architecture

### RESTful API Design

Agility CMS provides RESTful APIs with standard HTTP methods:

- **GET**: Retrieve content
- **POST**: Create content (Management API)
- **PUT**: Update content (Management API)
- **DELETE**: Delete content (Management API)

### API Endpoints

**Content Fetch API:**
```
GET /{instance-guid}/fetch/{locale}/page/{pageID}
GET /{instance-guid}/fetch/{locale}/list/{referenceName}
GET /{instance-guid}/fetch/{locale}/item/{contentID}
```

**Content Management API:**
```
POST /{instance-guid}/content/{locale}/item
PUT /{instance-guid}/content/{locale}/item/{contentID}
DELETE /{instance-guid}/content/{locale}/item/{contentID}
```

### Authentication

- **API Keys**: Used for authentication
- **Fetch Key**: For production content access
- **Preview Key**: For draft content access
- **Security Key**: For webhook validation

## SDK Architecture

### SDK Layers

1. **Core SDK** (`@agility/content-fetch`): Base JavaScript SDK
2. **Framework SDKs**: Framework-specific wrappers (Next.js, Gatsby, etc.)
3. **Your Application**: Uses SDKs to fetch and render content

### SDK Features

- **Type Safety**: TypeScript support
- **Caching**: Built-in caching strategies
- **Preview Mode**: Support for draft content
- **Error Handling**: Comprehensive error handling
- **Type Definitions**: Full TypeScript definitions

## Component Architecture

### Component Registration

Components must be registered in your application:

```typescript
const allModules = [
  { name: "ComponentName", module: ComponentName },
  // ... more components
]
```

> **Note**: The variable name `allModules` and property `module` are from the Next.js SDK's legacy terminology. In Agility CMS, these are now called "components" and "component models."

### Component Pattern

All components follow this pattern:

1. **Async Function**: Components are async to fetch data
2. **Props**: Accept `module`, `languageCode`, `isPreview`, etc.
3. **Data Fetching**: Use `getContentItem()` or `getContentList()`
4. **Rendering**: Return JSX with content
5. **Attributes**: Include `data-agility-*` attributes for inline editing

## Caching Architecture

### Cache Layers

1. **CDN Cache**: Assets cached at edge locations
2. **API Cache**: API responses cached
3. **Application Cache**: Next.js cache tags and revalidation
4. **Browser Cache**: Client-side caching

### Cache Strategy

- **Cache Tags**: Tag-based cache invalidation
- **Revalidation**: Time-based revalidation (60 seconds default)
- **On-Demand**: Webhook-triggered revalidation
- **Static Generation**: Pre-render at build time

## Performance Architecture

### Optimization Strategies

1. **CDN Delivery**: Assets via CDN
2. **Image Optimization**: Automatic resizing and formats
3. **Caching**: Multi-layer caching
4. **Static Generation**: Pre-render pages
5. **Incremental Regeneration**: Update pages on-demand

### Scalability

- **Horizontal Scaling**: Scale frontend independently
- **Content Scaling**: Efficient content querying
- **Asset Scaling**: CDN for global delivery
- **API Scaling**: Optimized API responses

---

**Next**: [Setup](./03-setup.md) - Project setup and configuration

