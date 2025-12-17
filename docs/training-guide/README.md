# Agility CMS Training Guides

> **Instance**: Demo Site (`13f09fe2-u`)
> **Website**: https://nextjs-demo-site-2025.publishwithagility.com/

Comprehensive training materials for Agility CMS, covering both generic concepts and instance-specific implementation details.

## Training Structure

This training system follows a layered approach:

1. **Role-Based Learning Paths** - Start here based on your role
2. **Concept Guides** - Understand the "why" behind Agility CMS
3. **Task-First Guides** - Step-by-step instructions for specific tasks

## Quick Start

### Choose Your Path

- **[Content Editor Guide](./content-editor/README.md)** - For content creators and editors
- **[Developer Guide](./developer/README.md)** - For developers building with Agility CMS
- **[Architect Guide](./architect/README.md)** - For solution architects and technical leads
- **[Administrator Guide](./admin/README.md)** - For system administrators

### Understand the Concepts

- **[Concept Guides](./concepts/README.md)** - Core concepts and mental models
  - [Agility Data Model](./concepts/README.md#1-agility-data-model)
  - [Headless Architecture](./concepts/README.md#2-headless-architecture)
  - [Agility Sections](./concepts/README.md#3-agility-sections)

## Demo Site Overview

The Demo Site is a comprehensive Next.js application powered by Agility CMS, showcasing modern headless CMS patterns, AI-powered search, internationalization, and advanced caching.

### Content Architecture
- **24 content models** total
  - **6 Content Items**: Author, Category, Carousel Slide, Global Settings, AI Search Configuration, Personalized Hero Item
  - **18 Content Lists**: Posts, Tags, Bento Cards, Testimonials, FAQ Items, Pricing Tiers, Stats, Audiences, Regions, Customer Profiles, and more

### Component Library
- **20 component definitions** covering:
  - **Content Display**: Post Listing, Post Details, Testimonials, Team Listing
  - **Hero Variants**: Hero, Background Hero, A/B Test Hero, Personalized Background Hero
  - **Interactive**: Carousel, Contact Us, Frequently Asked Questions
  - **Layout**: Bento Section, Logo Strip, Personalized Logo Strip
  - **Data Display**: Company Stats, Pricing Cards, Pricing Table

### Site Structure
- **7 main pages** in sitemap:
  - Home, About Us, Pricing, Blog, Features, Contact Us
  - Dynamic Post Details page for individual blog posts

### Internationalization
- **2 locales** configured:
  - **English (en-us)** - Default locale (no URL prefix)
  - **French (fr)** - Secondary locale (with `/fr/` prefix)

### Key Features
- **AI-Powered Search**: Azure OpenAI + Algolia integration
- **Personalization**: Audience and region-based content targeting
- **A/B Testing**: PostHog feature flags integration
- **Analytics**: PostHog tracking
- **Performance**: Advanced caching with Next.js App Router

## Assets

All images, diagrams, and screenshots are organized in the [`assets/`](https://cdn.aglty.io/agility-cms-docs/images/training-guide/assets/) directory for easy management and deployment:

### Concept Diagrams
Located in [`assets/concepts/`](https://cdn.aglty.io/agility-cms-docs/images/training-guide/assets/concepts/):
- **3 core concept diagrams**: Agility Data Model, Headless Architecture, and Agility Sections

### Website Screenshots
Located in [`assets/screenshots/website/`](https://cdn.aglty.io/agility-cms-docs/images/training-guide/assets/screenshots/website/):
- **9 website screenshots** including homepage, all main pages (About, Pricing, Features, Contact), blog listing, and 3 sample blog posts

### Agility CMS Screenshots
Located in [`assets/screenshots/agility-cms/`](https://cdn.aglty.io/agility-cms-docs/images/training-guide/assets/screenshots/agility-cms/):
- **15 CMS interface screenshots** including dashboard, content management, pages, components, assets, and edit views

See the [Assets README](https://cdn.aglty.io/agility-cms-docs/images/training-guide/assets/README.md) for folder structure details, and the [Screenshots README](./screenshots/README.md) for a complete index of all screenshots.

## Training Philosophy

This training follows the "Gold Standard" layered approach from the [training plan](./plan.md):

1. **Role-Based Learning Paths** - Start with your role-specific guide
2. **Concept Guides** - Understand the "why" behind Agility CMS design
3. **Task-First Guides** - Step-by-step instructions for specific tasks
4. **Reference Documentation** - Detailed technical references when needed

### Learning Outcomes

Each role-based guide includes:
- Clear learning outcomes and success criteria
- Step-by-step instructions with screenshots
- Real-world examples from the Demo Site
- Common mistakes and troubleshooting tips
- Next steps and practice exercises

## Directory Structure

```
training-guide/
├── README.md (this file)
├── plan.md (training plan and philosophy)
├── AGILITY_CMS_URL_PATTERNS.md (URL structure documentation)
├── INTEGRATING_SCREENSHOTS.md (screenshot integration guide)
├── content-editor/
│   └── README.md (Content Editor guide)
├── developer/
│   └── README.md (Developer guide)
├── architect/
│   └── README.md (Architect guide)
├── admin/
│   └── README.md (Administrator guide)
├── assets/
│   ├── README.md (assets structure documentation)
│   ├── concepts/ (3 concept diagrams)
│   └── screenshots/
│       ├── website/ (9 website screenshots)
│       └── agility-cms/ (15 CMS interface screenshots)
├── concepts/
│   └── README.md (Concept explanations)
└── screenshots/
    └── README.md (screenshot index)
```

## Getting Started

1. **Identify your role** - Choose the appropriate guide from the Quick Start section above
2. **Read the overview** - Each guide starts with learning outcomes and an overview
3. **Review concepts** - For complex topics, refer to the [Concept Guides](./concepts/README.md) first
4. **Follow the guide** - Work through each section systematically
5. **Practice** - Complete the exercises and tasks in the guide
6. **Reference documentation** - Use [URL Patterns](./AGILITY_CMS_URL_PATTERNS.md) and other reference docs as needed

## Additional Resources

- **Agility CMS Documentation**: [Official Agility CMS documentation](https://agilitycms.com/docs)
- **User Permissions**: [Agility CMS User Permissions Guide](https://agilitycms.com/docs/owners-admins/user-permissions)
- **Assets**: See the [Assets README](https://cdn.aglty.io/agility-cms-docs/images/training-guide/assets/README.md) for folder structure and the [Screenshots Index](./screenshots/README.md) for all available screenshots
- **URL Patterns**: Learn about [Agility CMS URL structure](./AGILITY_CMS_URL_PATTERNS.md)
- **Codebase**: Review the Next.js implementation in `src/`

## Support

For questions or issues:
- Review the troubleshooting sections in each guide
- Check the concept guides for foundational understanding
- Consult with your team's Agility CMS administrator

---

*Last updated: Based on Demo Site instance (`13f09fe2-u`) analysis*

