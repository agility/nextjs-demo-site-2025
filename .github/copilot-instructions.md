
## Project Description
This is a Next.js project with TypeScript, Tailwind CSS, and Agility CMS.
The project includes various components such as RichTextArea, BentoSection, LogoStrip, and BackgroundHero that are directly linked to Agility CMS components, which provide the content for those components.

## Layout and Components
The layout of the application is defined in the `layout.tsx` file, which includes a gradient background and a container for the main content. The BentoSection component is used to display a section with multiple cards, each with its own content and animations.
The project also includes utility components such as Container, Keyboard, LogoCluster, Map, and text components like Subheading and Heading for consistent styling across the application.

The project is structured to allow for easy addition of new components and content types, making it flexible for future development.

## Agility CMS Components
Agility CMS components are in the `src/components/agility-components` directory.
The instructions in this file are meant to help you understand how to use these components effectively in your Next.js application.
Also these example components show how to fetch content from Agility CMS and display it in a structured way, using TypeScript for type safety and Tailwind CSS for styling.
Use these examples as a reference for creating your own components that interact with Agility CMS.

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
- The main item is fetched using the `getContentItem` method, and additional items are fetched using the `getContentList` method.
- The component also handles different content types such as text, images, and links, ensuring that the content is displayed correctly based on its type.
- is particularly notable for its use of animations and responsive design, making it visually appealing and engaging for users.


