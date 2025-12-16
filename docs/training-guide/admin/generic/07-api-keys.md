# API Key Management

This guide covers managing API keys in Agility CMS, including key types, security, and best practices.

## API Key Types

Agility CMS provides three types of API keys:

### Fetch Key

**Purpose**: Access published content in production

**Use Case:**
- Production websites and applications
- Public-facing content access
- Standard content delivery

**Security:**
- Can only access published content
- Cannot access draft content
- Safe for client-side use (with restrictions)

### Preview Key

**Purpose**: Access draft content for preview

**Use Case:**
- Preview mode in applications
- Development environments
- Content editor previews

**Security:**
- Can access draft and published content
- Should be kept secure
- Use server-side only

### Security Key

**Purpose**: Validate webhook requests

**Use Case:**
- Webhook signature validation
- Secure webhook endpoints
- Request authentication

**Security:**
- Must be kept secret
- Use for webhook validation only
- Never expose publicly

## Managing API Keys

### Viewing API Keys

1. Navigate to **Settings** → **API Keys**
2. View current keys:
   - Fetch Key
   - Preview Key
   - Security Key

### Regenerating API Keys

1. Navigate to **Settings** → **API Keys**
2. Click **"Regenerate"** for the key you want to regenerate
3. **Important**: Update all applications using the key
4. Update environment variables in all environments

### Key Permissions

API keys have different permissions:
- **Fetch Key**: Read-only access to published content
- **Preview Key**: Read access to draft and published content
- **Security Key**: Webhook validation only

## API Key Security

### Best Practices

1. **Never Commit Keys**: Never commit API keys to version control
2. **Use Environment Variables**: Store keys in environment variables
3. **Rotate Regularly**: Rotate keys periodically
4. **Different Keys for Environments**: Use different keys for dev/staging/production
5. **Monitor Usage**: Monitor API key usage for suspicious activity
6. **Restrict Access**: Limit who has access to API keys

### Key Storage

**Environment Variables:**
```bash
AGILITY_API_FETCH_KEY=your-fetch-key
AGILITY_API_PREVIEW_KEY=your-preview-key
AGILITY_SECURITY_KEY=your-security-key
```

**Never:**
- Commit keys to git
- Share keys publicly
- Hardcode keys in code
- Log keys in console

## API Key Usage

### Fetch Key Usage

```typescript
// Production content access
const sdk = agility.getApi({
  guid: process.env.AGILITY_GUID,
  apiKey: process.env.AGILITY_API_FETCH_KEY,
  isPreview: false
})
```

### Preview Key Usage

```typescript
// Draft content access
const sdk = agility.getApi({
  guid: process.env.AGILITY_GUID,
  apiKey: process.env.AGILITY_API_PREVIEW_KEY,
  isPreview: true
})
```

### Security Key Usage

```typescript
// Webhook validation
const securityKey = request.headers.get("x-agility-security-key")
if (securityKey !== process.env.AGILITY_SECURITY_KEY) {
  return Response.json({ error: "Unauthorized" }, { status: 401 })
}
```

## Troubleshooting

### Invalid API Key

**Issue**: API calls return 401 Unauthorized

**Solutions:**
- Verify key is correct
- Check for typos or extra spaces
- Ensure correct key type (fetch vs preview)
- Verify key hasn't been regenerated

### Key Regeneration

**Issue**: Need to regenerate compromised key

**Steps:**
1. Regenerate key in Agility CMS
2. Update environment variables
3. Update all applications
4. Test API access
5. Monitor for issues

---

**Next**: [Webhooks](./08-webhooks.md) - Webhook configuration

