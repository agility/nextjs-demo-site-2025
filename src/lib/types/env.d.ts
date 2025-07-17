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

			// Node.js Environment Variables
			NODE_ENV: 'development' | 'production' | 'test'
		}
	}
}

export { }
