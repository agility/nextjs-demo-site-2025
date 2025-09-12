'use client'

import { useCallback, useState } from 'react'

interface SearchResult {
	id: string
	title: string
	content: string
	description: string
	image?: string
	url: string
	date?: string
	category?: string
	tags?: string[]
}

interface SearchResponse {
	results: SearchResult[]
	totalHits: number
	query: string
	error?: string
}

interface UseSearchReturn {
	search: (query: string, limit?: number) => Promise<void>
	data: SearchResponse | null
	loading: boolean
	error: string | null
	reset: () => void
}

export function useSearch(): UseSearchReturn {
	const [data, setData] = useState<SearchResponse | null>(null)
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)

	const search = useCallback(async (query: string, limit: number = 10) => {
		if (!query.trim()) {
			setError('Please enter a search query')
			return
		}

		setLoading(true)
		setError(null)

		try {
			const response = await fetch('/api/search', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					query: query.trim(),
					limit
				}),
			})

			if (!response.ok) {
				const errorData = await response.json()
				throw new Error(errorData.error || 'Search failed')
			}

			const result: SearchResponse = await response.json()
			setData(result)
		} catch (err) {
			setError(err instanceof Error ? err.message : 'An unexpected error occurred')
			setData(null)
		} finally {
			setLoading(false)
		}
	}, [])

	const reset = useCallback(() => {
		setData(null)
		setError(null)
		setLoading(false)
	}, [])

	return {
		search,
		data,
		loading,
		error,
		reset,
	}
}