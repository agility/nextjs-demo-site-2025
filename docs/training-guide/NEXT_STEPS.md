# Next Steps: Building Generic & Instance-Specific Training Guides

## Current Status

✅ **Completed:**
- All screenshots captured (34 total)
- Concept diagrams included in all guides
- Terminology updated
- Screenshot capture system ready
- URL patterns documented

📋 **Current State:**
- 4 role guides exist but are **hybrid** (mix of generic + instance-specific)
- Need to **separate** into generic and instance-specific sections
- Need to **expand** both sections with comprehensive content

---

## Phase 1: Build Generic Training Guides

**Goal**: Create complete, reusable training that works for ANY Agility instance.

### Step 1: Create Folder Structure

For each role (content-editor, developer, architect, admin):

```bash
mkdir -p docs/training-guide/{content-editor,developer,architect,admin}/generic
mkdir -p docs/training-guide/{content-editor,developer,architect,admin}/instance-specific
```

### Step 2: Build Generic Content Modules

#### Content Editor Generic (8 modules)

1. **`01-introduction.md`** - What is Agility CMS?
   - Headless architecture concept
   - Benefits of headless CMS
   - Content vs presentation separation
   - Use concept diagrams

2. **`02-core-concepts.md`** - Core Concepts
   - Agility Data Model (use diagram)
   - Headless Architecture (use diagram)
   - Agility Sections (use diagram)
   - Content, Components, Pages relationship

3. **`03-navigation.md`** - Navigating the CMS
   - Main navigation areas
   - Dashboard overview
   - Content section
   - Pages section
   - Assets section
   - Settings section

4. **`04-content-basics.md`** - Content Management Basics
   - What are content items?
   - Creating content items
   - Editing content items
   - Content models vs content items
   - Linked content relationships

5. **`05-pages-basics.md`** - Page Management Basics
   - What are pages?
   - Creating pages
   - Editing pages
   - Sitemap structure
   - Page models and content zones

6. **`06-components.md`** - Working with Components
   - What are components?
   - Adding components to pages
   - Editing component content
   - Component placement (content zones)
   - Linking content to components

7. **`07-workflow.md`** - Publishing Workflow
   - Draft vs Published
   - Publishing process
   - Approval workflows (via Security/permissions)
   - Preview functionality

8. **`08-troubleshooting.md`** - Common Issues
   - Content not appearing
   - Components not loading
   - Publishing issues
   - Permission problems

#### Developer Generic (10 modules)

1. **`01-introduction.md`** - Agility CMS for Developers
2. **`02-architecture.md`** - Headless Architecture
3. **`03-setup.md`** - Project Setup
4. **`04-api-basics.md`** - API Fundamentals
5. **`05-component-development.md`** - Building Components
6. **`06-content-fetching.md`** - Fetching Content
7. **`07-caching.md`** - Caching Strategies
8. **`08-preview-mode.md`** - Preview Functionality
9. **`09-internationalization.md`** - i18n Implementation
10. **`10-best-practices.md`** - Best Practices

#### Architect Generic (8 modules)

1. **`01-introduction.md`** - Architecture Overview
2. **`02-data-model.md`** - Data Model Deep Dive
3. **`03-content-strategy.md`** - Content Modeling
4. **`04-component-strategy.md`** - Component Architecture
5. **`05-performance.md`** - Performance Considerations
6. **`06-scalability.md`** - Scaling Strategies
7. **`07-security.md`** - Security Best Practices
8. **`08-integrations.md`** - Integration Patterns

#### Administrator Generic (9 modules)

1. **`01-introduction.md`** - Admin Overview
2. **`02-user-management.md`** - Users and Permissions
3. **`03-content-models.md`** - Managing Content Models
4. **`04-component-models.md`** - Managing Component Models
5. **`05-page-models.md`** - Managing Page Models
6. **`06-workflow.md`** - Workflow Configuration (Security approach)
7. **`07-api-keys.md`** - API Key Management
8. **`08-webhooks.md`** - Webhook Configuration
9. **`09-troubleshooting.md`** - Admin Troubleshooting

### Step 3: Generic Content Guidelines

**✅ DO:**
- Explain Agility CMS concepts and features
- Use generic examples and analogies
- Reference concept diagrams from `assets/concepts/`
- Focus on "why" and "how" Agility CMS works
- Use generic UI descriptions (not instance-specific screenshots)
- Link to concept guides

**❌ DON'T:**
- Reference specific instances (e.g., "Demo Site")
- Use instance-specific screenshots
- Include specific IDs, GUIDs, or instance names
- Document instance-specific configurations
- Mix generic and instance-specific content

---

## Phase 2: Build Instance-Specific Training Guides

**Goal**: Document Demo Site-specific content that maps to generic concepts.

### Step 1: Create Instance-Specific Content

#### Content Editor Instance-Specific (5 modules)

1. **`README.md`** - Demo Site Overview
   - Instance overview
   - Content architecture summary
   - Component library summary
   - Site structure

2. **`content-models.md`** - Available Content Models
   - Posts, Authors, Categories, Tags
   - Bento Cards, Testimonials
   - Audiences, Regions
   - All 24 content models with descriptions

3. **`components.md`** - Available Components
   - BackgroundHero, Hero, ABTestHero
   - BentoSection, PostListing, PostDetails
   - All 20 components with use cases

