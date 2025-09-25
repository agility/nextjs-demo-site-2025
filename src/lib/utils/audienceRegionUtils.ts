import type { IAudience } from '@/lib/types/IAudience'
import type { IRegion } from '@/lib/types/IRegion'
import type { ContentItem } from '@agility/content-fetch'

// Extended types that include contentID
export type AudienceWithContentID = IAudience & { contentID: number }
export type RegionWithContentID = IRegion & { contentID: number }

/**
 * Get audience contentID from searchParams
 * Fetches audience data and returns the contentID for the selected audience
 *
 * @example
 * // In a server component or page
 * const audienceContentID = await getAudienceContentID(searchParams, 'en-us')
 * if (audienceContentID) {
 *   const filteredContent = await getContentForAudience(audienceContentID)
 * }
 */
export async function getAudienceContentID(
  searchParams: { [key: string]: string | string[] | undefined },
  locale: string
): Promise<number | null> {
  const audienceName = typeof searchParams.audience === 'string' ? searchParams.audience : null

  if (!audienceName) {
    return null
  }

  const { getAudienceListingWithContentID } = await import('@/lib/cms-content/getAudienceListingWithContentID')
  const audiences = await getAudienceListingWithContentID({ locale })

  //find the audience (we have to search the names to lower case, alphanumeric and dashes only)
  const audience = audiences.find(a => a.name.toLowerCase().replace(/[^a-zA-Z0-9-_]/g, '') === audienceName)
  return audience ? audience.contentID : null
}

/**
 * Get region contentID from searchParams
 * Fetches region data and returns the contentID for the selected region
 *
 * @example
 * // In a server component or page
 * const regionContentID = await getRegionContentID(searchParams, 'en-us')
 * if (regionContentID) {
 *   const filteredContent = await getContentForRegion(regionContentID)
 * }
 */
export async function getRegionContentID(
  searchParams: { [key: string]: string | string[] | undefined },
  locale: string
): Promise<number | null> {
  const regionName = typeof searchParams.region === 'string' ? searchParams.region : null

  if (!regionName) {
    return null
  }

  const { getRegionListingWithContentID } = await import('@/lib/cms-content/getRegionListingWithContentID')
  const regions = await getRegionListingWithContentID({ locale })

  const region = regions.find(r => r.name === regionName)
  return region ? region.contentID : null
}

/**
 * Transform ContentItem array to include contentID in the fields
 * This is a helper to convert the raw ContentItem responses from Agility CMS
 * to include the contentID alongside the field data
 *
 * @example
 * const audiencesWithContentID = transformContentItemsWithContentID<IAudience>(rawAudiences.items)
 */
export function transformContentItemsWithContentID<T>(
  items: ContentItem<T>[]
): (T & { contentID: number })[] {
  return items.map(item => ({
    ...item.fields,
    contentID: item.contentID
  }))
}