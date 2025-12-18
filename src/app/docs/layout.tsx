import { getDocsTree } from '@/lib/docs/getDocsFiles'
import Link from 'next/link'
import { type ReactNode } from 'react'

export default async function DocsLayout({ children }: { children: ReactNode }) {
	const tree = await getDocsTree()

	return (
		<div className="min-h-screen bg-background">
			<div className="container mx-auto px-4 py-8">
				<div className="flex flex-col lg:flex-row gap-8">
					{/* Sidebar Navigation */}
					<aside className="lg:w-64 flex-shrink-0">
						<nav className="sticky top-8">
							<div className="mb-6">
								<Link
									href="/docs"
									className="text-2xl font-bold text-foreground hover:text-primary transition-colors"
								>
									Documentation
								</Link>
							</div>
							<DocsNav tree={tree} />
						</nav>
					</aside>

					{/* Main Content */}
					<main className="flex-1 min-w-0">{children}</main>
				</div>
			</div>
		</div>
	)
}

function DocsNav({ tree }: { tree: ReturnType<typeof getDocsTree> }) {
	return (
		<ul className="space-y-1">
			{tree.map((node) => (
				<NavItem key={node.path} node={node} />
			))}
		</ul>
	)
}

function NavItem({ node, level = 0 }: { node: ReturnType<typeof getDocsTree>[0]; level?: number }) {
	const href = `/docs/${node.slug.join('/')}`
	const hasChildren = node.children && node.children.length > 0

	return (
		<li>
			<Link
				href={href}
				className={`block px-3 py-2 text-sm rounded-md transition-colors ${level === 0
						? 'font-medium text-foreground hover:bg-muted'
						: 'text-muted-foreground hover:text-foreground hover:bg-muted'
					}`}
			>
				{node.title}
			</Link>
			{hasChildren && (
				<ul className={`ml-4 mt-1 space-y-1 ${level > 0 ? 'border-l border-border pl-2' : ''}`}>
					{node.children!.map((child) => (
						<NavItem key={child.path} node={child} level={level + 1} />
					))}
				</ul>
			)}
		</li>
	)
}
