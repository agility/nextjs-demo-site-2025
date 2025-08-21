"use client"

import type { ContentItem, ImageField, URLField } from "@agility/nextjs"
import { Container } from "../../container"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"

interface ILogoItem {
	title: string
	logo: ImageField
}

interface LogoStripClientProps {
	logos: ContentItem<ILogoItem>[]
	ctaDescription: string
	cta: URLField
}

export const LogoStripClient = ({ logos, ctaDescription, cta }: LogoStripClientProps) => {
	const scrollContainerRef = useRef<HTMLDivElement>(null)
	const [currentDot, setCurrentDot] = useState(0)
	const [showDots, setShowDots] = useState(false)
	const [visibleLogosCount, setVisibleLogosCount] = useState(0)
	const [scrollProgress, setScrollProgress] = useState(0)

	useEffect(() => {
		const container = scrollContainerRef.current
		if (!container) return

		const updateCarouselState = () => {
			const containerWidth = container.clientWidth
			const logoMinWidth = 120 // Base minimum width for logos
			const gap = 32 // Gap between logos (8 * 4px = 32px)
			const padding = 32 // Container padding

			// Calculate how many logos can fit in the visible area
			const availableWidth = containerWidth - padding
			const logoWithGap = logoMinWidth + gap
			const visibleCount = Math.floor(availableWidth / logoWithGap)

			setVisibleLogosCount(Math.max(1, visibleCount))

			// Show dots only if there are more logos than can be displayed
			const needsScrolling = logos.length > visibleCount
			setShowDots(needsScrolling)
		}

		const handleScroll = () => {
			if (!container || !showDots) return

			const scrollLeft = container.scrollLeft
			const maxScroll = container.scrollWidth - container.clientWidth
			const progress = maxScroll > 0 ? scrollLeft / maxScroll : 0
			setScrollProgress(progress)

			const logoMinWidth = 120 + 32 // logo width + gap
			const currentIndex = Math.round(scrollLeft / logoMinWidth)

			// Calculate which "page" we're on based on visible logos
			const currentPage = Math.floor(currentIndex / visibleLogosCount)
			const totalPages = Math.ceil(logos.length / visibleLogosCount)

			setCurrentDot(Math.min(currentPage, totalPages - 1))
		}

		updateCarouselState()
		container.addEventListener('scroll', handleScroll)
		window.addEventListener('resize', updateCarouselState)

		return () => {
			container.removeEventListener('scroll', handleScroll)
			window.removeEventListener('resize', updateCarouselState)
		}
	}, [logos.length, showDots, visibleLogosCount])

	const scrollToPage = (pageIndex: number) => {
		if (!scrollContainerRef.current) return

		const container = scrollContainerRef.current
		const logoMinWidth = 120 + 32 // logo width + gap
		const scrollPosition = pageIndex * visibleLogosCount * logoMinWidth

		container.scrollTo({
			left: scrollPosition,
			behavior: 'smooth'
		})
	}

	// Calculate total number of pages/dots needed
	const totalDots = visibleLogosCount > 0 ? Math.ceil(logos.length / visibleLogosCount) : 0

	return (
		<Container className="mt-20">
			<div className="mx-auto max-w-7xl px-6 lg:px-8">
				<div className="relative">
					{/* Logo carousel container */}
					<div
						ref={scrollContainerRef}
						className="overflow-x-auto scrollbar-hide carousel-container"
						style={{ scrollSnapType: showDots ? 'x mandatory' : 'none' }}
					>
						<div className="flex gap-8 lg:gap-12 px-4" style={{ justifyContent: showDots ? 'flex-start' : 'center' }}>
							{logos.map((item: ContentItem<ILogoItem>, index: number) => {
								const {
									fields: { title, logo },
								} = item
								return (
									<div
										key={index}
										className="flex-shrink-0 flex items-center justify-center min-w-[120px] lg:min-w-[158px]"
										style={{ scrollSnapAlign: showDots && index % visibleLogosCount === 0 ? 'start' : 'none' }}
									>
										<img
											alt={title}
											src={logo.url}
											width={158}
											height={48}
											className="max-h-8 lg:max-h-12 w-auto object-contain dark:brightness-0 dark:invert transition-opacity hover:opacity-80"
										/>
									</div>
								)
							})}
						</div>
					</div>

					{/* Fade gradients for overflow indication */}
					{showDots && (
						<>
							<div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-white dark:from-gray-900 to-transparent pointer-events-none opacity-50"></div>
							<div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-white dark:from-gray-900 to-transparent pointer-events-none opacity-50"></div>
						</>
					)}
				</div>

				{/* Navigation dots */}
				{showDots && totalDots > 1 && (
					<div className="flex justify-center mt-8 mb-4">
						<div className="flex items-center space-x-2 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm border border-gray-200/50 dark:border-gray-700/50">
							{Array.from({ length: totalDots }).map((_, index) => (
								<button
									key={index}
									onClick={() => scrollToPage(index)}
									className={`relative transition-all duration-300 ease-out ${currentDot === index
											? 'w-6 h-2 bg-gray-800 dark:bg-white rounded-full'
											: 'w-2 h-2 bg-gray-400 dark:bg-gray-600 rounded-full hover:bg-gray-600 dark:hover:bg-gray-400 hover:scale-110'
										}`}
									aria-label={`Go to page ${index + 1} of ${totalDots}`}
									title={`Page ${index + 1} of ${totalDots}`}
								/>
							))}
						</div>
					</div>
				)}

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
