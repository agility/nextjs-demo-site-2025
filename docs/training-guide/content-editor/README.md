# Agility CMS Training Guide: Content Editor

> **Instance**: Demo Site (`13f09fe2-u`)
> **Target Audience**: Content Editors responsible for creating, editing, and managing content

## Overview

This guide is designed for Content Editors who will be responsible for creating, editing, and managing content within the Agility CMS instance. You'll learn how to work with pages, modules, content items, and media to build and maintain the website.

## Learning Outcomes

By the end of this guide, you will be able to:
- Navigate the Agility CMS interface confidently
- Create and edit pages using modules
- Manage reusable content items
- Upload and organize media assets
- Preview and publish content
- Understand the relationship between pages, modules, and content

## Table of Contents

1. [Introduction to Agility CMS](#1-introduction-to-agility-cms)
2. [Navigating the Interface](#2-navigating-the-interface)
3. [Understanding Pages and Modules](#3-understanding-pages-and-modules)
4. [Working with Content Items](#4-working-with-content-items)
5. [Media Management](#5-media-management)
6. [Previewing and Publishing](#6-previewing-and-publishing)
7. [Instance-Specific Content Models](#7-instance-specific-content-models)

---

## 1. Introduction to Agility CMS

Agility CMS is a **headless content management system** that separates content management from presentation. This means:

- **Content is reusable**: Create content once, use it anywhere
- **Flexible presentation**: The same content can appear on websites, mobile apps, or other platforms
- **Modular approach**: Pages are built using reusable modules (components)

### Understanding Headless Architecture

Agility CMS follows a headless architecture pattern, where content management is completely separate from content delivery:

![Agility Headless Architecture Diagram](../assets/concepts/Agility%20Headless%20Architecture.png)

*In a headless architecture, content is created in the Content Manager, exposed through Content APIs, and consumed by various frontend applications (websites, mobile apps) which then deliver the experience to end-user devices. Assets are delivered directly via a CDN for optimal performance.*

**Key Benefits:**
- **Multi-channel publishing**: Same content for web, mobile, and other platforms
- **Technology freedom**: Use any frontend framework or technology
- **Performance**: CDN delivery and optimized asset management
- **Scalability**: Scale content management and frontend independently

### Understanding the Data Model

Agility CMS organizes content using a structured data model that separates content from presentation:

![Agility Data Model Diagram](../assets/concepts/Agility%20Data%20Model.png)

*The Agility data model shows how a Sitemap organizes Pages, Pages contain Components, and Components display Content Items. Each entity (Page, Component, Content) has a corresponding Model that defines its structure. This separation allows content to be reused across multiple pages and components.*

**Key Relationships:**
- **Sitemap** → Maps URLs to Pages
- **Pages** → Contain multiple Components/Modules
- **Components** → Display Content Items
- **Content Items** → Standalone, reusable pieces of content

### Understanding the Interface

The Agility CMS interface is organized into four main sections:

![Agility Sections Diagram](../assets/concepts/Agility%20Sections.png)

*The Agility CMS interface is organized into four main sections:*
- **Content**: Manage Lists and Items (reusable content)
- **Assets**: Manage Files, Images, and PDFs (media library)
- **Pages**: Manage Sitemap, Pages, and Components (page structure)
- **Web Studio**: Preview content before publishing

### Key Concepts

**Pages** → Individual web pages organized in a sitemap
**Modules** → Reusable components that display content on pages
**Content Items** → Standalone pieces of content that can be linked to modules
**Media** → Images, documents, and other digital assets

---

## 2. Navigating the Interface

Upon logging into Agility CMS, you'll see the main navigation with these key areas:

![Agility CMS Dashboard](../assets/screenshots/agility-cms/01-dashboard-home.png)

*The Agility CMS dashboard provides an overview of your content and quick access to key sections.*

### Main Sections

1. **Pages** - Manage your website's page structure and content
2. **Content** - Create and manage reusable content items
3. **Assets** - Upload and organize media files
4. **Web Studio** - Preview your content before publishing

### Dashboard Overview

The dashboard provides quick access to:
- Recent pages and content items
- Publishing status
- Quick actions for common tasks

---

## 3. Understanding Pages and Modules

### What is a Page?

A **Page** represents an individual web page on your site. Pages are organized in a **Sitemap**, which defines your site's navigation structure.

### What is a Module?

A **Module** (also called a Component) is a reusable building block that displays content on a page. Think of modules as LEGO blocks—you combine different modules to build a complete page.

**Common Modules in the Demo Site:**
- **RichTextArea** - For formatted text content
- **BackgroundHero** - Hero section with background image
- **BentoSection** - Animated grid of cards
- **PostListing** - Blog post listings
- **Testimonials** - Customer testimonials
- **PricingCards** - Pricing information
- **Carousel** - Image/content carousel
- **ContactUs** - Contact form

### Creating a New Page

![Sitemap View](../assets/screenshots/agility-cms/09-sitemap-view.png)

*The sitemap shows the structure of your website. Pages are organized hierarchically.*

1. Navigate to **Pages** → **Sitemap**
2. Select where you want to add the new page in the sitemap tree
3. Click **"Add Page"** or the **"+"** button
4. Fill in the page properties:
   - **Title**: Display name for the page
   - **URL Slug**: The URL path (e.g., `/about-us`)
   - **Page Model**: Select a page model (if available)

   > **Note**: "Page Templates" is the old terminology. The current term is "Page Models."
5. Click **"Save"**

### Adding Modules to a Page

1. Open the page you want to edit
2. In the page editor, you'll see **Content Zones** (areas where modules can be added)
3. Click **"Add Module"** in the desired content zone
4. Select the module type from the list
5. Configure the module's content fields
6. Click **"Save"**

### Editing Page Content

1. Navigate to **Pages** → **Sitemap**
2. Click on the page you want to edit
3. In the page editor, click on any module to open its content editor
4. Make your changes to the module's fields
5. Click **"Save"** to save the module
6. Click **"Publish"** (or **"Submit for Approval"** if workflow is enabled) to make changes live

---

## 4. Working with Content Items

**Content Items** are standalone pieces of content that can be reused across multiple pages or modules. This is one of Agility CMS's most powerful features.

### Why Use Content Items?

- **Reusability**: Update content in one place, see changes everywhere it's used
- **Consistency**: Ensure brand messaging and data stay consistent
- **Efficiency**: Don't duplicate content across pages

### Content Models in the Demo Site

Based on the Demo Site structure, you'll work with these content types:

#### Blog Content
- **Posts** - Individual blog posts with:
  - Heading, slug, post date
  - Content (rich text)
  - Featured image
  - Category (linked content)
  - Author (linked content)
  - Tags (multiple linked items)

![Posts Content List](../assets/screenshots/agility-cms/03-content-posts-list.png)

*The Posts content list shows all blog posts. Click on any post to edit it.*

- **Authors** - Blog post authors with:
  - Name
  - Headshot image

![Authors Content List](../assets/screenshots/agility-cms/04-content-authors-list.png)

*Authors are managed as reusable content items that can be linked to multiple posts.*

- **Categories** - Blog categories with:
  - Name

![Categories Content List](../assets/screenshots/agility-cms/05-content-categories-list.png)

*Categories help organize blog posts by topic.*

- **Tags** - Blog tags for organizing posts

#### Personalization Content
- **Audiences** - Target audience segments with:
  - Name
  - Description
  - Icon image

- **Regions** - Geographic regions for content targeting

#### Other Content Types
- **Bento Cards** - Cards used in Bento sections
- **Testimonials** - Customer testimonials
- **Pricing Tiers** - Pricing information
- **Team Members** - Team member profiles

### Creating a Content Item

1. Navigate to **Content**
2. Select the content model you want to work with (e.g., "Posts", "Authors")
3. Click **"Add Content"** or the **"+"** button
4. Fill in all required fields
5. For linked content fields (like Author or Category), click to select from existing items or create new ones
6. Click **"Save"**

### Editing Content Items

1. Navigate to **Content**
2. Select the content model
3. Click on the content item you want to edit
4. Make your changes
5. Click **"Save"**

### Linking Content Items to Modules

When editing a module that supports linked content:
1. Open the module editor
2. Find the field that accepts linked content (often labeled with a link icon)
3. Click to open the content picker
4. Select the content item(s) you want to link
5. Save the module

---

## 5. Media Management

The **Assets** section is where you manage all digital files used on your site.

### Uploading Media

1. Navigate to **Assets**
2. Select the folder where you want to upload (or create a new folder)
3. Click **"Upload"** or drag and drop files
4. Supported formats include:
   - Images: JPG, PNG, GIF, WebP, SVG
   - Documents: PDF, DOC, DOCX
   - Other file types as configured

### Organizing Media

- **Create Folders**: Organize assets by category, project, or date
- **Rename Files**: Click on a file to rename it
- **Delete Files**: Select files and click delete (be careful—this affects all pages using the asset)

### Using Media in Content

When editing modules or content items:
1. Click on an image field
2. Select **"Choose from Library"** or **"Upload New"**
3. Browse or search your media library
4. Select the image you want to use
5. Optionally add alt text for accessibility

### Best Practices

- **Use descriptive filenames**: `hero-image-homepage.jpg` is better than `IMG_1234.jpg`
- **Optimize images**: Compress large images before uploading
- **Organize in folders**: Keep assets organized for easy finding
- **Add alt text**: Always provide alternative text for images for accessibility

---

## 6. Previewing and Publishing

### Previewing Content

Before publishing, always preview your changes:

1. From any page or content item editor, click **"Preview"**
2. This opens Web Studio, showing how your content will appear
3. Review the preview on different device sizes if available
4. Make any necessary adjustments

### Publishing Workflow

The publishing process depends on your instance's workflow configuration:

#### Direct Publishing (if enabled)
1. Make your changes
2. Click **"Publish"**
3. Content goes live immediately

#### Approval Workflow (if enabled)
1. Make your changes
2. Click **"Submit for Approval"**
3. A content publisher or administrator reviews and approves
4. Content goes live after approval

### Understanding Publishing States

- **Draft**: Content is saved but not published
- **Published**: Content is live on the website
- **Pending Approval**: Content is submitted but awaiting review

---

## 7. Instance-Specific Content Models

### Blog System

The Demo Site includes a complete blog system:

**Creating a Blog Post:**
1. Navigate to **Content** → **Posts**

![Posts Content List](../assets/screenshots/agility-cms/03-content-posts-list.png)

2. Click **"Add Content"**
3. Fill in:
   - **Heading**: The post title
   - **Slug**: URL-friendly version (auto-generated from heading)
   - **Post Date**: Publication date
   - **Content**: The main post content (rich text)
   - **Image**: Featured image
   - **Category**: Select or create a category
   - **Author**: Select or create an author
   - **Tags**: Select multiple tags
4. Save and publish

**Blog posts automatically appear** in the blog listing page when published.

![Blog Listing Page](../assets/screenshots/website/06-blog-listing.png)

*Published blog posts appear on the blog listing page automatically.*

### Personalization Features

The Demo Site supports **audience and region personalization**:

- Content can be targeted to specific **Audiences** (e.g., Enterprise, SMB)
- Content can be targeted to specific **Regions** (e.g., North America, Europe)
- When editing modules, you may see audience/region targeting options

### Available Modules Reference

| Module | Purpose | Key Fields |
|--------|---------|------------|
| **RichTextArea** | Formatted text content | Rich text editor |
| **BackgroundHero** | Hero section with background | Heading, description, background image, CTA |
| **BentoSection** | Animated card grid | Heading, subheading, linked Bento Cards |
| **PostListing** | Blog post listings | Category filter, pagination |
| **PostDetails** | Individual blog post | Auto-populated from Post content |
| **Testimonials** | Customer testimonials | Testimonial content items |
| **PricingCards** | Pricing information | Pricing tier content items |
| **Carousel** | Image/content carousel | Images, captions, links |
| **ContactUs** | Contact form | Form fields, submission handling |
| **TeamListing** | Team member display | Team member content items |
| **CompanyStats** | Statistics display | Numbers, labels, animations |
| **LogoStrip** | Logo display | Logo images |
| **ABTestHero** | A/B testing hero | Variants, experiment key |

---

## Common Tasks Quick Reference

### Task: Update the Homepage Hero Section

![Homepage](../assets/screenshots/website/01-homepage.png)

*The homepage displays various modules including hero sections.*

1. Navigate to **Pages** → **Sitemap**
2. Click on **Home** page
3. Find the **BackgroundHero** or **Hero** module
4. Click to edit
5. Update heading, description, image, or CTA
6. Save and publish

### Task: Create a New Blog Post

1. Navigate to **Content** → **Posts**
2. Click **"Add Content"**
3. Fill in all fields
4. Link to an Author and Category
5. Add Tags
6. Save and publish

### Task: Add a New Page to the Site

1. Navigate to **Pages** → **Sitemap**
2. Select parent page (or root)
3. Click **"Add Page"**
4. Enter title and URL slug
5. Add modules to build the page
6. Save and publish

### Task: Update Reusable Content

1. Navigate to **Content**
2. Select the content model (e.g., "Authors")
3. Click on the item to edit
4. Make changes
5. Save—changes appear everywhere the content is used

---

## Tips and Best Practices

1. **Always preview before publishing** - Catch errors before they go live
2. **Use content items for reusable data** - Don't duplicate content across pages
3. **Organize media in folders** - Makes finding assets easier
4. **Use descriptive names** - For pages, content items, and media files
5. **Test on different devices** - Use preview to check mobile responsiveness
6. **Keep content consistent** - Use the same tone and style across pages
7. **Link related content** - Use linked content fields to connect related items

---

## Getting Help

- **Documentation**: Check Agility CMS documentation for detailed feature guides
- **Support**: Contact your administrator for instance-specific questions
- **Web Studio**: Use the preview feature to see how changes look before publishing

---

## Next Steps

After completing this guide, you should:
1. Practice creating a new page with multiple modules
2. Create a blog post with all required fields
3. Upload and organize media assets
4. Preview and publish content

**You're ready when you can:**
- Create and edit pages independently
- Manage content items and understand their relationships
- Upload and use media effectively
- Preview and publish content confidently

---

*This guide is specific to the Demo Site instance (`13f09fe2-u`). For generic Agility CMS concepts, see the [Concept Guides](../assets/concepts/README.md).*

