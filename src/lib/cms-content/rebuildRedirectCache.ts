
import { ScalableBloomFilter } from 'bloom-filters'
import fs from 'fs/promises'
import { getRedirections } from '../cms/getRedirections'

/**
 * Rebuild the redirection cache and bloom filter.
 * Inpired by this: https://nextjs.org/docs/app/building-your-application/routing/redirecting#managing-redirects-at-scale-advanced
 */
export const rebuildRedirectCache = async () => {
	console.log("Agility Website => Rebuilding redirect cache...")
	try {

		//force a rebuild the redirection cache
		const redirections = await getRedirections({ forceUpdate: true })

		const allKeys = Object.keys(redirections.items)

		//rebuild the bloom filter
		const filter = new ScalableBloomFilter(allKeys.length, 0.0001)

		//add the origin urls from the redirections to the bloom filter
		for (const k in redirections.items) {
			let key = k
			if (key.startsWith("~/")) key = key.substring(1)

			if (key.includes("://")) {
				const hostIndex = key.indexOf("/", key.indexOf("://") + 3)
				key = key.substring(hostIndex)
			}
			filter.add(key)
		}


		const filterJson = filter.saveAsJSON()
		const filterStr = JSON.stringify(filterJson)


		//save the bloom filter to the data folder...
		const fileName = 'data/redirections-bloom-filter.json'
		await fs.writeFile(fileName, filterStr, 'utf8')


		// //put the bloom filter in the persistent cache
		// setCachedObject('redirections-bloom-filter', filterStr)


	} catch (error) {
		console.error("Error rebuilding redirect cache", error)
	}

}