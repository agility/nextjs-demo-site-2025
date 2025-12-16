# Agility CMS Training Guide Plan

> **Goal**: Create reusable, layered training materials that work for any Agility CMS instance, with instance-specific content clearly separated.

## Implementation Status

### ✅ Completed (Current Session)

**Structure & Organization:**
- ✅ Created role-based training guides (Content Editor, Developer, Architect, Administrator)
- ✅ Organized all images and screenshots into centralized `assets/` folder structure
- ✅ Separated concept diagrams from instance-specific screenshots
- ✅ Updated all image paths and verified links
- ✅ Removed duplicate images and cleaned up file structure

**Content Updates:**
- ✅ Updated terminology: "Module" → "Component", "Module Definition" → "Component Model"
- ✅ Added notes about Next.js SDK legacy terminology for developers
- ✅ Included core concept diagrams (Data Model, Headless Architecture, Sections) in all role guides
- ✅ Created comprehensive screenshot library (30 images: 3 concepts, 15 CMS, 12 website)

**Documentation:**
- ✅ Created `assets/README.md` documenting folder structure
- ✅ Created `AGILITY_CMS_URL_PATTERNS.md` for navigation reference
- ✅ Created `INTEGRATING_SCREENSHOTS.md` guide
- ✅ Updated main `README.md` with current structure

**Current Structure:**
```
docs/training-guide/
├── assets/                    # All images (ready for separate server upload)
│   ├── concepts/              # 3 core concept diagrams
│   └── screenshots/
│       ├── website/           # 12 website screenshots
│       └── agility-cms/       # 15 CMS interface screenshots
├── content-editor/            # Content Editor guide
├── developer/                 # Developer guide
├── architect/                 # Architect guide
├── admin/                     # Administrator guide
├── concepts/                  # Concept explanations
└── [reference docs]
```

---

## Training Philosophy: The Gold Standard

### 1. Role-Based Learning Paths (Top Layer)

Start outside the product, not inside it.

Each role gets a clear path:
- Content Editors
- Developers
- Architects
- Admins / Power Users

Each path answers:
- What do I need to do?
- What do I need to understand?
- What do I need to ignore?

Format:
- Short overview page
- 5–10 core tasks per role
- Clear "you're done when you can do X" outcomes

Devil's advocate:
If you can't describe a role's success in 5–10 concrete actions, your product mental model is already too fuzzy.

⸻

### 2. Task-First Guides (Core Training Content)

This is where most SaaS training should live.

Each guide is:
- One task
- One outcome
- One mental model

Example:
"Create a reusable content component used across multiple pages"

Recommended structure:
1. What you're accomplishing (business + product context)
2. Why it works this way (mental model, not implementation)
3. Steps (numbered, skimmable)
4. Common mistakes (this is huge for complex SaaS)
5. What to do next

Format:
- Text + annotated screenshots
- Short embedded video (optional, <3 min)
- Copy-paste examples for dev workflows

Devil's advocate:
If a task guide needs a 10-minute video, it's compensating for product complexity or unclear concepts.

⸻

### 3. Concept Guides (Mental Models Layer)

This is where complex SaaS usually fails.

AgilityCMS-style products need explicit explanations of:
- Content modeling philosophy
- Separation of content vs presentation
- API-first / headless thinking
- Reusability vs page-centric CMS thinking

Format:
- Concept → analogy → concrete example
- Diagrams over screenshots
- No step-by-step here

These should answer:
- "Why is this designed this way?"
- "How should I think about this long-term?"

Devil's advocate:
If customers keep asking "why can't I just…", your concept docs are either missing or buried.

⸻

### 4. In-Product Micro Guidance (Just-in-Time)

This is not your main training—but it's critical.

Examples:
- Inline tooltips
- Empty-state explanations
- "Learn more" links to task guides
- Contextual warnings

Rule of thumb:
- Teach what this is
- Never teach everything in-product

Devil's advocate:
If users need external docs just to understand a blank screen, the UI is doing too much thinking for itself.

⸻

### 5. Reference Docs (Bottom Layer)

This is what devs expect—but shouldn't start with.

Includes:
- API reference
- Field definitions
- Configuration options
- Limits and edge cases

Format:
- Highly scannable
- No storytelling
- Linked from task guides, never standalone

Devil's advocate:
If someone's first success depends on reference docs, onboarding is already broken.

⸻

## Proposed Structure: Separating Generic from Instance-Specific

### Goal
Make it easy to build training for ANY Agility instance by:
1. Having complete, reusable non-instance-specific training for each role
2. Clearly separating instance-specific content
3. Making it obvious what needs to be customized per instance

### Recommended Structure

