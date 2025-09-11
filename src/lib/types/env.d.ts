declare global {
	namespace NodeJS {
		interface ProcessEnv {
			// Agility CMS Environment Variables
			AGILITY_GUID: string
			AGILITY_API_FETCH_KEY: string
			AGILITY_API_PREVIEW_KEY: string
			AGILITY_SECURITY_KEY: string
			AGILITY_LOCALES: string
			AGILITY_SITEMAP: string
			AGILITY_FETCH_CACHE_DURATION: string
			AGILITY_PATH_REVALIDATE_DURATION: string

			// PostHog Environment Variables
			NEXT_PUBLIC_POSTHOG_KEY: string
			NEXT_PUBLIC_POSTHOG_HOST: string

			//Algolia Environment Variables
			ALGOLIA_APP_ID: string
			ALGOLIA_SEARCH_API_KEY: string

			//Azure OpenAI Environment Variables
			AZURE_AI_RESOURCE: string
			AZURE_AI_DEPLOYMENT: string
			AZURE_AI_KEY: string
			AZURE_AI_API_VERSION: string



			// Node.js Environment Variables
			NODE_ENV: 'development' | 'production' | 'test'
		}
	}
}

export { }
