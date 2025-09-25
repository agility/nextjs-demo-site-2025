/**
 * the root page - just pull exports from the main slug...
 */
export { generateMetadata } from "./[locale]/[...slug]/page"
export { default } from "./[locale]/[...slug]/page"

export const revalidate = 60
export const runtime = "nodejs"