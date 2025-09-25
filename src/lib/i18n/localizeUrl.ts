import { type URLField } from "@agility/nextjs"
import { type Locale, defaultLocale } from "./config"

/**
 * Localizes a URL based on the current locale
 * For default locale (en-us), returns the URL as is
 * For other locales, prefixes the URL with the locale
 */
export function localizeUrl(url: string, locale: Locale): string {
  // Handle external URLs (don't localize)
  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('mailto:') || url.startsWith('tel:')) {
    return url
  }

  // Handle root URL
  if (url === '/' || url === '') {
    return locale === defaultLocale ? '/' : `/${locale}`
  }

  // Ensure URL starts with /
  const normalizedUrl = url.startsWith('/') ? url : `/${url}`

  // For default locale, return URL as is
  if (locale === defaultLocale) {
    return normalizedUrl
  }

  // For other locales, add locale prefix
  return `/${locale}${normalizedUrl}`
}

/**
 * Localizes an Agility URLField based on the current locale
 */
export function localizeUrlField(urlField: URLField | null | undefined, locale: Locale): string {
  if (!urlField?.href) {
    return '/'
  }

  return localizeUrl(urlField.href, locale)
}