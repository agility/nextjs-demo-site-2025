'use client'

import { useCallback, useState } from 'react'

interface SearchResult {
  id: string
  title: string
  content: string
  excerpt: string
  description: string
  image?: string
  url: string
  date?: string
  category?: string
  tags?: string[]
}

interface AISearchResponse {
  summary: string
  searchResults: {
    results: SearchResult[]
    totalHits: number
    error?: string
  }
}

interface UseAISearchReturn {
  search: (query: string) => Promise<void>
  data: AISearchResponse | null
  loading: boolean
  error: string | null
  reset: () => void
}

export function useAISearch(): UseAISearchReturn {
  const [data, setData] = useState<AISearchResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const search = useCallback(async (query: string) => {
    if (!query.trim()) {
      setError('Please enter a search query')
      return
    }

    setLoading(true)
    setError(null)
    
    try {
      const response = await fetch('/api/ai-search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: query.trim() }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Search failed')
      }

      const result: AISearchResponse = await response.json()
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