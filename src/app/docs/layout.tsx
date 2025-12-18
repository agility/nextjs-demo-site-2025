import { getDocsTree } from '@/lib/docs/getDocsFiles'
import Link from 'next/link'
import { type ReactNode } from 'react'
import { DocsNav } from './DocsNav'
import { DocsHeader } from './DocsHeader'

export default async function DocsLayout({ children }: { children: ReactNode }) {
	const tree = await getDocsTree()

	return (
		<div className="min-h-screen bg-white dark:bg-gray-900 flex flex-col">
			{/* Header */}
			<DocsHeader />

			{/* Main Content */}
			<div className="relative mx-auto flex w-full max-w-7xl flex-auto justify-center sm:px-2 lg:px-8 xl:px-12">
				{/* Sidebar Navigation */}
				<div className="hidden lg:relative lg:block lg:flex-none">
					<div className="absolute inset-y-0 right-0 w-[50vw] bg-gray-50 dark:hidden" />
					<div className="absolute top-16 right-0 bottom-0 hidden h-12 w-px bg-gradient-to-t from-gray-800 dark:block" />
					<div className="absolute top-28 right-0 bottom-0 hidden w-px bg-gray-800 dark:block" />
					<aside className="sticky top-24 -ml-0.5 h-[calc(100vh-4.75rem)] w-64 overflow-x-hidden overflow-y-auto py-16 pr-8 pl-0.5 xl:w-72 xl:pr-16">
						<DocsNav tree={tree} />
					</aside>
				</div>

				{/* Main Content */}
				<div className="max-w-2xl min-w-0 flex-auto px-4 py-16 lg:max-w-none lg:pr-0 lg:pl-8 xl:px-16">
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

