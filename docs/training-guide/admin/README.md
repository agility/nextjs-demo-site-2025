# Agility CMS Training Guide: Administrator

> **Instance**: Demo Site (`13f09fe2-u`)
> **Target Audience**: System administrators and power users managing Agility CMS instances

## Overview

This guide is designed for administrators who need to manage Agility CMS instances, configure settings, manage users, and maintain the content management system.

## Learning Outcomes

By the end of this guide, you will be able to:
- Understand Agility CMS administration interface
- Manage users, roles, and permissions
- Configure instance settings
- Manage content models and component definitions
- Understand security and access control
- Troubleshoot common administrative issues

## Table of Contents

1. [Administration Overview](#1-administration-overview)
2. [User Management](#2-user-management)
3. [Content Model Management](#3-content-model-management)
4. [Component Management](#4-component-management)
5. [Instance Configuration](#5-instance-configuration)
6. [Security and Permissions](#6-security-and-permissions)
7. [Instance-Specific Administration](#7-instance-specific-administration)

---

## 1. Administration Overview

### Understanding Agility CMS Architecture

As an administrator, it's important to understand how Agility CMS is structured. Agility CMS follows a **headless architecture** pattern:

![Agility Headless Architecture Diagram](../concepts/Agility Headless Architecture.png)

*Agility CMS uses a headless architecture where content is managed separately from presentation. Content is created in the Content Manager, exposed through Content APIs, and consumed by frontend applications. Assets are delivered via CDN. This architecture enables multi-channel publishing and independent scaling.*

### Understanding the Data Model

Agility CMS organizes content using a structured data model:

![Agility Data Model Diagram](../concepts/Agility Data Model.png)

*The Agility data model shows how Sitemap organizes Pages, Pages contain Components, and Components display Content Items. Each entity has a corresponding Model that defines its structure. As an administrator, you'll manage these Models (Page Models, Component Models, Content Models) and configure how they relate to each other.*

### Admin Interface Sections

The Agility CMS administration interface is organized into four main sections:

![Agility Sections Diagram](../concepts/Agility Sections.png)

*The Agility CMS interface is organized into: Content (Lists/Items), Assets (Files/Images/PDFs), Pages (Sitemap/Pages/Components), and Web Studio (Preview). As an administrator, you'll work across all these sections to configure and manage the instance.*

**Detailed Interface Areas:**
1. **Content** - Manage content models and content items
2. **Pages** - Manage pages, sitemap, and page models
3. **Components** - Manage component definitions
4. **Assets** - Manage media library
5. **Settings** - Instance configuration
6. **Users** - User and role management
7. **Security** - Access control and API keys

### Admin Capabilities

As an administrator, you can:
- Create and modify content models
- Define component structures
- Manage user accounts and permissions
- Configure instance settings
- Access API keys and security settings
- Manage sitemaps and page models

---

## 2. User Management

Agility CMS uses **User Access** to manage users and grant specific permission-based access to your instance. When adding users, it's important to consider what role they will have in relation to managing your instance and content.

> **Reference**: [Agility CMS User Permissions Documentation](https://agilitycms.com/docs/owners-admins/user-permissions)

### Available Permissions

These are the base-level permissions available in Agility CMS. They can be used to create Custom Roles (Enterprise feature) and are also used in built-in roles:

- **Read** - Grants a user access to "Read" something but not edit it
- **Contribute** - Grants a user access to create something, and edit what they've created, but not something created by someone else
- **Edit** - Grants a user access to change something
- **Approve** - Grants a user access to Approve or Decline something that has been requested for approval
- **Publish** - Grants a user access to Publish or Unpublish something
- **Manage** - Grants a user permission to all settings, models and reports
- **Delete** - Grants a user access to Delete something
- **Design / Develop** - Grants a user access to Models and fields that are marked as "Designer Only"
- **View Reports** - Grants a user access to the reporting section
- **Full Control** - Grants a user full control over an instance, including all user management controls

### Built-in Roles

Agility CMS provides built-in roles that grant specific sets of permissions:

- **None** - User has no access to the instance
- **Reader** - Can see Content, Pages and Assets, but cannot make any changes
- **Contributor** - Can create new items (Pages or Content Items) and Edit the items that they created
- **Editor** - Can create and modify items as well as add and manage components on a page
- **Publisher** - Editor permissions and can publish items
- **Approver** - Editor permissions and can approve items
- **Delete** - Editor permissions and can delete items
- **Designer** - Editor permissions and can create and manage models. Can define what Components appear in the Zones of each Page. Designer also has access to some settings
- **Managers** - Approver, Publisher, Designer and Delete permissions. Can also access all of settings as well as delete Groups and Content Lists
- **Admins** - Full and complete access to the Instance
- **Custom Roles** - Enterprise feature that allows you to create custom roles with specific permission combinations

### Best Practices for Role Assignment

When assigning roles and permissions:

1. **Start with Minimum Permissions** - Begin with the minimum permissions required and add additional roles or permissions as necessary
2. **Consider User Responsibilities** - Choose roles based on what the user needs to do, not what they might do
3. **Use Built-in Roles First** - Built-in roles are designed to cover most common use cases
4. **Custom Roles for Enterprise** - Use Custom Roles (Enterprise feature) only when built-in roles don't meet your needs
5. **Regular Review** - Periodically review user permissions to ensure they're still appropriate

### Managing Users

1. Navigate to **Settings** → **Users** (or **User Access**)
2. View list of all users in your instance
3. Click **"Add User"** to create a new user
4. Fill in user details:
   - Email address
   - Name
   - Role assignment (select from built-in roles or custom roles)
5. Set item-level permissions for specific content models or sections if needed

### Item-Level Permissions

In addition to role-based permissions, Agility CMS supports **Item-Level Permissions** that allow you to:

- Set permissions for specific content models
- Set permissions for specific components
- Set permissions for specific page models
- Set permissions for asset folders
- Grant granular access control beyond role-based permissions

This allows you to fine-tune access control for specific content, pages, or assets while maintaining role-based permissions for general access.

---

## 3. Content Model Management

### Content Models in the Demo Site

The Demo Site includes **24 content models**:

#### Content Items (6)
- Author
- Category
- Carousel Slide
- Global Settings
- AI Search Configuration
- Personalized Hero Item

#### Content Lists (18)
- Post
- Tag
- Bento Card
- Testimonial Item
- FAQ Item
- Pricing Tier
- Stat
- Audience
- Region
- Customer Profile
- Logo Item
- Header
- Footer
- Footer Link
- Footer Social Link
- Nav Link
- Top Level Nav
- A/B Test Hero Item

### Creating Content Models

1. Navigate to **Content** → **Content Models**
2. Click **"Add Content Model"**
3. Choose type:
   - **Content Item** - Single standalone content
   - **Content List** - Collection of content items
4. Define fields:
   - Text fields
   - Rich text fields
   - Image fields
   - Date fields
   - Linked content fields
   - Number fields
   - Boolean fields
5. Set field properties:
   - Required/optional
   - Default values
   - Validation rules
6. Save the content model

### Modifying Content Models

**Important Considerations:**
- Adding fields is safe (doesn't affect existing content)
- Removing fields may cause data loss
- Changing field types may require data migration
- Always test changes in a development environment first

**Best Practices:**
- Plan content models carefully before creation
- Document field purposes and relationships
- Use descriptive field names
- Set appropriate validation rules

### Content Model Relationships

**Linked Content Fields:**
- One-to-one relationships
- One-to-many relationships
- Many-to-many relationships

**Example Relationships in the Demo Site:**
- Post → Author (many-to-one)
- Post → Category (many-to-one)
- Post → Tags (many-to-many)
- BentoSection → BentoCards (parent-child via reference)

---

## 4. Component Management

### Components in the Demo Site

The Demo Site includes **20 component definitions**:

#### Content Display (4)
- Post Listing
- Post Details
- Testimonials
- Team Listing

#### Hero Components (4)
- Hero
- Background Hero
- A/B Test Hero
- Personalized Background Hero

#### Interactive (3)
- Carousel
- Contact Us
- Frequently Asked Questions

#### Layout (3)
- Bento Section
- Logo Strip
- Personalized Logo Strip

#### Data Display (3)
- Company Stats
- Pricing Cards
- Pricing Table

#### Navigation (1)
- Header

### Creating Component Definitions

1. Navigate to **Components** → **Component Definitions**
2. Click **"Add Component"**
3. Define component name and description
4. Add fields:
   - Text fields for headings, descriptions
   - Image fields for graphics
   - Rich text fields for content
   - Linked content fields for relationships
   - Number fields for configuration
5. Set field properties and validation
6. Save component definition

### Component Registration

**Critical:** Component names must match frontend registration.

**Frontend Registration:**
```typescript
// src/components/agility-components/index.ts
{ name: "ComponentName", module: ComponentName }
```

**Naming Rules:**
- Case-insensitive matching
- Spaces converted to no spaces
- Must match exactly (after normalization)

---

## 5. Instance Configuration

### Locale Configuration

The Demo Site supports:
- **English (en-us)** - Default locale
- **French (fr)** - Secondary locale

**Locale Management:**
1. Navigate to **Settings** → **Locales**
2. View configured locales
3. Add new locales as needed
4. Set default locale

### Sitemap Configuration

**Current Sitemap:**
- **Name**: Website
- **ID**: 1
- **Type**: Website
- **Default**: Yes

**Sitemap Management:**
1. Navigate to **Pages** → **Sitemap**
2. View sitemap structure
3. Add/edit/delete pages
4. Configure page models
5. Set up dynamic page routing

### Page Model Configuration

> **Note**: "Page Templates" is the old terminology. The current term is "Page Models."

**Current Page Model:**
- **Main Template** (ID: 2)

**Page Model Management:**
1. Navigate to **Pages** → **Page Models** (may still show as "Page Templates" in the UI)
2. View available page models
3. Configure content zones
4. Define module placement areas

### API Configuration

**API Keys:**
- **Fetch Key** - For production content access
- **Preview Key** - For draft content access
- **Security Key** - For webhook validation

**API Key Management:**
1. Navigate to **Settings** → **API Keys**
2. View current keys
3. Regenerate keys if compromised
4. Configure key permissions

**Security Best Practices:**
- Never share API keys publicly
- Rotate keys periodically
- Use different keys for different environments
- Restrict key permissions when possible

---

## 6. Security and Permissions

### Access Control

**Role-Based Access:**
- Agility CMS uses built-in roles (Reader, Contributor, Editor, Publisher, Approver, Delete, Designer, Managers, Admins)
- Assign users to appropriate roles based on their responsibilities
- Custom Roles available for Enterprise customers
- Start with minimum permissions and add as needed

**Item-Level Permissions:**
- Set permissions for specific content models
- Set permissions for specific components
- Set permissions for specific page models
- Set permissions for asset folders
- Fine-tune access control beyond role-based permissions

**Content-Level Security:**
- Restrict access to specific content models
- Set read/edit/delete permissions based on roles
- Configure publishing and approval permissions
- Use Contribute permission to allow users to edit only their own content

### API Security

**API Key Security:**
- Use HTTPS for all API calls
- Rotate keys regularly
- Monitor API usage
- Set up rate limiting if needed

**Webhook Security:**
- Validate webhook signatures
- Use security keys for validation
- Whitelist webhook endpoints

### Best Security Practices

1. **User Management**
   - Use strong passwords
   - Enable two-factor authentication if available
   - Regularly review user access and roles
   - Start with minimum permissions (Reader, Contributor) and add as needed
   - Remove inactive users
   - Use appropriate built-in roles before creating custom roles

2. **API Security**
   - Never commit API keys to version control
   - Use environment variables
   - Rotate keys periodically
   - Monitor for unauthorized access

3. **Content Security**
   - Set appropriate permissions
   - Review content before publishing
   - Use approval workflows for sensitive content

---

## 7. Instance-Specific Administration

### Content Model Administration

**Blog System:**
- **Post** content model - Main blog content
- **Author** content model - Post authors
- **Category** content model - Post categories
- **Tag** content model - Post tags

**Administration Tasks:**
- Manage blog post content
- Create and maintain authors
- Organize categories and tags
- Configure post relationships

**Personalization System:**
- **Audience** content model - Target audiences
- **Region** content model - Geographic regions
- **Customer Profile** content model - Customer data

**Administration Tasks:**
- Define audience segments
- Configure regions
- Manage customer profiles
- Set up personalization rules

### Component Administration

**Hero Components:**
- Multiple hero variants for different use cases
- A/B testing support
- Personalization support

**Administration Tasks:**
- Configure hero component fields
- Set up A/B test experiments
- Configure personalization rules

**Content Display Components:**
- Post Listing, Post Details
- Testimonials, Team Listing

**Administration Tasks:**
- Configure display settings
- Set up filtering and sorting
- Configure pagination

### Page Administration

**Current Page Structure:**
```
Home (/home)
About Us (/about-us)
Pricing (/pricing)
Blog (/blog)
  └── Post Details (Dynamic: Posts)
Features (/features)
Contact Us (/contact-us)
```

**Administration Tasks:**
- Manage page structure
- Configure page models
- Set up dynamic page routing
- Manage URL slugs and redirects

### Integration Administration

**Next.js Integration:**
- API keys configured in environment variables
- Component registration in frontend code
- Caching configuration

**Administration Tasks:**
- Verify API key configuration
- Monitor API usage
- Configure webhook endpoints
- Manage cache invalidation

**AI Search Integration:**
- AI Search Configuration content model
- Azure OpenAI integration
- Algolia search integration

**Administration Tasks:**
- Configure AI search settings
- Manage search prompts
- Monitor search performance

### Monitoring and Maintenance

**Content Health:**
- Review content model usage
- Identify unused content
- Clean up orphaned content
- Monitor content relationships

**Performance Monitoring:**
- API response times
- Asset delivery performance
- Cache hit rates
- Error rates

**Regular Maintenance:**
- Review and update content models
- Clean up unused assets
- Archive old content
- Update component definitions

---

## Common Administrative Tasks

### Task: Add a New Content Model

1. Navigate to **Content** → **Content Models**
2. Click **"Add Content Model"**
3. Choose Content Item or Content List
4. Define fields and properties
5. Save and configure permissions

### Task: Create a New Component

1. Navigate to **Components** → **Component Definitions**
2. Click **"Add Component"**
3. Define component name and fields
4. Save component
5. Register in frontend code

### Task: Configure User Permissions

1. Navigate to **Settings** → **Users** (or **User Access**)
2. Select user to edit
3. Assign a built-in role (Reader, Contributor, Editor, Publisher, Approver, Delete, Designer, Managers, Admins) or a Custom Role
4. Configure item-level permissions for specific content models if needed
5. Review and ensure permissions match the user's responsibilities
6. Save changes

**Example Scenarios:**
- **Content Editor**: Assign "Editor" role for general content editing
- **Blog Author**: Assign "Contributor" role so they can create and edit their own posts
- **Content Publisher**: Assign "Publisher" role to allow publishing content
- **Designer**: Assign "Designer" role to allow model and component management
- **Administrator**: Assign "Admins" role for full instance access

### Task: Manage API Keys

1. Navigate to **Settings** → **API Keys**
2. View current keys
3. Regenerate if needed
4. Update frontend environment variables
5. Test API access

### Task: Configure Locales

1. Navigate to **Settings** → **Locales**
2. View current locales
3. Add new locale if needed
4. Set default locale
5. Configure locale-specific content

---

## Troubleshooting

### Common Issues

**Issue: Component Not Appearing**
- Check component name matches frontend registration
- Verify component is saved and published
- Check user permissions

**Issue: Content Not Loading**
- Verify API keys are correct
- Check content is published (not draft)
- Verify locale matches content locale

**Issue: Permission Denied**
- Check user's assigned role (Reader, Contributor, Editor, etc.)
- Verify item-level permissions for specific content models
- Check if user has appropriate permission (Read, Edit, Publish, etc.) for the action
- Ensure user has "Contribute" permission if trying to edit their own content
- Verify "Design/Develop" permission if accessing designer-only fields

**Issue: API Errors**
- Verify API keys are valid
- Check network connectivity
- Review API rate limits
- Check webhook configuration

---

## Best Practices for Administrators

1. **Documentation**
   - Document content model purposes
   - Record component usage
   - Maintain user permission matrix
   - Document custom configurations

2. **Security**
   - Regularly review user access
   - Rotate API keys periodically
   - Monitor for suspicious activity
   - Use strong authentication

3. **Content Management**
   - Establish content governance
   - Set up approval workflows
   - Regular content audits
   - Archive old content

4. **Performance**
   - Monitor API usage
   - Optimize content models
   - Clean up unused assets
   - Review caching strategies

---

## Next Steps

After completing this guide, you should:
1. Review current user permissions
2. Audit content models and components
3. Verify API key security
4. Set up monitoring and alerts
5. Document instance configuration

**You're ready when you can:**
- Manage users and permissions confidently
- Create and modify content models
- Configure components and pages
- Troubleshoot administrative issues
- Maintain instance security and performance

---

*This guide is specific to the Demo Site instance (`13f09fe2-u`). For generic Agility CMS concepts, see the [Concept Guides](../concepts/README.md).*

