import { getPostHogClient } from './get-client'

export async function trackEvent(
	event: string,
	distinctId: string,
	properties?: Record<string, any>
) {
	try {
		const client = getPostHogClient()
		client.capture({
			distinctId,
			event,
			properties,
		})
	} catch (error) {
		console.warn(`Failed to track event ${event}:`, error)
	}
}
