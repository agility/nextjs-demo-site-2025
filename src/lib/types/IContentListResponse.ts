import type { ContentItem } from "@agility/content-fetch"

export interface IContentListResponse<T> {
	items: ContentItem<T>[]
	totalCount: number
}