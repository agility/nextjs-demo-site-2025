import { getContentList } from '@/lib/cms/getContentList'
import type { ISettings } from '@/lib/types/ISettings'

interface Props {
  locale: string
}

/**
 * Get the global settings content from the Settings shared content item.
 *
 * @param {Props} { locale }
 * @return {*}
 */
export const getSettings = async ({ locale }: Props): Promise<ISettings | null> => {
  try {
    const response = await getContentList<ISettings>({
      referenceName: 'settings',
      languageCode: locale,
      take: 1,
    })

    return response.items[0]?.fields || null
  } catch (error) {
    console.error('Error fetching settings:', error)
    return null
  }
}
