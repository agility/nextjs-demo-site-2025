'use client'

import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react'
import { SparklesIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { useSearch } from '@/lib/hooks/useSearch'
import { useChat } from '@ai-sdk/react'
import AISearchInput from './AISearchInput'
import AISearchSummary from './AISearchSummary'
import AISearchResults from './AISearchResults'
import { DefaultChatTransport } from 'ai'

interface AISearchModalProps {
  isOpen: boolean
  onClose: () => void
  placeholder?: string
  defaultPrompts?: string[]
}

export default function AISearchModal({ isOpen, onClose, placeholder, defaultPrompts = [] }: AISearchModalProps) {

  const [query, setQuery] = useState('')
  const searchData = useSearch()

  /**
   * AI chat hook with streaming and tool call handling (for search integration)
   */
  const { messages, sendMessage, status, error, setMessages } = useChat({

    transport: new DefaultChatTransport({
      //use the AI search endpoint
      api: '/api/ai/search'
    }),
    onToolCall: async (toolCall) => {
      const toolInput: any = toolCall.toolCall.input

      // Trigger the separate Algolia search when AI uses the search tool
      if (toolInput.query) {
        searchData.search(toolInput.query, 5) // Limit to 5 results for display
      }
    }
  });


  const loading = status === 'streaming' || status === 'submitted'


  useEffect(() => {
    if (!isOpen) {
      // Reset search when modal closes
      //setQuery('')
      // setMessages([])
      // searchData.reset()
    }
  }, [isOpen, setMessages, searchData])


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
        <div className="flex min-h-full items-start justify-center p-4  sm:p-0">
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
            <AISearchInput
              query={query}
              setQuery={setQuery}
              onSubmit={e => {
                e.preventDefault()
                setMessages([])
                sendMessage({ text: query })
              }}
              loading={loading}
              isOpen={isOpen}
              placeholder={placeholder}
              defaultPrompts={defaultPrompts}
            />

            {/* Results */}
            <div className="max-h-96 overflow-y-auto">
              <AnimatePresence mode="wait">


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
                        {error.message || 'An error occurred while searching. Please try again.'}
                      </p>
                    </div>
                  </motion.div>
                )}

                {messages && messages.length > 0 && (
                  <motion.div
                    key="results"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="p-4 space-y-4"
                  >
                    <AISearchSummary messages={messages} />
                    <AISearchResults searchData={searchData} onClose={onClose} />
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