# Training Guide Assets

This folder contains all images and screenshots used in the Agility CMS training guides.

## Folder Structure

```
assets/
├── concepts/              # Core Agility CMS concept diagrams
│   ├── Agility Data Model.png
│   ├── Agility Headless Architecture.png
│   └── Agility Sections.png
└── screenshots/
    ├── website/           # Public website screenshots
    │   ├── 01-homepage.png
    │   ├── 02-about-page.png
    │   ├── 03-pricing-page.png
    │   ├── 04-features-page.png
    │   ├── 05-contact-page.png
    │   ├── 06-blog-listing.png
    │   └── 07-blog-post-*.png
    └── agility-cms/       # Agility CMS content manager screenshots
        ├── 01-dashboard-home.png
        ├── 02-content-section-overview.png
        ├── 03-content-posts-list.png
        ├── 04-content-authors-list.png
        ├── 05-content-categories-list.png
        ├── 06-content-bento-cards-list.png
        ├── 07-content-testimonials-list.png
        ├── 08-pages-section.png
        ├── 09-sitemap-view.png
        ├── 10-components-section.png
        ├── 11-assets-section.png
        ├── 13-page-edit-view.png
        ├── 14-component-definition.png
        └── 15-content-model-definition.png
```

## Usage

All images in this folder are referenced from the training guide markdown files using relative paths:

- From role guides (e.g., `content-editor/README.md`): `https://cdn.aglty.io/agility-cms-docs/images/training-guide/assets/concepts/` or `https://cdn.aglty.io/agility-cms-docs/images/training-guide/assets/screenshots/`
- From root docs: `https://cdn.aglty.io/agility-cms-docs/images/training-guide/assets/concepts/` or `https://cdn.aglty.io/agility-cms-docs/images/training-guide/assets/screenshots/`

## Uploading to External Server

This folder structure is designed to be easily uploaded to a separate server. The entire `assets/` folder can be:

1. Uploaded as-is to your CDN or static file server
2. Base URL updated in markdown files if needed
3. Maintained independently from the markdown documentation

## Image Formats

- **PNG**: Primary format for screenshots and diagrams
- **JPEG**: Alternative format for some website screenshots (smaller file size)

