import { createAzure } from '@ai-sdk/azure'
import { generateText, tool } from 'ai'
import { algoliasearch } from 'algoliasearch'
import { z } from 'zod'


//https://agility-dev-ai.openai.azure.com/openai/deployments/gpt-4.1-mini-2/chat/completions?api-version=2025-01-01-preview
const azure = createAzure({
  resourceName: process.env.AZURE_AI_RESOURCE,
  apiKey: process.env.AZURE_AI_KEY,
  apiVersion: process.env.AZURE_AI_API_VERSION
})

const algolia = algoliasearch(process.env.ALGOLIA_APP_ID!, process.env.ALGOLIA_SEARCH_API_KEY!)

const searchTool = tool({
  description: 'Search for content using Algolia to provide relevant results for user queries',
  inputSchema: z.object({
    query: z.string().describe('The search query to find relevant content. Should be a concise search term, not too long.'),
    limit: z.number().optional().describe('Maximum number of results to return (default: 10)'),
  }),
  execute: async ({ query, limit = 10 }) => {
    console.log('Executing search tool with query:', query, 'limit:', limit)
    try {
      const searchParams = {
        query,
        hitsPerPage: limit,
        attributesToRetrieve: ['title', 'content', 'url', 'excerpt', 'description', 'image', 'imageUrl', 'featuredImage', 'date', 'category', 'tags', 'objectID'],
      }

      console.log('Algolia search params:', searchParams)

      // Use the known content index
      const response = await algolia.searchSingleIndex({
        indexName: 'content',
        searchParams
      })

      //console.log('Algolia response:', response)

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
          excerpt,
          description: excerpt, // Alias for backwards compatibility
          image,
          url: hit.url || '#',
          date: hit.date || '',
          category: hit.category || '',
          tags: hit.tags || [],
        }
      })

      //console.log('Processed results:', results)

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

export async function POST(request: Request) {
  try {
    const { query } = await request.json()

    if (!query) {
      return Response.json({ error: 'Query is required' }, { status: 400 })
    }

    // Use AI search with search tool
    try {
      const result = await generateText({
        model: azure(process.env.AZURE_AI_DEPLOYMENT),
        system: `You are Galaxy Tech's AI search assistant for the Galaxy Tech website - a platform that helps businesses close every deal. You help users find information specifically from Galaxy Tech's website content.

        Your role:
        - You are an expert on Galaxy Tech's products, features, pricing, and services
        - You only provide information found on the Galaxy Tech website through search results
        - You help users discover relevant content about sales, CRM, deal closing, and business productivity
        - Always use the search tool to find current information before responding
        - Stay focused on Galaxy Tech-related topics and business solutions

        Response format:
        1. Provide a direct, helpful answer based on the search results
        2. Highlight the most relevant information from Galaxy Tech's content
        3. If multiple relevant topics are found, organize them clearly
        4. If no relevant results are found, suggest alternative search terms or topics
        5. Be conversational but professional - you represent the Galaxy Tech brand

        Keep responses informative but concise. Use the search tool results to provide a summary.`,
        prompt: query,
        tools: { search: searchTool },
      })

      console.log("AI Result", result)
      //      console.log('Tool results:', result.toolResults)

      const searchResult = result.toolResults?.find(tr => tr.toolName === 'search')
      //    console.log('AI Search result:', searchResult)

      // Extract the actual tool result data
      let toolResultData = { results: [], totalHits: 0 }
      if (searchResult && 'result' in searchResult) {
        toolResultData = (searchResult as any).result
      }

      return Response.json({
        summary: result.text,
        searchResults: toolResultData,
      })

    } catch (aiError) {
      console.error('AI search failed:', aiError)
      return Response.json(
        { error: 'AI search service is currently unavailable. Please try again later.' },
        { status: 503 }
      )
    }

  } catch (error) {
    console.error('Search API error:', error)
    return Response.json(
      { error: 'Failed to process search request' },
      { status: 500 }
    )
  }
}