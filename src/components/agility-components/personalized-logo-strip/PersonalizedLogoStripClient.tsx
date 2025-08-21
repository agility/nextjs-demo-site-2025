"use client"

import type { ContentItem, URLField } from "@agility/nextjs"
import { Container } from "../../container"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import type { ICustomerProfile } from "@/lib/types/ICustomerProfile"

interface PersonalizedLogoStripClientProps {
	customers: ContentItem<ICustomerProfile>[]
	ctaDescription: string
	cta: URLField
}

export const PersonalizedLogoStripClient = ({ customers, ctaDescription, cta }: PersonalizedLogoStripClientProps) => {
	const scrollContainerRef = useRef<HTMLDivElement>(null)
	const [currentDot, setCurrentDot] = useState(0)
	const [showDots, setShowDots] = useState(false)
	const [totalDots, setTotalDots] = useState(0)

	useEffect(() => {
		const container = scrollContainerRef.current
		if (!container) return

		const checkIfScrollable = () => {
			const isScrollable = container.scrollWidth > container.clientWidth
			setShowDots(isScrollable)

			if (isScrollable) {
				// Calculate dots based on scroll width vs container width
				const scrollableWidth = container.scrollWidth - container.clientWidth
				const containerWidth = container.clientWidth
				const dotsCount = Math.ceil(container.scrollWidth / containerWidth)
				setTotalDots(Math.max(2, Math.min(dotsCount, 5))) // Limit to reasonable number
			} else {
				setTotalDots(0)
			}
		}

		const handleScroll = () => {
			if (!container || !showDots) return

			const scrollLeft = container.scrollLeft
			const maxScroll = container.scrollWidth - container.clientWidth
			const scrollProgress = maxScroll > 0 ? scrollLeft / maxScroll : 0
			const currentDotIndex = Math.round(scrollProgress * (totalDots - 1))
			setCurrentDot(Math.max(0, Math.min(currentDotIndex, totalDots - 1)))
		}

		checkIfScrollable()
		container.addEventListener('scroll', handleScroll)
		window.addEventListener('resize', checkIfScrollable)

		return () => {
			container.removeEventListener('scroll', handleScroll)
			window.removeEventListener('resize', checkIfScrollable)
		}
	}, [customers.length, showDots, totalDots])

	const scrollToPosition = (dotIndex: number) => {
		if (!scrollContainerRef.current || totalDots <= 1) return

		const container = scrollContainerRef.current
		const maxScroll = container.scrollWidth - container.clientWidth
		const targetScroll = (dotIndex / (totalDots - 1)) * maxScroll

		container.scrollTo({
			left: targetScroll,
			behavior: 'smooth'
		})
	}

	return (
		<Container className="mt-20">
			<div className="mx-auto max-w-7xl px-6 lg:px-8">
				{/* Logo strip */}
				<div
					ref={scrollContainerRef}
					className="overflow-x-auto scrollbar-hide"
				>
					<div className={`flex gap-8 lg:gap-12 ${showDots ? 'justify-start' : 'justify-center'} min-w-max px-4`}>
						{customers.map((item, index) => {
							const { fields: { name } } = item
							const logo = item.fields.logo || item.fields.audience?.fields.icon

							return (
								<div
									key={index}
									className="flex-shrink-0 flex gap-3 items-center justify-center min-w-[160px] lg:min-w-[200px]"
								>
									<img
										alt={name}
										src={logo.url}
										className="h-8 lg:h-10 w-auto object-contain dark:brightness-0 dark:invert"
									/>
									<div className="text-lg font-medium text-gray-900 dark:text-gray-100 whitespace-nowrap">
										{name}
									</div>
								</div>
							)
						})}
					</div>
				</div>

				{/* Navigation dots - only show if scrollable */}
				{showDots && totalDots > 1 && (
					<div className="flex justify-center mt-8">
						<div className="flex items-center space-x-2">
							{Array.from({ length: totalDots }).map((_, index) => (
								<button
									key={index}
									onClick={() => scrollToPosition(index)}
									className={`transition-all duration-200 rounded-full ${
										currentDot === index
											? 'w-8 h-2 bg-gray-800 dark:bg-white'
											: 'w-2 h-2 bg-gray-400 dark:bg-gray-600 hover:bg-gray-600 dark:hover:bg-gray-400'
									}`}
									aria-label={`Scroll to position ${index + 1}`}
								/>
							))}
						</div>
					</div>
				)}

				{/* CTA */}
				<div className="mt-16 flex justify-center">
					<Link href={cta.href} target={cta.target} className="flex gap-1 items-center relative rounded-full bg-gray-50 dark:bg-gray-800 px-4 py-1.5 text-base text-gray-600 dark:text-gray-300 ring-1 ring-gray-900/5 dark:ring-white/10 ring-inset overflow-hidden group hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200">
						{/* Shimmer effect */}
						<div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out bg-gradient-to-r from-transparent via-white/60 dark:via-white/10 to-transparent" />

						<span className="hidden md:inline relative z-10" data-agility-field="ctaDescription">{ctaDescription}</span>
						<span className="font-semibold text-gray-600 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-200 relative z-10" data-agility-field="cta">
							<span aria-hidden="true" className="absolute inset-0" />{cta.text}{' '}
							<span aria-hidden="true">&rarr;</span>
						</span>
					</Link>
				</div>
			</div>
		</Container>
	)
}
