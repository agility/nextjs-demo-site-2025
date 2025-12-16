# User Management

This guide covers managing users, roles, and permissions in Agility CMS.

## User Access Overview

Agility CMS uses **User Access** to manage users and grant specific permission-based access to your instance. When adding users, it's important to consider what role they will have in relation to managing your instance and content.

> **Reference**: [Agility CMS User Permissions Documentation](https://agilitycms.com/docs/owners-admins/user-permissions)

## Available Permissions

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

## Built-in Roles

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

## Managing Users

### Adding Users

1. Navigate to **Settings** → **User Access** (or **Users**)
2. Click **"Add User"**
3. Fill in user details:
   - Email address
   - Name
   - Role assignment (select from built-in roles or custom roles)
4. Set item-level permissions for specific content models or sections if needed
5. Save the user

### Editing Users

1. Navigate to **Settings** → **User Access**
2. Click on the user to edit
3. Modify role assignment or permissions
4. Save changes

### Removing Users

1. Navigate to **Settings** → **User Access**
2. Click on the user
3. Remove or deactivate the user

## Item-Level Permissions

In addition to role-based permissions, Agility CMS supports **Item-Level Permissions** that allow you to:

- Set permissions for specific content models
- Set permissions for specific components
- Set permissions for specific page models
- Set permissions for asset folders
- Grant granular access control beyond role-based permissions

### Configuring Item-Level Permissions

1. Navigate to the content list, component, or page model
2. Click **"Properties"** or **"Security"**
3. Configure permissions for specific roles or users
4. Save changes

## Best Practices for Role Assignment

1. **Start with Minimum Permissions** - Begin with the minimum permissions required and add additional roles or permissions as necessary
2. **Consider User Responsibilities** - Choose roles based on what the user needs to do, not what they might do
3. **Use Built-in Roles First** - Built-in roles are designed to cover most common use cases
4. **Custom Roles for Enterprise** - Use Custom Roles (Enterprise feature) only when built-in roles don't meet your needs
5. **Regular Review** - Periodically review user permissions to ensure they're still appropriate
6. **Document Permissions** - Document why users have specific permissions

## Common Role Scenarios

### Content Editor
- **Role**: Editor
- **Permissions**: Create and edit content, manage components on pages
- **Use Case**: Day-to-day content management

### Content Publisher
- **Role**: Publisher
- **Permissions**: Editor permissions + publish content
- **Use Case**: Content management with publishing authority

### Blog Author
- **Role**: Contributor
- **Permissions**: Create and edit own posts only
- **Use Case**: Authors who create their own content

### Designer/Developer
- **Role**: Designer
- **Permissions**: Editor permissions + manage models and components
- **Use Case**: Technical users who configure models

### Administrator
- **Role**: Admins
- **Permissions**: Full instance access
- **Use Case**: Complete instance management

---

**Next**: [Content Models](./03-content-models.md) - Managing content models

