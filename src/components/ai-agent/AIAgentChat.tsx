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
import { ContactCaptureForm } from './ContactCaptureForm'
import { SearchResults } from './SearchResults'
import { IconBubble, IconUser } from "@tabler/icons-react"

interface AIAgentChatProps {
  placeholder?: string
  defaultPrompts?: string[]
}

export default function AIAgentChat({ placeholder = "Ask me anything...", defaultPrompts = [] }: AIAgentChatProps) {
  const [input, setInput] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)


  /**
   * AI chat hook with streaming and tool call handling (for search integration and contact capture form)
   */
  const { messages, sendMessage, status, error } = useChat({
    transport: new DefaultChatTransport({
      api: '/api/ai/agent'
    }),
  })

  const isLoading = status === 'streaming' || status === 'submitted'

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Auto-focus the textarea when component mounts and after state changes
  useEffect(() => {
    if (!isLoading && textareaRef.current) {
      textareaRef.current.focus()
    }
  }, [isLoading])

  // Initial focus on mount
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus()
    }
  }, [])

  const handleDefaultPrompt = (prompt: string) => {
    if (isLoading) return
    sendMessage({ text: prompt })
    setInput('')
    // Focus the input after sending
    setTimeout(() => textareaRef.current?.focus(), 100)
  }

  const handlePromptSubmit = ({ text }: { text?: string }) => {
    if (text?.trim()) {
      sendMessage({ text })
      setInput('')
      // Focus the input after sending
      setTimeout(() => textareaRef.current?.focus(), 100)
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
                  {/* <MessageAvatar
                    src={message.role === 'user' ? '/user-avatar.svg' : '/ai-avatar.svg'}
                    name={message.role === 'user' ? 'You' : 'AI'}
                    className="ring-2 ring-gray-200 dark:ring-gray-700"
                  /> */}
                  <div className='rounded-full bg-muted p-1 mr-2 mt-1'>
                    {message.role === 'user' ?
                      <IconUser role={message.role} /> :
                      <IconBubble role={message.role} />}
                  </div>
                  <MessageContent
                    variant={message.role === 'user' ? 'contained' : 'flat'}
                  >
                    {message.parts ? message.parts.map((part, i) => {

                      switch (part.type) {
                        case 'text':
                          return (
                            <Response
                              key={`${message.id}-${i}`}
                            >
                              {part.text}
                            </Response>
                          )
                        case 'tool-search':
                          // Display search tool results using the SearchResults component
                          if (part.state === 'output-available' && part.output) {
                            const output = part.output as { results?: any[]; totalHits?: number; error?: string }
                            return (
                              <SearchResults
                                key={`${message.id}-${i}`}
                                results={output.results || []}
                                totalHits={output.totalHits}
                                error={output.error}
                              />
                            )
                          }

                          // Show loading state during search
                          if (part.state === 'input-available' || part.state === 'input-streaming') {
                            return (
                              <SearchResults
                                key={`${message.id}-${i}`}
                                results={[]}
                                isLoading={true}
                              />
                            )
                          }

                          return null
                        case 'tool-contactCapture':
                          // Handle contactCapture tool results
                          if (part.state === 'input-available') {
                            return (
                              <div key={`${message.id}-${i}`} className="p-3 bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 rounded-lg">
                                <div className="flex items-center gap-2">
                                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500" />
                                  <p className="text-sm text-blue-700 dark:text-blue-300">
                                    Preparing contact form...
                                  </p>
                                </div>
                              </div>
                            )
                          }
                          if (part.state === 'output-available' && part.output) {
                            const output = part.output as { error?: string; postURL?: string; message?: string }
                            if (output.error) {
                              return (
                                <div key={`${message.id}-${i}`} className="p-3 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 rounded-lg">
                                  <p className="text-sm text-red-700 dark:text-red-300">
                                    {output.error}
                                  </p>
                                </div>
                              )
                            }
                            if (output.postURL) {
                              return (
                                <div key={`${message.id}-${i}`} className="my-4">
                                  <ContactCaptureForm
                                    postURL={output.postURL}
                                    message={output.message}
                                  />
                                </div>
                              )
                            }
                          }
                          if (part.state === 'output-error') {
                            return (
                              <div key={`${message.id}-${i}`} className="p-3 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 rounded-lg">
                                <p className="text-sm text-red-700 dark:text-red-300">
                                  {part.errorText || 'An error occurred with the contact form.'}
                                </p>
                              </div>
                            )
                          }
                          return null
                        case 'tool-call':
                        case 'tool-result':
                          // Hide other tool internals
                          return null
                        case 'step-start':
                        case 'step-finish' as any:
                          // Hide internal AI processing steps from the user
                          return null
                        default:
                          // Hide all other internal tool types
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

          {isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex items-center gap-3 p-4 rounded-lg bg-muted/50 border border-border"
            >
              <div className='rounded-full bg-muted p-1'>
                <IconBubble className="h-4 w-4" />
              </div>
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-foreground/60 rounded-full animate-pulse [animation-delay:0ms]" />
                  <div className="w-2 h-2 bg-foreground/60 rounded-full animate-pulse [animation-delay:150ms]" />
                  <div className="w-2 h-2 bg-foreground/60 rounded-full animate-pulse [animation-delay:300ms]" />
                </div>
              </div>
            </motion.div>
          )}

          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="rounded-lg bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 p-4"
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

      <div className="border-t border-border bg-muted/50">
        <PromptInput
          onSubmit={handlePromptSubmit}
          className="border-0 shadow-none bg-transparent"
        >
          <PromptInputBody className="p-4">
            <div className="relative">
              <PromptInputTextarea
                ref={textareaRef}
                placeholder={placeholder}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isLoading}
                className="resize-none bg-background border border-input rounded-xl px-4 py-3 pr-12 text-sm text-foreground placeholder-muted-foreground focus:ring-2 focus:ring-ring focus:border-transparent shadow-sm"
              />
              <div className="absolute right-2 bottom-2">
                <PromptInputSubmit
                  disabled={isLoading || !input.trim()}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg p-2 text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
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