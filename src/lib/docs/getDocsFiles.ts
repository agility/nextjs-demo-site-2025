import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const docsDirectory = path.join(process.cwd(), 'docs')

/**
 * Common acronyms that should remain uppercase
 */
const ACRONYMS = ['CMS', 'API', 'URL', 'SEO', 'MDX', 'JSON', 'LD', 'HTML', 'CSS', 'JS', 'TS', 'JSX', 'TSX', 'REST', 'GraphQL', 'HTTP', 'HTTPS', 'XML', 'RSS', 'RPC', 'SDK', 'CLI', 'UI', 'UX', 'ID', 'UUID', 'GUID']

/**
 * Convert SCREAMING_SNAKE_CASE or kebab-case to friendly title
 * Preserves common acronyms like CMS, API, URL, etc.
 * e.g., "AUDIENCE_REGION_SYSTEM" -> "Audience Region System"
 * e.g., "multi-locale-implementation" -> "Multi Locale Implementation"
 * e.g., "agility-cms-url-patterns" -> "Agility CMS URL Patterns"
 */
export function formatDocTitle(filename: string, frontmatterTitle?: string): string {
	// Use frontmatter title if available
	if (frontmatterTitle) {
		return frontmatterTitle
	}

	// Helper to format a single word, preserving acronyms
	const formatWord = (word: string): string => {
		const upperWord = word.toUpperCase()
		// Check if the word is a known acronym
		if (ACRONYMS.includes(upperWord)) {
			return upperWord
		}
		// Otherwise capitalize first letter, lowercase the rest
		return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
	}

	// Convert SCREAMING_SNAKE_CASE to Title Case
	if (filename.includes('_')) {
		return filename
			.split('_')
			.map(formatWord)
			.join(' ')
	}

	// Convert kebab-case to Title Case
	if (filename.includes('-')) {
		return filename
			.split('-')
			.map(formatWord)
			.join(' ')
	}

	// Capitalize first letter for simple names
	return formatWord(filename)
}

export interface DocFile {
	slug: string[]
	title: string
	content: string
	frontmatter: Record<string, any>
	filePath: string
}

export interface DocNode {
	title: string
	slug: string[]
	path: string
	children?: DocNode[]
}

/**
 * Get all markdown files recursively from the docs directory
 */
export function getAllDocFiles(): DocFile[] {
	const files: DocFile[] = []

	function walkDir(dir: string, baseSlug: string[] = []): void {
		const entries = fs.readdirSync(dir, { withFileTypes: true })

		for (const entry of entries) {
			// Skip assets folder - it's just a folder of files, not documentation
			if (entry.isDirectory() && entry.name === 'assets') {
				continue
			}

			const fullPath = path.join(dir, entry.name)
			const slug = [...baseSlug, entry.name.replace(/\.mdx?$/, '')]

			if (entry.isDirectory()) {
				walkDir(fullPath, slug)
			} else if (entry.isFile() && /\.mdx?$/.test(entry.name)) {
				const fileContents = fs.readFileSync(fullPath, 'utf8')
				const { data, content } = matter(fileContents)
				const filename = entry.name.replace(/\.mdx?$/, '')

				files.push({
					slug,
					title: formatDocTitle(filename, data.title),
					content,
					frontmatter: data,
					filePath: fullPath,
				})
			}
		}
	}

	walkDir(docsDirectory)
	return files
}

/**
 * Get a single doc file by slug
 * If the slug points to a folder path, check for README.md in that folder
 */
export function getDocBySlug(slug: string[]): DocFile | null {
	const allFiles = getAllDocFiles()

	// First, try exact match
	const exactMatch = allFiles.find((file) => file.slug.join('/') === slug.join('/'))
	if (exactMatch) {
		return exactMatch
	}

	// If no exact match, check if this is a folder path with README.md
	// e.g., ['agility-cms', 'admin'] should match ['agility-cms', 'admin', 'README']
	const readmeSlug = [...slug, 'README']
	const readmeFile = allFiles.find((file) => file.slug.join('/') === readmeSlug.join('/'))

	return readmeFile || null
}

/**
 * Build a tree structure of docs for navigation
 * README.md files become the default route for their folder but are NOT shown as separate nav items
 */
