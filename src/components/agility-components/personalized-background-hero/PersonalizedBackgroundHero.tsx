import { getContentItem } from "@/lib/cms/getContentItem"
import { getContentList } from "@/lib/cms/getContentList"
import type { IPersonalizedHeroVariant } from "@/lib/types/IPersonalizedHeroVariant"
import { getAudienceContentID } from "@/lib/utils/audienceRegionUtils"
import type { ImageField, UnloadedModuleProps, URLField } from "@agility/nextjs"
import { PersonalizedBackgroundHeroClient } from "./PersonalizedBackgroundHeroClient"

interface IBackgroundHero {
  heading: string
  description: string
  cta1?: URLField
  cta2?: URLField
  backgroundType?: string
  backgroundImage?: ImageField
  personalizedVariants: { referencename: string }
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
      personalizedVariants: { referencename: variantsReferenceName },
    },
    contentID,
  } = await getContentItem<IBackgroundHero>({
    contentID: module.contentid,
    languageCode,
  })

  // Get the personalized variants
  let personalizedVariants = await getContentList<IPersonalizedHeroVariant>({
    referenceName: variantsReferenceName,
    languageCode,
    take: 250,
  })

  // Default values from the main component
  const defaultValues = {
    heading,
    description,
    cta1,
    cta2,
    backgroundType,
    backgroundImage,
  }

  const searchParams = globalData?.["searchParams"]

  if (searchParams) {
    // Check the personalization stuff and filter the list of variants
    const audienceContentID = await getAudienceContentID(searchParams, languageCode)

    // Filter the variants list
    if (audienceContentID) {
      const matchingVariant = personalizedVariants.items.find(
        variant => variant.fields.audience?.contentID === audienceContentID
      )

      if (matchingVariant) {
        // Use the personalized variant values
        return (
          <PersonalizedBackgroundHeroClient
            {...matchingVariant.fields}
            contentID={contentID}
          />
        )
      }
    }
  }

  // Fall back to default values if no audience is selected or no matching variant found
  return (
    <PersonalizedBackgroundHeroClient
      {...defaultValues}
      contentID={contentID}
    />
  )
}
