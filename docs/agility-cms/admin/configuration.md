# Demo Site: Instance Configuration

This guide documents the instance-specific configuration for the Demo Site.

## Locale Configuration

### Configured Locales

- **English (en-us)** - Default locale
- **French (fr)** - Secondary locale

### Locale Management

- Default locale (en-us) has no URL prefix: `/blog`
- Other locales have prefix: `/fr/blog`
- Internal routing uses locale prefix
- Middleware handles locale detection and routing

## Sitemap Configuration

### Current Sitemap

- **Name**: Website
- **ID**: 1
- **Type**: Website
- **Default**: Yes

### Sitemap Structure

```
Home (/home)
About Us (/about-us)
Pricing (/pricing)
Blog (/blog)
  └── Post Details (/blog/post-details) [Dynamic: Posts]
Features (/features)
Contact Us (/contact-us)
```

## Page Model Configuration

> **Note**: "Page Templates" is the old terminology. The current term is "Page Models."

### Current Page Model

- **Main Template** (ID: 2)

### Content Zones

- **main-content-zone**: Primary content area for components

## API Configuration

### API Keys

- **Fetch Key**: For production content access
- **Preview Key**: For draft content access
- **Security Key**: For webhook validation

### API Key Management

1. Navigate to **Settings** → **API Keys**
2. View current keys
3. Regenerate keys if compromised
4. Update frontend environment variables

## Environment Variables

Required environment variables:

```bash
AGILITY_GUID=13f09fe2-u
AGILITY_API_FETCH_KEY=your-fetch-key
AGILITY_API_PREVIEW_KEY=your-preview-key
AGILITY_SECURITY_KEY=your-security-key
AGILITY_LOCALES=en-us,fr
AGILITY_SITEMAP=website
```

## Webhook Configuration

### Webhook Endpoint

- **URL**: `https://your-site.com/api/revalidate`
- **Events**: Content Published, Page Published
- **Security Key**: Use `AGILITY_SECURITY_KEY` for validation

### Webhook Setup

1. Navigate to **Settings** → **Webhooks**
2. Add webhook endpoint
3. Configure events
4. Set security key

---

**Next**: [Content Setup](./content-setup.md) - Content model setup

