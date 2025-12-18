# Demo Site: Configured Workflows

This guide documents the workflows configured in the Demo Site through the Security/permissions system.

## Workflow Overview

Workflows in the Demo Site are configured through role assignments and Security/permissions settings, not as separate workflow configurations.

## Common Workflow Patterns

### Content Creation Workflow

**Pattern:**
- Editor creates content → Publisher reviews and publishes

**Configuration:**
- Assign "Editor" role to content creators
- Assign "Publisher" role to content publishers

### Blog Post Workflow

**Pattern:**
- Author creates post → Editor reviews → Publisher publishes

**Configuration:**
- Assign "Contributor" role to blog authors (can edit own posts)
- Assign "Editor" role to content editors
- Assign "Publisher" role to content publishers

### Multi-Step Approval Workflow

**Pattern:**
- Editor creates content → Reviewer approves → Publisher publishes

**Configuration:**
- Assign "Editor" role to content creators
- Assign "Approver" role to reviewers
- Assign "Publisher" role to publishers

## Role Assignments

### Recommended Roles

**Content Editors:**
- **Role**: Editor
- **Permissions**: Create and edit content, manage components

**Content Publishers:**
- **Role**: Publisher
- **Permissions**: Editor permissions + publish content

**Blog Authors:**
- **Role**: Contributor
- **Permissions**: Create and edit own posts only

**Designers/Developers:**
- **Role**: Designer
- **Permissions**: Editor permissions + manage models and components

**Administrators:**
- **Role**: Admins
- **Permissions**: Full instance access

## Item-Level Permissions

For granular workflow control, configure item-level permissions:

1. Navigate to content list, component, or page model
2. Click **"Properties"** or **"Security"**
3. Configure permissions for specific roles or users
4. Set approval requirements if needed

## Workflow Best Practices

1. **Start Simple**: Begin with simple workflows
2. **Use Built-in Roles**: Use built-in roles when possible
3. **Document Workflows**: Document workflow steps and roles
4. **Test Workflows**: Test workflows before going live
5. **Regular Review**: Review workflows regularly

---

**Back to**: [Administration Overview](./README.md)

