'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { DarkModeToggle } from '@/components/header/dark-mode-toggle'

export function DocsHeader() {
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
			<div className="relative flex grow basis-0 items-center">
				<Link href="/docs" aria-label="Documentation home" className="flex items-center space-x-3">
					<img
						src="https://static.agilitycms.com/layout/img/logo-original.svg"
						alt="Agility CMS"
						className="h-9 w-auto dark:brightness-0 dark:invert"
					/>
					<span className="text-gray-600 dark:text-gray-300 text-sm hidden sm:inline">Demo Site Documentation</span>
				</Link>
			</div>
			<div className="relative flex basis-0 justify-end gap-6 sm:gap-8 md:grow">
				<DarkModeToggle />
				<Link
					href="https://demo.agilitycms.com"
					target="_blank"
					rel="noopener noreferrer"
					className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium text-sm sm:text-base hidden sm:inline transition-colors"
				>
					View Demo Site
				</Link>
				<Link
					href="https://agilitycms.com/docs/training-guide"
					target="_blank"
					rel="noopener noreferrer"
					className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium text-sm sm:text-base transition-colors"
				>
					Training Guide
				</Link>
				<Link
					href="https://agilitycms.com"
					target="_blank"
					rel="noopener noreferrer"
					className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium text-sm sm:text-base transition-colors"
				>
					Back to Agility CMS
				</Link>
			</div>
		</header>
	)
}
