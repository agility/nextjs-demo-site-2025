import { draftMode } from 'next/headers';
import { agilityConfig } from "@agility/nextjs"
import { type Locale, defaultLocale, isValidLocale, locales } from "@/lib/i18n/config"

/**
 * Gets the Agility context for the current request.
 */
export const getAgilityContext = async (locale?: string) => {

	//determine if we're in preview mode based on "draft" mode from next.js
	const { isEnabled } = await draftMode()

	const isDevelopmentMode = process.env.NODE_ENV === "development"


	//determine whether it's preview or dev mode
	const isPreview = isEnabled || isDevelopmentMode

	// Validate and use the provided locale, fallback to default
	const validatedLocale: Locale = (locale && isValidLocale(locale, locales)) ? locale : defaultLocale

	return {
		locales: agilityConfig.locales,
		locale: validatedLocale,
		sitemap: agilityConfig.channelName,
		isPreview,
		isDevelopmentMode
	}
}
