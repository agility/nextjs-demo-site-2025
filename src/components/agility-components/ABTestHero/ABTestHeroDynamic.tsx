import { getFeatureFlagVariant } from "@/lib/posthog/get-feature-flag-variant"
import { getUserId } from "@/lib/posthog/get-user-id"
import { ABTestHeroClient } from "./ABTestHeroClient"

interface IHeroVariant {
	variant: string
	heading: string
	description: string
	callToAction?: any
	image: any
	imagePosition?: string
}

interface ABTestHeroDynamicProps {
	experimentKey: string
	allVariants: IHeroVariant[]
	contentID: number
}

/**
 * Dynamic component that handles server-side feature flag evaluation.
 * This component is wrapped in Suspense for Partial Prerendering.
 */
export const ABTestHeroDynamic = async ({
	experimentKey,
	allVariants,
	contentID
}: ABTestHeroDynamicProps) => {
	const defaultVariant = allVariants.find(v => v.variant === "control") || allVariants[0]
	let selectedVariant = defaultVariant

	// Server-side feature flag evaluation
	if (experimentKey && allVariants.length > 1) {
		try {
			const userId = await getUserId()
			const flagValue = await getFeatureFlagVariant(experimentKey, userId)
			console.log("User ID:", userId)
			console.log("Feature flag value:", flagValue)
			// Find the matching variant or use control as fallback
			const variant = allVariants.find(v => v.variant === flagValue)
			if (variant) {
				selectedVariant = variant
			}
		} catch (error) {
			console.warn("Failed to evaluate feature flag, using control variant:", error)
		}
	}

	return (
		<ABTestHeroClient
			userId={await getUserId()}
			experimentKey={experimentKey}
			selectedVariant={selectedVariant}
			contentID={contentID}
		/>
	)
}
