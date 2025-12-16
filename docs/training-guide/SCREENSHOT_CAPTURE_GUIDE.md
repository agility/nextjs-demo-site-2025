# Screenshot Capture Guide

This guide explains how to use the automated screenshot capture system for Agility CMS training materials.

## Quick Start

### Capture Priority 1 Screenshots (Most Critical)
```bash
npm run capture-screenshots -- --priority 1
```

### Capture a Specific Screenshot
```bash
npm run capture-screenshots -- --id content-item-edit
```

### Capture All Screenshots
```bash
npm run capture-screenshots -- --all
```

## How It Works

1. **Configuration File**: `scripts/screenshot-config.json` contains all screenshot definitions with URLs
2. **Capture Script**: `scripts/capture-missing-screenshots.ts` automatically navigates to each URL
3. **Output**: Screenshots saved to `docs/training-guide/assets/screenshots/agility-cms/`

### URL Construction

URLs are automatically constructed from the config:
- **Base URL**: `https://app.agilitycms.com/instance/13f09fe2-u/en-us` (from config)
- **Screenshot URL**: Each screenshot has a `url` field (e.g., `/content/list-38/listitem-92`)
- **Full URL**: Script combines them: `baseUrl + url`

**You don't need to navigate manually** - the script does it automatically!

## Authentication

The script provides a **30-second window** for manual authentication:
1. Browser opens to Agility CMS login page
2. You have 30 seconds to log in (this is the ONLY manual step)
3. After authentication, the script automatically:
   - Navigates to each URL
   - Executes actions (clicks, waits, etc.)
   - Captures screenshots
   - Saves them to the correct location

## Where URLs Come From

All URLs are defined in `scripts/screenshot-config.json`:

1. **Base URL** (defined once at the top):
   ```json
   {
     "instance": {
       "baseUrl": "https://app.agilitycms.com/instance/13f09fe2-u/en-us"
     }
   }
   ```

2. **Screenshot URLs** (defined per screenshot):
   ```json
   {
     "url": "/content/list-38/listitem-92"
   }
   ```

3. **Script combines them automatically**:
   - Full URL = `baseUrl + url`
   - Example: `https://app.agilitycms.com/instance/13f09fe2-u/en-us/content/list-38/listitem-92`

**You don't navigate manually** - the script reads URLs from the config and navigates automatically using Playwright.

## Screenshot Configuration

Each screenshot in `screenshot-config.json` includes:

```json
{
  "id": "content-item-edit",
  "priority": 1,
  "filename": "16-content-item-edit-view.png",
  "description": "Content Item Edit View",
  "url": "/content/list-38/listitem-92",
  "actions": [
    { "type": "wait", "time": 3 },
    { "type": "waitFor", "selector": "form" }
  ],
  "notes": "Additional capture instructions"
}
```

### Action Types

- **`wait`**: Wait for specified seconds
- **`waitFor`**: Wait for a CSS selector to appear
- **`click`**: Click on an element (by selector or text)
- **`type`**: Type text into an input field

## Adding New Screenshots

1. Open `scripts/screenshot-config.json`
2. Add a new entry to the `screenshots` array:

```json
{
  "id": "unique-id",
  "priority": 1,
  "filename": "XX-description.png",
  "description": "What this screenshot shows",
  "url": "/path/to/page",
  "actions": [
    { "type": "wait", "time": 2 }
  ],
  "notes": "Any special instructions"
}
```

3. Use the next available number for `filename` (check existing files)
4. Run the capture script with `--id unique-id` to test

## Priority Levels

- **Priority 1**: Critical workflow screenshots (capture first)
- **Priority 2**: High-value screenshots (capture second)
- **Priority 3**: Nice-to-have screenshots (capture last)

## Troubleshooting

### Screenshot Not Capturing

1. **Check URL**: Verify the URL pattern in `screenshot-config.json`
2. **Check Selectors**: Selectors may have changed in Agility CMS UI
3. **Manual Capture**: Use browser DevTools to inspect and update selectors
4. **Check Notes**: Review the `notes` field for special instructions

### Authentication Issues

- The 30-second window may not be enough
- Solution: Increase timeout in script or log in before running

### Selector Not Found

- Agility CMS UI may have changed
- Solution: Update selectors in config file or use more generic selectors

## Manual Screenshot Capture

If automated capture fails, you can manually:

1. Navigate to the URL in the config
2. Perform the actions listed
3. Take a screenshot (Cmd+Shift+4 on Mac, or browser extension)
4. Save to `docs/training-guide/assets/screenshots/agility-cms/` with the filename from config

## Screenshot Naming Convention

Format: `##-description.png`

- `##` = Sequential number (16, 17, 18, etc.)
- `description` = Short description in kebab-case
- Example: `16-content-item-edit-view.png`

## Current Screenshot Status

See [`MISSING_SCREENSHOTS.md`](./MISSING_SCREENSHOTS.md) for:
- Complete list of needed screenshots
- Priority levels
- Detailed descriptions
- What to capture in each screenshot

## Integration with Training Guides

After capturing screenshots:

1. Update markdown files to reference new screenshots
2. Add screenshots to appropriate sections
3. Update screenshot index in `screenshots/README.md`
4. Verify all links work correctly

---

**Need Help?** Check the configuration file comments or review existing screenshot entries for examples.

