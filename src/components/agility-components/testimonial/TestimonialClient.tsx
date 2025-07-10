'use client'

import { Container } from '@/components/container'
import type { ImageField } from "@agility/nextjs"
import { useRef } from 'react'
import { motion, useInView } from 'motion/react'

interface ITestimonialClient {
	quote: string
	authorName: string
	authorTitle: string
	authorImage: ImageField
	backgroundPattern: string
	contentID: number
}

export const TestimonialClient = ({ quote, authorName, authorTitle, authorImage, backgroundPattern, contentID }: ITestimonialClient) => {
	const ref = useRef<HTMLDivElement>(null)
	const isInView = useInView(ref, {
		amount: 0.2,
		once: true
	})

	return (
		<div ref={ref} className='pt-20 relative'>
			<motion.div
				initial={{ opacity: 0, y: 50 }}
				animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
				transition={{
					duration: 0.8,
					delay: 0.2,
					ease: [0.25, 0.1, 0.25, 1]
				}}
				className="mx-2 my-24 rounded-4xl bg-gray-900 pt-72 pb-24 lg:pt-36"
				style={{
					backgroundImage: `url(${backgroundPattern})`,
					willChange: 'transform, opacity'
				}}
				data-agility-component={contentID}
			>
				<Container>
					<div className="grid grid-cols-1 lg:grid-cols-[384px_1fr_1fr]">
						<motion.div
							initial={{ opacity: 0, x: -30 }}
							animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
							transition={{
								duration: 0.7,
								delay: 0.4,
								ease: [0.25, 0.1, 0.25, 1]
							}}
							className="-mt-96 lg:-mt-52"
						>
							<div className="-m-2 rounded-4xl bg-white/15 shadow-[inset_0_0_2px_1px_#ffffff4d] ring-1 ring-black/5 max-lg:mx-auto max-lg:max-w-xs transition-transform duration-500 hover:scale-105">
								<div className="rounded-4xl p-2 shadow-md shadow-black/5">
									<div className="overflow-hidden rounded-3xl shadow-2xl outline-1 -outline-offset-1 outline-black/10">
										{authorImage?.url && (
											<motion.img
												initial={{ scale: 1.1 }}
												animate={isInView ? { scale: 1 } : { scale: 1.1 }}
												transition={{
													duration: 0.8,
													delay: 0.6,
													ease: [0.25, 0.1, 0.25, 1]
												}}
												alt={authorImage.label || authorName}
												src={authorImage.url}
												className="aspect-3/4 w-full object-cover"
												data-agility-field="authorImage"
											/>
										)}
									</div>
								</div>
							</div>
						</motion.div>
						<motion.div
							initial={{ opacity: 0, x: 30 }}
							animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
							transition={{
								duration: 0.7,
								delay: 0.6,
								ease: [0.25, 0.1, 0.25, 1]
							}}
							className="flex max-lg:mt-16 lg:col-span-2 lg:px-16"
						>
							<figure className="mx-auto flex max-w-xl flex-col gap-16 max-lg:text-center">
								<motion.blockquote
									initial={{ opacity: 0, y: 20 }}
									animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
									transition={{
										duration: 0.6,
										delay: 0.8,
										ease: [0.25, 0.1, 0.25, 1]
									}}
								>
									<p
										className="relative text-3xl tracking-tight text-white lg:text-4xl transition-all duration-300 hover:scale-105"
										data-agility-field="quote"
									>
										&ldquo;{quote}&rdquo;
									</p>
								</motion.blockquote>
								<motion.figcaption
									initial={{ opacity: 0, y: 20 }}
									animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
									transition={{
										duration: 0.6,
										delay: 1.0,
										ease: [0.25, 0.1, 0.25, 1]
									}}
									className="mt-auto"
								>
									<p className="text-sm/6 font-medium text-white transition-colors duration-300 hover:text-gray-200" data-agility-field="authorName">
										{authorName}
									</p>
									<p className="text-sm/6 font-medium transition-all duration-300 hover:scale-105" data-agility-field="authorTitle">
										<span className="bg-gradient-to-r from-[#fff1be] from-28% via-[#ee87cb] via-70% to-[#b060ff] bg-clip-text text-transparent">
											{authorTitle}
										</span>
									</p>
								</motion.figcaption>
							</figure>
						</motion.div>
					</div>
				</Container>
			</motion.div>
		</div>
	)
}
