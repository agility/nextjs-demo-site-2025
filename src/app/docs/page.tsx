import { getDocsTree, getAllDocFiles } from '@/lib/docs/getDocsFiles'
import Link from 'next/link'
import type { Metadata } from 'next'
import { Button } from '@/components/button'
import { FaGithub } from 'react-icons/fa'

export const metadata: Metadata = {
	title: 'Documentation | Agility CMS Next.js Demo Site',
	description: 'Complete documentation for the Agility CMS Next.js demo site',
	alternates: {
		canonical: 'https://demo.agilitycms.com/docs',
	},
	openGraph: {
		title: 'Documentation | Agility CMS Next.js Demo Site',
		description: 'Complete documentation for the Agility CMS Next.js demo site',
		url: 'https://demo.agilitycms.com/docs',
		type: 'website',
		siteName: 'Agility CMS Demo Site',
	},
	twitter: {
		card: 'summary',
		title: 'Documentation | Agility CMS Next.js Demo Site',
		description: 'Complete documentation for the Agility CMS Next.js demo site',
	},
}

// Descriptions for documentation sections and items
const DOC_DESCRIPTIONS: Record<string, string> = {
	// Admin section
	'admin': 'Instance-specific administrative information for configuring and managing the demo site',
	'admin/component-setup': 'Documents the 20 component models configured in the demo site, including registration and administration',
	'admin/configuration': 'Instance-specific configuration including locales, sitemap settings, and environment setup',
	'admin/content-setup': 'Documents the 24 content models (6 Content Items, 18 Content Lists) configured in the demo site',
	'admin/workflows': 'Configured workflows through role assignments and permissions for content creation and publishing',

	// Architect section
	'architect': 'Architectural information and design patterns used in the demo site',
	'architect/architecture': 'Overall site architecture, technology stack, project structure, and architectural decisions',
	'architect/component-architecture': 'Component design patterns, structure, and implementation approaches',
	'architect/content-architecture': 'Content model design, relationships, and data modeling strategies',
	'architect/integrations': 'Implemented integrations including AI search, analytics, and third-party services',

	// Content Editor section
	'content-editor': 'Guide for content editors working with the demo site',
	'content-editor/common-tasks': 'Step-by-step instructions for common content editing tasks specific to the demo site',
	'content-editor/components': 'All 20 components available in the demo site and their use cases',
	'content-editor/content-models': 'All 24 content models available in the demo site with field descriptions',
	'content-editor/pages': 'Site structure, page organization, and how pages are configured in Agility CMS',

	// Developer section
	'developer': 'Codebase-specific documentation for developers working with this Next.js application',
	'developer/codebase': 'Project structure, component implementations, API routes, and deployment configuration',
	'developer/codebase/project-structure': 'Codebase organization, directory structure, and file organization patterns',
	'developer/codebase/content-models': 'Content model implementations and TypeScript interfaces',
	'developer/codebase/components': 'Component implementations, patterns, and reusable UI elements',
	'developer/codebase/api-routes': 'Custom API routes including preview, revalidation, AI search, and contact endpoints',
	'developer/codebase/deployment': 'Deployment configuration, environment variables, build process, and platform setup',
	'developer/ENVIRONMENT_VARIABLES': 'Strongly typed environment configuration and required variables',
	'developer/MULTI_LOCALE_IMPLEMENTATION': 'Internationalization setup, routing, and locale management',
	'developer/AUDIENCE_REGION_SYSTEM': 'Personalization system with query parameters for audience and region targeting',
	'developer/VIEW_TRANSITIONS': 'Page transition implementation using React\'s ViewTransition API',

	// Root level files
	'AGILITY_CMS_URL_PATTERNS': 'URL structure for navigating the Agility CMS content manager interface',
}

