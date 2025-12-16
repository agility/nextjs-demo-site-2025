# Quick Start: Capture Screenshots

## 🚀 One Command to Rule Them All

```bash
npm run capture-screenshots -- --priority 1
```

That's it! The script will:
1. Open a browser
2. Give you 30 seconds to log into Agility CMS (ONLY manual step)
3. **Automatically navigate** to each URL from the config
4. **Automatically execute** actions (clicks, waits, etc.)
5. **Automatically capture** all Priority 1 screenshots
6. Save them to `docs/training-guide/assets/screenshots/agility-cms/`

**No manual navigation needed!** The script reads URLs from `scripts/screenshot-config.json` and navigates automatically.

## 📋 What Gets Captured

**Priority 1 (7 screenshots)** - Most Critical:
- Content Item Edit View
- Content Item Create View
- Component Picker
- Component Editor
- Content Picker
- Page with Content Zones
- Publishing Status

**Priority 2 (12 screenshots)** - High Value:
- Rich Text Editor
- Asset Manager
- Image Upload Dialog
- API Keys Section
- User Management
- Permission Configuration
- Page Model Definition
- Content Model Fields
- Component Model Fields
- Webhook Configuration
- Preview Mode
- Workflow Configuration

**Priority 3 (1 screenshot)** - Nice to Have:
- Content List with Filters

## 🎯 Other Commands

```bash
# Capture specific screenshot
npm run capture-screenshots -- --id content-item-edit

# Capture all screenshots
npm run capture-screenshots -- --all

# Capture priority 2
npm run capture-screenshots -- --priority 2
```

## ⚙️ Configuration

All screenshots are configured in:
- `scripts/screenshot-config.json` - Edit this to add/modify screenshots

## 📖 Full Documentation

- [`SCREENSHOT_CAPTURE_GUIDE.md`](./SCREENSHOT_CAPTURE_GUIDE.md) - Complete guide
- [`MISSING_SCREENSHOTS.md`](./MISSING_SCREENSHOTS.md) - Detailed list of all screenshots

## 🔧 Troubleshooting

**Can't log in fast enough?**
- Log into Agility CMS in a separate browser first
- Then run the script (it will use your existing session)

**Screenshot not capturing?**
- Check the URL in `screenshot-config.json`
- The selectors might have changed - update them in the config file
- See the `notes` field for special instructions

**Need to add a new screenshot?**
1. Open `scripts/screenshot-config.json`
2. Copy an existing screenshot entry
3. Update the `id`, `url`, `filename`, and `actions`
4. Run with `--id your-new-id` to test

---

**That's it!** Just run the command and let the script do the work. 🎉

