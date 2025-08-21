"use client"

import { useAudienceRegionParams } from '@/lib/hooks/useAudienceRegionParams'
import type { IAudience } from '@/lib/types/IAudience'
import type { IRegion } from '@/lib/types/IRegion'

interface AudienceRegionIndicatorProps {
  audiences?: IAudience[]
  regions?: IRegion[]
}

/**
 * Example component showing how to use the audience/region query parameters
 * This can be used in any component that needs access to the current audience/region selection
 */
export function AudienceRegionIndicator({ audiences = [], regions = [] }: AudienceRegionIndicatorProps) {
  const {
    selectedAudience,
    selectedRegion,
    hasSelection,
    displayName,
    clearAll
  } = useAudienceRegionParams(audiences, regions)

  if (!hasSelection) {
    return null
  }

  return (
    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3 mb-4">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-xs font-medium text-blue-800 dark:text-blue-200 mb-1">
            Current Context
          </div>
          <div className="text-sm text-blue-700 dark:text-blue-300">
            {displayName}
          </div>
        </div>
        <button
          onClick={clearAll}
          className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 underline"
        >
          Clear
        </button>
      </div>
    </div>
  )
}

/**
 * Example component that shows different content based on audience/region
 */
interface ConditionalContentProps {
  audiences?: IAudience[]
  regions?: IRegion[]
  children: React.ReactNode
  allowedAudiences?: string[]
  allowedRegions?: string[]
}

export function ConditionalContent({
  audiences = [],
  regions = [],
  children,
  allowedAudiences,
  allowedRegions
}: ConditionalContentProps) {
  const { selectedAudience, selectedRegion } = useAudienceRegionParams(audiences, regions)

  // If no restrictions, show to all
  if (!allowedAudiences && !allowedRegions) {
    return <>{children}</>
  }

  // Check audience restrictions
  if (allowedAudiences && selectedAudience) {
    if (!allowedAudiences.includes(selectedAudience.name)) {
      return null
    }
  }

  // Check region restrictions
  if (allowedRegions && selectedRegion) {
    if (!allowedRegions.includes(selectedRegion.name)) {
      return null
    }
  }

  return <>{children}</>
}

/**
 * Custom hook for conditional content rendering based on audience/region
 */
export function useConditionalContent(audiences: IAudience[] = [], regions: IRegion[] = []) {
  const { selectedAudience, selectedRegion } = useAudienceRegionParams(audiences, regions)

  const shouldShowContent = (
    allowedAudiences?: string[],
    allowedRegions?: string[]
  ) => {
    // If no restrictions, show to all
    if (!allowedAudiences && !allowedRegions) {
      return true
    }

    // Check audience restrictions
    if (allowedAudiences && selectedAudience) {
      if (!allowedAudiences.includes(selectedAudience.name)) {
        return false
      }
    }

    // Check region restrictions
    if (allowedRegions && selectedRegion) {
      if (!allowedRegions.includes(selectedRegion.name)) {
        return false
      }
    }

    return true
  }

  return {
    selectedAudience,
    selectedRegion,
    shouldShowContent
  }
}