import type { UnloadedModuleProps } from "@agility/nextjs"

/**
 * Checks if the current component is the first component in the main content zone of a page.
 * This is useful for applying different styling (like negative margins) to the first component.
 *
 * @param module - The module object from UnloadedModuleProps
 * @param page - The page object from UnloadedModuleProps
 * @returns true if this component is the first in the main-content-zone, false otherwise
 */
export const isFirstComponentInPage = (module: UnloadedModuleProps['module'], page: UnloadedModuleProps['page']): boolean => {
	const firstZoneItem = page?.zones?.["main-content-zone"]?.[0]

	if (!firstZoneItem || !('item' in firstZoneItem)) {
		return false
	}

	const item = firstZoneItem.item
	// Check if it's a ContentItem (has contentID) or ContentReference (has contentid)
	const itemContentID = 'contentID' in item ? item.contentID : 'contentid' in item ? item.contentid : null

	return itemContentID === module.contentid
}
