import { convertToModelMessages, streamText, type UIMessage } from 'ai'
import { validateAIEnvironment, validateAlgoliaEnvironment, getAIModel } from '@/lib/ai/providers'
import { createSearchTool } from '@/lib/ai/searchTool'
import { createContactCaptureTool } from '@/lib/ai/contactCaptureTool'
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

    const { messages }: { messages: UIMessage[] } = await req.json()

    if (!messages || messages.length === 0) {
      return Response.json(
        { error: 'Messages are required' },
        { status: 400 }
      )
    }

    // Fetch AI configuration from Agility CMS
    const aiConfig = await getAISearchConfig({ locale: 'en-us' })

    // Check if AI search is enabled (this controls both search and agent)
    if (!aiConfig.showAISearch) {
      return Response.json(
        { error: 'AI assistant is currently disabled' },
        { status: 503 }
      )
    }

    // Get the AI model
    const model = getAIModel()
    if (!model) {
      console.error('Failed to initialize AI model')
      return Response.json(
        { error: 'AI service configuration error' },
        { status: 500 }
      )
    }

    // Create the search tool
    const searchTool = createSearchTool()

    // Create the contact capture tool
    const contactTool = createContactCaptureTool(aiConfig.contactCaptureURL)

    // Use a more conversational system prompt for the agent mode
    const agentSystemPrompt = `You are a helpful AI assistant for this website. You can have natural conversations with users and help them find information.

Your capabilities:
- You can search the website for relevant content to answer questions
- You can capture contact information when users want to get in touch or request more information
- You can have general conversations about topics related to this website
- You provide helpful, accurate, and conversational responses
- You have access to search tools to find current information when needed

Your personality:
- Friendly and conversational
- Professional but approachable
- Helpful and informative
- Proactive in offering assistance

When responding:
1. Be conversational and natural in your tone
2. Use search when you need specific information from the website
3. Use the contact capture tool when users express interest in:
   - Getting in touch with the company
   - Requesting more information
   - Asking for a consultation or demo
   - Wanting to speak with someone
   - Expressing purchase intent
4. Provide clear and helpful answers
5. Ask follow-up questions when appropriate
6. Offer additional assistance or suggestions

Remember: You represent this website, so maintain a professional yet friendly demeanor.`

    try {
      const result = await streamText({
        model: model,
        system: agentSystemPrompt,
        messages: convertToModelMessages(messages),
        tools: {
          search: searchTool,
          contactCapture: contactTool
        },
        temperature: aiConfig.temperature,
        maxOutputTokens: aiConfig.maxTokens,
        toolChoice: 'auto', // Let the model decide when to use tools
      })

      return result.toUIMessageStreamResponse()

    } catch (aiError) {
      console.error('AI agent failed:', aiError)
      return Response.json(
        { error: 'AI assistant service is currently unavailable. Please try again later.' },
        { status: 503 }
      )
    }

  } catch (error) {
    console.error('Agent API error:', error)
    return Response.json(
      { error: 'Failed to process request' },
      { status: 500 }
    )
  }
}