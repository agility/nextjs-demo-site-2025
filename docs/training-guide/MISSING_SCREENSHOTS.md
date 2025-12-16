# Missing Screenshots Analysis

This document identifies screenshots that would significantly improve training clarity and user understanding.

## Priority 1: Critical Workflow Screenshots

### Content Editor Workflows

#### 1. Content Item Edit View (Creating/Editing Content)
**Why needed:** Shows the actual form interface for creating/editing content items
**Where:** Content Editor guide - "Creating a Content Item" section
**URL Pattern:** `/content/list-{container-id}/listitem-{content-id}` or new item creation
**What to capture:**
- Empty form for creating new content item
- Form with fields filled out (showing different field types)
- Required vs optional field indicators
- Save/Publish buttons

#### 2. Component Picker/Selector
**Why needed:** Shows how to add a component to a page
**Where:** Content Editor guide - "Adding Components to a Page" section
**URL Pattern:** `/pages/page-{page-id}` (in edit mode, clicking "Add Component")
**What to capture:**
- Content zone with "Add Component" button
- Component picker modal/dropdown showing available components
- Component selection interface

#### 3. Component Editor/Form
**Why needed:** Shows how to edit component content and fields
**Where:** Content Editor guide - "Editing Page Content" section
**URL Pattern:** `/pages/page-{page-id}/item-{container-id}`
**What to capture:**
- Component edit form with fields
- Different field types (text, rich text, image, linked content)
- Save button and component placement

#### 4. Content Picker (Linking Content)
**Why needed:** Shows how to link content items to components
**Where:** Content Editor guide - "Linking Content Items to Components" section
**URL Pattern:** Within component edit form, clicking a linked content field
**What to capture:**
- Content picker modal/dialog
- List of available content items
- Search/filter functionality
- Selection interface

#### 5. Rich Text Editor
**Why needed:** Shows the rich text editing interface
**Where:** Content Editor guide - "Working with Content Items" section
**URL Pattern:** Any rich text field in content or component edit forms
**What to capture:**
- Rich text editor toolbar
- Formatting options
- Link insertion
- Image insertion in rich text

#### 6. Image Upload/Asset Manager
**Why needed:** Shows how to upload and select images
**Where:** Content Editor guide - "Media Management" section
**URL Pattern:** `/media/folder-0` or within image field picker
**What to capture:**
- Asset manager interface
- Upload dialog
- Image selection/gallery view
- Image properties (alt text, etc.)

#### 7. Page with Content Zones Visible
**Why needed:** Shows the page structure with content zones
**Where:** Content Editor guide - "Understanding Pages and Components" section
**URL Pattern:** `/pages/page-{page-id}` in edit mode
**What to capture:**
- Page editor showing content zones
- Components placed in zones
- Zone labels/names
- Add Component buttons in each zone

#### 8. Publishing Workflow/Status
**Why needed:** Shows the publishing process and status indicators
**Where:** Content Editor guide - "Previewing and Publishing" section
**URL Pattern:** Any content item or page with publish status
**What to capture:**
- Draft/Published status indicators
- Publish button and workflow
- Approval workflow (if enabled)
- Status badges

#### 9. Preview Mode
**Why needed:** Shows how to preview content before publishing
**Where:** Content Editor guide - "Previewing and Publishing" section
**URL Pattern:** Preview button or Web Studio
**What to capture:**
- Preview interface
- Preview vs published comparison
- Preview controls

---

### Developer Workflows

#### 10. API Keys Section
**Why needed:** Shows where to find/manage API keys
**Where:** Developer guide - "Environment Variables" section
**URL Pattern:** Settings/API Keys section
**What to capture:**
- API keys list
- Fetch key and Preview key
- Key generation/regeneration interface

#### 11. Webhook Configuration
**Why needed:** Shows how to configure webhooks
**Where:** Developer guide - "Revalidation" section
**URL Pattern:** Settings/Webhooks section
**What to capture:**
- Webhook list
- Webhook creation form
- Webhook configuration options

#### 12. Content Model Field Configuration
**Why needed:** Shows detailed field setup in content models
**Where:** Developer guide - "Content Models" section
**URL Pattern:** `/models/contentmodels/{model-id}`
**What to capture:**
- Field list in content model
- Field properties panel
- Field type selection
- Validation rules

---

### Administrator Workflows

#### 13. User Management Interface
**Why needed:** Shows how to manage users and permissions
**Where:** Admin guide - "User Management" section
**URL Pattern:** Settings/Users section
**What to capture:**
- User list
- User creation form
- Permission assignment interface
- Role selection

#### 14. Permission/Role Configuration
**Why needed:** Shows permission settings in detail
**Where:** Admin guide - "User Permissions" section
**URL Pattern:** User edit or role configuration
**What to capture:**
- Permission checkboxes/grid
- Role assignment
- Permission inheritance

#### 15. Page Model Definition
**Why needed:** Shows how page models are configured
**Where:** Admin guide - "Page Models" section
**URL Pattern:** `/models/page-models/{model-id}`
**What to capture:**
- Page model definition
- Content zone configuration
- Zone placement areas

#### 16. Security/Permissions Configuration
**Why needed:** Shows how to configure roles and permissions for content lists and pages (workflows are configured through Security, not a separate page)
**Where:** Admin guide - "User Permissions" and workflow sections
**URL Pattern:** Content list or page → Properties panel → Security option
**What to capture:**
- Security/permissions interface
- Role assignment options
- Global vs specific role settings
- Permission configuration
**Note:** Workflows are configured by assigning global roles or specific roles on lists/pages under the "Security" action, not via a separate workflow settings page.