export default async function DocsIndexPage() {
	const tree = await getDocsTree()
	const allFiles = await getAllDocFiles()

	return (
		<div className="max-w-4xl">
			<div className="mb-8">
				<h1 className="text-4xl font-bold mb-2 text-gray-900 dark:text-white">Documentation</h1>
				<p className="text-lg text-gray-600 dark:text-gray-300">
					Complete guide to the <strong className="text-gray-900 dark:text-white">Agility CMS Next.js Demo Site</strong>
				</p>
			</div>

			<div className="prose prose-lg dark:prose-invert max-w-none mb-12 prose-slate dark:text-gray-300 prose-headings:font-normal prose-lead:text-gray-600 dark:prose-lead:text-gray-400 prose-a:font-semibold prose-a:text-[#5800d4] dark:prose-a:text-purple-400 prose-a:no-underline prose-a:border-b prose-a:border-purple-300 dark:prose-a:border-purple-600 prose-a:pb-0.5 hover:prose-a:border-purple-500 dark:hover:prose-a:border-purple-400">
				<p className="text-base text-gray-600 dark:text-gray-300 mb-6">
					This documentation covers everything you need to understand, customize, and extend this
					production-ready demo site built with Agility CMS and Next.js.
				</p>

				<div className="bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-lg p-6 mb-8">
					<h2 className="text-xl font-semibold mb-3 mt-0 text-gray-900 dark:text-white">What You'll Find Here</h2>
					<ul className="mb-0 text-gray-700 dark:text-gray-300 space-y-2">
						<li><strong className="text-gray-900 dark:text-white">Demo Site Specifics</strong> - Architecture, implementation patterns, and code examples unique to this demo</li>
						<li><strong className="text-gray-900 dark:text-white">Developer Guides</strong> - Step-by-step instructions for common development tasks</li>
						<li><strong className="text-gray-900 dark:text-white">Agility CMS Integration</strong> - How this site uses Agility CMS features and APIs</li>
						<li><strong className="text-gray-900 dark:text-white">Best Practices</strong> - Patterns and conventions used throughout the codebase</li>
					</ul>
				</div>

				<div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-6 mb-8">
					<h2 className="text-xl font-semibold mb-3 mt-0 text-gray-900 dark:text-white">New to Agility CMS?</h2>
					<p className="mb-4 text-gray-700 dark:text-gray-300">
						This documentation focuses on <strong className="text-gray-900 dark:text-white">this specific demo site</strong>. For comprehensive
						Agility CMS training, including role-based guides, step-by-step tutorials, and platform
						fundamentals, check out the official training guide:
					</p>
					<a
						href="https://agilitycms.com/docs/training-guide"
						target="_blank"
						rel="noopener noreferrer"
						className="inline-flex items-center gap-2 font-semibold text-[#5800d4] dark:text-purple-300 dark:hover:text-purple-200 hover:text-[#4c1d95] transition-colors"
					>
						Visit Agility CMS Training Guide
						<svg
							className="w-4 h-4"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
							/>
						</svg>
					</a>
				</div>

				<div className="relative overflow-hidden rounded-lg border border-purple-200 dark:border-purple-800/50 bg-gradient-to-br from-purple-50 via-purple-50/30 to-white dark:from-purple-950/30 dark:via-gray-800/50 dark:to-gray-800/30 p-8 mb-8 ring-1 ring-purple-100/50 dark:ring-purple-900/30">
					<div className="relative">
						<div className="mb-4">
							<h2 className="text-2xl font-semibold mb-3 mt-0 text-gray-900 dark:text-white">Ready to Try Agility CMS?</h2>
							<p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed">
								Whether you're a <strong className="text-gray-900 dark:text-white font-semibold">developer</strong> looking to explore the codebase or a <strong className="text-gray-900 dark:text-white font-semibold">content editor</strong> wanting to see the editing experience,
								our team can show you how Agility CMS works for your use case.
							</p>
						</div>
						<div className="flex flex-col sm:flex-row sm:items-center gap-4">
							<a
								href="https://agilitycms.com/contact-us/get-a-demo"
								target="_blank"
								rel="noopener noreferrer"
								className="group relative flex items-center justify-center px-6 h-11 rounded-full font-semibold bg-gradient-to-r from-purple-600 via-purple-500 to-indigo-600 dark:from-purple-800 dark:via-purple-700 dark:to-indigo-800 hover:from-purple-500 hover:via-purple-400 hover:to-indigo-500 dark:hover:from-purple-700 dark:hover:via-purple-600 dark:hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-purple-500/50 hover:scale-105 overflow-hidden no-underline"
								style={{ color: '#ffffff' }}
							>
								{/* Continuous shimmer effect */}
								<span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent [animation:shimmer_3s_ease-in-out_infinite]"></span>
								<span className="relative z-10 font-semibold text-white" style={{ lineHeight: '1' }}>Book a Demo</span>
							</a>
							<p className="text-sm text-gray-600 dark:text-gray-400">
								Get a personalized walkthrough with our experts
							</p>
						</div>
					</div>
				</div>

				<div className="relative overflow-hidden rounded-lg border border-gray-300 dark:border-gray-700 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 p-8 mb-8 ring-1 ring-gray-800/50 dark:ring-gray-800/50">
					<div className="relative">
						<div className="mb-4">
							<div className="flex items-center gap-3 mb-3">
								<FaGithub className="w-7 h-7 text-white flex-shrink-0" />
								<div className="text-2xl font-semibold text-white leading-none">Explore the Source Code</div>
							</div>
							<p className="text-base text-gray-300 dark:text-gray-400 leading-relaxed">
								This demo site is <strong className="text-white font-semibold">open source</strong> and available on GitHub. Browse the codebase,
								submit issues, or contribute improvements to help make Agility CMS even better.
							</p>
						</div>
						<div className="flex flex-col sm:flex-row sm:items-center gap-4">
							<a
								href="https://github.com/agility/nextjs-demo-site-2025"
								target="_blank"
								rel="noopener noreferrer"
								className="group relative flex items-center justify-center gap-2 px-6 h-11 rounded-full font-semibold bg-white hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-900 dark:text-white transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-gray-500/50 hover:scale-105 overflow-hidden no-underline"
							>
								<FaGithub className="w-5 h-5" />
								<span className="font-semibold">View on GitHub</span>
								<svg
									className="w-4 h-4 opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
									/>
								</svg>
							</a>
							<p className="text-sm text-gray-400 dark:text-gray-500">
								github.com/agility/nextjs-demo-site-2025
							</p>
						</div>
					</div>
				</div>

				<h2 className="text-2xl font-semibold mb-6 mt-8 text-gray-900 dark:text-white">Documentation Sections</h2>
			</div>

			<div className="space-y-8">
				{tree.map((section) => (
					<Section key={section.path} section={section} allFiles={allFiles} descriptions={DOC_DESCRIPTIONS} />
				))}
			</div>
		</div>
	)
}

