import { cookies } from 'next/headers'
import { nanoid } from 'nanoid'
import { getCookieName } from './get-cookie-name'

/**
 * Get the user ID from PostHog cookie or generate a new one
 */
export async function getUserId(): Promise<string> {
	let distinct_id = ''
	const phCookieName = getCookieName()
	const cookieStore = await cookies()
	const phCookie = cookieStore.get(phCookieName)

	console.log("Cookie Name:", phCookieName) // Debugging log

	if (phCookie) {
		const phCookieParsed = JSON.parse(phCookie.value);
		distinct_id = phCookieParsed.distinct_id;

		console.log("GOT Distinct ID:", distinct_id) // Debugging log

	}

	if (!distinct_id) {
		distinct_id = nanoid() // Generate a new unique ID
		console.log("CREATED Distinct ID:", distinct_id) // Debugging log
	}

	return distinct_id
}
