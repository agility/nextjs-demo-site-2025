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
		<ul ref={navRef} className="space-y-1">
			{tree.map((node) => (
				<NavItem
					key={node.path}
					node={node}
					currentPathname={pathname}
					activeItemRef={activeItemRef}
				/>
			))}
		</ul>
	)
}

interface NavItemProps {
	node: DocNode
	level?: number
	currentPathname: string
	activeItemRef: React.RefObject<HTMLLIElement>
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
		<li ref={itemRef}>
			<Link
				href={href}
				className={`block px-3 py-2 text-sm rounded-md transition-colors ${isActive
						? level === 0
							? 'font-medium text-[#5800d4] dark:text-[#9333ea] bg-purple-50 dark:bg-purple-900/20'
							: 'text-[#5800d4] dark:text-[#9333ea] bg-purple-50 dark:bg-purple-900/20'
						: level === 0
							? 'font-medium text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
							: 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
					}`}
			>
				{node.title}
			</Link>
			{hasChildren && (
				<ul className={`ml-4 mt-1 space-y-1 ${level > 0 ? 'border-l border-gray-200 dark:border-gray-700 pl-2' : ''}`}>
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
