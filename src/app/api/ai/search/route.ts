import { convertToModelMessages, streamText, stepCountIs, type UIMessage } from 'ai'
import { validateAIEnvironment, validateAlgoliaEnvironment, getAIModel } from '@/lib/ai/providers'
import { createSearchTool } from '@/lib/ai/searchTool'
import { getAISearchConfig } from '@/lib/cms-content/getAISearchConfig'

// Allow streaming responses up to 30 seconds
export const maxDuration = 30



export async function POST(req: Request) {
	try {
		// Validate AI environment variables
		const { hasValidConfig } = validateAIEnvironment()
		if (!hasValidConfig) {
			console.error('Missing required AI environment variables')
			return Response.json(
				{ error: 'AI service configuration error' },
				{ status: 500 }
			)
		}

		// Validate Algolia environment variables
		if (!validateAlgoliaEnvironment()) {
			console.error('Missing required Algolia environment variables')
			return Response.json(
				{ error: 'Search service configuration error' },
				{ status: 500 }
			)
		}

		const { messages }: { messages: UIMessage[] } = await req.json();

		if (!messages || messages.length === 0) {
			return Response.json(
				{ error: 'Messages are required' },
				{ status: 400 }
			)
		}

		// Fetch AI configuration from Agility CMS (always returns values)
		const aiConfig = await getAISearchConfig({ locale: 'en-us' })

		// Check if AI search is enabled
		if (!aiConfig.showAISearch) {
			return Response.json(
				{ error: 'AI search is currently disabled' },
				{ status: 503 }
			)
		}

		// Create the search tool
		const searchTool = createSearchTool()


		// Use system prompt from Agility CMS (defaults are already applied)
		const systemPrompt = aiConfig.systemPrompt
		const temperature = aiConfig.temperature
		const maxOutputTokens = aiConfig.maxTokens

		// Get the AI model
		const model = getAIModel()
		if (!model) {
			console.error('Failed to initialize AI model')
			return Response.json(
				{ error: 'AI service configuration error' },
				{ status: 500 }
			)
		}

		try {
			const result = streamText({
				model: model,
				system: systemPrompt,
				messages: convertToModelMessages(messages),
				tools: { search: searchTool },
				temperature: temperature,
				maxOutputTokens: maxOutputTokens,
				toolChoice: 'auto', // Let the model decide when to use tools
				stopWhen: stepCountIs(5), // Allow up to 5 steps for multi-step tool calls

			})

			return result.toUIMessageStreamResponse();

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