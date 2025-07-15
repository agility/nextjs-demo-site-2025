import { getPostHogClient } from './get-client'

export async function getFeatureFlagVariant(
	flagKey: string,
	distinctId: string,
	userProperties?: Record<string, any>
): Promise<string | boolean | undefined> {
	try {
		const client = getPostHogClient()
		const variant = await client.getFeatureFlag(flagKey, distinctId, userProperties)
		return variant
	} catch (error) {
		console.warn(`Failed to get feature flag ${flagKey}:`, error)
		return undefined
	}
}