```
docs/training-guide/
├── README.md                          # Main entry point
├── plan.md                            # This file
│
├── concepts/                          # Generic concept guides (reusable)
│   ├── README.md                      # Concept explanations
│   └── [concept diagrams in assets/]
│
├── assets/                            # All images (upload to separate server)
│   ├── concepts/                      # Generic concept diagrams
│   └── screenshots/
│       ├── website/                   # Instance-specific website screenshots
│       └── agility-cms/              # Instance-specific CMS screenshots
│
├── content-editor/                    # Content Editor training
│   ├── README.md                      # Main guide (hybrid: generic + instance)
│   ├── generic/                       # Non-instance-specific training
│   │   ├── 01-introduction.md        # What is Agility CMS?
│   │   ├── 02-core-concepts.md       # Data Model, Architecture, Sections
│   │   ├── 03-navigation.md          # How to navigate the CMS
│   │   ├── 04-content-basics.md      # Creating/editing content
│   │   ├── 05-pages-basics.md        # Creating/editing pages
│   │   ├── 06-components.md          # Working with components
│   │   ├── 07-workflow.md            # Publishing workflow
│   │   └── 08-troubleshooting.md     # Common issues
│   └── instance-specific/            # Demo Site specific
│       ├── README.md                  # Instance overview
│       ├── content-models.md          # Available content models
│       ├── components.md              # Available components
│       ├── pages.md                   # Site structure
│       └── common-tasks.md            # Instance-specific workflows
│
├── developer/                         # Developer training
│   ├── README.md                      # Main guide (hybrid: generic + instance)
│   ├── generic/                       # Non-instance-specific training
│   │   ├── 01-introduction.md        # Agility CMS for developers
│   │   ├── 02-architecture.md        # Headless architecture
│   │   ├── 03-setup.md               # Project setup
│   │   ├── 04-api-basics.md          # API fundamentals
│   │   ├── 05-component-development.md # Building components
│   │   ├── 06-content-fetching.md    # Fetching content
│   │   ├── 07-caching.md             # Caching strategies
│   │   ├── 08-preview-mode.md        # Preview functionality
│   │   ├── 09-internationalization.md # i18n implementation
│   │   └── 10-best-practices.md      # Development best practices
│   └── instance-specific/            # Demo Site specific
│       ├── README.md                  # Instance overview
│       ├── project-structure.md       # Codebase organization
│       ├── content-models.md          # Content model implementations
│       ├── components.md              # Component implementations
│       ├── api-routes.md              # Custom API routes
│       └── deployment.md              # Deployment configuration
│
├── architect/                         # Architect training
│   ├── README.md                      # Main guide (hybrid: generic + instance)
│   ├── generic/                       # Non-instance-specific training
│   │   ├── 01-introduction.md        # Agility CMS architecture
│   │   ├── 02-data-model.md          # Data model deep dive
│   │   ├── 03-content-strategy.md    # Content modeling strategies
│   │   ├── 04-component-strategy.md  # Component architecture
│   │   ├── 05-performance.md         # Performance considerations
│   │   ├── 06-scalability.md         # Scaling strategies
│   │   ├── 07-security.md            # Security best practices
│   │   └── 08-integrations.md         # Integration patterns
│   └── instance-specific/            # Demo Site specific
│       ├── README.md                  # Instance overview
│       ├── architecture.md            # Site architecture
│       ├── content-architecture.md    # Content model design
│       ├── component-architecture.md   # Component design
│       └── integrations.md            # Implemented integrations
│
├── admin/                             # Administrator training
│   ├── README.md                      # Main guide (hybrid: generic + instance)
│   ├── generic/                       # Non-instance-specific training
│   │   ├── 01-introduction.md        # Admin overview
│   │   ├── 02-user-management.md     # Users and permissions
│   │   ├── 03-content-models.md       # Managing content models
│   │   ├── 04-component-models.md     # Managing component models
│   │   ├── 05-page-models.md          # Managing page models
│   │   ├── 06-workflow.md             # Workflow configuration
│   │   ├── 07-api-keys.md             # API key management
│   │   ├── 08-webhooks.md             # Webhook configuration
│   │   └── 09-troubleshooting.md      # Admin troubleshooting
│   └── instance-specific/            # Demo Site specific
│       ├── README.md                  # Instance overview
│       ├── configuration.md           # Instance configuration
│       ├── content-setup.md           # Content model setup
│       ├── component-setup.md         # Component setup
│       └── workflows.md               # Configured workflows
│
└── reference/                         # Reference documentation
    ├── AGILITY_CMS_URL_PATTERNS.md    # URL navigation patterns
    ├── INTEGRATING_SCREENSHOTS.md     # Screenshot integration guide
    └── [other reference docs]
```

