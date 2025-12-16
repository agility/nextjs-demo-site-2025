# Managing Page Models

This guide covers creating, modifying, and managing page models (formerly called "page templates") in Agility CMS.

> **Note**: "Page Templates" is the old terminology. The current term is "Page Models." The UI may still show "Page Templates" in some places, but the current terminology is "Page Models."

## Page Model Overview

Page Models define the structure of pages, including:
- **Content Zones**: Named areas where components can be placed
- **Layout**: How content zones are arranged
- **Metadata**: Default fields for pages

## Creating Page Models

### Step 1: Navigate to Page Models

1. Navigate to **Pages** → **Page Models** (may still show as "Page Templates" in the UI)
2. Click **"Add Page Model"**

### Step 2: Define Page Model

Enter page model details:
- **Name**: Page model name
- **Description**: Page model purpose

### Step 3: Configure Content Zones

Define content zones where components can be placed:

**Common Zone Names:**
- `main-content-zone`
- `sidebar-zone`
- `hero-zone`
- `footer-zone`

**Zone Configuration:**
- Zone name (used in frontend code)
- Zone description
- Allowed component types (optional)

### Step 4: Configure Page Properties

Set default page properties:
- **Title**: Default page title
- **Description**: Default page description
- **SEO Fields**: Default SEO settings

### Step 5: Save Page Model

Click **"Save"** to create the page model.

## Modifying Page Models

### Adding Content Zones

**Safe Operation:**
- Adding zones is safe
- Doesn't affect existing pages
- New zones available for new pages

### Removing Content Zones

**Warning:**
- Removing zones may affect pages using those zones
- Components in removed zones may be lost
- Always test changes in development first

### Modifying Zone Configuration

**Considerations:**
- Changing zone names may break frontend code
- Coordinate with developers before changes
- Test changes thoroughly

## Page Model Patterns

### Single Zone Model

**Pattern**: One main content zone

**Example**: Blog post page model
- `main-content-zone` for post content

### Multi-Zone Model

**Pattern**: Multiple content zones

**Example**: Home page model
- `hero-zone` for hero section
- `main-content-zone` for main content
- `sidebar-zone` for sidebar content

## Best Practices

1. **Plan Zones Carefully**: Plan content zones before creation
2. **Use Descriptive Names**: Use clear, descriptive zone names
3. **Coordinate with Developers**: Work with developers on zone names
4. **Document Models**: Document zone purposes and usage
5. **Test Changes**: Test changes in development first

---

**Next**: [Workflow](./06-workflow.md) - Workflow configuration

