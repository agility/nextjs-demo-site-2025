'use client'

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { useEffect, useState } from 'react'

interface CodeBlockProps {
	language: string
	children: string
	className?: string
	[key: string]: any // Allow other props from ReactMarkdown
}

export function CodeBlock({ language, children, className, ...props }: CodeBlockProps) {
	const [isDark, setIsDark] = useState(false)

	useEffect(() => {
		// Check if dark mode is active
		const checkDarkMode = () => {
			setIsDark(document.documentElement.classList.contains('dark'))
		}

		// Initial check
		checkDarkMode()

		// Watch for changes using MutationObserver
		const observer = new MutationObserver(checkDarkMode)
		observer.observe(document.documentElement, {
			attributes: true,
			attributeFilter: ['class'],
		})

		return () => observer.disconnect()
	}, [])

	return (
		<SyntaxHighlighter
			style={isDark ? vscDarkPlus : oneLight}
			language={language}
			PreTag="div"
			className={`rounded-lg !mt-4 !mb-4 ${className || ''}`}
			{...props}
		>
			{String(children).replace(/\n$/, '')}
		</SyntaxHighlighter>
	)
}
