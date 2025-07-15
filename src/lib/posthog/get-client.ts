import { PostHog } from 'posthog-node'

let posthogClient: PostHog | null = null

export function getPostHogClient(): PostHog {
	if (!posthogClient) {
		const postHogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY
		const postHogHost = process.env.NEXT_PUBLIC_POSTHOG_HOST

		if (!postHogKey || !postHogHost) {
			throw new Error('PostHog environment variables are not set')
		}

		posthogClient = new PostHog(postHogKey, {
			host: postHogHost,
		})
	}

	return posthogClient
}
