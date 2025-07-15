/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		viewTransition: true,
		// ppr: true, // PPR requires Next.js canary - using manual Suspense pattern instead
	},
}

export default nextConfig
