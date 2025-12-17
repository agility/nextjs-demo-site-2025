# Working with Components

This guide explains how to work with components in Agility CMS. Components are reusable building blocks that display content on pages.

## What Is a Component?

A **Component** is a reusable building block that displays content on a page. Think of components as LEGO blocks—you combine different components to build a complete page.

### Component Structure

- **Component Model**: Defines what fields a component has
- **Component Instance**: An actual component placed on a page with data
- **Content Zones**: Where components are placed on pages

## Component Models

![Component Definition](https://cdn.aglty.io/agility-cms-docs/images/training-guide/assets/screenshots/agility-cms/14-component-definition.png)

**Component Models** define the structure of components:
- What fields the component has
- Field types (text, image, linked content, etc.)
- Validation rules
- Default values

## Adding Components to Pages

![Component Picker](https://cdn.aglty.io/agility-cms-docs/images/training-guide/assets/screenshots/agility-cms/18-component-picker.png)

1. Open the page you want to edit
2. In the page editor, you'll see **Content Zones** (areas where components can be added)
3. Click **"Add Component"** in the desired content zone
4. Select the component type from the list
5. Configure the component's content fields
6. Click **"Save"**

## Editing Components

![Component Editor](https://cdn.aglty.io/agility-cms-docs/images/training-guide/assets/screenshots/agility-cms/19-component-editor-form.png)

1. Navigate to the page containing the component
2. Click on the component in the page editor
3. The component editor opens
4. Make your changes to the component's fields
5. Click **"Save"**

## Linking Content to Components

![Content Picker](https://cdn.aglty.io/agility-cms-docs/images/training-guide/assets/screenshots/agility-cms/20-content-picker.png)

Many components can link to content items. This allows components to display reusable content.

### How to Link Content

1. Open the component editor
2. Find the field that accepts linked content (often labeled with a link icon)
3. Click to open the content picker
4. Select the content item(s) you want to link
5. Save the component

**Example**: A "Testimonials" component might link to multiple "Testimonial" content items to display them on the page.

## Component Field Types

Components can have various field types:
- **Text**: Headings, descriptions, labels
- **Rich Text**: Formatted content
- **Image**: Images displayed by the component
- **Linked Content**: Link to content items
- **Multiple Linked Content**: Link to multiple content items
- **Number**: Numeric values for configuration
- **Boolean**: Toggle options

## Component Placement

Components are placed in **Content Zones** on pages:
- Each page model defines available content zones
- You can add multiple components to each zone
- Components appear in the order they're added

## Component Reusability

The same component can be used on multiple pages:
- Create a component once
- Use it on different pages
- Each instance can have different content

## Best Practices

1. **Use appropriate components**: Choose components that match your content needs
2. **Link to content items**: Use linked content for reusable content
3. **Organize in zones**: Place components logically in content zones
4. **Keep components focused**: Each component should have a single, clear purpose
5. **Test components**: Preview pages to see how components appear

---

**Next**: [Workflow](./07-workflow.md) - Publishing workflow and approval processes

