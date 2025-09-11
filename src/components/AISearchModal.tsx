'use client'

import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react'
import { MagnifyingGlassIcon, SparklesIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { useAISearch } from '../lib/hooks/useAISearch'

interface AISearchModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function AISearchModal({ isOpen, onClose }: AISearchModalProps) {
  const [query, setQuery] = useState('')
  const { search, data, loading, error, reset } = useAISearch()
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isOpen) {
      // Focus the input when modal opens
      setTimeout(() => inputRef.current?.focus(), 100)
    } else {
      // Reset search when modal closes
      reset()
      setQuery('')
    }
  }, [isOpen, reset])

  const handleSearch = async () => {
    if (query.trim()) {
      await search(query)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !loading) {
      e.preventDefault()
      handleSearch()
    }
  }

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <DialogBackdrop
        as={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-gray-900/50 dark:bg-gray-900/75 backdrop-blur-sm"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-start justify-center p-4 text-center sm:p-0">
          <DialogPanel
            as={motion.div}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-2xl transform overflow-hidden rounded-xl bg-white dark:bg-gray-800 shadow-2xl transition-all sm:my-8"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 p-4">
              <div className="flex items-center gap-2">
                <SparklesIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    AI Search
                  </h2>
                  <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                    <span>(Powered by</span>
                    <img 
                      src="/assets/algolia-logo.svg" 
                      alt="Algolia" 
                      className="inline-block h-3"
                    />
                    <span>)</span>
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="rounded-md bg-white dark:bg-gray-800 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            {/* Search Input */}
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
                  onKeyDown={handleKeyDown}
                  placeholder="Ask me anything about the content..."
                  className="block w-full rounded-md border-0 py-3 pl-10 pr-3 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 dark:focus:ring-blue-400 sm:text-sm dark:bg-gray-700"
                />
                {query && !loading && (
                  <button
                    onClick={handleSearch}
                    className="absolute inset-y-0 right-0 flex items-center pr-2"
                  >
                    <span className="px-3 py-1.5 bg-blue-600 dark:bg-blue-500 text-white text-sm font-medium rounded-md hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors">
                      Go
                    </span>
                  </button>
                )}
              </div>
            </div>

            {/* Results */}
            <div className="max-h-96 overflow-y-auto">
              <AnimatePresence mode="wait">
                {loading && (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="p-4 text-center"
                  >
                    <div className="inline-flex items-center gap-2">
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-blue-600 border-t-transparent dark:border-blue-400"></div>
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Searching with AI...
                      </span>
                    </div>
                  </motion.div>
                )}

                {error && (
                  <motion.div
                    key="error"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="p-4"
                  >
                    <div className="rounded-md bg-red-50 dark:bg-red-900/20 p-3">
                      <p className="text-sm text-red-800 dark:text-red-200">
                        {error}
                      </p>
                    </div>
                  </motion.div>
                )}

                {data && (
                  <motion.div
                    key="results"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="p-4 space-y-4"
                  >
                    {/* AI Summary */}
                    <div className="rounded-lg bg-blue-50 dark:bg-blue-900/20 p-4 border border-blue-200 dark:border-blue-800">
                      <div className="flex items-start gap-2">
                        <SparklesIcon className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <h3 className="text-xs font-normal text-blue-600 dark:text-blue-400 mb-2 uppercase">
                            AI Summary
                          </h3>
                          <p className="text-sm text-blue-800 dark:text-blue-200 leading-relaxed">
                            {data.summary}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Search Results */}
                    {data.searchResults.results.length > 0 && (
                      <div>
                        <h3 className="text-xs font-normal text-gray-500 dark:text-gray-400 mb-3 uppercase">
                          Related Content ({data.searchResults.totalHits} results)
                        </h3>
                        <div className="space-y-3">
                          {data.searchResults.results.map((result, index) => (
                            <motion.div
                              key={result.id}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                            >
                              <a
                                href={result.url}
                                onClick={onClose}
                                className="flex gap-3 p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                              >
                                {result.image && (
                                  <div className="flex-shrink-0">
                                    <img
                                      src={result.image}
                                      alt=""
                                      className="w-16 h-16 rounded-md object-cover bg-gray-100 dark:bg-gray-700"
                                      onError={(e) => {
                                        (e.target as HTMLImageElement).style.display = 'none'
                                      }}
                                    />
                                  </div>
                                )}
                                <div className="flex-1 min-w-0">
                                  <h4 className="font-medium text-gray-900 dark:text-white mb-1">
                                    {result.title}
                                  </h4>
                                  {result.description && (
                                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-2">
                                      {result.description}
                                    </p>
                                  )}
                                  <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-500">
                                    {result.category && (
                                      <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-md">
                                        {result.category}
                                      </span>
                                    )}
                                    {result.date && (
                                      <span>{new Date(result.date).toLocaleDateString()}</span>
                                    )}
                                  </div>
                                </div>
                              </a>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    )}

                    {data.searchResults.error && (
                      <div className="rounded-md bg-yellow-50 dark:bg-yellow-900/20 p-3">
                        <p className="text-sm text-yellow-800 dark:text-yellow-200">
                          {data.searchResults.error}
                        </p>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
}