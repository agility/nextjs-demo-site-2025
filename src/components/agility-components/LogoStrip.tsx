import { getContentItem } from "@/lib/cms/getContentItem"
import { getContentList } from "@/lib/cms/getContentList"
import type { ContentItem, ImageField, UnloadedModuleProps, URLField } from "@agility/nextjs"
import { Container } from "../container"

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

	console.log('LogoStrip fields:', logos.items[0]?.fields)

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

								height={48}
								className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
							/>
						)
					})}
					{/*
					<img
						alt="Reform"
						src="https://tailwindcss.com/plus-assets/img/logos/158x48/reform-logo-gray-900.svg"
						width={158}
						height={48}
						className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
					/>
					<img
						alt="Tuple"
						src="https://tailwindcss.com/plus-assets/img/logos/158x48/tuple-logo-gray-900.svg"
						width={158}
						height={48}
						className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
					/>
					<img
						alt="SavvyCal"
						src="https://tailwindcss.com/plus-assets/img/logos/158x48/savvycal-logo-gray-900.svg"
						width={158}
						height={48}
						className="col-span-2 max-h-12 w-full object-contain sm:col-start-2 lg:col-span-1"
					/>
					<img
						alt="Statamic"
						src="https://tailwindcss.com/plus-assets/img/logos/158x48/statamic-logo-gray-900.svg"
						width={158}
						height={48}
						className="col-span-2 col-start-2 max-h-12 w-full object-contain sm:col-start-auto lg:col-span-1"
					/> */}
				</div>
				<div className="mt-16 flex justify-center">
					<p className="relative rounded-full bg-gray-50 px-4 py-1.5 text-sm/6 text-gray-600 ring-1 ring-gray-900/5 ring-inset">
						<span className="hidden md:inline">Over 2500 companies use our tools to better their business.</span>
						<a href="#" className="font-semibold text-indigo-600">
							<span aria-hidden="true" className="absolute inset-0" /> Read our customer stories{' '}
							<span aria-hidden="true">&rarr;</span>
						</a>
					</p>
				</div>
			</div>
		</Container>
	)
}
