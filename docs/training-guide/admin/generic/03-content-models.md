# Managing Content Models

This guide covers creating, modifying, and managing content models in Agility CMS.

## Content Model Types

Agility CMS supports two content model types:

### Content Items

**Characteristics:**
- Single, standalone instances
- Best for: Authors, Categories, Global Settings
- Managed as individual items

**Use When:**
- Content is unique (one instance)
- Content doesn't need to be queried as a list
- Content is referenced by other content

### Content Lists

**Characteristics:**
- Collections of related items
- Best for: Blog Posts, Testimonials, Pricing Tiers
- Support querying, filtering, pagination

**Use When:**
- Multiple items with same structure
- Need to query/filter items
- Items form a logical collection

## Creating Content Models

### Step 1: Navigate to Content Models

1. Navigate to **Content** → **Content Models**
2. Click **"Add Content Model"**

### Step 2: Choose Type

Choose content model type:
- **Content Item** - Single standalone content
- **Content List** - Collection of content items

### Step 3: Define Fields

Add fields to your content model:

**Field Types:**
- **Text**: Single-line text input
- **Rich Text**: Formatted text with formatting toolbar
- **Number**: Numeric values
- **Date/Time**: Date and time pickers
- **Image**: Image upload and selection
- **Linked Content**: Link to other content items
- **Multiple Linked Content**: Link to multiple content items
- **Boolean**: Checkbox (true/false)
- **URL**: URL field
- **Text Area**: Multi-line text

### Step 4: Configure Field Properties

For each field, configure:
- **Field Name**: Descriptive name
- **Required/Optional**: Whether field is required
- **Default Values**: Default field values
- **Validation Rules**: Field validation
- **Help Text**: Guidance for content editors

### Step 5: Save Content Model

Click **"Save"** to create the content model.

## Modifying Content Models

### Adding Fields

**Safe Operation:**
- Adding fields is safe
- Doesn't affect existing content
- New fields are optional by default

### Removing Fields

**Warning:**
- Removing fields may cause data loss
- Content in removed fields will be lost
- Always backup before removing fields

### Changing Field Types

**Warning:**
- Changing field types may require data migration
- May cause data loss if incompatible
- Test changes in development first

### Best Practices

1. **Plan Carefully**: Plan content models before creation
2. **Test Changes**: Test changes in development environment
3. **Document Models**: Document field purposes and relationships
4. **Use Descriptive Names**: Use clear, descriptive field names
5. **Set Validation**: Set appropriate validation rules

## Content Model Relationships

### Linked Content Fields

**One-to-One:**
- One content item links to one other item
- Example: Post → Author

**One-to-Many:**
- One content item links to multiple items
- Example: Post → Tags

**Many-to-Many:**
- Multiple items link to multiple items
- Example: Post ↔ Tags

### Nested References

**Grid/Link Fields:**
- Parent component references child content list
- Children fetched separately using reference name
- Example: BentoSection → BentoCards

## Content Model Best Practices

1. **Identify Reusability**: Determine what content should be reusable
2. **Design Relationships**: Plan how content relates to other content
3. **Consider Queries**: Design for efficient querying
4. **Plan for Growth**: Design models that scale
5. **Document Models**: Document purpose and relationships

---

**Next**: [Component Models](./04-component-models.md) - Managing component models

