# Troubleshooting Common Issues

This guide helps you resolve common issues you might encounter while working with Agility CMS.

## Content Not Appearing

### Issue: Content item is saved but not showing on the page

**Possible causes:**
- Content item is not published
- Component is not linking to the content item correctly
- Page is not published
- Cache needs to be cleared

**Solutions:**
1. Check that the content item status is "Published"
2. Verify the component is linking to the correct content item
3. Ensure the page containing the component is published
4. Clear browser cache or wait for cache to refresh

## Components Not Loading

### Issue: Component appears broken or doesn't display

**Possible causes:**
- Component model not properly configured
- Required fields not filled
- Linked content missing
- Component not registered in frontend

**Solutions:**
1. Check that all required component fields are filled
2. Verify linked content items exist and are published
3. Check component model definition
4. Contact developer if component appears to be missing from frontend

## Publishing Issues

### Issue: Can't publish content

**Possible causes:**
- Missing required fields
- Insufficient permissions
- Approval workflow blocking publication
- Validation errors

**Solutions:**
1. Check that all required fields are completed
2. Verify your role has "Publish" permission
3. Check if approval is required (submit for approval instead)
4. Review any validation error messages

## Permission Problems

### Issue: Can't access or edit content

**Possible causes:**
- Insufficient permissions for your role
- Content is restricted by Security settings
- Role doesn't have access to specific content lists

**Solutions:**
1. Check your role and permissions
2. Contact administrator to review Security settings
3. Verify you have access to the content list or page

## Image Upload Issues

### Issue: Images not uploading or displaying

**Possible causes:**
- File size too large
- Unsupported file format
- Upload permissions
- CDN delivery issues

**Solutions:**
1. Check file size limits
2. Verify file format is supported (JPG, PNG, GIF, WebP, SVG)
3. Check upload permissions
4. Wait for CDN propagation if recently uploaded

## Search Not Finding Content

### Issue: Search doesn't return expected results

**Possible causes:**
- Content not published
- Search indexing delay
- Incorrect search terms

**Solutions:**
1. Ensure content is published
2. Wait a moment for search index to update
3. Try different search terms
4. Use filters to narrow results

## Page Not Updating

### Issue: Changes to page not appearing

**Possible causes:**
- Page not published
- Browser cache
- CDN cache
- Component changes not saved

**Solutions:**
1. Verify page is published
2. Clear browser cache
3. Wait for CDN cache to refresh
4. Check that all component changes were saved

## Linked Content Issues

### Issue: Linked content not displaying correctly

**Possible causes:**
- Linked content item not published
- Wrong content item linked
- Component not configured to display linked content

**Solutions:**
1. Verify linked content item is published
2. Check that correct content item is linked
3. Review component configuration

## Getting Help

If you encounter issues not covered here:

1. **Check documentation**: Review relevant guides
2. **Contact administrator**: For permission or configuration issues
3. **Contact developer**: For component or frontend issues
4. **Review error messages**: Error messages often provide helpful clues

## Prevention Tips

1. **Save frequently**: Don't lose work
2. **Preview before publishing**: Catch issues early
3. **Check permissions**: Understand what you can and can't do
4. **Follow workflows**: Respect approval processes
5. **Test changes**: Verify changes work as expected

---

**Next**: See [Instance-Specific Guide](../instance-specific/README.md) for information about your specific Agility CMS instance

