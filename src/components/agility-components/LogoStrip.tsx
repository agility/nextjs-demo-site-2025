import { getContentItem } from "@/lib/cms/getContentItem"
import { getContentList } from "@/lib/cms/getContentList"
import type { ContentItem, ImageField, UnloadedModuleProps, URLField } from "@agility/nextjs"
import { Container } from "../container"
import Link from "next/link"

interface ILogoStrip {
	ctaDescription: string
	cta: URLField
	logos: { referencename: string }
}

interface ILogoItem {
	title: string
	logo: ImageField
}

export const LogoStrip = async ({ module, languageCode }: UnloadedModuleProps) => {
	const {
		fields: {
			ctaDescription,
			cta,
			logos: { referencename: logosReferenceName },
		},
		contentID,
	} = await getContentItem<ILogoStrip>({
		contentID: module.contentid,
		languageCode,
	})

	//now go get the logos
	let logos = await getContentList({
		referenceName: logosReferenceName,
		languageCode,
		take: 20, // adjust as needed
	})
	return (
		<Container className="mt-20">
			<div className="mx-auto max-w-7xl px-6 lg:px-8">
				<div className="mx-auto grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-12 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 sm:gap-y-14 lg:mx-0 lg:max-w-none lg:grid-cols-5">
					{logos.items.map((item: any, index: number) => {
						const {
							fields: { title, logo },
						} = item as ContentItem<ILogoItem>
						return (
							<img
								key={index}
								alt={title}
								src={logo.url}
								width={158}
								height={48}
								className="col-span-2 max-h-12 w-full object-contain lg:col-span-1 dark:brightness-0 dark:invert"
							/>
						)
					})}

				</div>
				<div className="mt-16 flex justify-center">
					<p className="relative rounded-full bg-gray-50 dark:bg-gray-800 px-4 py-1.5 text-sm/6 text-gray-600 dark:text-gray-300 ring-1 ring-gray-900/5 dark:ring-white/10 ring-inset">
						<span className="hidden md:inline" data-agility-field="ctaDescription">{ctaDescription}</span>
						<Link href={cta.href} target={cta.target} className="font-semibold text-gray-600 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-200" data-agility-field="cta">
							<span aria-hidden="true" className="absolute inset-0" />{cta.text}{' '}
							<span aria-hidden="true">&rarr;</span>
						</Link>
					</p>
				</div>
			</div>
		</Container>
	)
}
