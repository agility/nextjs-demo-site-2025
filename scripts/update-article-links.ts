/**
 * Script to update cross-links in TrainingArticles content items
 * Converts relative markdown links to absolute paths for docs site
 */

// File to slug mapping
const FILE_TO_SLUG: Record<string, string> = {
  // Admin Generic
  'docs/training-guide/admin/generic/01-introduction.md': 'admin-introduction',
  'docs/training-guide/admin/generic/02-user-management.md': 'admin-user-management',
  'docs/training-guide/admin/generic/03-content-models.md': 'admin-content-models',
  'docs/training-guide/admin/generic/04-component-models.md': 'admin-component-models',
  'docs/training-guide/admin/generic/05-page-models.md': 'admin-page-models',
  'docs/training-guide/admin/generic/06-workflow.md': 'admin-workflow',
  'docs/training-guide/admin/generic/07-api-keys.md': 'admin-api-keys',
  'docs/training-guide/admin/generic/08-webhooks.md': 'admin-webhooks',
  'docs/training-guide/admin/generic/09-troubleshooting.md': 'admin-troubleshooting',
  'docs/training-guide/admin/generic/README.md': 'admin-overview',

  // Content Editor Generic
  'docs/training-guide/content-editor/generic/01-introduction.md': 'content-editor-introduction',
  'docs/training-guide/content-editor/generic/02-core-concepts.md': 'content-editor-core-concepts',
  'docs/training-guide/content-editor/generic/03-navigation.md': 'content-editor-navigation',
  'docs/training-guide/content-editor/generic/04-content-basics.md': 'content-editor-content-basics',
  'docs/training-guide/content-editor/generic/05-pages-basics.md': 'content-editor-pages-basics',
  'docs/training-guide/content-editor/generic/06-components.md': 'content-editor-components',
  'docs/training-guide/content-editor/generic/07-workflow.md': 'content-editor-workflow',
  'docs/training-guide/content-editor/generic/08-troubleshooting.md': 'content-editor-troubleshooting',
  'docs/training-guide/content-editor/generic/README.md': 'content-editor-overview',

  // Developer Generic
  'docs/training-guide/developer/generic/01-introduction.md': 'developer-introduction',
  'docs/training-guide/developer/generic/02-architecture.md': 'developer-architecture',
  'docs/training-guide/developer/generic/03-setup.md': 'developer-setup',
  'docs/training-guide/developer/generic/04-api-basics.md': 'developer-api-basics',
  'docs/training-guide/developer/generic/05-component-development.md': 'developer-component-development',
  'docs/training-guide/developer/generic/06-content-fetching.md': 'developer-content-fetching',
  'docs/training-guide/developer/generic/07-caching.md': 'developer-caching',
  'docs/training-guide/developer/generic/08-preview-mode.md': 'developer-preview-mode',
  'docs/training-guide/developer/generic/09-internationalization.md': 'developer-internationalization',
  'docs/training-guide/developer/generic/10-best-practices.md': 'developer-best-practices',
  'docs/training-guide/developer/generic/README.md': 'developer-overview',

  // Architect Generic
  'docs/training-guide/architect/generic/01-introduction.md': 'architect-introduction',
  'docs/training-guide/architect/generic/02-data-model.md': 'architect-data-model',
  'docs/training-guide/architect/generic/03-content-strategy.md': 'architect-content-strategy',
  'docs/training-guide/architect/generic/04-component-strategy.md': 'architect-component-strategy',
  'docs/training-guide/architect/generic/05-performance.md': 'architect-performance',
  'docs/training-guide/architect/generic/06-scalability.md': 'architect-scalability',
  'docs/training-guide/architect/generic/07-security.md': 'architect-security',
  'docs/training-guide/architect/generic/08-integrations.md': 'architect-integrations',
  'docs/training-guide/architect/generic/README.md': 'architect-overview',
};

