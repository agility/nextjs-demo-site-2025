# Screenshot URLs for Verification

This document lists all URLs that will be captured by the screenshot script. Use this to verify the URLs are correct before running the capture.

**Base URL:** `https://app.agilitycms.com/instance/13f09fe2-u/en-us`

---

## Priority 1 Screenshots (7 total)

### 1. Content Item Edit View
- **File:** `16-content-item-edit-view.png`
- **ID:** `content-item-edit`
- **URL:** `https://app.agilitycms.com/instance/13f09fe2-u/en-us/content/list-38/listitem-92`
- **Description:** Form for creating/editing content items

### 2. Content Item Create View
- **File:** `17-content-item-create-view.png`
- **ID:** `content-item-create`
- **URL:** `https://app.agilitycms.com/instance/13f09fe2-u/en-us/content/list-38`
- **Description:** Empty form for creating new content
- **Note:** Script will click "Add Content" button

### 3. Component Picker
- **File:** `18-component-picker.png`
- **ID:** `component-picker`
- **URL:** `https://app.agilitycms.com/instance/13f09fe2-u/en-us/pages/page-2`
- **Description:** Interface for selecting components to add to a page
- **Note:** Script will click "Add Component" button

### 4. Component Editor Form
- **File:** `19-component-editor-form.png`
- **ID:** `component-editor`
- **URL:** `https://app.agilitycms.com/instance/13f09fe2-u/en-us/pages/page-2/item-75`
- **Description:** Form for editing component content and fields

### 5. Content Picker
- **File:** `20-content-picker.png`
- **ID:** `content-picker`
- **URL:** `https://app.agilitycms.com/instance/13f09fe2-u/en-us/pages/page-2/item-75`
- **Description:** Interface for linking content items to components
- **Note:** Script will click on a linked content field

### 6. Page with Content Zones
- **File:** `21-page-content-zones.png`
- **ID:** `page-content-zones`
- **URL:** `https://app.agilitycms.com/instance/13f09fe2-u/en-us/pages/page-2`
- **Description:** Page editor showing content zones and components

### 7. Publishing Status
- **File:** `25-publishing-status.png`
- **ID:** `publishing-status`
- **URL:** `https://app.agilitycms.com/instance/13f09fe2-u/en-us/content/list-38/listitem-92`
- **Description:** Draft/Published status indicators and workflow

---

## Priority 2 Screenshots (12 total)

### 8. Rich Text Editor
- **File:** `22-rich-text-editor.png`
- **ID:** `rich-text-editor`
- **URL:** `https://app.agilitycms.com/instance/13f09fe2-u/en-us/content/list-38/listitem-92`
- **Description:** Formatting toolbar and editing interface
- **Note:** Script will click into a rich text field

### 9. Asset Manager
- **File:** `23-asset-manager.png`
- **ID:** `asset-manager`
- **URL:** `https://app.agilitycms.com/instance/13f09fe2-u/en-us/media/folder-0`
- **Description:** Image upload and selection interface

### 10. Image Upload Dialog
- **File:** `24-image-upload-dialog.png`
- **ID:** `image-upload-dialog`
- **URL:** `https://app.agilitycms.com/instance/13f09fe2-u/en-us/media/folder-0`
- **Description:** Upload interface for media files
- **Note:** Script will click "Upload" button

### 11. API Keys Section
- **File:** `26-api-keys-section.png`
- **ID:** `api-keys-section`
- **URL:** `https://app.agilitycms.com/instance/13f09fe2-u/en-us/settings/apikeys`
- **Description:** Where to find and manage API keys

### 12. User Management
- **File:** `27-user-management.png`
- **ID:** `user-management`
- **URL:** `https://app.agilitycms.com/instance/13f09fe2-u/en-us/settings/usermanagement`
- **Description:** Interface for managing users and permissions

### 13. Permission Configuration
- **File:** `28-permission-configuration.png`
- **ID:** `permission-config`
- **URL:** `https://app.agilitycms.com/instance/13f09fe2-u/en-us/settings/usermanagement`
- **Description:** Interface for setting user permissions
- **Note:** Script will click "Edit" on a user

### 14. Page Model Definition
- **File:** `29-page-model-definition.png`
- **ID:** `page-model-definition`
- **URL:** `https://app.agilitycms.com/instance/13f09fe2-u/en-us/models/page-models/2`
- **Description:** Configuration of page models and content zones

