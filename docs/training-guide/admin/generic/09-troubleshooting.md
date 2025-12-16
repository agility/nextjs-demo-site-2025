# Admin Troubleshooting

This guide covers common administrative issues and how to resolve them.

## Common Issues

### Issue: Component Not Appearing

**Symptoms:**
- Component not showing on page
- Component name not found error

**Solutions:**
1. Check component name matches frontend registration (case-insensitive)
2. Verify component is saved and published
3. Check user permissions (Designer role needed for component management)
4. Verify component is registered in frontend code

### Issue: Content Not Loading

**Symptoms:**
- Content not appearing in application
- API returns 404 or empty results

**Solutions:**
1. Verify API keys are correct
2. Check content is published (not just saved as draft)
3. Verify locale matches content locale
4. Check content model exists and is configured correctly
5. Verify reference names are correct

### Issue: Permission Denied

**Symptoms:**
- User cannot access content or features
- Permission errors in interface

**Solutions:**
1. Check user's assigned role (Reader, Contributor, Editor, etc.)
2. Verify item-level permissions for specific content models
3. Check if user has appropriate permission (Read, Edit, Publish, etc.) for the action
4. Ensure user has "Contribute" permission if trying to edit their own content
5. Verify "Design/Develop" permission if accessing designer-only fields

### Issue: API Errors

**Symptoms:**
- API calls failing
- 401 Unauthorized errors
- 404 Not Found errors

**Solutions:**
1. Verify API keys are valid
2. Check network connectivity
3. Review API rate limits
4. Check webhook configuration
5. Verify instance GUID is correct

### Issue: Cache Not Invalidating

**Symptoms:**
- Content not updating after publish
- Stale content appearing

**Solutions:**
1. Verify webhook is configured correctly
2. Check webhook security key matches
3. Verify cache tags are correct
4. Check webhook logs for errors
5. Manually revalidate cache if needed

### Issue: Preview Not Working

**Symptoms:**
- Preview mode not showing draft content
- Preview key errors

**Solutions:**
1. Verify preview API key is set
2. Check preview endpoint is accessible
3. Verify draft mode is enabled
4. Check preview key validation
5. Ensure preview key hasn't been regenerated

## User Management Issues

### Issue: User Cannot Access Instance

**Solutions:**
1. Check user role is not "None"
2. Verify user is active
3. Check user email is correct
4. Verify user has been invited

### Issue: User Has Wrong Permissions

**Solutions:**
1. Review user's assigned role
2. Check item-level permissions
3. Verify role permissions match user's needs
4. Update role assignment if needed

## Content Model Issues

### Issue: Content Model Not Saving

**Solutions:**
1. Check required fields are filled
2. Verify field names are valid
3. Check for validation errors
4. Ensure user has Designer permission

### Issue: Content Model Changes Not Appearing

**Solutions:**
1. Verify changes are saved
2. Check if content model is published
3. Clear cache if needed
4. Verify frontend code matches model structure

## Component Model Issues

### Issue: Component Not Matching Frontend

**Solutions:**
1. Verify component name matches frontend registration (case-insensitive)
2. Check field names match TypeScript interfaces
3. Ensure component is registered in frontend
4. Coordinate with developers on component registration

## API Key Issues

### Issue: Invalid API Key

**Solutions:**
1. Verify key is correct (no typos or extra spaces)
2. Check correct key type (fetch vs preview)
3. Ensure key hasn't been regenerated
4. Update environment variables if key was regenerated

### Issue: API Key Exposed

**Solutions:**
1. Regenerate compromised key immediately
2. Update all applications using the key
3. Review access logs for unauthorized usage
4. Update environment variables

## Webhook Issues

### Issue: Webhook Not Firing

**Solutions:**
1. Verify webhook URL is correct and accessible
2. Check webhook is enabled
3. Verify events are selected
4. Check webhook logs in Agility CMS
5. Test webhook endpoint manually

### Issue: Webhook Validation Failing

**Solutions:**
1. Verify security key matches
2. Check header name is correct (`x-agility-security-key`)
3. Ensure key hasn't been regenerated
4. Test webhook validation logic

## Best Practices for Troubleshooting

1. **Check Logs**: Review error logs and webhook logs
2. **Verify Configuration**: Double-check all configurations
3. **Test Incrementally**: Test changes one at a time
4. **Document Issues**: Document problems and solutions
5. **Coordinate with Team**: Work with developers and content editors

---

**Next**: See [Instance-Specific Guide](../instance-specific/README.md) for your specific Agility CMS instance

