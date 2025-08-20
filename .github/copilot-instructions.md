
## Project Description
This is a Next.js project with TypeScript, Tailwind CSS v4, and Agility CMS.
The project includes various components such as RichTextArea, BentoSection, LogoStrip, and BackgroundHero that are directly linked to Agility CMS components, which provide the content for those components.

When working with Tailwind CSS, refer to the official documentation at https://tailwindcss.com/docs for v4-specific features and syntax.

## Technical Stack
- **Framework**: Next.js 15.3.5 with TypeScript
- **Styling**: Tailwind CSS v4 (css-filed based, no config file)
- **CMS**: Agility CMS with @agility/nextjs v15.0.7
- **Animation**: Motion (Framer Motion alternative)
- **State Management**: React 19.1.0 with hooks
- **Icons**: Heroicons v2 and React Icons
- **Development**: Turbopack for dev server

## Project Structure
- `/src/components/agility-components/` - CMS-connected components
- `/src/components/agility-pages/` - Page-level components
- `/src/lib/cms/` - CMS utility functions and SDK
- `/src/lib/types/` - TypeScript definitions
- `/public/` - Static assets organized by category

## Layout and Components
The layout of the application is defined in the `layout.tsx` file, which includes a gradient background and a container for the main content. The BentoSection component is used to display a section with multiple cards, each with its own content and animations.
The project also includes utility components such as Container, Keyboard, LogoCluster, Map, and text components like Subheading and Heading for consistent styling across the application.

The project is structured to allow for easy addition of new components and content types, making it flexible for future development.

## Development Guidelines

### Agility CMS Integration
- Always use `getContentItem()` for single content items
- Use `getContentList()` for collections and nested references
- All components should accept `UnloadedModuleProps` with `module` and `languageCode`
- Add `data-agility-component={contentID}` to container elements
- Add `data-agility-field="fieldName"` to field containers for inline editing

### TypeScript Patterns
- Define interfaces for CMS content fields (e.g., `IBentoSection`, `IBentoCard`)
- Use `ContentItem<T>` type for typed content items
- Always type `ImageField` for Agility image fields

### Styling Conventions
- Use Tailwind CSS v4 classes (no config file approach)
- Responsive design: mobile-first with `lg:` prefixes
- Dark mode support with `dark:` variants
- Use `clsx()` for conditional classes
- Animation delays for staggered effects

## Common Patterns

### Nested Content Fetching
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

### Animation Implementation
- Use Motion library for animations
- Implement staggered delays for grid items
- Fade animations from specific directions
- Calculate delays based on item index for visual interest

## Agility CMS Components
Agility CMS components are in the `src/components/agility-components` directory.
The instructions in this file are meant to help you understand how to use these components effectively in your Next.js application.
Also these example components show how to fetch content from Agility CMS and display it in a structured way, using TypeScript for type safety and Tailwind CSS for styling.
Use these examples as a reference for creating your own components that interact with Agility CMS.

### Available Components
- **RichTextArea** - Renders rich text content from CMS
- **BackgroundHero** - Hero section with background image
- **BentoSection** - Animated grid of cards with nested content
- **LogoStrip** - Display strip of logos
- **Header** - Site header component
- **Hero** - Standard hero component
- **ContactUs** - Contact form components
- **TeamListing** - Team member display
- **BlogHeader** - Blog-specific header
- **CompanyStats** - Statistics display component
- **Testimonials** - Customer testimonial components
- **Pricing** - Pricing table components
- **Carousel** - Image/content carousel
- **PostListing** - Blog post listing
- **PostDetails** - Individual blog post display

### The RichTextArea component
- designed to render rich text content fetched from Agility CMS.
- It uses the `getContentItem` method to fetch the content item and render it as HTML.

### The BackgroundHero component
- designed to display a hero section with a background image and optional content.
- It uses the `getContentItem` method to fetch the content item and render it with a background image, heading, and subheading.
- The component is responsive and adjusts its layout based on the content provided.

### The BentoSection component
- designed to display a grid of cards with animations and staggered delays for visual interest. The LogoStrip component is used to display a strip of logos, while the BackgroundHero component provides a hero section with a background image.
- fetches content from Agility CMS and displays it in a responsive grid layout, with each card being animated on load.
- The main item is fetched using the `getContentItem` method, and additional items (from the nested linked content field) are fetched using the `getContentList` method.
- Use this component as an example of how to do data fetching on nested linked content fields.
- The component also handles different content types such as text, images, and links, ensuring that the content is displayed correctly based on its type.
- is particularly notable for its use of animations and responsive design, making it visually appealing and engaging for users.


