'use client'

import { useEffect, useState } from 'react'
import AISearchModal from './AISearchModal'
import AIAgentModal from '../ai-agent/AIAgentModal'
import type { IAISearchConfigData } from '@/lib/cms-content/getAISearchConfig'

interface AIModalProps {
  isOpen: boolean
  onClose: () => void
  aiConfig: IAISearchConfigData
}

export default function AIModal({ isOpen, onClose, aiConfig }: AIModalProps) {

  console.log("AI Config in AIModal:", aiConfig);

  // Show agent modal if full agent mode is enabled, otherwise show search modal
  if (aiConfig.fullAgentMode) {
    return (
      <AIAgentModal
        isOpen={isOpen}
        onClose={onClose}
        placeholder={aiConfig.aiSearchHelp}
        defaultPrompts={aiConfig.defaultPrompts}
      />
    )
  }

  return (
    <AISearchModal
      isOpen={isOpen}
      onClose={onClose}
      placeholder={aiConfig.aiSearchHelp}
      defaultPrompts={aiConfig.defaultPrompts}
    />
  )
}