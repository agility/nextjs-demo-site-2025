# Webhook Configuration

This guide covers configuring webhooks in Agility CMS for cache invalidation and automation.

## Webhook Overview

Webhooks allow Agility CMS to notify your application when content changes, enabling automatic cache invalidation and other automation.

## Webhook Events

Agility CMS can send webhooks for:

- **Content Published**: When content is published
- **Content Updated**: When content is updated
- **Page Published**: When a page is published
- **Page Updated**: When a page is updated
- **Redirect Updated**: When redirects are updated

## Webhook Configuration

### Step 1: Create Webhook Endpoint

Create a webhook endpoint in your application:

```typescript
// app/api/revalidate/route.ts
export async function POST(request: Request) {
  // Validate webhook signature
  // Process webhook event
  // Revalidate cache
  return Response.json({ revalidated: true })
}
```

### Step 2: Configure Webhook in Agility CMS

1. Navigate to **Settings** → **Webhooks**
2. Click **"Add Webhook"**
3. Configure webhook:
   - **URL**: Your webhook endpoint URL
   - **Events**: Select events to trigger webhook
   - **Security Key**: Use `AGILITY_SECURITY_KEY` for validation

### Step 3: Validate Webhook Signature

Validate webhook requests:

```typescript
const securityKey = request.headers.get("x-agility-security-key")
if (securityKey !== process.env.AGILITY_SECURITY_KEY) {
  return Response.json({ error: "Unauthorized" }, { status: 401 })
}
```

## Webhook Payload

### Content Published Event

```json
{
  "state": "Published",
  "instanceGuid": "your-instance-guid",
  "languageCode": "en-us",
  "referenceName": "posts",
  "contentID": 204,
  "contentVersionID": 1287,
  "changeDateUTC": "2025-12-08T15:12:10.883Z"
}
```

### Page Published Event

```json
{
  "state": "Published",
  "instanceGuid": "your-instance-guid",
  "languageCode": "en-us",
  "pageID": 2,
  "pageVersionID": 114,
  "changeDateUTC": "2025-12-08T15:12:10.883Z"
}
```

## Webhook Handler Implementation

### Cache Revalidation

```typescript
export async function POST(request: Request) {
  const data = await request.json()

  // Validate security key
  const securityKey = request.headers.get("x-agility-security-key")
  if (securityKey !== process.env.AGILITY_SECURITY_KEY) {
    return Response.json({ error: "Unauthorized" }, { status: 401 })
  }

  // Only process publish events
  if (data.state === "Published") {
    // Revalidate content tags
    if (data.referenceName) {
      revalidateTag(`agility-content-${data.referenceName}-${data.languageCode}`)
      revalidateTag(`agility-content-${data.contentID}-${data.languageCode}`)
    }

    // Revalidate page tags
    if (data.pageID) {
      revalidateTag(`agility-page-${data.pageID}-${data.languageCode}`)
    }

    // Revalidate paths
    if (data.path) {
      revalidatePath(data.path)
    }
  }

  return Response.json({ revalidated: true })
}
```

## Webhook Security

### Security Best Practices

1. **Validate Signatures**: Always validate webhook signatures
2. **Use Security Keys**: Use security keys for validation
3. **Whitelist Endpoints**: Restrict webhook endpoints
4. **Monitor Activity**: Monitor webhook activity
5. **Handle Errors**: Handle webhook errors gracefully

## Troubleshooting

### Webhook Not Firing

**Issue**: Webhook not receiving events

**Solutions:**
- Verify webhook URL is correct
- Check webhook is enabled
- Verify events are selected
- Check webhook logs

### Invalid Signature

**Issue**: Webhook validation failing

**Solutions:**
- Verify security key matches
- Check header name is correct
- Ensure key hasn't been regenerated

---

**Next**: [Troubleshooting](./09-troubleshooting.md) - Admin troubleshooting

