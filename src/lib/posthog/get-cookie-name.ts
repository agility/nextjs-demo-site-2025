/**
 * Get the PostHog cookie name based on the API key
 */
export function getCookieName(): string {

	const phProjectAPIKey = process.env.NEXT_PUBLIC_POSTHOG_KEY || ''
	return `ph_${phProjectAPIKey}_posthog`

}
