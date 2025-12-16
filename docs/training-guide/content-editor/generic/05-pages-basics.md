# Page Management Basics

This guide covers how to create, edit, and manage pages in Agility CMS. Pages represent individual web pages on your site.

## What Is a Page?

A **Page** represents an individual web page on your site. Pages are organized in a **Sitemap**, which defines your site's navigation structure.

### Page Structure

- **Page Model**: Defines the structure (content zones, layout)
- **Page Instance**: An actual page created from a page model
- **Content Zones**: Areas on the page where components can be placed
- **Components**: Reusable building blocks placed in content zones

## Sitemap

![Sitemap View](../../assets/screenshots/agility-cms/09-sitemap-view.png)

The sitemap shows your site's page hierarchy:
- Pages are organized in a tree structure
- Parent pages contain child pages
- Each page has a URL path

**How to view the sitemap:**
1. Navigate to **Pages** → **Sitemap**
2. Browse the page hierarchy
3. Click on any page to edit it

## Creating a New Page

1. Navigate to **Pages** → **Sitemap**
2. Select where you want to add the new page in the sitemap tree
3. Click **"Add Page"** or the **"+"** button
4. Fill in the page properties:
   - **Title**: Display name for the page
   - **URL Slug**: The URL path (e.g., `/about-us`)
   - **Page Model**: Select a page model (if available)

   > **Note**: "Page Templates" is the old terminology. The current term is "Page Models."
5. Click **"Save"**

## Page Models

**Page Models** define the structure of pages:
- **Content Zones**: Named areas where components can be placed
- **Layout**: How content zones are arranged
- **Metadata**: Default fields for pages

Different page models can have different content zone configurations. For example:
- A "Home Page" model might have zones: "Hero", "Features", "Testimonials"
- A "Blog Post" model might have zones: "Content", "Sidebar"

## Page Editor

![Page Edit View](../../assets/screenshots/agility-cms/13-page-edit-view.png)

When editing a page, you'll see:

### Content Zones

![Page with Content Zones](../../assets/screenshots/agility-cms/21-page-content-zones.png)

**Content Zones** are areas on the page where components can be added:
- Each zone has a name (e.g., "Main Content", "Sidebar")
- Zones are defined by the page model
- You can add multiple components to each zone

### Adding Components to Pages

![Component Picker](../../assets/screenshots/agility-cms/18-component-picker.png)

1. Open the page you want to edit
2. In the page editor, you'll see **Content Zones** (areas where components can be added)
3. Click **"Add Component"** in the desired content zone
4. Select the component type from the list
5. Configure the component's content fields
6. Click **"Save"**

### Editing Components on Pages

![Component Editor](../../assets/screenshots/agility-cms/19-component-editor-form.png)

1. Navigate to **Pages** → **Sitemap**
2. Click on the page you want to edit
3. In the page editor, click on any component to open its content editor
4. Make your changes to the component's fields
5. Click **"Save"** to save the component
6. Click **"Publish"** (or **"Submit for Approval"** if workflow is enabled) to make changes live

## Page Properties

Each page has properties:
- **Title**: Display name
- **URL Slug**: The URL path
- **Page Model**: Which page model this page uses
- **Metadata**: SEO fields (title, description, etc.)
- **Status**: Draft, Published, etc.

## Page Status

Pages have publishing status:
- **Draft**: Not yet published
- **Published**: Live and available
- **Archived**: No longer active

## Best Practices

1. **Plan your sitemap**: Organize pages logically in the hierarchy
2. **Use appropriate page models**: Choose page models that match your content needs
3. **Organize components**: Place components logically in content zones
4. **Test before publishing**: Use preview to check how pages look
5. **Keep URLs clean**: Use descriptive, SEO-friendly URL slugs

---

**Next**: [Components](./06-components.md) - Working with components

