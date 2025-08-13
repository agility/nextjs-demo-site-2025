# Contact Us Component

This is an Agility CMS component that displays a contact form with contact information. The component includes form validation, loading states, success and error messages, and full dark mode support.

## Features

- **Responsive Design** - Adapts to different screen sizes with a two-column layout on larger screens
- **Form Validation** - Client-side validation for required fields and email format
- **Loading States** - Shows loading message during form submission
- **Success/Error Messages** - Configurable messages for different form states
- **Dark Mode Support** - Fully supports light and dark themes
- **Accessible** - Proper form labels, ARIA attributes, and keyboard navigation
- **TypeScript** - Full type safety with proper interfaces

## Agility CMS Setup

The component model has been created in Agility CMS with the following fields:

### Component Fields

| Field Name     | Type | Required | Description                                                                 |
| -------------- | ---- | -------- | --------------------------------------------------------------------------- |
| heading        | Text | Yes      | Main heading for the contact section                                        |
| description    | Text | Yes      | Description text shown under the heading                                    |
| submitURL      | Text | No       | URL endpoint where form data will be submitted (defaults to `/api/contact`) |
| successMessage | Text | No       | Message shown when form is successfully submitted                           |
| errorMessage   | Text | No       | Message shown when form submission fails                                    |
| loadingMessage | Text | No       | Message shown while form is being submitted                                 |
| address        | Text | No       | Office address to display                                                   |
| phone          | Text | No       | Phone number to display                                                     |
| email          | Text | No       | Email address to display                                                    |

### Default Values

If not specified in Agility CMS, the component uses these defaults:

- **submitURL**: `/api/contact`
- **successMessage**: "Thank you for your message! We'll get back to you soon."
- **errorMessage**: "Sorry, there was an error sending your message. Please try again."
- **loadingMessage**: "Sending your message..."

## Form Fields

The contact form includes these fields:

- **First Name** (required)
- **Last Name** (required)
- **Email** (required, with validation)
- **Phone** (optional)
- **Message** (required)

## API Integration

The component includes a sample API endpoint at `/api/contact` that:

1. Validates required fields
2. Validates email format
3. Logs the submission
4. Returns appropriate responses

### API Response Format

**Success Response (200):**

```json
{
  "success": true,
  "message": "Message received successfully"
}
```

**Error Response (400/500):**

```json
{
  "error": "Error message description"
}
```

## Customization

### Styling

The component uses Tailwind CSS with full dark mode support. Key styling features:

- Form inputs have focus states and error states
- Icons are used for contact information
- Responsive grid layout
- Proper spacing and typography
- Smooth transitions

### Form Submission

To customize the form submission:

1. **Replace the API endpoint**: Update the `submitURL` field in Agility CMS
2. **Custom validation**: Modify the `validateForm` function
3. **Additional fields**: Add new fields to the `FormData` interface and form

### Email Integration

To integrate with an email service, update the `/api/contact/route.ts` file:

```typescript
// Example with SendGrid
import sgMail from '@sendgrid/mail'

sgMail.setApiKey(process.env.SENDGRID_API_KEY!)

const msg = {
  to: 'contact@yourcompany.com',
  from: 'noreply@yourcompany.com',
  subject: `New contact form submission from ${firstName} ${lastName}`,
  html: `
    <h2>New Contact Form Submission</h2>
    <p><strong>Name:</strong> ${firstName} ${lastName}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
    <p><strong>Message:</strong></p>
    <p>${message}</p>
  `,
}

await sgMail.send(msg)
```

## Usage in Agility CMS

1. Add the "Contact Us" component to your page modules
2. Configure the content fields in the Agility CMS interface
3. The component will automatically be available on your pages

## Environment Variables

If using email services, add the necessary environment variables to your `.env.local` file:

```bash
# Example for SendGrid
SENDGRID_API_KEY=your_sendgrid_api_key

# Example for other services
SMTP_HOST=your_smtp_host
SMTP_PORT=587
SMTP_USER=your_smtp_user
SMTP_PASS=your_smtp_password
```

## Accessibility

The component includes:

- Proper form labels and associations
- ARIA attributes for screen readers
- Keyboard navigation support
- Color contrast compliance
- Focus indicators
- Error message announcements

## Browser Support

The component is compatible with all modern browsers and includes:

- Progressive enhancement
- Graceful degradation for JavaScript-disabled environments
- Responsive design for mobile devices
