# Navigating the Agility CMS Interface

This guide explains how to navigate the Agility CMS interface. The interface structure is consistent across all Agility CMS instances.

## Main Navigation Areas

Upon logging into Agility CMS, you'll see the main navigation with these key areas:

![Agility CMS Dashboard](https://cdn.aglty.io/agility-cms-docs/images/training-guide/assets/screenshots/agility-cms/01-dashboard-home.png)

*The Agility CMS dashboard provides an overview of your content and quick access to key sections.*

### Main Sections

1. **Pages** - Manage your website's page structure and content
2. **Content** - Create and manage reusable content items
3. **Assets** - Upload and organize media files
4. **Web Studio** - Preview your content before publishing

## Dashboard Overview

The dashboard provides quick access to:
- Recent pages and content items
- Publishing status
- Quick actions for common tasks

## Content Section Navigation

![Content Section Overview](https://cdn.aglty.io/agility-cms-docs/images/training-guide/assets/screenshots/agility-cms/02-content-section-overview.png)

The Content section is where you manage reusable content items.

### Content Lists

Content items are organized into **Content Lists**. Each content list contains items of a specific type (e.g., "Posts", "Authors", "Testimonials").

**How to navigate:**
1. Click **Content** in the main navigation
2. You'll see a list of available content lists
3. Click on a content list to view its items
4. Click on an item to edit it

### Content List Features

- **Search**: Use the search bar to find specific items
- **Filters**: Filter items by various criteria
- **Sort**: Sort items by different fields
- **Bulk Actions**: Select multiple items for bulk operations

## Pages Section Navigation

![Pages Section](https://cdn.aglty.io/agility-cms-docs/images/training-guide/assets/screenshots/agility-cms/08-pages-section.png)

The Pages section is where you manage your site's page structure.

### Sitemap View

![Sitemap View](https://cdn.aglty.io/agility-cms-docs/images/training-guide/assets/screenshots/agility-cms/09-sitemap-view.png)

The sitemap shows your site's page hierarchy:
- Pages are organized in a tree structure
- Parent pages contain child pages
- Each page has a URL path

**How to navigate:**
1. Click **Pages** in the main navigation
2. Click **Sitemap** to view the page hierarchy
3. Click on any page to edit it

### Page Editor

When editing a page, you'll see:
- **Content Zones**: Areas where components can be added
- **Components**: Components already placed on the page
- **Page Properties**: Title, URL, metadata, etc.

## Assets Section Navigation

![Assets Section](https://cdn.aglty.io/agility-cms-docs/images/training-guide/assets/screenshots/agility-cms/11-assets-section.png)

The Assets section is where you manage media files.

**How to navigate:**
1. Click **Assets** in the main navigation
2. Browse folders to organize files
3. Upload new files or manage existing ones

## Components Section Navigation

![Components Section](https://cdn.aglty.io/agility-cms-docs/images/training-guide/assets/screenshots/agility-cms/10-components-section.png)

The Components section shows available component definitions.

**Note**: You typically work with components by adding them to pages, not by managing them directly in this section.

## URL Patterns

Agility CMS uses consistent URL patterns for navigation:

- **Content List**: `/content/list-{container-id}`
- **Content Item**: `/content/list-{container-id}/listitem-{content-id}`
- **Page**: `/pages/page-{page-id}`
- **Component on Page**: `/pages/page-{page-id}/item-{container-id}`
- **Assets**: `/media/folder-{folder-id}`

For detailed URL patterns, see the [URL Patterns Reference](../../AGILITY_CMS_URL_PATTERNS.md).

## Search Functionality

Agility CMS includes a global search feature:
- Use the search bar at the top of the interface
- Search across content items, pages, and assets
- Filter results by type

## Keyboard Shortcuts

Common keyboard shortcuts:
- Use Tab to navigate between fields
- Use Enter to save
- Use Escape to cancel or close dialogs

---

**Next**: [Content Basics](./04-content-basics.md) - Creating and managing content items

