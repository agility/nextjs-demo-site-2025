'use client'

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { useRef, useEffect } from 'react'

interface AISearchInputProps {
  query: string
  setQuery: (query: string) => void
  onSubmit: (e: React.FormEvent) => void
  loading: boolean
  isOpen: boolean
}

export default function AISearchInput({ 
  query, 
  setQuery, 
  onSubmit, 
  loading, 
  isOpen 
}: AISearchInputProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [isOpen])

  return (
    <form onSubmit={onSubmit}>
      <div className="p-4">
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
          </div>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask me anything about the content..."
            className="block w-full rounded-md border-0 py-3 pl-10 pr-3 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 dark:focus:ring-blue-400 sm:text-sm dark:bg-gray-700"
          />
          {query && (
            <button
              type="submit"
              disabled={loading}
              className="absolute inset-y-0 right-0 flex items-center pr-2"
            >
              {loading ? (
                <div className="px-3 py-1.5 bg-blue-600 dark:bg-blue-500 text-white text-sm font-medium rounded-md flex items-center justify-center">
                  <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                    <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 0 1 4 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                  </svg>
                </div>
              ) : (
                <span className="px-3 py-1.5 bg-blue-600 dark:bg-blue-500 text-white text-sm font-medium rounded-md hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors">
                  Go
                </span>
              )}
            </button>
          )}
        </div>
      </div>
    </form>
  )
}