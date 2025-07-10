# Testimonials Component

This is an Agility CMS component that displays customer testimonials in a beautiful scrollable carousel format.

## Structure

The component is split into two parts following Agility CMS best practices:

- **TestimonialsServer.tsx** - Server component that fetches data from Agility CMS
- **TestimonialsClient.tsx** - Client component that handles the interactive carousel functionality
- **Testimonials.tsx** - Re-exports the server component and maintains backward compatibility

## Content Structure

### Testimonials Section Content Item

```typescript
interface ITestimonialsSection {
  subheading: string        // Section eyebrow text (e.g., "What everyone is saying")
  heading: string          // Main section heading (e.g., "Trusted by professionals.")
  ctaText: string          // Call-to-action description text
  ctaButtonText: string    // CTA button label (e.g., "Get started")
  ctaButtonLink: string    // CTA button URL
  testimonials: {          // Reference to testimonials content list
    referencename: string
  }
}
```

### Individual Testimonial Content Item

```typescript
interface ITestimonial {
  name: string             // Customer name
  title: string           // Customer job title and company
  quote: string           // Testimonial quote
  image: ImageField       // Customer photo
}
```

## Features

- **Responsive Design** - Adapts to different screen sizes
- **Smooth Scrolling** - Horizontal scroll with snap points
- **Dynamic Opacity** - Cards fade as they scroll out of view
- **Interactive Dots** - Navigation indicators for desktop
- **Accessibility** - Proper ARIA labels and keyboard navigation
- **Framer Motion** - Smooth animations and scroll-based effects

## Agility CMS Setup

1. Create a "Testimonials Section" content definition with the fields above
2. Create a "Testimonial" content definition for individual testimonials
3. Create a content list for testimonials and reference it in the testimonials section
4. Add the component to your page modules in Agility CMS

## Usage

The component will automatically be available in Agility CMS as "Testimonials" once registered in the component index.

## Styling

The component uses Tailwind CSS classes and follows the design system patterns established in the project. Key styling features:

- Gradient overlays on testimonial cards
- Custom scroll styling with hidden scrollbars
- Responsive aspect ratios
- Beautiful typography with gradient text effects
