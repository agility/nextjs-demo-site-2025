import { getContentItem } from "@/lib/cms/getContentItem"
import { getContentList } from "@/lib/cms/getContentList"
import type { ImageField, UnloadedModuleProps, URLField } from "@agility/nextjs"
import { ABTestHeroDynamic } from "./ABTestHeroDynamic"
import { ABTestHeroLoading } from "./ABTestHeroLoading"
import { Suspense } from "react"

interface IHeroVariant {
	variant: string
	heading: string
	description: string
	callToAction?: URLField
	image: ImageField
	imagePosition?: string // "left" or "right"
}

interface IHero {
	experimentKey: string
	heading: string
	description: string
	callToAction?: URLField
	image: ImageField
	imagePosition?: string // "left" or "right"
	variants?: {
		referencename: string
	}
}

/**
 * AB Test Hero component with Partial Prerendering (PPR) support.
 * This component fetches content from Agility CMS and uses Suspense boundaries
 * to enable PPR - the static shell is prerendered while dynamic AB testing
 * logic is handled server-side within the Suspense boundary.
 *
 * Uses the experimentKey field to identify the experiment in PostHog.
 *
 * @param {UnloadedModuleProps} props - The properties passed to the component.
 * @returns {JSX.Element} The rendered hero section with AB testing and PPR.
 */
export const ABTestHero = async ({ module, languageCode }: UnloadedModuleProps) => {
	const {
		fields: { experimentKey, heading, description, callToAction, image, imagePosition = "right", variants },
		contentID,
	} = await getContentItem<IHero>({
		contentID: module.contentid,
		languageCode,
	})

	// Fetch variants if they exist
	let variantsList: IHeroVariant[] = []
	if (variants?.referencename) {
		try {
			const contentListResponse = await getContentList<IHeroVariant>({
				referenceName: variants.referencename,
				languageCode,
			})
			variantsList = contentListResponse.items?.map(item => item.fields) || []
		} catch (error) {
			console.warn("Failed to fetch variants for AB test:", error)
		}
	}

	// Create the default variant from the main content
	const defaultVariant: IHeroVariant = {
		variant: "control",
		heading,
		description,
		callToAction,
		image,
		imagePosition,
	}

	// Combine default with variants
	const allVariants = [defaultVariant, ...variantsList]

	return (
		<Suspense fallback={<ABTestHeroLoading contentID={contentID} />}>
			<ABTestHeroDynamic
				experimentKey={experimentKey}
				allVariants={allVariants}
				contentID={contentID}
			/>
		</Suspense>
	)
}
