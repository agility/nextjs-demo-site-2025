# Managing Component Models

This guide covers creating, modifying, and managing component models (formerly called "module definitions") in Agility CMS.

> **Note**: "Module Definitions" is the old terminology. The current term is "Component Models." The Next.js SDK still uses "module" terminology in code (e.g., `allModules`, `module.contentid`), but in Agility CMS, these are now called "components" and "component models."

## Component Model Overview

Component Models define the structure of reusable UI components that can be placed on pages. They define what fields a component has and how those fields are configured.

## Creating Component Models

### Step 1: Navigate to Component Models

1. Navigate to **Components** → **Component Definitions** (or **Component Models**)
2. Click **"Add Component"**

### Step 2: Define Component Name

Enter component name and description:
- **Name**: Component name (must match frontend registration)
- **Description**: Component purpose and usage

**Important**: Component name must match frontend registration (case-insensitive).

### Step 3: Add Fields

Add fields to your component model:

**Common Field Types:**
- **Text**: Headings, labels, descriptions
- **Rich Text**: Formatted content
- **Image**: Images displayed by component
- **Linked Content**: Link to content items
- **Multiple Linked Content**: Link to multiple content items
- **Number**: Numeric values for configuration
- **Boolean**: Toggle options
- **URL**: Links and CTAs

### Step 4: Configure Field Properties

For each field:
- **Field Name**: Descriptive name
- **Required/Optional**: Whether field is required
- **Default Values**: Default field values
- **Validation Rules**: Field validation
- **Help Text**: Guidance for content editors

### Step 5: Save Component Model

Click **"Save"** to create the component model.

## Component Registration

**Critical:** Component names must match frontend registration.

**Frontend Registration:**
```typescript
// src/components/agility-components/index.ts
const allModules = [
  { name: "ComponentName", module: ComponentName },
]
```

> **Note**: The variable name `allModules` and property `module` are from the Next.js SDK's legacy terminology. In Agility CMS, these are now called "components" and "component models."

**Naming Rules:**
- Case-insensitive matching
- Spaces converted to no spaces
- Must match exactly (after normalization)

## Modifying Component Models

### Adding Fields

**Safe Operation:**
- Adding fields is safe
- Doesn't affect existing component instances
- New fields are optional by default

### Removing Fields

**Warning:**
- Removing fields may cause data loss
- Component instances may break if fields are removed
- Always test changes in development first

### Changing Field Types

**Warning:**
- Changing field types may cause data loss
- May break component instances
- Test changes in development first

## Component Model Patterns

### Simple Component

**Pattern**: Direct field mapping

**Example**: Hero component
- Heading, description, image, CTA
- All fields stored directly in component

### Content-Linked Component

**Pattern**: Component links to content items

**Example**: Post Listing component
- Links to Posts content list
- Displays filtered/sorted posts

### Nested Component

**Pattern**: Component has nested content

**Example**: Bento Section
- Component has nested Bento Cards reference
- Cards fetched separately using reference name

## Best Practices

1. **Match Frontend Names**: Component names must match frontend registration
2. **Plan Fields Carefully**: Plan component fields before creation
3. **Document Components**: Document component purpose and usage
4. **Test Changes**: Test changes in development first
5. **Coordinate with Developers**: Work with developers on component registration

---

**Next**: [Page Models](./05-page-models.md) - Managing page models

