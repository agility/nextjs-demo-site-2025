# Demo Site: Deployment Configuration

This guide covers deployment configuration for the Demo Site, including environment variables, build process, and deployment platforms.

## Environment Variables

### Required Variables

```bash
# Agility CMS Configuration
AGILITY_GUID=your-instance-guid
AGILITY_API_FETCH_KEY=your-fetch-key
AGILITY_API_PREVIEW_KEY=your-preview-key
AGILITY_SECURITY_KEY=your-security-key

# Locale Configuration
AGILITY_LOCALES=en-us,fr
AGILITY_SITEMAP=website

# Cache Configuration
AGILITY_FETCH_CACHE_DURATION=60
AGILITY_PATH_REVALIDATE_DURATION=60
```

### Optional Variables

```bash
# Build Hook (for redirect cache rebuilds)
BUILD_HOOK_URL=https://your-deployment-platform.com/build

# PostHog Analytics
NEXT_PUBLIC_POSTHOG_KEY=your-posthog-key
NEXT_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com

# AI Search
AZURE_OPENAI_API_KEY=your-azure-key
AZURE_OPENAI_ENDPOINT=your-endpoint
ALGOLIA_APP_ID=your-algolia-id
ALGOLIA_API_KEY=your-algolia-key
```

## Build Process

### Pre-build Step

**Critical**: Always run pre-build before production build:

```bash
npm run prebuild
```

This step:
- Rebuilds redirect cache from bloom filters
- Generates static redirect data
- Prepares build-time data

### Build Command

```bash
npm run build
```

Build process:
1. Runs pre-build step (if not already run)
2. Generates static pages for all locales
3. Builds API routes
4. Optimizes assets
5. Generates sitemap and robots.txt

### Build Output

```
.next/
├── static/          # Static assets
├── server/          # Server-side code
└── cache/           # Build cache
```

## Deployment Platforms

### Vercel

**Configuration:**
- Framework: Next.js
- Build Command: `npm run prebuild && npm run build`
- Output Directory: `.next`
- Install Command: `npm install`

**Environment Variables:**
- Add all required variables in Vercel dashboard
- Set production and preview environment variables separately

**Webhook Configuration:**
- Add webhook URL: `https://your-site.vercel.app/api/revalidate`
- Set security key header: `x-agility-security-key`

### Netlify

**Configuration:**
- Build Command: `npm run prebuild && npm run build`
- Publish Directory: `.next`
- Node Version: 20.x

**Build Hooks:**
- Configure build hook URL in `BUILD_HOOK_URL`
- Used for redirect cache rebuilds

### Other Platforms

**General Requirements:**
- Node.js 20.x or later
- Support for Next.js App Router
- Environment variable configuration
- Webhook endpoint support

## Webhook Setup

### Agility CMS Webhook Configuration

1. Navigate to Settings → Webhooks
2. Add webhook:
   - **URL**: `https://your-site.com/api/revalidate`
   - **Events**: Content Published, Page Published
   - **Security Key**: Use `AGILITY_SECURITY_KEY`
3. Test webhook

### Webhook Security

Validate webhook requests:

```typescript
// In your webhook handler
const securityKey = request.headers.get("x-agility-security-key")
if (securityKey !== process.env.AGILITY_SECURITY_KEY) {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
}
```

## Cache Strategy

### Production Caching

- **Cache Duration**: 60 seconds default
- **Cache Tags**: Tag-based invalidation
- **Revalidation**: Webhook-triggered
- **Static Generation**: Pre-render at build time

### Preview Mode

- Preview mode bypasses cache
- Uses preview API key
- Shows draft content

## Monitoring

### Health Checks

Monitor API endpoints:
- `/api/revalidate` - Webhook health
- `/api/preview` - Preview functionality
- Main site - Uptime monitoring

### Error Tracking

- Monitor API errors
- Track cache misses
- Log webhook failures

## Troubleshooting

### Build Failures

**Issue**: Build fails during pre-build

**Solutions:**
- Check environment variables are set
- Verify API keys are valid
- Check network connectivity to Agility API

### Cache Not Invalidating

**Issue**: Content not updating after publish

**Solutions:**
- Verify webhook is configured correctly
- Check webhook security key matches
- Verify cache tags are correct
- Check webhook logs for errors

### Preview Not Working

**Issue**: Preview mode not showing draft content

**Solutions:**
- Verify preview API key is set
- Check preview endpoint is accessible
- Verify draft mode is enabled
- Check preview key validation

---

**Back to**: [Demo Site Overview](./README.md)

