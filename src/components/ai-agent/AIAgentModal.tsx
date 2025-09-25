'use client'

import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react'
import { ChatBubbleLeftRightIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { motion } from 'motion/react'
import AIAgentChat from './AIAgentChat'

interface AIAgentModalProps {
  isOpen: boolean
  onClose: () => void
  placeholder?: string
  defaultPrompts?: string[]
}

export default function AIAgentModal({ isOpen, onClose, placeholder, defaultPrompts = [] }: AIAgentModalProps) {
  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <DialogBackdrop
        as={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-start justify-center p-4 sm:p-0">
          <DialogPanel
            as={motion.div}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-3xl h-[600px] transform overflow-hidden rounded-xl bg-background shadow-2xl transition-all sm:my-8 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border p-4">
              <div className="flex items-center gap-2">
                <ChatBubbleLeftRightIcon className="h-5 w-5 text-primary" />
                <h2 className="text-lg font-semibold text-foreground">
                  AI Assistant
                </h2>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="rounded-md bg-background text-muted-foreground hover:text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 min-h-0">
              <AIAgentChat placeholder={placeholder} defaultPrompts={defaultPrompts} />
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
}