// Get locales from environment variable, fallback to default
const envLocales = process.env.AGILITY_LOCALES?.split(',') || ['en-us']
export const locales = envLocales as readonly string[]
export const defaultLocale = envLocales[0] || 'en-us'
export type Locale = typeof locales[number]

export function isValidLocale(locale: string, locales: readonly string[]): locale is Locale {
  return locales.includes(locale as Locale)
}

export function getLocaleFromPathname(pathname: string, locales: readonly string[]): Locale | null {
  const segments = pathname.split('/')
  const potentialLocale = segments[1]

  if (isValidLocale(potentialLocale, locales)) {
    return potentialLocale
  }

  return null
}

export function removeLocaleFromPathname(pathname: string, locale: Locale): string {
  if (pathname.startsWith(`/${locale}`)) {
    return pathname.slice(`/${locale}`.length) || '/'
  }
  return pathname
}