function Section({
	section,
	allFiles,
	descriptions,
}: {
	section: ReturnType<typeof getDocsTree>[0]
	allFiles: ReturnType<typeof getAllDocFiles>
	descriptions: Record<string, string>
}) {
	// Find files that match this section
	// Exclude README files - they're accessible via folder paths but shouldn't be listed
	const sectionFiles = allFiles.filter((file) => {
		const isReadme = file.slug[file.slug.length - 1] === 'README'
		// Skip README files entirely
		if (isReadme) return false

		const filePath = file.slug
		return filePath.length === section.slug.length &&
			filePath.every((seg, i) => seg === section.slug[i])
	})

	// If there's only one file and no children, just show the link directly
	const hasChildren = section.children && section.children.length > 0
	const shouldShowAsFolder = sectionFiles.length > 1 || hasChildren

	// Get description for this section
	const sectionKey = section.slug.join('/')
	const sectionDescription = descriptions[sectionKey]

	return (
		<div>
			{shouldShowAsFolder ? (
				<>
					<div className="mb-3">
						<h2 className="text-2xl font-semibold mb-1 text-gray-900 dark:text-white">{section.title}</h2>
						{sectionDescription && (
							<p className="text-gray-600 dark:text-gray-300 text-sm">{sectionDescription}</p>
						)}
					</div>
					{sectionFiles.length > 0 && (
						<ul className="space-y-3 mb-6">
							{sectionFiles.map((file) => {
								const href = `/docs/${file.slug.join('/')}`
								const fileKey = file.slug.join('/')
								const fileDescription = descriptions[fileKey]
								return (
									<li key={file.slug.join('/')}>
										<Link
											href={href}
											className="block group"
										>
											<span className="text-gray-900 dark:text-white hover:text-[#5800d4] dark:hover:text-[#9333ea] transition-colors font-medium">
												{file.title}
											</span>
											{fileDescription && (
												<p className="text-gray-600 dark:text-gray-300 text-sm mt-0.5">
													{fileDescription}
												</p>
											)}
										</Link>
									</li>
								)
							})}
						</ul>
					)}
					{hasChildren && (
						<div className="ml-4 mt-4">
							{section.children!.map((child) => (
								<Section key={child.path} section={child} allFiles={allFiles} descriptions={descriptions} />
							))}
						</div>
					)}
				</>
			) : sectionFiles.length === 1 ? (
				// Single file - just show as a direct link with description
				<div className="mb-6">
					<Link
						href={`/docs/${sectionFiles[0].slug.join('/')}`}
						className="block group"
					>
						<span className="text-lg font-semibold text-gray-900 dark:text-white hover:text-[#5800d4] dark:hover:text-[#9333ea] transition-colors">
							{sectionFiles[0].title}
						</span>
						{descriptions[sectionFiles[0].slug.join('/')] && (
							<p className="text-gray-600 dark:text-gray-300 text-sm mt-1">
								{descriptions[sectionFiles[0].slug.join('/')]}
							</p>
						)}
					</Link>
				</div>
			) : (
				// No files, but has children - show as folder
				<>
					<div className="mb-3">
						<h2 className="text-2xl font-semibold mb-1 text-gray-900 dark:text-white">{section.title}</h2>
						{sectionDescription && (
							<p className="text-gray-600 dark:text-gray-300 text-sm">{sectionDescription}</p>
						)}
					</div>
					{hasChildren && (
						<div className="ml-4 mt-4">
							{section.children!.map((child) => (
								<Section key={child.path} section={child} allFiles={allFiles} descriptions={descriptions} />
							))}
						</div>
					)}
				</>
			)}
		</div>
	)
}
