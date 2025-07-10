import { Container } from '@/components/container'
import type { UnloadedModuleProps, ImageField } from "@agility/nextjs"
import { getContentItem } from "@/lib/cms/getContentItem"

interface ITestimonial {
	quote: string
	authorName: string
	authorTitle: string
	authorImage: ImageField
	backgroundPattern?: string
}

export const Testimonial = async ({ module, languageCode }: UnloadedModuleProps) => {
	const {
		fields: {
			quote,
			authorName,
			authorTitle,
			authorImage,
			backgroundPattern = "/dot-texture.svg"
		},
		contentID,
	} = await getContentItem<ITestimonial>({
		contentID: module.contentid,
		languageCode,
	})

	return (
		<div className='pt-20 relative '>
			<div
				className="mx-2 my-24 rounded-4xl bg-gray-900 pt-72 pb-24 lg:pt-36"
				style={{
					backgroundImage: `url(${backgroundPattern})`
				}}
				data-agility-component={contentID}
			>
				<Container>
					<div className="grid grid-cols-1 lg:grid-cols-[384px_1fr_1fr]">
						<div className="-mt-96 lg:-mt-52">
							<div className="-m-2 rounded-4xl bg-white/15 shadow-[inset_0_0_2px_1px_#ffffff4d] ring-1 ring-black/5 max-lg:mx-auto max-lg:max-w-xs">
								<div className="rounded-4xl p-2 shadow-md shadow-black/5">
									<div className="overflow-hidden rounded-3xl shadow-2xl outline-1 -outline-offset-1 outline-black/10">
										{authorImage?.url && (
											<img
												alt={authorImage.label || authorName}
												src={authorImage.url}
												className="aspect-3/4 w-full object-cover"
												data-agility-field="authorImage"
											/>
										)}
									</div>
								</div>
							</div>
						</div>
						<div className="flex max-lg:mt-16 lg:col-span-2 lg:px-16">
							<figure className="mx-auto flex max-w-xl flex-col gap-16 max-lg:text-center">
								<blockquote>
									<p
										className="relative text-3xl tracking-tight text-white lg:text-4xl"
										data-agility-field="quote"
									>
										&ldquo;{quote}&rdquo;
									</p>
								</blockquote>
								<figcaption className="mt-auto">
									<p className="text-sm/6 font-medium text-white" data-agility-field="authorName">
										{authorName}
									</p>
									<p className="text-sm/6 font-medium" data-agility-field="authorTitle">
										<span className="bg-gradient-to-r from-[#fff1be] from-28% via-[#ee87cb] via-70% to-[#b060ff] bg-clip-text text-transparent">
											{authorTitle}
										</span>
									</p>
								</figcaption>
							</figure>
						</div>
					</div>
				</Container>
			</div>
		</div>
	)
}
