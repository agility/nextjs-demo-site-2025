import { getDocsTree } from '@/lib/docs/getDocsFiles'
import Link from 'next/link'
import { type ReactNode } from 'react'
import { DocsNav } from './DocsNav'

export default async function DocsLayout({ children }: { children: ReactNode }) {
	const tree = await getDocsTree()

	return (
		<div className="min-h-screen bg-white dark:bg-gray-900 flex flex-col">
			{/* Header */}
			<header className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex items-center justify-between h-16">
						<div className="flex items-center space-x-3">
							<Link
								href="/docs"
								className="flex items-center space-x-3"
							>
								<img
									src="https://static.agilitycms.com/layout/img/logo-original.svg"
									alt="Agility CMS"
									className="h-8 sm:h-10 dark:brightness-0 dark:invert"
								/>
							</Link>
							<span className="text-gray-600 dark:text-gray-300 text-sm hidden sm:inline">Demo Site Documentation</span>
						</div>
						<div className="flex items-center space-x-4">
							<Link
								href="https://demo.agilitycms.com"
								target="_blank"
								rel="noopener noreferrer"
								className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium text-sm sm:text-base hidden sm:inline"
							>
								View Demo Site
							</Link>
							<Link
								href="https://agilitycms.com/docs/training-guide"
								target="_blank"
								rel="noopener noreferrer"
								className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium text-sm sm:text-base"
							>
								Training Guide
							</Link>
							<Link
								href="https://agilitycms.com"
								target="_blank"
								rel="noopener noreferrer"
								className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium text-sm sm:text-base"
							>
								Back to Agility CMS
							</Link>
						</div>
					</div>
				</div>
			</header>

			{/* Main Content */}
			<div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
				<div className="flex flex-col lg:flex-row gap-8">
					{/* Sidebar Navigation */}
					<aside className="lg:w-64 flex-shrink-0">
						<nav className="sticky top-24 flex flex-col h-[calc(100vh-8rem)]">
							<div className="mb-6 flex-shrink-0">
								<Link
									href="/docs"
									className="text-xl font-semibold text-gray-900 dark:text-white hover:text-[#5800d4] dark:hover:text-[#9333ea] transition-colors"
								>
									Documentation
								</Link>
							</div>
							<div className="flex-1 overflow-y-auto overscroll-contain scrollbar-thin pr-2 -mr-2 scroll-smooth">
								<DocsNav tree={tree} />
							</div>
						</nav>
					</aside>

					{/* Main Content */}
					<main className="flex-1 min-w-0">{children}</main>
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

