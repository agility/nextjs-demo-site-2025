import { tool } from 'ai'
import { z } from 'zod'

/**
 * Create the contact capture tool for the AI agent with generative UI
 */
export const createContactCaptureTool = (postURL?: string) => tool({
  description: 'Display a contact form to capture user information (name, email, company) when users want to get in touch, request more information, or express interest in products/services.',
  inputSchema: z.object({
    message: z.string().optional().describe('Optional message to display to the user about why their contact info is needed'),
  }),
  execute: async ({ message }) => {
    // If no POST URL is configured, return an error message
    if (!postURL || postURL.trim() === '') {
      return {
        error: 'Contact capture is not currently configured. Please check back later or contact us directly.'
      }
    }

    // Return data needed for the contact form
    return {
      message: message || 'Please share your contact information and we\'ll get back to you soon.',
      postURL
    }
  },
})

/**
 * Helper function to actually submit contact data (used by the form component)
 */
export const submitContactData = async (
  postURL: string,
  contactData: { name: string; email: string; company?: string }
) => {
  try {
    const payload = {
      name: contactData.name.trim(),
      email: contactData.email.trim(),
      company: contactData.company?.trim() || '',
      timestamp: new Date().toISOString(),
      source: 'AI Agent Contact Capture'
    }

    const response = await fetch(postURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      console.error('Contact capture failed:', response.status, response.statusText)
      throw new Error('Failed to submit contact information')
    }

    return {
      success: true,
      message: 'Thank you! Your contact information has been submitted successfully. Someone will get back to you soon.'
    }

  } catch (error) {
    console.error('Contact capture error:', error)
    throw new Error('An error occurred while submitting your contact information. Please try again later.')
  }
}