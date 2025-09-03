# PersonalizedBackgroundHero Component

This component provides audience-based personalization for the BackgroundHero component. It allows different hero content to be displayed based on the selected audience.

## How It Works

1. **Default Content**: The component displays the default hero content (heading, description, CTAs, background) when no audience is selected.

2. **Audience-Based Personalization**: When an audience is selected via URL parameters (e.g., `?audience=enterprise`), the component:
   - Fetches the personalized variants list from Agility CMS
   - Finds the variant that matches the selected audience
   - Displays the personalized content instead of the default content

3. **Fallback**: If no matching audience variant is found, it falls back to the default content.

## Content Model Structure

### Main BackgroundHero Component
The main component should have these fields:
- `heading` (Text) - Default heading
- `description` (LongText) - Default description
- `cta1` (Link) - Default primary CTA
- `cta2` (Link) - Default secondary CTA
- `backgroundType` (DropdownList) - Background type (gradient, image, etc.)
- `backgroundImage` (ImageAttachment) - Default background image
- `personalizedVariants` (LinkedContentNestedGrid) - Nested list of personalized variants

### Personalized Variants (Nested List)
Each variant should have these fields:
- `heading` (Text) - Personalized heading
- `description` (LongText) - Personalized description
- `cta1` (Link) - Personalized primary CTA
- `cta2` (Link) - Personalized secondary CTA
- `backgroundType` (DropdownList) - Personalized background type
- `backgroundImage` (ImageAttachment) - Personalized background image
- `audience` (LinkedContentDropdown) - Link to the Audiences list

## Usage

1. **In Agility CMS**: Create a PersonalizedBackgroundHero module and add it to your page
2. **Configure Content**: Set up the default content and personalized variants
3. **Audience Selection**: Users can select audiences via URL parameters (e.g., `?audience=enterprise`)

## Example URL
```
https://yoursite.com/page?audience=enterprise
```

## Technical Details

- **Server Component**: `PersonalizedBackgroundHero` handles data fetching and audience logic
- **Client Component**: `PersonalizedBackgroundHeroClient` handles rendering and interactions
- **Audience Detection**: Uses `getAudienceContentID` utility to parse audience from URL parameters
- **Content Filtering**: Filters personalized variants based on audience selection
- **Fallback Logic**: Gracefully falls back to default content when personalization isn't available
