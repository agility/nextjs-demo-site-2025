# Publishing Workflow

This guide explains the publishing workflow in Agility CMS, including how to publish content, manage drafts, and understand approval processes.

## Content Status

Content items and pages have publishing status:

![Publishing Status](../../assets/screenshots/agility-cms/25-publishing-status.png)

- **Draft**: Content that hasn't been published yet
- **Published**: Content that is live and available
- **Archived**: Content that is no longer active

## Basic Publishing Workflow

### Publishing Content Items

1. Create or edit a content item
2. Fill in all required fields
3. Click **"Save"** to save as draft
4. Click **"Publish"** to make it live

### Publishing Pages

1. Create or edit a page
2. Add and configure components
3. Click **"Save"** to save as draft
4. Click **"Publish"** to make the page live

## Preview Before Publishing

![Preview Mode](../../assets/screenshots/agility-cms/33-preview-mode.png)

Always preview content before publishing:

1. Click **"Preview"** or navigate to **Web Studio**
2. Review how content will appear
3. Check formatting, images, and layout
4. Make adjustments if needed
5. Publish when ready

## Approval Workflows

Agility CMS supports approval workflows through the Security/permissions system. Workflows are configured by assigning roles and permissions.

### How Workflows Work

1. **Roles**: Users are assigned roles (Editor, Publisher, Admin, etc.)
2. **Permissions**: Roles have different permissions (Read, Contribute, Edit, Approve, Publish, etc.)
3. **Workflow Steps**: Content moves through approval steps based on permissions

### Common Workflow Patterns

**Simple Workflow:**
- Editor creates content → Publisher reviews and publishes

**Multi-Step Workflow:**
- Editor creates content → Reviewer approves → Publisher publishes

**Role-Based Workflow:**
- Different roles can edit, approve, or publish based on their permissions

### Submitting for Approval

If approval is required:
1. Create or edit content
2. Click **"Submit for Approval"** instead of "Publish"
3. Content moves to the next approval step
4. Users with approval permissions can approve or reject

## Publishing Status Indicators

Status indicators show the current state:
- **Draft badge**: Content is not yet published
- **Published badge**: Content is live
- **Pending approval**: Content is awaiting approval

## Best Practices

1. **Always preview**: Use preview to check content before publishing
2. **Save drafts frequently**: Save work as drafts before publishing
3. **Follow workflow**: Respect approval processes if configured
4. **Check dependencies**: Ensure linked content is published
5. **Test after publishing**: Verify content appears correctly after publishing

## Common Publishing Tasks

### Updating Published Content

1. Edit the published content item or page
2. Make your changes
3. Save (creates a new draft version)
4. Preview to verify changes
5. Publish to update the live version

### Unpublishing Content

1. Open the published content
2. Change status to "Draft" or "Archived"
3. Save to remove from live site

### Bulk Publishing

1. Select multiple items in a content list
2. Use bulk actions to publish multiple items at once

---

**Next**: [Troubleshooting](./08-troubleshooting.md) - Common issues and solutions

