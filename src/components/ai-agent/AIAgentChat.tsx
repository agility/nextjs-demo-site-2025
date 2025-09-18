'use client'

import { useChat } from '@ai-sdk/react'
import { DefaultChatTransport } from 'ai'
import { useState, useRef, useEffect } from 'react'
import { Conversation, ConversationContent, ConversationEmptyState, ConversationScrollButton } from '@/components/ai-elements/conversation'
import { Message, MessageContent, MessageAvatar } from '@/components/ai-elements/message'
import { PromptInput, PromptInputBody, PromptInputTextarea, PromptInputToolbar, PromptInputTools, PromptInputSubmit } from '@/components/ai-elements/prompt-input'
import { Response } from '@/components/ai-elements/response'
import { Button } from '@/components/ui/button'
import { ChatBubbleLeftRightIcon, SparklesIcon } from '@heroicons/react/24/outline'
import { motion } from 'motion/react'

interface AIAgentChatProps {
  placeholder?: string
  defaultPrompts?: string[]
}

export default function AIAgentChat({ placeholder = "Ask me anything...", defaultPrompts = [] }: AIAgentChatProps) {
  const [input, setInput] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const { messages, sendMessage, status, error } = useChat({
    transport: new DefaultChatTransport({
      api: '/api/ai/agent'
    }),
  })

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const isLoading = status === 'streaming' || status === 'submitted'

  const handleDefaultPrompt = (prompt: string) => {
    if (isLoading) return
    setInput(prompt)
    sendMessage({ text: prompt })
  }

  const handlePromptSubmit = ({ text }: { text?: string }) => {
    if (text?.trim()) {
      sendMessage({ text })
      setInput('')
    }
  }

  return (
    <div className="flex flex-col h-full">
      <Conversation className="flex-1">
        <ConversationContent className="space-y-4">
          {messages.length === 0 ? (
            <ConversationEmptyState
              icon={<ChatBubbleLeftRightIcon className="h-8 w-8" />}
              title="AI Assistant Ready"
              description="Start a conversation or try one of the suggestions below"
            >
              {defaultPrompts.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 grid gap-2 w-full max-w-md"
                >
                  {defaultPrompts.map((prompt, index) => (
                    <Button
                      key={index}
                      onClick={() => handleDefaultPrompt(prompt)}
                      disabled={isLoading}
                      variant="outline"
                      className="text-left justify-start h-auto p-3 whitespace-normal"
                    >
                      <SparklesIcon className="h-4 w-4 shrink-0 mr-2" />
                      {prompt}
                    </Button>
                  ))}
                </motion.div>
              )}
            </ConversationEmptyState>
          ) : (
            messages.map((message, index) => (
              <motion.div
                key={message.id || index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Message from={message.role}>
                  <MessageAvatar
                    src={message.role === 'user' ? '/user-avatar.svg' : '/ai-avatar.svg'}
                    name={message.role === 'user' ? 'You' : 'AI'}
                    className="ring-2 ring-gray-200 dark:ring-gray-700"
                  />
                  <MessageContent
                    variant={message.role === 'user' ? 'contained' : 'flat'}
                    className={message.role === 'user'
                      ? 'bg-blue-600 text-white px-4 py-3'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-4 py-3'
                    }
                  >
                    {message.parts ? message.parts.map((part, i) => {
                      switch (part.type) {
                        case 'text':
                          return (
                            <Response
                              key={`${message.id}-${i}`}
                              className={message.role === 'user' ? 'text-white [&_p]:text-white [&_*]:text-white' : ''}
                            >
                              {part.text}
                            </Response>
                          )
                        case 'tool-result':
                        case 'tool-call':
                        case 'step-start':
                        case 'step-finish' as any:
                          // Hide internal AI processing steps from the user
                          return null
                        default:
                          // Only show debug info in development
                          if (process.env.NODE_ENV === 'development') {
                            return (
                              <div key={`${message.id}-${i}`} className="text-xs opacity-50 p-2 bg-gray-100 dark:bg-gray-800 rounded">
                                Debug: {part.type}
                              </div>
                            )
                          }
                          return null
                      }
                    }) : (
                      <Response>Message content</Response>
                    )}
                  </MessageContent>
                </Message>
              </motion.div>
            ))
          )}

          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-4"
            >
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-red-500" />
                <p className="text-sm text-red-800 dark:text-red-200 font-medium">
                  Error
                </p>
              </div>
              <p className="text-sm text-red-700 dark:text-red-300 mt-1">
                {error.message || 'An error occurred. Please try again.'}
              </p>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </ConversationContent>
        <ConversationScrollButton />
      </Conversation>

      <div className="border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
        <PromptInput
          onSubmit={handlePromptSubmit}
          className="border-0 shadow-none bg-transparent"
        >
          <PromptInputBody className="p-4">
            <div className="relative">
              <PromptInputTextarea
                placeholder={placeholder}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isLoading}
                className="resize-none bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-3 pr-12 text-sm placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
              />
              <div className="absolute right-2 bottom-2">
                <PromptInputSubmit
                  disabled={isLoading || !input.trim()}
                  className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg p-2 text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                />
              </div>
            </div>
            <PromptInputToolbar className="hidden">
              <PromptInputTools>
                {/* Tools hidden for cleaner UI */}
              </PromptInputTools>
            </PromptInputToolbar>
          </PromptInputBody>
        </PromptInput>
      </div>
    </div>
  )
}