// ContentID to file mapping
const CONTENT_ID_TO_FILE: Record<number, string> = {
  1327: 'docs/training-guide/admin/generic/01-introduction.md',
  1328: 'docs/training-guide/admin/generic/02-user-management.md',
  1329: 'docs/training-guide/admin/generic/03-content-models.md',
  1330: 'docs/training-guide/admin/generic/04-component-models.md',
  1331: 'docs/training-guide/admin/generic/05-page-models.md',
  1332: 'docs/training-guide/admin/generic/06-workflow.md',
  1333: 'docs/training-guide/admin/generic/07-api-keys.md',
  1334: 'docs/training-guide/admin/generic/08-webhooks.md',
  1335: 'docs/training-guide/admin/generic/09-troubleshooting.md',
  1336: 'docs/training-guide/admin/generic/README.md',
  1337: 'docs/training-guide/content-editor/generic/01-introduction.md',
  1338: 'docs/training-guide/content-editor/generic/02-core-concepts.md',
  1339: 'docs/training-guide/content-editor/generic/03-navigation.md',
  1340: 'docs/training-guide/content-editor/generic/04-content-basics.md',
  1341: 'docs/training-guide/content-editor/generic/05-pages-basics.md',
  1342: 'docs/training-guide/content-editor/generic/06-components.md',
  1343: 'docs/training-guide/content-editor/generic/07-workflow.md',
  1344: 'docs/training-guide/content-editor/generic/08-troubleshooting.md',
  1345: 'docs/training-guide/content-editor/generic/README.md',
  1346: 'docs/training-guide/developer/generic/01-introduction.md',
  1347: 'docs/training-guide/developer/generic/02-architecture.md',
  1348: 'docs/training-guide/developer/generic/03-setup.md',
  1349: 'docs/training-guide/developer/generic/04-api-basics.md',
  1350: 'docs/training-guide/developer/generic/05-component-development.md',
  1351: 'docs/training-guide/developer/generic/06-content-fetching.md',
  1352: 'docs/training-guide/developer/generic/07-caching.md',
  1353: 'docs/training-guide/developer/generic/08-preview-mode.md',
  1354: 'docs/training-guide/developer/generic/09-internationalization.md',
  1355: 'docs/training-guide/developer/generic/10-best-practices.md',
  1356: 'docs/training-guide/developer/generic/README.md',
  1357: 'docs/training-guide/architect/generic/01-introduction.md',
  1358: 'docs/training-guide/architect/generic/02-data-model.md',
  1359: 'docs/training-guide/architect/generic/03-content-strategy.md',
  1360: 'docs/training-guide/architect/generic/04-component-strategy.md',
  1361: 'docs/training-guide/architect/generic/05-performance.md',
  1362: 'docs/training-guide/architect/generic/06-scalability.md',
  1363: 'docs/training-guide/architect/generic/07-security.md',
  1364: 'docs/training-guide/architect/generic/08-integrations.md',
  1365: 'docs/training-guide/architect/generic/README.md',
};

function resolveLink(linkPath: string, currentFile: string): string | null {
  // Handle absolute links (starting with /)
  if (linkPath.startsWith('/')) {
    return null; // Don't change absolute links
  }

  // Handle external links (starting with http)
  if (linkPath.startsWith('http')) {
    return null; // Don't change external links
  }

  // Handle relative links
  const path = require('path');
  const currentDir = path.dirname(currentFile);
  const resolvedPath = path.resolve(currentDir, linkPath).replace(/\\/g, '/');

  // Normalize the path to match our file structure
  const normalizedPath = resolvedPath.replace(/.*\/docs\/training-guide\//, 'docs/training-guide/');

  // Check if this file exists in our mapping
  if (FILE_TO_SLUG[normalizedPath]) {
    return `/docs/training-guide/${FILE_TO_SLUG[normalizedPath]}`;
  }

  // If it's a link to instance-specific or other sections, leave it as-is for now
  // (These might not be in the docs site)
  return null;
}

function updateLinks(content: string, currentFile: string): string {
  // Match markdown links: [text](./path.md) or [text](../path.md)
  const linkRegex = /\[([^\]]+)\]\((\.\.?\/[^)]+\.md)\)/g;

  return content.replace(linkRegex, (match, text, linkPath) => {
    const newPath = resolveLink(linkPath, currentFile);
    if (newPath) {
      return `[${text}](${newPath})`;
    }
    return match; // Keep original if we can't resolve it
  });
}

export { updateLinks, CONTENT_ID_TO_FILE, FILE_TO_SLUG };