---

## Priority 2: Enhanced Understanding Screenshots

### Content Editor

#### 17. Content List with Filters/Search
**Why needed:** Shows how to find content in large lists
**Where:** Content Editor guide - "Working with Content Items" section
**URL Pattern:** `/content/list-{container-id}` with search active
**What to capture:**
- Search bar
- Filter options
- Sort options
- Results display

#### 18. Bulk Actions on Content
**Why needed:** Shows how to manage multiple items
**Where:** Content Editor guide - "Working with Content Items" section
**URL Pattern:** `/content/list-{container-id}` with items selected
**What to capture:**
- Checkbox selection
- Bulk action menu
- Bulk operations

#### 19. Content Relationships View
**Why needed:** Shows how content items are linked
**Where:** Content Editor guide - "Linking Content Items" section
**URL Pattern:** Content item detail showing relationships
**What to capture:**
- Linked content display
- Relationship indicators
- Navigation to linked items

#### 20. Media Library Organization
**Why needed:** Shows asset organization
**Where:** Content Editor guide - "Media Management" section
**URL Pattern:** `/media/folder-0` with folders/categories
**What to capture:**
- Folder structure
- Asset grid/list view
- Asset metadata

---

### Developer

#### 21. Component Model Field Configuration
**Why needed:** Shows component model structure in detail
**Where:** Developer guide - "Component Development" section
**URL Pattern:** `/models/component-models/{model-id}`
**What to capture:**
- Component model fields
- Field types and properties
- Component model settings

#### 22. Sitemap API Response (JSON)
**Why needed:** Shows actual API response structure
**Where:** Developer guide - "API Basics" section
**URL Pattern:** API endpoint response
**What to capture:**
- JSON response in browser/Postman
- Response structure
- Data format

#### 23. Cache Tags in Network Tab
**Why needed:** Shows how caching works
**Where:** Developer guide - "Caching" section
**URL Pattern:** Browser DevTools Network tab
**What to capture:**
- Network request showing cache headers
- Cache tags in response
- Cache status

---

### Administrator

#### 24. Instance Settings Overview
**Why needed:** Shows main configuration areas
**Where:** Admin guide - "Administration Overview" section
**URL Pattern:** Settings main page
**What to capture:**
- Settings navigation
- Configuration sections
- Instance information

#### 25. Locale/Language Configuration
**Why needed:** Shows how locales are configured
**Where:** Admin guide - "Internationalization" section
**URL Pattern:** Settings/Locales section
**What to capture:**
- Locale list
- Locale configuration
- Default locale settings

---

## Priority 3: Nice-to-Have Screenshots

### General

#### 26. Error Messages
**Why needed:** Helps users understand common errors
**Where:** All guides - Troubleshooting sections
**What to capture:**
- Validation errors
- Permission errors
- API errors
- Save errors

#### 27. Empty States
**Why needed:** Shows what users see when starting fresh
**Where:** All guides - Getting Started sections
**What to capture:**
- Empty content list
- Empty page
- Empty sitemap
- Empty asset library

#### 28. Search Functionality
**Why needed:** Shows global search
**Where:** All guides - Navigation sections
**What to capture:**
- Global search bar
- Search results
- Search filters

#### 29. Notification/Alert System
**Why needed:** Shows system feedback
**Where:** All guides - Workflow sections
**What to capture:**
- Success notifications
- Error alerts
- Warning messages
- Info messages

#### 30. Keyboard Shortcuts Help
**Why needed:** Shows available shortcuts
**Where:** All guides - Navigation sections
**What to capture:**
- Keyboard shortcuts dialog
- Help menu
- Tooltips

---

## Screenshot Capture Recommendations

### For Content Editor Workflows:
1. **Content Item Edit View** - Most critical, used in multiple sections
2. **Component Picker** - Essential for understanding page building
3. **Component Editor** - Shows how to edit component content
4. **Content Picker** - Critical for linking content
5. **Page with Content Zones** - Visual representation of page structure

### For Developer Workflows:
1. **API Keys Section** - Needed for setup
2. **Webhook Configuration** - Important for revalidation
3. **Component Model Definition** - Shows component structure

### For Administrator Workflows:
1. **User Management** - Core admin function
2. **Permission Configuration** - Critical for security
3. **Page Model Definition** - Shows page structure setup

### For Enhanced Understanding:
1. **Rich Text Editor** - Common task
2. **Image Upload** - Common task
3. **Publishing Workflow** - Important process
4. **Preview Mode** - Quality assurance

---

## Implementation Priority

**Phase 1 (Critical - Do First):**
- Content Item Edit View
- Component Picker/Selector
- Component Editor/Form
- Content Picker
- Page with Content Zones
- Publishing Workflow/Status

**Phase 2 (High Value):**
- Rich Text Editor
- Image Upload/Asset Manager
- API Keys Section
- User Management Interface
- Permission Configuration

**Phase 3 (Enhanced):**
- Content List with Filters
- Webhook Configuration
- Preview Mode
- Page Model Definition
- Security/Permissions Configuration

**Phase 4 (Nice-to-Have):**
- Error Messages
- Empty States
- Search Functionality
- Notification System

---

## Notes

- All screenshots should be captured at 1920x1080 or higher resolution
- Use consistent browser/OS for consistency
- Include annotations/arrows for complex workflows
- Capture both empty and filled states where relevant
- Show error states for troubleshooting sections
- Use consistent naming: `##-description.png` format

