//import { cookies } from 'next/headers'
import { nanoid } from 'nanoid'
import { getCookieName } from './get-cookie-name'
import type { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies'

/**
 * Get the user ID from PostHog cookie or generate a new one
 */
export async function getUserId(): Promise<string> {
	let distinct_id = ''
	const phCookieName = getCookieName()

	//TODO: figure out how to get cookies in edge runtime and pass them through...
	// const cookieStore = await cookies()
	// const phCookie = cookieStore.get(phCookieName)

	const phCookie: RequestCookie | undefined = undefined // TODO: REPLACE WITH ACTUAL COOKIE RETRIEVAL IN EDGE RUNTIME

	// if (phCookie) {
	// 	const phCookieParsed = JSON.parse(phCookie.value);
	// 	distinct_id = phCookieParsed.distinct_id;

	// 	console.log("GOT Distinct ID:", distinct_id) // Debugging log

	// }

	if (!distinct_id) {
		distinct_id = nanoid() // Generate a new unique ID
	}

	return distinct_id
}
