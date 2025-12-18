import { getDocsTree, getAllDocFiles } from '@/lib/docs/getDocsFiles'
import Link from 'next/link'
import type { Metadata } from 'next'

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

export default async function DocsIndexPage() {
	const tree = await getDocsTree()
	const allFiles = await getAllDocFiles()

	return (
		<div className="max-w-4xl">
			<h1 className="text-4xl font-bold mb-4">Documentation</h1>
			<p className="text-lg text-muted-foreground mb-8">
				Complete documentation for the Agility CMS Next.js demo site, including developer guides,
				Agility CMS setup, and architecture documentation.
			</p>

			<div className="space-y-8">
				{tree.map((section) => (
					<Section key={section.path} section={section} allFiles={allFiles} />
				))}
			</div>
		</div>
	)
}

function Section({
	section,
	allFiles,
}: {
	section: ReturnType<typeof getDocsTree>[0]
	allFiles: ReturnType<typeof getAllDocFiles>
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

	return (
		<div>
			{shouldShowAsFolder ? (
				<>
					<h2 className="text-2xl font-semibold mb-3">{section.title}</h2>
					{sectionFiles.length > 0 && (
						<ul className="space-y-1 mb-6">
							{sectionFiles.map((file) => {
								const href = `/docs/${file.slug.join('/')}`
								return (
									<li key={file.slug.join('/')}>
										<Link
											href={href}
											className="text-muted-foreground hover:text-foreground transition-colors"
										>
											{file.title}
										</Link>
									</li>
								)
							})}
						</ul>
					)}
					{hasChildren && (
						<div className="ml-4 mt-4">
							{section.children!.map((child) => (
								<Section key={child.path} section={child} allFiles={allFiles} />
							))}
						</div>
					)}
				</>
			) : sectionFiles.length === 1 ? (
				// Single file - just show as a direct link
				<Link
					href={`/docs/${sectionFiles[0].slug.join('/')}`}
					className="block text-lg font-semibold text-foreground hover:text-primary transition-colors mb-6"
				>
					{sectionFiles[0].title}
				</Link>
			) : (
				// No files, but has children - show as folder
				<>
					<h2 className="text-2xl font-semibold mb-3">{section.title}</h2>
					{hasChildren && (
						<div className="ml-4 mt-4">
							{section.children!.map((child) => (
								<Section key={child.path} section={child} allFiles={allFiles} />
							))}
						</div>
					)}
				</>
			)}
		</div>
	)
}