export function getDocsTree(): DocNode[] {
	const files = getAllDocFiles()
	const tree: DocNode[] = []
	const nodeMap = new Map<string, DocNode>()

	// Separate README and non-README files
	const nonReadmeFiles = files.filter((file) => file.slug[file.slug.length - 1] !== 'README')
	const readmeFiles = files.filter((file) => file.slug[file.slug.length - 1] === 'README')

	// First pass: Create folder structure from README files
	// This ensures folders with only README files still appear in nav
	// But use folder names, not "README" as titles
	for (const file of readmeFiles) {
		const folderSlug = file.slug.slice(0, -1)
		if (folderSlug.length === 0) continue // Skip root README

		let currentPath = ''
		let parentNode: DocNode | undefined

		for (let i = 0; i < folderSlug.length; i++) {
			const segment = folderSlug[i]
			currentPath = currentPath ? `${currentPath}/${segment}` : segment

			// Always use folder name (segment) for title, never "README"
			const title = formatDocTitle(segment)

			if (!nodeMap.has(currentPath)) {
				const node: DocNode = {
					title,
					slug: folderSlug.slice(0, i + 1),
					path: currentPath,
					children: [], // Always a folder (has README)
				}

				nodeMap.set(currentPath, node)

				if (parentNode) {
					if (!parentNode.children) {
						parentNode.children = []
					}
					parentNode.children.push(node)
				} else {
					tree.push(node)
				}
			} else {
				// Node exists - ensure title is not "README"
				const existingNode = nodeMap.get(currentPath)!
				if (existingNode.title === 'README' || existingNode.title.toLowerCase() === 'readme') {
					existingNode.title = title
				}
			}

			parentNode = nodeMap.get(currentPath)
		}
	}

	// Second pass: Add non-README files to the tree
	nonReadmeFiles.sort((a, b) => a.slug.join('/').localeCompare(b.slug.join('/')))

	for (const file of nonReadmeFiles) {
		let currentPath = ''
		let parentNode: DocNode | undefined

		for (let i = 0; i < file.slug.length; i++) {
			const segment = file.slug[i]
			currentPath = currentPath ? `${currentPath}/${segment}` : segment

			if (!nodeMap.has(currentPath)) {
				const isLastSegment = i === file.slug.length - 1
				const isFile = isLastSegment

				const node: DocNode = {
					title: isFile ? file.title : formatDocTitle(segment),
					slug: file.slug.slice(0, i + 1),
					path: currentPath,
					children: isFile ? undefined : [],
				}

				nodeMap.set(currentPath, node)

				if (parentNode) {
					if (!parentNode.children) {
						parentNode.children = []
					}
					parentNode.children.push(node)
				} else {
					tree.push(node)
				}
			} else {
				// Node exists (created from README) - ensure it's marked as a folder
				const existingNode = nodeMap.get(currentPath)!
				if (existingNode.children === undefined) {
					existingNode.children = []
				}
				// Ensure title is not "README"
				if (existingNode.title === 'README' || existingNode.title.toLowerCase() === 'readme') {
					existingNode.title = formatDocTitle(segment)
				}
				// If this is a file, add it to parent's children
				if (i === file.slug.length - 1 && parentNode && parentNode.children) {
					const exists = parentNode.children.some(child => child.path === currentPath)
					if (!exists) {
						parentNode.children.push({
							title: file.title,
							slug: file.slug,
							path: currentPath,
							children: undefined,
						})
					}
				}
			}

			parentNode = nodeMap.get(currentPath)
		}
	}

	// Final pass: Clean up any "README" titles that might have slipped through
	function cleanTree(nodes: DocNode[]): DocNode[] {
		return nodes.map(node => {
			// Replace "README" titles with folder name
			if (node.title === 'README' || node.title.toLowerCase() === 'readme') {
				const lastSegment = node.slug[node.slug.length - 1]
				node.title = formatDocTitle(lastSegment)
			}

			// Recursively clean children
			if (node.children) {
				node.children = cleanTree(node.children)
			}

			return node
		})
	}

	return cleanTree(tree)
}

/**
 * Get breadcrumbs for a doc slug
 * Never includes "README" in the breadcrumb path or title
 */
export function getBreadcrumbs(slug: string[]): Array<{ title: string; path: string }> {
	const files = getAllDocFiles()
	const breadcrumbs: Array<{ title: string; path: string }> = []

	for (let i = 0; i < slug.length; i++) {
		const currentSlug = slug.slice(0, i + 1)
		const breadcrumbPath = currentSlug // This is the path we'll use (never includes README)

		// Try to find a file for this path
		// First try exact match (non-README files)
		let file = files.find((f) => {
			const isReadme = f.slug[f.slug.length - 1] === 'README'
			const filePath = isReadme ? f.slug.slice(0, -1) : f.slug
			return !isReadme && filePath.join('/') === currentSlug.join('/')
		})

		// If no exact match, check for README.md in this folder (for title only)
		if (!file) {
			const readmeSlug = [...currentSlug, 'README']
			file = files.find((f) => f.slug.join('/') === readmeSlug.join('/'))
		}

		if (file) {
			// Use the file's title, but if it's "README" or similar, use the folder name instead
			let title = file.title
			if (title === 'README' || title.toLowerCase() === 'readme') {
				// Use the last segment of the path as the title (formatted)
				title = formatDocTitle(currentSlug[i])
			}

			breadcrumbs.push({
				title,
				path: `/docs/${breadcrumbPath.join('/')}`,
			})
		} else {
			// Fallback to slug segment if no file found (format it)
			breadcrumbs.push({
				title: formatDocTitle(currentSlug[i]),
				path: `/docs/${breadcrumbPath.join('/')}`,
			})
		}
	}

	return breadcrumbs
}
