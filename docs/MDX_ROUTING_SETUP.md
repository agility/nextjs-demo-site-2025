# MDX Routing Setup

This document explains how the documentation routing system works.

## Overview

All markdown files in the `/docs` folder are automatically served as pages on the site at `/docs/...` routes. This provides:

- ✅ SEO benefits: All docs live on `demo.agilitycms.com/docs/...`
- ✅ Single source of truth: Docs in `/docs` folder become real site pages
- ✅ Better UX: Users can read docs without leaving the site
- ✅ Automatic navigation: Sidebar auto-generated from folder structure

## File Structure

```
docs/                          # Source markdown files
├── README.md                  # → /docs/README
├── SEO_GITHUB_INDEXING.md     # → /docs/SEO_GITHUB_INDEXING
├── developer/
│   └── codebase/
│       └── README.md          # → /docs/developer/codebase/README
└── ...

src/app/docs/                  # Next.js route handlers
├── layout.tsx                 # Docs layout with sidebar
├── page.tsx                   # Docs index page (/docs)
└── [...slug]/
    └── page.tsx               # Dynamic doc page handler

src/lib/docs/
└── getDocsFiles.ts            # Utilities for reading docs
```

## How It Works

1. **File Reading**: `getDocsFiles.ts` recursively reads all `.md` files from `/docs`
2. **Route Generation**: Next.js generates static params for all doc files at build time
3. **Rendering**: Markdown is rendered using `react-markdown` with syntax highlighting
4. **Navigation**: Sidebar navigation is auto-generated from folder structure

## Features

### Automatic Navigation
The sidebar navigation is automatically generated from the folder structure in `/docs`. Each folder becomes a section, and each markdown file becomes a link.

### Breadcrumbs
Each doc page shows breadcrumbs based on the file path, making it easy to navigate back.

### Syntax Highlighting
Code blocks are automatically highlighted using `react-syntax-highlighter` with the VS Code Dark Plus theme.

### SEO
- Each doc page has proper meta tags
- All docs are included in the sitemap
- Structured data can be added per page

### Middleware
The `/docs` routes bypass locale routing (they're always in English and don't need locale prefixes).

## Adding New Docs

Simply add a new `.md` file to the `/docs` folder (or any subfolder):

```bash
# Add a new doc
docs/my-new-guide.md

# It will automatically be available at:
# /docs/my-new-guide
```

The file will automatically appear in:
- The docs index page (`/docs`)
- The sidebar navigation
- The sitemap
- Search results (once indexed)

## Frontmatter

You can add frontmatter to markdown files for metadata:

```markdown
---
title: My Guide Title
description: A description of this guide
---

# My Guide Title

Content here...
```

## Customization

### Styling
Docs use Tailwind Typography classes (`prose`) for styling. You can customize the layout in:
- `src/app/docs/layout.tsx` - Overall layout and sidebar
- `src/app/docs/[...slug]/page.tsx` - Individual page styling

### Navigation
Modify `getDocsTree()` in `src/lib/docs/getDocsFiles.ts` to change how the navigation tree is built.

### Rendering
Modify the `ReactMarkdown` component in `src/app/docs/[...slug]/page.tsx` to customize markdown rendering.

## Dependencies

- `react-markdown` - Markdown rendering
- `remark-gfm` - GitHub Flavored Markdown support
- `react-syntax-highlighter` - Code syntax highlighting
- `gray-matter` - Frontmatter parsing

## Troubleshooting

### Doc not appearing
- Check the file is a `.md` file (not `.mdx`)
- Ensure the file is in the `/docs` folder
- Restart the dev server after adding new files

### Navigation not updating
- The navigation is generated at build/request time
- Check file structure matches expected format
- Verify `getDocsTree()` is working correctly

### Styling issues
- Ensure Tailwind Typography is configured
- Check `prose` classes are applied
- Verify dark mode classes (`dark:prose-invert`)
