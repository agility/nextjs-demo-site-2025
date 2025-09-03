import { getContentItem } from "@/lib/cms/getContentItem"
import { getContentList } from "@/lib/cms/getContentList"
import type { ContentItem, ImageField, UnloadedModuleProps, URLField } from "@agility/nextjs"
import { PersonalizedBackgroundHeroClient } from "./PersonalizedBackgroundHeroClient"
import type { IPersonalizedHeroItem } from "@/lib/types/IPersonalizedHeroItem"
import { getAudienceContentID } from "@/lib/utils/audienceRegionUtils"

interface IPersonalizedBackgroundHero {
	heading: string
	description: string
	cta1?: URLField
	cta2?: URLField
	backgroundType?: string
	backgroundImage?: ImageField
	personalizedHeroItems: { referencename: string }
}

export const PersonalizedBackgroundHero = async ({ module, languageCode, globalData }: UnloadedModuleProps) => {
	const {
		fields: {
			heading,
			description,
			cta1,
			cta2,
			backgroundType,
			backgroundImage,
			personalizedHeroItems: { referencename: personalizedHeroItemsReferenceName },
		},
		contentID,
	} = await getContentItem<IPersonalizedBackgroundHero>({
		contentID: module.contentid,
		languageCode,
	})

	// Default hero data
	const defaultHeroData = {
		heading,
		description,
		cta1,
		cta2,
		backgroundType,
		backgroundImage,
	}

	// Get the personalized hero items
	let personalizedItems = await getContentList<IPersonalizedHeroItem>({
		referenceName: personalizedHeroItemsReferenceName,
		languageCode,
		take: 250, // grab all of them so we can do the filtering here
	})

	const searchParams = globalData?.["searchParams"]
	let selectedHeroData = defaultHeroData

	if (searchParams) {
		// Check the personalization stuff and find the appropriate hero item
		const audienceContentID = await getAudienceContentID(searchParams, languageCode)

		if (audienceContentID) {
			// Get the audience name and find the matching hero item
			const { getAudienceListingWithContentID } = await import('@/lib/cms-content/getAudienceListingWithContentID')
			const audiences = await getAudienceListingWithContentID({ locale: languageCode })
			const selectedAudience = audiences.find(a => a.contentID === audienceContentID)

			if (selectedAudience) {
				const matchingItem = personalizedItems.items.find(item =>
					item.fields.audienceName.toLowerCase() === selectedAudience.name.toLowerCase()
				)

				if (matchingItem) {
					selectedHeroData = {
						heading: matchingItem.fields.heading,
						description: matchingItem.fields.description,
						cta1: matchingItem.fields.cta1,
						cta2: matchingItem.fields.cta2,
						backgroundType: matchingItem.fields.backgroundType,
						backgroundImage: matchingItem.fields.backgroundImage,
					}
				}
			}
		}
	}

	return (
		<PersonalizedBackgroundHeroClient
			heroData={selectedHeroData}
			contentID={contentID}
		/>
	)
}