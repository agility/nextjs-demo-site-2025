'use client'

import { usePathname, useRouter } from 'next/navigation'
import { GlobeAltIcon, ChevronDownIcon } from '@heroicons/react/24/outline'
import { type Locale, getLocaleFromPathname, removeLocaleFromPathname } from '@/lib/i18n/config'
import { useEffect, useState } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface LanguageToggleProps {
  currentLocale: string
  locales: readonly string[]
  defaultLocale: string
}

// Language labels
const languageLabels: Record<string, string> = {
  'en-us': 'English',
  'fr': 'Français'
}

// Language flags or indicators
const languageFlags: Record<string, string> = {
  'en-us': '🇺🇸',
  'fr': '🇫🇷'
}

export function LanguageToggle({ currentLocale, locales, defaultLocale }: LanguageToggleProps) {
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)

  const router = useRouter()

  // Fix hydration mismatch by only rendering after mount
  useEffect(() => {
    setMounted(true)
  }, [])

  const switchLanguage = (newLocale: Locale) => {
    // Don't switch if already on this locale
    if (newLocale === currentLocale) return

    // Get the locale from the current pathname
    const currentLocaleFromPath = getLocaleFromPathname(pathname, locales)
    let cleanPath = pathname

    // If no locale in path, assume default locale
    if (currentLocaleFromPath) {
      // If no locale in path, assume default locale
      cleanPath = removeLocaleFromPathname(pathname, currentLocaleFromPath)
    }


    // Build new path with new locale
    let newPath: string
    if (newLocale === defaultLocale) {
      // For default locale, use clean path without prefix
      newPath = cleanPath
    } else {
      // For other locales, add locale prefix
      newPath = `/${newLocale}${cleanPath}`
    }

    console.log('Switching language:', {
      currentLocale,
      newLocale,
      pathname,
      currentLocaleFromPath,
      cleanPath,
      newPath
    })

    // Use window.location instead of router.push for more reliable navigation
    router.push(newPath)
  }

  // Get other locales (excluding current one)
  const otherLocales = locales.filter(locale => locale !== currentLocale)
  // Don't render until mounted to prevent hydration mismatch
  if (!mounted) {
    return (
      <div className="flex items-center gap-2">
        <GlobeAltIcon className="h-4 w-4 text-gray-600 dark:text-gray-400" />
        <div className="h-8 w-24 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse"></div>
      </div>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-2 px-2 py-1 text-sm rounded-md transition-all duration-200 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700/50">
          <GlobeAltIcon className="h-4 w-4" />
          <span className="text-xs">{languageFlags[currentLocale]}</span>
          <span>{languageLabels[currentLocale]}</span>
          <ChevronDownIcon className="h-3 w-3 transition-transform duration-200 ui-state-open:rotate-180" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" side="top" sideOffset={8}>
        {otherLocales.map((locale) => (
          <DropdownMenuItem
            key={locale}
            onClick={() => switchLanguage(locale)}
            className="flex items-center gap-2 cursor-pointer"
          >
            <span className="text-xs">{languageFlags[locale]}</span>
            <span>{languageLabels[locale]}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}