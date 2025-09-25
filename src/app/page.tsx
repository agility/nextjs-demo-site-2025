import LocalePage from "@/app/[locale]/page"
import { defaultLocale } from "@/lib/i18n/config"

interface RootPageProps {
	searchParams?: Promise<{ [key: string]: string | string[] | undefined }>
}

export { generateMetadata } from "@/app/[locale]/page"

export default async function RootPage({ searchParams }: RootPageProps) {
	return (
		<LocalePage
			params={Promise.resolve({ locale: defaultLocale, slug: [""] })}
			searchParams={searchParams}
		/>
	)
}