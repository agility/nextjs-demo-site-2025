import { tool } from 'ai'
import { algoliasearch } from 'algoliasearch'
import { z } from 'zod'

// Initialize Algolia client
const algolia = algoliasearch(process.env.ALGOLIA_APP_ID!, process.env.ALGOLIA_SEARCH_API_KEY!)

/**
 * Create the search tool that can be shared between AI search and AI agent endpoints
 */
export const createSearchTool = () => tool({
  description: 'Search for content on this website to help answer user questions. Use this tool to find relevant content.',
  inputSchema: z.object({
    query: z.string().describe('The search query to find relevant content. Should be a concise search term, not too long.'),
    limit: z.number().optional().describe('Maximum number of results to return (default: 10)'),
  }),
  execute: async ({ query, limit = 10 }) => {
    try {
      const searchParams = {
        query,
        hitsPerPage: limit,
        attributesToRetrieve: ['title', 'content', 'url', 'excerpt', 'description', 'image', 'imageUrl', 'featuredImage', 'date', 'category', 'tags', 'objectID'],
      }

      // Use the known content index
      const response = await algolia.searchSingleIndex({
        indexName: 'content',
        searchParams
      })

      const results = response.hits.map((hit: any) => {
        // Extract and clean the title
        let title = hit.title?.trim()

        // Clean common title patterns (remove brand suffixes)
        if (title) {
          title = title
            .replace(/\s*\|\s*(Galaxy Tech|Galaxy Tech|Galaxy Tech - Galaxy Tech).*$/i, '') // Remove "| Galaxy Tech" etc
            .replace(/\s*-\s*(Galaxy Tech|Galaxy Tech|Galaxy Tech - Galaxy Tech).*$/i, '') // Remove "- Galaxy Tech" etc
            .replace(/\s*\|\s*$/, '') // Remove trailing pipe
            .replace(/\s*-\s*$/, '') // Remove trailing dash
            .trim()
        }

        if (!title && hit.content) {
          // Try to extract title from URL path
          const urlPath = hit.url?.split('/').filter(Boolean).pop()
          if (urlPath && urlPath !== 'index' && urlPath !== 'home') {
            title = urlPath.replace(/-/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase())
          } else {
            // Extract first meaningful sentence as title
            const sentences = hit.content.split(/[.!?]/).filter((s: string) => s.trim().length > 20 && s.trim().length < 100)
            if (sentences.length > 0) {
              title = sentences[0].trim()
            }
          }
        }

        // Generate a better excerpt/description
        let excerpt = hit.excerpt || hit.description || ''
        if (!excerpt && hit.content) {
          // Extract first 2-3 meaningful sentences as excerpt
          const sentences = hit.content.split(/[.!?]/).filter((s: string) => s.trim().length > 30)
          if (sentences.length > 0) {
            excerpt = sentences.slice(0, 2).join('. ').trim()
            if (!excerpt.endsWith('.')) excerpt += '.'
            // Limit to ~200 characters
            if (excerpt.length > 200) {
              excerpt = excerpt.substring(0, 197) + '...'
            }
          }
        }

        // Find the best image URL
        const image = hit.image || hit.imageUrl || hit.featuredImage || ''

        return {
          id: hit.objectID,
          title: title || 'Page Content',
          content: hit.content || hit.excerpt || '',
          description: excerpt, // Alias for backwards compatibility
          image,
          url: hit.url || '#'
        }
      })

      return {
        results,
        totalHits: response.hits.length,
      }
    } catch (error) {
      console.error('Algolia search error:', error)
      return {
        results: [],
        totalHits: 0,
        error: `Search service error: ${error instanceof Error ? error.message : 'Unknown error'}`,
      }
    }
  },
})