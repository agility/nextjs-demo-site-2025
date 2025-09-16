'use client'

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { useRef, useEffect } from 'react'

interface AISearchInputProps {
  query: string
  setQuery: (query: string) => void
  onSubmit: (e: React.FormEvent) => void
  loading: boolean
  isOpen: boolean
  placeholder?: string
  defaultPrompts?: string[]
}

export default function AISearchInput({
  query,
  setQuery,
  onSubmit,
  loading,
  isOpen,
  placeholder = "Ask me anything about the content...",
  defaultPrompts = []
}: AISearchInputProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [isOpen])

  const handlePromptClick = (prompt: string) => {
    setQuery(prompt)
    // Automatically submit after a short delay to allow the input to update
    setTimeout(() => {
      const event = new Event('submit', { bubbles: true, cancelable: true })
      onSubmit(event as any)
    }, 100)
  }

  return (
    <div>
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
              placeholder={placeholder}
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
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 0 1 4 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
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

      {/* Default Prompts - only show when no query and prompts are available */}
      {!query && defaultPrompts.length > 0 && (
        <div className="px-4 pb-4">
          <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-3">
            Try these suggestions:
          </div>
          <div className="space-y-2">
            {defaultPrompts.map((prompt, index) => (
              <button
                key={index}
                onClick={() => handlePromptClick(prompt)}
                className="w-full text-left p-3 text-sm bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg border border-gray-200 dark:border-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
              >
                <div className="text-gray-900 dark:text-gray-100 overflow-hidden" style={{
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical' as any
                }}>
                  {prompt}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}