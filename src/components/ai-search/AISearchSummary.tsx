'use client'

import { SparklesIcon } from '@heroicons/react/24/outline'
import { motion } from 'motion/react'
import { Response } from '@/components/ai-elements/response';

interface AISearchSummaryProps {
  messages: Array<{
    id: string
    role: string
    parts: Array<{ type: string; text?: string }>
  }>
}

export default function AISearchSummary({ messages }: AISearchSummaryProps) {
  const assistantMessages = messages.filter(message => message.role === 'assistant')

  if (assistantMessages.length === 0) {
    return null
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-lg bg-blue-50 dark:bg-blue-900/20 p-4 border border-blue-200 dark:border-blue-800"
    >


      <h3 className="text-xs font-normal text-blue-600 dark:text-blue-400 mb-2 uppercase">
        AI Summary
      </h3>
      <div className="text-sm text-blue-800 dark:text-blue-200 leading-relaxed prose prose-sm prose-blue dark:prose-invert max-w-none">
        {assistantMessages.map(message => (
          <div key={message.id} className="space-y-2">
            {message.parts.map((part, i) => {
              switch (part.type) {
                case 'text': // we don't use any reasoning or tool calls in this example
                  return (
                    <Response key={`${message.id}-${i}`}>
                      {part.text}
                    </Response>
                  );
                default:
                  return null;
              }
            })}
          </div>
        ))}
      </div>


    </motion.div>
  )
}