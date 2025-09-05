# Agility Demo Site 2025 - Claude Code Project Context

## Project Overview
This is an Agility CMS-powered Next.js demo site built with React 19, TypeScript, and Tailwind CSS. The site demonstrates modern web development practices with a headless CMS architecture.

## Key Technologies
- **Framework**: Next.js 15.3.5 with App Router and TypeScript
- **Frontend**: React 19.1.0 with hooks for state management
- **Styling**: Tailwind CSS v4 (CSS-file based, no config file)
- **CMS**: Agility CMS (@agility/nextjs 15.0.7)
- **Animations**: Motion (Framer Motion alternative) 12.23.0
- **Icons**: Heroicons v2, React Icons
- **Development**: Turbopack dev server, ESLint, Prettier

## Project Structure
```
src/
├── app/                    # Next.js App Router pages
├── components/             # Reusable UI components  
│   ├── agility-components/ # CMS-connected components (RichTextArea, BentoSection, etc.)
│   ├── agility-pages/      # Page-level components
│   ├── header/            # Header navigation components
│   └── footer/            # Footer components
├── lib/                   # Utilities and CMS helpers
│   ├── cms/               # Agility CMS API functions and SDK
│   ├── cms-content/       # Content processing utilities
│   └── types/             # TypeScript definitions
└── public/                # Static assets organized by category
```

## Development Commands
- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server  
- `npm run lint` - Run ESLint

## Component Conventions
- Use TypeScript for all components
- Follow existing naming patterns (PascalCase for components)
- Utilize Tailwind CSS for styling
- Components are functional with modern React patterns
- Agility CMS components follow their SDK patterns

## CMS Integration
The project uses Agility CMS as a headless CMS:
- Content fetching via `@agility/nextjs` SDK
- Page routing handled by Agility's dynamic routing
- Content items are strongly typed with TypeScript interfaces

## Code Style
- Prettier configuration with Tailwind CSS plugin
- ESLint with Next.js recommended rules
- Import organization with prettier-plugin-organize-imports
- 2-space indentation, semicolons, single quotes for JSX attributes

## Type Definitions
Key TypeScript interfaces are defined in `src/lib/types/`:
- `IPost.ts` - Blog post structure
- `IAuthor.ts` - Author information
- `ICategory.ts` - Content categories
- `ITag.ts` - Content tags
- `ICustomerProfile.ts` - Customer data
- `IAudience.ts` - Audience targeting
- `IRegion.ts` - Regional content
- `SitemapNode.ts` - Site navigation structure

## Agility CMS Integration Guidelines

### Component Standards
- All components should accept `UnloadedModuleProps` with `module` and `languageCode`
- Add `data-agility-component={contentID}` to container elements  
- Add `data-agility-field="fieldName"` to field containers for inline editing
- Always use `getContentItem()` for single content items
- Use `getContentList()` for collections and nested references

### Available Agility Components
- **RichTextArea** - Renders rich text content from CMS
- **BackgroundHero** - Hero section with background image
- **BentoSection** - Animated grid of cards with nested content (example of nested data fetching)
- **LogoStrip** - Display strip of logos
- **Header/Hero** - Site header and hero components
- **ContactUs** - Contact form components
- **TeamListing** - Team member display
- **BlogHeader** - Blog-specific header
- **CompanyStats** - Statistics display component
- **Testimonials** - Customer testimonial components
- **Pricing** - Pricing table components
- **Carousel** - Image/content carousel
- **PostListing/PostDetails** - Blog post components

### TypeScript Patterns
- Define interfaces for CMS content fields (e.g., `IBentoSection`, `IBentoCard`)
- Use `ContentItem<T>` type for typed content items
- Always type `ImageField` for Agility image fields

### Nested Content Fetching Pattern
```typescript
// Get main content item
const { fields: { nestedRef: { referencename } } } = await getContentItem<MainType>({
  contentID: module.contentid,
  languageCode,
})

// Get nested collection
const nestedItems = await getContentList<NestedType>({
  referenceName: referencename,
  languageCode,
  take: 20
})
```

## Styling Conventions
- Use Tailwind CSS v4 classes (no config file approach)
- Responsive design: mobile-first with `lg:` prefixes
- Dark mode support with `dark:` variants  
- Use `clsx()` for conditional classes
- Animation delays for staggered effects

## Animation Implementation
- Use Motion library for animations
- Implement staggered delays for grid items
- Fade animations from specific directions
- Calculate delays based on item index for visual interest

## Development Notes for Claude Code
- Always check existing component patterns before creating new ones
- Use the established TypeScript interfaces for consistency
- Follow the Agility CMS SDK patterns for content fetching
- Reference Tailwind CSS v4 documentation at https://tailwindcss.com/docs
- Maintain accessibility standards with Heroicons and semantic HTML
- Test responsiveness with Tailwind's mobile-first approach