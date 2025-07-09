'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export function ViewTransitionProvider({ children }: { children: React.ReactNode }) {
	const pathname = usePathname()

	useEffect(() => {
		// Check if view transitions are supported
		if (!document.startViewTransition) {
			return
		}

		// Handle browser navigation (back/forward buttons)
		const handlePopState = () => {
			if (document.startViewTransition) {
				document.startViewTransition(() => {
					// The navigation has already happened, just trigger the transition
				})
			}
		}

		window.addEventListener('popstate', handlePopState)

		return () => {
			window.removeEventListener('popstate', handlePopState)
		}
	}, [])

	// Override click events on internal links to add view transitions
	useEffect(() => {
		const handleLinkClick = (event: MouseEvent) => {
			const target = event.target as HTMLElement
			const link = target.closest('a[href]') as HTMLAnchorElement

			if (!link || !document.startViewTransition) {
				return
			}

			// Check if it's an internal link
			const href = link.getAttribute('href')
			if (!href || href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:')) {
				return
			}

			// Prevent default navigation
			event.preventDefault()

			// Start view transition
			document.startViewTransition(() => {
				// Use Next.js router or window.location for navigation
				window.location.href = href
			})
		}

		document.addEventListener('click', handleLinkClick)

		return () => {
			document.removeEventListener('click', handleLinkClick)
		}
	}, [pathname])

	return <>{children}</>
}
