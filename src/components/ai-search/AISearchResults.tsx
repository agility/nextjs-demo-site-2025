'use client'

import { motion } from 'motion/react'

interface SearchResult {
  id: string
  title: string
  description?: string
  url: string
  image?: string
  category?: string
  date?: string
}

interface SearchData {
  data: {
    results: SearchResult[]
    totalHits: number
  } | null
  error: string | null
}

interface AISearchResultsProps {
  searchData: SearchData
  onClose: () => void
}

export default function AISearchResults({ searchData, onClose }: AISearchResultsProps) {
  if (searchData.error) {
    return (
      <div className="rounded-md bg-yellow-50 dark:bg-yellow-900/20 p-3">
        <p className="text-sm text-yellow-800 dark:text-yellow-200">
          {searchData.error}
        </p>
      </div>
    )
  }

  if (!searchData.data || searchData.data.results.length === 0) {
    return null
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h3 className="text-xs font-normal text-gray-500 dark:text-gray-400 mb-3 uppercase">
        Related Content ({searchData.data.totalHits} results)
      </h3>
      <div className="space-y-3">
        {searchData.data.results.map((result, index) => (
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
    </motion.div>
  )
}