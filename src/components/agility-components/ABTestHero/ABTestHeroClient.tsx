"use client"

import clsx from "clsx"
import { Button } from "../../button"
import { Container } from "../../container"
import type { ImageField, URLField } from "@agility/nextjs"
import { AgilityPic } from "@agility/nextjs"
import { useEffect } from "react"
import posthog from "posthog-js"
import { getCookieName } from "@/lib/posthog/get-cookie-name"
import Cookies from 'js-cookie';

interface IHeroVariant {
	variant: string
	heading: string
	description: string
	callToAction?: URLField
	image: ImageField
	imagePosition?: string // "left" or "right"
}

interface ABTestHeroClientProps {
	experimentKey: string
	selectedVariant: IHeroVariant
	userId: string
	contentID: number
}

/**
 * Client component that renders the selected hero variant from server-side AB testing.
 * This component receives the pre-selected variant and handles client-side analytics tracking.
 */
export const ABTestHeroClient = ({ experimentKey, selectedVariant, userId, contentID }: ABTestHeroClientProps) => {
	useEffect(() => {

		// Track the experiment exposure on the client side
		if (posthog && posthog.__loaded && experimentKey && selectedVariant) {
			posthog.capture("$feature_flag_called", {
				$feature_flag: experimentKey,
				$feature_flag_response: selectedVariant.variant,
				component: "ABTestHero",
				contentID: contentID
			})
		}
	}, [experimentKey, selectedVariant, contentID])

	if (!selectedVariant) {
		return null
	}

	const { heading, description, callToAction, image, imagePosition = "right" } = selectedVariant
	const isImageLeft = imagePosition === "left"

	return (
		<section
			className="pt-20"
			data-agility-component={contentID}
			data-experiment-key={experimentKey}
			data-variant={selectedVariant.variant}
		>
			<Container>
				<div className={clsx(
					"grid gap-8 lg:gap-16 lg:grid-cols-2 lg:items-center",
					// On mobile, image is always on top
					"grid-rows-[auto_1fr]",
					// On desktop, order changes based on imagePosition
					isImageLeft ? "lg:grid-cols-[1fr_1fr]" : "lg:grid-cols-[1fr_1fr]"
				)}>
					{/* Content Section */}
					<div className={clsx(
						"order-2 lg:order-none",
						isImageLeft ? "lg:order-2" : "lg:order-1"
					)}>
						<h1
							className="font-display text-3xl/[1.1] font-medium tracking-tight text-balance sm:text-4xl/[1.1] md:text-5xl/[1.1] text-gray-950 dark:text-gray-50"
							data-agility-field="heading"
						>
							{heading}
						</h1>

						<p
							className="mt-6 text-lg/7 font-medium text-gray-950/75 dark:text-gray-200/90 sm:text-xl/8"
							data-agility-field="description"
						>
							{description}
						</p>

						{callToAction && (
							<div className="mt-8">
								<Button
									href={callToAction.href}
									target={callToAction.target}
									data-agility-field="callToAction"
									onClick={() => {
										// Track CTA clicks for the experiment
										if (posthog && posthog.__loaded) {
											posthog.capture("ab_test_cta_click", {
												experiment_key: experimentKey,
												variant: selectedVariant.variant,
												component: "ABTestHero",
												contentID: contentID,
												cta_text: callToAction.text,
												cta_href: callToAction.href
											})
										}
									}}
								>
									{callToAction.text}
								</Button>
							</div>
						)}
					</div>

					{/* Image Section */}
					<div className={clsx(
						"order-1 lg:order-none",
						isImageLeft ? "lg:order-1" : "lg:order-2"
					)}>
						<div className="relative dark:saturate-0">
							<AgilityPic
								data-agility-field="image"
								image={image}
								fallbackWidth={600}
								className="w-full h-auto rounded-2xl shadow-2xl ring-1 ring-black/5 dark:ring-white/10"
							/>
						</div>
					</div>
				</div>
			</Container>
		</section>
	)
}
