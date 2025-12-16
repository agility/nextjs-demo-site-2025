# Workflow Configuration

This guide covers configuring workflows in Agility CMS through the Security/permissions system.

## Workflow Overview

Workflows in Agility CMS are configured through the Security/permissions system, not as a separate workflow configuration. Workflows are created by assigning appropriate roles and permissions to users.

## How Workflows Work

### Role-Based Workflows

Workflows are created by assigning roles with appropriate permissions:

1. **Roles**: Users are assigned roles (Editor, Publisher, Admin, etc.)
2. **Permissions**: Roles have different permissions (Read, Contribute, Edit, Approve, Publish, etc.)
3. **Workflow Steps**: Content moves through approval steps based on permissions

### Permission-Based Workflow

**Workflow Steps:**

1. **Content Creation**: User with "Contribute" or "Edit" permission creates content
2. **Content Editing**: User with "Edit" permission can edit content
3. **Approval**: User with "Approve" permission can approve content
4. **Publishing**: User with "Publish" permission can publish content

## Common Workflow Patterns

### Simple Workflow

**Pattern:**
- Editor creates content → Publisher reviews and publishes

**Configuration:**
- Assign "Editor" role to content creators
- Assign "Publisher" role to content publishers

### Multi-Step Workflow

**Pattern:**
- Editor creates content → Reviewer approves → Publisher publishes

**Configuration:**
- Assign "Editor" role to content creators
- Assign "Approver" role to reviewers
- Assign "Publisher" role to publishers

### Role-Based Workflow

**Pattern:**
- Different roles can edit, approve, or publish based on permissions

**Configuration:**
- Assign appropriate roles with required permissions
- Use built-in roles or create custom roles (Enterprise)

## Configuring Workflows

### Step 1: Assign Roles

1. Navigate to **Settings** → **User Access**
2. Assign appropriate roles to users:
   - **Editor**: For content creation and editing
   - **Approver**: For content approval
   - **Publisher**: For content publishing

### Step 2: Configure Item-Level Permissions

For granular workflow control:

1. Navigate to content list, component, or page model
2. Click **"Properties"** or **"Security"**
3. Configure permissions for specific roles or users
4. Set approval requirements if needed

### Step 3: Test Workflow

1. Create content as Editor
2. Submit for approval (if required)
3. Approve as Approver
4. Publish as Publisher

## Workflow Best Practices

1. **Start Simple**: Begin with simple workflows
2. **Use Built-in Roles**: Use built-in roles when possible
3. **Document Workflows**: Document workflow steps and roles
4. **Test Workflows**: Test workflows before going live
5. **Regular Review**: Review workflows regularly

---

**Next**: [API Keys](./07-api-keys.md) - API key management