### Implementation Strategy

**Phase 1: Refactor Current Guides** (Next Steps)
1. Extract generic content from each role guide into `generic/` folders
2. Move instance-specific content to `instance-specific/` folders
3. Update main `README.md` files to link to both sections
4. Ensure all concept diagrams and generic screenshots are in `assets/concepts/`

**Phase 2: Expand Generic Content**
1. Create comprehensive generic training for each role
2. Focus on "how Agility CMS works" not "how Demo Site works"
3. Use generic examples and analogies
4. Include all core concept diagrams

**Phase 3: Document Instance-Specific Patterns**
1. Create clear templates for instance-specific content
2. Document what needs to be customized per instance
3. Create instance overview pages
4. Map generic concepts to instance implementations

**Phase 4: Create Instance Template**
1. Create a template structure for new instances
2. Document the customization process
3. Create a checklist for instance-specific content

### Key Principles

1. **Generic First**: Generic training should be complete and standalone
2. **Clear Separation**: Instance-specific content should be clearly marked
3. **Reusability**: Generic content should work for any Agility instance
4. **Progressive Disclosure**: Start generic, then add instance-specific details
5. **Maintainability**: Easy to update generic content without touching instance-specific

### Content Guidelines

**Generic Content Should:**
- Explain Agility CMS concepts and features
- Use generic examples and analogies
- Reference concept diagrams
- Work for any Agility instance
- Focus on "why" and "how" Agility CMS works

**Instance-Specific Content Should:**
- Reference the specific instance (e.g., "Demo Site")
- Show actual screenshots from the instance
- Document instance-specific configurations
- Map generic concepts to instance implementations
- Focus on "what" exists in this instance

---

## The Recommended "Training Stack" for Complex SaaS

If I had to lock this into a concrete setup:
- **Docs Site**
  - Role-based learning paths
  - Task-oriented guides
  - Concept explanations
- **Short Videos**
  - Optional reinforcement, not primary teaching
- **In-Product Links**
  - Always deep-link to a specific task or concept
- **Sample Projects**
  - Realistic, not "Hello World"

⸻

## The Most Common Mistakes (Especially for Dev-Led Products)

1. Organizing by features instead of outcomes
2. Assuming users want to "learn the product"
3. Overusing video
4. Explaining how without explaining why
5. One giant guide instead of composable pieces

⸻

## A Useful Litmus Test

Ask this for every guide:

"Could a motivated but unfamiliar user complete this task without already understanding our product philosophy?"

If the answer is no, you need a concept guide—or a simpler product abstraction.

---

## Screenshot Capture System

### Missing Screenshots Analysis

See [`MISSING_SCREENSHOTS.md`](./MISSING_SCREENSHOTS.md) for a comprehensive list of 30+ missing screenshots that would improve training clarity.

### Priority Screenshots (Phase 1)

**Critical Workflow Screenshots:**
1. Content Item Edit View - Form for creating/editing content
2. Component Picker/Selector - Adding components to pages
3. Component Editor/Form - Editing component content
4. Content Picker - Linking content items
5. Page with Content Zones - Page structure visualization
6. Publishing Workflow/Status - Publish process

**High-Value Screenshots:**
7. Rich Text Editor - Formatting interface
8. Image Upload/Asset Manager - Media management
9. API Keys Section - Developer setup
10. User Management Interface - Admin functions
11. Permission Configuration - Security settings

### Automated Screenshot Capture

A screenshot capture system has been created to make it easy to capture all needed screenshots:

**Files:**
- `scripts/capture-missing-screenshots.ts` - Main capture script
- `scripts/screenshot-config.json` - Configuration file with all screenshots to capture

**Usage:**
```bash
# Capture all priority 1 screenshots
npm run capture-screenshots -- --priority 1

# Capture specific screenshot by ID
npm run capture-screenshots -- --id content-item-edit

# Capture all screenshots
npm run capture-screenshots -- --all
```

**Configuration:**
The `screenshot-config.json` file contains:
- URL patterns for each screenshot
- Required actions (clicks, waits, etc.)
- Priority levels
- Output filenames
- Descriptions

**Features:**
- Automatic navigation to Agility CMS URLs
- Waits for page load and interactions
- Handles authentication (30-second window)
- Captures full-page screenshots
- Saves to `docs/training-guide/assets/screenshots/agility-cms/`
- Generates numbered filenames automatically

---

## Next Steps

1. **Capture missing screenshots** using the automated system
2. **Refactor existing guides** to separate generic from instance-specific
3. **Expand generic content** for each role
4. **Create instance-specific templates** for easy customization
5. **Document the process** for creating training for new instances
