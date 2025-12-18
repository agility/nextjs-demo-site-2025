'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { useEffect, useRef } from 'react'

export type DocNode = {
	title: string
	slug: string[]
	path: string
	children?: DocNode[]
}

interface DocsNavProps {
	tree: DocNode[]
}

export function DocsNav({ tree }: DocsNavProps) {
	const pathname = usePathname()
	const navRef = useRef<HTMLUListElement>(null)
	const activeItemRef = useRef<HTMLLIElement>(null)

	// Auto-scroll to active item on mount or pathname change
	useEffect(() => {
		// Use a small delay to ensure DOM is fully rendered
		const timer = setTimeout(() => {
			if (activeItemRef.current && navRef.current) {
				const navRect = navRef.current.getBoundingClientRect()
				const itemRect = activeItemRef.current.getBoundingClientRect()

				// Check if item is outside visible area
				if (itemRect.top < navRect.top || itemRect.bottom > navRect.bottom) {
					// Scroll to center the active item in the viewport
					activeItemRef.current.scrollIntoView({
						behavior: 'smooth',
						block: 'center',
					})
				}
			}
		}, 100)

		return () => clearTimeout(timer)
	}, [pathname])

	return (
		<nav className="text-base lg:text-sm">
			<ul ref={navRef} role="list" className="space-y-9">
				{tree.map((node) => {
					if (node.children && node.children.length > 0) {
						return (
							<li key={node.path}>
								<h2 className="font-semibold text-gray-900 dark:text-white mb-2">
									{node.title}
								</h2>
								<ul
									role="list"
									className="mt-2 space-y-2 border-l-2 border-gray-100 dark:border-gray-800 lg:mt-4 lg:space-y-4"
								>
									{node.children.map((child) => (
										<NavItem
											key={child.path}
											node={child}
											currentPathname={pathname}
											activeItemRef={activeItemRef}
										/>
									))}
								</ul>
							</li>
						)
					} else {
						// Node without children - NavItem already returns <li>, so don't wrap it
						return (
							<NavItem
								key={node.path}
								node={node}
								currentPathname={pathname}
								activeItemRef={activeItemRef}
							/>
						)
					}
				})}
			</ul>
		</nav>
	)
}

interface NavItemProps {
	node: DocNode
	level?: number
	currentPathname: string
	activeItemRef: React.RefObject<HTMLLIElement | null>
}

function NavItem({ node, level = 0, currentPathname, activeItemRef }: NavItemProps) {
	const href = `/docs/${node.slug.join('/')}`
	const hasChildren = node.children && node.children.length > 0

	// Check if this item or any of its children is active
	const isActive = currentPathname === href || currentPathname.startsWith(`${href}/`)
	const isExactMatch = currentPathname === href

	// Determine if this item should have the ref (only exact matches)
	const itemRef = isExactMatch ? activeItemRef : null

	return (
		<li ref={itemRef} className="relative">
			<Link
				href={href}
				className={`block w-full pl-3.5 before:pointer-events-none before:absolute before:top-1/2 before:-left-1 before:h-1.5 before:w-1.5 before:-translate-y-1/2 before:rounded-full transition-colors ${isActive
					? 'font-semibold text-[#5800d4] dark:text-purple-400 before:bg-[#5800d4] dark:before:bg-purple-400'
					: 'text-gray-500 before:hidden before:bg-gray-300 hover:text-gray-700 hover:before:block dark:text-gray-400 dark:before:bg-gray-600 dark:hover:text-gray-300'
					}`}
			>
				{node.title}
			</Link>
			{hasChildren && (
				<ul className="mt-2 space-y-2 border-l-2 border-gray-100 dark:border-gray-800 lg:mt-4 lg:space-y-4 ml-3 pl-3">
					{node.children!.map((child) => (
						<NavItem
							key={child.path}
							node={child}
							level={level + 1}
							currentPathname={currentPathname}
							activeItemRef={activeItemRef}
						/>
					))}
				</ul>
			)}
		</li>
	)
}