### 15. Content Model Fields
- **File:** `30-content-model-fields.png`
- **ID:** `content-model-fields`
- **URL:** `https://app.agilitycms.com/instance/13f09fe2-u/en-us/models/contentmodels/11`
- **Description:** Detailed field setup in content models

### 16. Component Model Fields
- **File:** `31-component-model-fields.png`
- **ID:** `component-model-fields`
- **URL:** `https://app.agilitycms.com/instance/13f09fe2-u/en-us/models/component-models/40`
- **Description:** Component model structure

### 17. Webhook Configuration
- **File:** `32-webhook-configuration.png`
- **ID:** `webhook-config`
- **URL:** `https://app.agilitycms.com/instance/13f09fe2-u/en-us/settings/webhooks`
- **Description:** Interface for setting up webhooks

### 18. Preview Mode
- **File:** `33-preview-mode.png`
- **ID:** `preview-mode`
- **URL:** `https://app.agilitycms.com/instance/13f09fe2-u/en-us/pages/page-2`
- **Description:** Interface for previewing content before publishing
- **Note:** Script will click "Preview" button

### 19. Security/Permissions Configuration
- **File:** `35-security-permissions.png`
- **ID:** `security-permissions`
- **URL:** `https://app.agilitycms.com/instance/13f09fe2-u/en-us/content/list-38`
- **Description:** Setting roles and permissions for content lists and pages
- **Note:** Script will click Properties panel, then Security option. Workflows are configured through Security settings by assigning global roles or specific roles on lists/pages.

---

## Priority 3 Screenshots (1 total)

### 20. Content List with Filters
- **File:** `34-content-list-filters.png`
- **ID:** `content-list-filters`
- **URL:** `https://app.agilitycms.com/instance/13f09fe2-u/en-us/content/list-38`
- **Description:** Search and filter functionality
- **Note:** Script will click on search/filter input

---

## URL Summary by Section

### Content Section
- `/content/list-38` - Posts content list
- `/content/list-38/listitem-92` - Specific post edit view

### Pages Section
- `/pages/page-2` - Home page
- `/pages/page-2/item-75` - Component on home page

### Models Section
- `/models/page-models/2` - Page model definition
- `/models/contentmodels/11` - Post content model
- `/models/component-models/40` - A/B Test Hero component model

### Settings Section
- `/settings/apikeys` - API keys management
- `/settings/usermanagement` - User management
- `/settings/webhooks` - Webhook configuration

### Security/Permissions
- Configured via Properties → Security on content lists and pages
- Assign global roles or specific roles per list/page
- No separate workflow settings page

### Assets Section
- `/media/folder-0` - Asset manager (media library)

---

## Verification Checklist

Before running the capture script, verify:

- [ ] All URLs are accessible when logged into Agility CMS
- [ ] Content IDs exist (e.g., `listitem-92` exists in list-38)
- [ ] Page IDs exist (e.g., `page-2` exists)
- [ ] Component container IDs exist (e.g., `item-75` exists on page-2)
- [ ] Settings pages are accessible with your permissions
- [ ] Model IDs are correct (e.g., content model 11, component model 40)

---

## Quick Copy-Paste URLs

For easy verification, here are all URLs in a copy-paste friendly format:

```
https://app.agilitycms.com/instance/13f09fe2-u/en-us/content/list-38/listitem-92
https://app.agilitycms.com/instance/13f09fe2-u/en-us/content/list-38
https://app.agilitycms.com/instance/13f09fe2-u/en-us/pages/page-2
https://app.agilitycms.com/instance/13f09fe2-u/en-us/pages/page-2/item-75
https://app.agilitycms.com/instance/13f09fe2-u/en-us/media/folder-0
https://app.agilitycms.com/instance/13f09fe2-u/en-us/settings/apikeys
https://app.agilitycms.com/instance/13f09fe2-u/en-us/settings/usermanagement
https://app.agilitycms.com/instance/13f09fe2-u/en-us/settings/webhooks
https://app.agilitycms.com/instance/13f09fe2-u/en-us/content/list-38
https://app.agilitycms.com/instance/13f09fe2-u/en-us/models/page-models/2
https://app.agilitycms.com/instance/13f09fe2-u/en-us/models/contentmodels/11
https://app.agilitycms.com/instance/13f09fe2-u/en-us/models/component-models/40
```

---

*Last updated: Based on `scripts/screenshot-config.json`*

