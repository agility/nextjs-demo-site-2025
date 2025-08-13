import { NextRequest, NextResponse } from 'next/server'

interface ContactFormData {
	firstName: string
	lastName: string
	email: string
	phone?: string
	message: string
}

export async function POST(request: NextRequest) {
	try {
		const body: ContactFormData = await request.json()

		// Validate required fields
		const { firstName, lastName, email, message } = body

		if (!firstName || !lastName || !email || !message) {
			return NextResponse.json(
				{ error: 'Missing required fields' },
				{ status: 400 }
			)
		}

		// Validate email format
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
		if (!emailRegex.test(email)) {
			return NextResponse.json(
				{ error: 'Invalid email format' },
				{ status: 400 }
			)
		}

		// TODO: Replace this with your actual form submission logic
		// Examples:
		// - Send email via SendGrid, Mailgun, or similar service
		// - Save to database
		// - Forward to CRM system
		// - Send to webhook endpoint

		console.log('Contact form submission received:', {
			firstName,
			lastName,
			email,
			phone: body.phone || 'Not provided',
			message,
			timestamp: new Date().toISOString(),
		})

		// Simulate processing delay (remove in production)
		await new Promise(resolve => setTimeout(resolve, 1000))

		// For demonstration purposes, we'll just return success
		// In a real implementation, you would integrate with your email service
		return NextResponse.json(
			{
				success: true,
				message: 'Message received successfully'
			},
			{ status: 200 }
		)

	} catch (error) {
		console.error('Error processing contact form:', error)
		return NextResponse.json(
			{ error: 'Internal server error' },
			{ status: 500 }
		)
	}
}

// Optional: Handle other HTTP methods
export async function GET() {
	return NextResponse.json(
		{ error: 'Method not allowed' },
		{ status: 405 }
	)
}
