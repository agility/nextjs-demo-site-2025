import { getDocBySlug, getBreadcrumbs, getAllDocFiles } from '@/lib/docs/getDocsFiles'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'

export const revalidate = 3600 // Revalidate every hour

export async function generateStaticParams() {
	const files = await getAllDocFiles()
	const params: Array<{ slug: string[] }> = []

	// Add all files
	files.forEach((file) => {
		// Skip root README.md (empty slug) - that's handled by /docs/page.tsx
		if (file.slug.length === 0) {
			return
		}

		params.push({ slug: file.slug })

		// If it's a README file, also add the folder path (without README)
		if (file.slug[file.slug.length - 1] === 'README') {
			const folderSlug = file.slug.slice(0, -1)
			// Only add if folder slug is not empty (root README is handled separately)
			if (folderSlug.length > 0) {
				params.push({ slug: folderSlug })
			}
		}
	})

	return params
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ slug: string[] }>
}): Promise<Metadata> {
	const { slug } = await params
	const doc = await getDocBySlug(slug)

	if (!doc) {
		return {
			title: 'Documentation Not Found',
		}
	}

	const baseUrl = 'https://demo.agilitycms.com'
	const docUrl = `${baseUrl}/docs/${slug.join('/')}`

	return {
		title: `${doc.title} | Documentation`,
		description: doc.frontmatter.description || `Documentation: ${doc.title}`,
		alternates: {
			canonical: docUrl,
		},
		openGraph: {
			title: doc.title,
			description: doc.frontmatter.description || `Documentation: ${doc.title}`,
			url: docUrl,
			type: 'article',
			siteName: 'Agility CMS Demo Site',
		},
		twitter: {
			card: 'summary',
			title: doc.title,
			description: doc.frontmatter.description || `Documentation: ${doc.title}`,
		},
	}
}

export default async function DocsPage({ params }: { params: Promise<{ slug: string[] }> }) {
	const { slug } = await params
	const doc = await getDocBySlug(slug)

	if (!doc) {
		notFound()
	}

	const breadcrumbs = await getBreadcrumbs(slug)
	const baseUrl = 'https://demo.agilitycms.com'
	const docUrl = `${baseUrl}/docs/${slug.join('/')}`

	// Generate structured data for Article and BreadcrumbList
	const articleStructuredData = {
		'@context': 'https://schema.org',
		'@type': 'Article',
		headline: doc.title,
		description: doc.frontmatter.description || `Documentation: ${doc.title}`,
		url: docUrl,
		author: {
			'@type': 'Organization',
			name: 'Agility CMS',
			url: 'https://agilitycms.com',
		},
		publisher: {
			'@type': 'Organization',
			name: 'Agility CMS',
			url: 'https://agilitycms.com',
			logo: {
				'@type': 'ImageObject',
				url: 'https://agilitycms.com/logo.png',
			},
		},
		mainEntityOfPage: {
			'@type': 'WebPage',
			'@id': docUrl,
		},
		datePublished: doc.frontmatter.datePublished || new Date().toISOString(),
		dateModified: doc.frontmatter.dateModified || new Date().toISOString(),
	}

	const breadcrumbStructuredData = {
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: [
			{
				'@type': 'ListItem',
				position: 1,
				name: 'Docs',
				item: `${baseUrl}/docs`,
			},
			...breadcrumbs.map((crumb, index) => ({
				'@type': 'ListItem',
				position: index + 2,
				name: crumb.title,
				item: `${baseUrl}${crumb.path}`,
			})),
		],
	}

	return (
		<article className="max-w-4xl">
			{/* Structured Data */}
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(articleStructuredData) }}
			/>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbStructuredData) }}
			/>
			{/* Breadcrumbs */}
			<nav className="mb-6" aria-label="Breadcrumb">
				<ol className="flex items-center space-x-2 text-sm text-muted-foreground">
					<li>
						<Link href="/docs" className="hover:text-foreground">
							Docs
						</Link>
					</li>
					{breadcrumbs.map((crumb, index) => (
						<li key={crumb.path} className="flex items-center">
							<span className="mx-2">/</span>
							{index === breadcrumbs.length - 1 ? (
								<span className="text-foreground">{crumb.title}</span>
							) : (
								<Link href={crumb.path} className="hover:text-foreground">
									{crumb.title}
								</Link>
							)}
						</li>
					))}
				</ol>
			</nav>

			{/* Title */}
			<h1 className="text-4xl font-bold mb-6">{doc.title}</h1>

			{/* Content */}
			<div className="prose prose-lg dark:prose-invert max-w-none">
				<ReactMarkdown
					remarkPlugins={[remarkGfm]}
					components={{
						code({ className, children, ...props }: any) {
							const match = /language-(\w+)/.exec(className || '')
							const isInline = !match
							return !isInline && match ? (
								<SyntaxHighlighter
									style={vscDarkPlus}
									language={match[1]}
									PreTag="div"
									{...props}
								>
									{String(children).replace(/\n$/, '')}
								</SyntaxHighlighter>
							) : (
								<code className={className} {...props}>
									{children}
								</code>
							)
						},
						a({ node, href, children, ...props }) {
							// Handle internal links
							if (href?.startsWith('/')) {
								return (
									<Link href={href} {...props}>
										{children}
									</Link>
								)
							}
							// External links
							return (
								<a href={href} target="_blank" rel="noopener noreferrer" {...props}>
									{children}
								</a>
							)
						},
					}}
				>
					{doc.content}
				</ReactMarkdown>
			</div>
		</article>
	)
}
