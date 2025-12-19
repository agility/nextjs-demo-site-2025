'use client'

import Link from 'next/link'
import { type ReactNode, useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { DocsNav, type DocNode } from './DocsNav'
import { DocsHeader } from './DocsHeader'

interface DocsLayoutClientProps {
	children: ReactNode
	tree: DocNode[]
}

export function DocsLayoutClient({ children, tree }: DocsLayoutClientProps) {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
	const pathname = usePathname()

	// Close mobile menu when clicking outside or on route change
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			const target = event.target as HTMLElement
			if (isMobileMenuOpen && !target.closest('.mobile-nav-drawer') && !target.closest('button[aria-label="Toggle navigation menu"]')) {
				setIsMobileMenuOpen(false)
			}
		}

		if (isMobileMenuOpen) {
			document.addEventListener('click', handleClickOutside)
			// Prevent body scroll when menu is open
			document.body.style.overflow = 'hidden'
		} else {
			document.body.style.overflow = ''
		}

		return () => {
			document.removeEventListener('click', handleClickOutside)
			document.body.style.overflow = ''
		}
	}, [isMobileMenuOpen])

	// Close mobile menu on route change
	useEffect(() => {
		setIsMobileMenuOpen(false)
	}, [pathname])

	const toggleMobileMenu = () => {
		setIsMobileMenuOpen(!isMobileMenuOpen)
	}

	return (
		<div className="min-h-screen bg-white dark:bg-gray-900 flex flex-col">
			{/* Header */}
			<DocsHeader onMenuToggle={toggleMobileMenu} isMenuOpen={isMobileMenuOpen} />

			{/* Mobile Navigation Drawer */}
			{isMobileMenuOpen && (
				<>
					{/* Backdrop */}
					<div
						className="fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity duration-200"
						onClick={() => setIsMobileMenuOpen(false)}
						aria-hidden="true"
					/>
					{/* Drawer */}
					<aside className="mobile-nav-drawer fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-900 shadow-xl overflow-y-auto lg:hidden pt-20 transform transition-transform duration-300 ease-out">
						<div className="px-4 py-6">
							<DocsNav tree={tree} />
						</div>
					</aside>
				</>
			)}

			{/* Main Content */}
			<div className="mx-auto flex w-full max-w-7xl flex-auto justify-center sm:px-2 lg:px-8 xl:px-12">
				{/* Desktop Sidebar Navigation */}
				<div className="hidden lg:block lg:flex-none lg:self-start">
					<aside className="sticky top-[5.5rem] w-64 py-16 pr-8 xl:w-72 xl:pr-16">
						<DocsNav tree={tree} />
					</aside>
				</div>

				{/* Main Content */}
				<div className="min-w-0 max-w-2xl flex-auto px-4 py-8 sm:py-12 lg:py-16 lg:max-w-none lg:pr-0 lg:pl-8 xl:px-16">
					{children}
				</div>
			</div>

			{/* Footer */}
			<footer className="bg-gray-900 dark:bg-black text-white py-8 md:py-12 mt-auto">
				<div className="max-w-7xl mx-auto px-4 md:px-6 text-center">
					<div className="flex items-center justify-center mb-4 md:mb-6">
						<img
							src="https://static.agilitycms.com/layout/img/logo-original.svg"
							alt="Agility CMS"
							className="h-6 md:h-8 brightness-0 invert"
						/>
					</div>
					<p className="text-gray-400 dark:text-gray-500 mb-4 md:mb-6 text-sm md:text-base">
						Documentation for the Agility CMS Next.js Demo Site
					</p>
					<div className="flex flex-wrap justify-center gap-4 md:gap-8 text-gray-500 dark:text-gray-600 text-sm md:text-base">
						<Link
							href="https://demo.agilitycms.com"
							target="_blank"
							rel="noopener noreferrer"
							className="hover:text-indigo-400 dark:hover:text-indigo-300 transition"
						>
							Demo Site
						</Link>
						<Link
							href="https://agilitycms.com"
							target="_blank"
							rel="noopener noreferrer"
							className="hover:text-indigo-400 dark:hover:text-indigo-300 transition"
						>
							Website
						</Link>
						<Link
							href="https://agilitycms.com/docs"
							target="_blank"
							rel="noopener noreferrer"
							className="hover:text-indigo-400 dark:hover:text-indigo-300 transition"
						>
							Documentation
						</Link>
						<Link
							href="https://agilitycms.com/docs/training-guide"
							target="_blank"
							rel="noopener noreferrer"
							className="hover:text-indigo-400 dark:hover:text-indigo-300 transition"
						>
							Training Guide
						</Link>
						<Link
							href="mailto:support@agilitycms.com"
							target="_blank"
							rel="noopener noreferrer"
							className="hover:text-indigo-400 dark:hover:text-indigo-300 transition"
						>
							Support
						</Link>
					</div>
					<div className="mt-6 md:mt-8 pt-6 md:pt-8 border-t border-gray-800 dark:border-gray-900 text-xs md:text-sm text-gray-500 dark:text-gray-600">
						© 2025 Agility CMS. All rights reserved.
					</div>
				</div>
			</footer>
		</div>
	)
}
