'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { DarkModeToggle } from '@/components/header/dark-mode-toggle'

interface DocsHeaderProps {
	onMenuToggle?: () => void
	isMenuOpen?: boolean
}

export function DocsHeader({ onMenuToggle, isMenuOpen }: DocsHeaderProps) {
	const [isScrolled, setIsScrolled] = useState(false)

	useEffect(() => {
		function onScroll() {
			setIsScrolled(window.scrollY > 0)
		}
		onScroll()
		window.addEventListener('scroll', onScroll, { passive: true })
		return () => {
			window.removeEventListener('scroll', onScroll)
		}
	}, [])

	return (
		<header
			className={`sticky top-0 z-50 flex flex-none flex-wrap items-center justify-between bg-white px-4 py-5 shadow-md shadow-gray-900/5 transition duration-500 sm:px-6 lg:px-8 dark:shadow-none ${isScrolled
				? 'dark:bg-gray-900/95 dark:backdrop-blur-sm dark:[@supports(backdrop-filter:blur(0))]:bg-gray-900/75'
				: 'dark:bg-transparent'
				}`}
		>
			<div className="relative flex grow basis-0 items-center gap-4">
				{/* Mobile menu button - shows when < 1024px */}
				{onMenuToggle && (
					<button
						onClick={onMenuToggle}
						className="block lg:hidden p-2 -ml-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
						aria-label="Toggle navigation menu"
						aria-expanded={isMenuOpen}
					>
						{isMenuOpen ? (
							<svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
							</svg>
						) : (
							<svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
							</svg>
						)}
					</button>
				)}
				<Link href="/docs" aria-label="Documentation home" className="flex items-center space-x-3">
					<img
						src="https://static.agilitycms.com/layout/img/logo-original.svg"
						alt="Agility CMS"
						className="h-9 w-auto dark:brightness-0 dark:invert"
					/>
					<span className="text-gray-600 dark:text-gray-300 text-sm hidden sm:inline">Demo Site Documentation</span>
				</Link>
			</div>
			<div className="relative flex basis-0 justify-end gap-4 sm:gap-6 md:gap-8 md:grow">
				<DarkModeToggle />
				<Link
					href="https://demo.agilitycms.com"
					target="_blank"
					rel="noopener noreferrer"
					className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium text-sm sm:text-base hidden lg:inline transition-colors"
				>
					View Demo Site
				</Link>
				<Link
					href="https://agilitycms.com/docs/training-guide"
					target="_blank"
					rel="noopener noreferrer"
					className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium text-xs sm:text-sm transition-colors hidden lg:inline"
				>
					<span className="hidden sm:inline">Training Guide</span>
					<span className="sm:hidden">Training</span>
				</Link>
				<Link
					href="https://agilitycms.com"
					target="_blank"
					rel="noopener noreferrer"
					className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium text-xs sm:text-sm transition-colors hidden lg:inline"
				>
					Back to Agility CMS
				</Link>
			</div>
		</header>
	)
}