4. **`pages.md`** - Site Structure
   - Home, About, Pricing, Blog, Features, Contact
   - Page organization
   - URL structure

5. **`common-tasks.md`** - Demo Site Workflows
   - Creating a blog post
   - Updating homepage hero
   - Managing testimonials
   - Personalization workflows

#### Developer Instance-Specific (6 modules)

1. **`README.md`** - Demo Site Overview
2. **`project-structure.md`** - Codebase Organization
3. **`content-models.md`** - Content Model Implementations
4. **`components.md`** - Component Implementations
5. **`api-routes.md`** - Custom API Routes
6. **`deployment.md`** - Deployment Configuration

#### Architect Instance-Specific (5 modules)

1. **`README.md`** - Architecture Overview
2. **`architecture.md`** - Site Architecture
3. **`content-architecture.md`** - Content Model Design
4. **`component-architecture.md`** - Component Design
5. **`integrations.md`** - Implemented Integrations

#### Administrator Instance-Specific (5 modules)

1. **`README.md`** - Admin Overview
2. **`configuration.md`** - Instance Configuration
3. **`content-setup.md`** - Content Model Setup
4. **`component-setup.md`** - Component Setup
5. **`workflows.md`** - Configured Workflows

### Step 2: Instance-Specific Content Guidelines

**✅ DO:**
- Clearly mark as "Demo Site" specific
- Link to generic guides for concepts
- Use instance-specific screenshots
- Map to generic patterns ("This implements...")
- Document "what" exists in Demo Site
- Include configuration details

**Example Mapping:**
```markdown
## BackgroundHero Component

This component implements the generic [Hero Component pattern](../generic/06-components.md#hero-components).

**Demo Site Implementation:**
- Uses background images from Assets
- Supports CTA buttons
- Configured for personalization
```

---

## Implementation Roadmap

### Week 1: Structure & Content Editor
- [ ] Create folder structure for all roles
- [ ] Build Content Editor generic guide (8 modules)
- [ ] Build Content Editor instance-specific guide (5 modules)
- [ ] Update Content Editor main README as navigation hub

### Week 2: Developer Guide
- [ ] Build Developer generic guide (10 modules)
- [ ] Build Developer instance-specific guide (6 modules)
- [ ] Update Developer main README as navigation hub

### Week 3: Architect & Admin Guides
- [ ] Build Architect generic guide (8 modules)
- [ ] Build Architect instance-specific guide (5 modules)
- [ ] Build Admin generic guide (9 modules)
- [ ] Build Admin instance-specific guide (5 modules)
- [ ] Update main READMEs as navigation hubs

### Week 4: Integration & Polish
- [ ] Cross-link between generic and instance-specific
- [ ] Add "See Also" sections
- [ ] Create instance template documentation
- [ ] Final review and testing

---

## Content Extraction Strategy

### From Current Hybrid Guides

**Extract to Generic:**
- Introduction sections (remove instance references)
- Concept explanations
- Generic workflows
- Navigation patterns
- UI patterns

**Extract to Instance-Specific:**
- Demo Site overview
- Specific content model lists
- Specific component lists
- Site structure
- Configuration examples

**Screenshots:**
- Generic UI patterns → Use in generic (if applicable)
- Instance-specific → Use in instance-specific
- Concept diagrams → Use in both (via assets/concepts/)

---

## Quick Start: Content Editor Example

### 1. Create Structure
```bash
mkdir -p docs/training-guide/content-editor/{generic,instance-specific}
```

### 2. Extract Generic Content
Take from current `content-editor/README.md`:
- Sections 1-3 (Introduction, Navigation, Pages/Components concepts)
- Remove "Demo Site" references
- Remove specific content model lists
- Keep concept explanations

### 3. Create Generic Modules
- `01-introduction.md` - Extract and generalize intro
- `02-core-concepts.md` - Extract concept sections
- `03-navigation.md` - Extract navigation section
- etc.

### 4. Extract Instance-Specific Content
Take from current `content-editor/README.md`:
- Section 7 (Instance-Specific Content Models)
- Specific component lists
- Demo Site workflows

### 5. Create Instance-Specific Modules
- `README.md` - Demo Site overview
- `content-models.md` - All 24 content models
- `components.md` - All 20 components
- etc.

### 6. Update Main README
Make it a navigation hub:
```markdown
# Content Editor Training

## Generic Training (Works for Any Instance)
- [Introduction](./generic/01-introduction.md)
- [Core Concepts](./generic/02-core-concepts.md)
- ...

## Demo Site Specific
- [Overview](./instance-specific/README.md)
- [Content Models](./instance-specific/content-models.md)
- ...
```

---

## Success Metrics

**Generic Guides:**
- ✅ Complete standalone training
- ✅ No instance-specific dependencies
- ✅ Reusable for any Agility instance
- ✅ Clear concept explanations

**Instance-Specific Guides:**
- ✅ Complete Demo Site documentation
- ✅ Clear mapping to generic concepts
- ✅ Instance-specific screenshots
- ✅ Easy to customize for new instances

**Combined:**
- ✅ Easy to build training for new instances
- ✅ Generic content stays current
- ✅ Clear separation of concerns
- ✅ Progressive disclosure (generic → instance-specific)

