"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AgilityPic, type ContentItem, type ImageField, type URLField } from "@agility/nextjs";
import { Button } from "../../button";
import { clsx } from "clsx";

interface ICarouselSlideFields {
	heading: string
	image: ImageField
	cta?: URLField
	ctaText?: string
	description?: string
}

interface CarouselClientProps {
	slides: ContentItem<ICarouselSlideFields>[]
}

export const CarouselClient = ({ slides }: CarouselClientProps) => {
	const [index, setIndex] = useState(0);
	const [hasUserInteracted, setHasUserInteracted] = useState(false);
	const [isInViewport, setIsInViewport] = useState(false);
	const containerRef = useRef<HTMLDivElement | null>(null);
	const carouselRef = useRef<HTMLDivElement | null>(null);

	const goTo = useCallback((i: number) => {
		setHasUserInteracted(true);
		setIndex((prev) => {
			const next = (i + slides.length) % slides.length;
			return next;
		});
	}, [slides.length]);

	const next = useCallback(() => goTo(index + 1), [index, goTo]);
	const prev = useCallback(() => goTo(index - 1), [index, goTo]);

	// Check if carousel is in viewport
	useEffect(() => {
		const carousel = carouselRef.current;
		if (!carousel) return;

		const observer = new IntersectionObserver(
			(entries) => {
				const [entry] = entries;
				setIsInViewport(entry.isIntersecting);
			},
			{ threshold: 0.1 }
		);

		observer.observe(carousel);
		return () => observer.disconnect();
	}, []);

	// Only scroll into view if user has interacted AND carousel is in viewport
	useEffect(() => {
		if (!hasUserInteracted || !isInViewport) return;

		const el = containerRef.current;
		if (!el) return;
		const slide = el.querySelectorAll<HTMLElement>("[data-carousel-slide]")[index];
		if (slide) {
			slide.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
		}
	}, [index, hasUserInteracted, isInViewport]);

	// Listen for manual scroll to update dots
	useEffect(() => {
		const container = containerRef.current;
		if (!container) return;

		let isScrolling = false;
		let scrollTimeout: NodeJS.Timeout;

		const handleScroll = () => {
			if (hasUserInteracted && isScrolling) return; // Don't interfere with programmatic scrolling

			clearTimeout(scrollTimeout);
			scrollTimeout = setTimeout(() => {
				const slides = container.querySelectorAll<HTMLElement>("[data-carousel-slide]");
				if (slides.length === 0) return;

				const containerRect = container.getBoundingClientRect();
				const containerCenter = containerRect.left + containerRect.width / 2;

				let closestIndex = 0;
				let closestDistance = Infinity;

				slides.forEach((slide, i) => {
					const slideRect = slide.getBoundingClientRect();
					const slideCenter = slideRect.left + slideRect.width / 2;
					const distance = Math.abs(slideCenter - containerCenter);

					if (distance < closestDistance) {
						closestDistance = distance;
						closestIndex = i;
					}
				});

				if (closestIndex !== index) {
					setIndex(closestIndex);
				}
			}, 150); // Debounce to avoid excessive updates
		};

		const handleScrollStart = () => {
			isScrolling = true;
		};

		const handleScrollEnd = () => {
			setTimeout(() => {
				isScrolling = false;
			}, 100);
		};

		container.addEventListener('scroll', handleScroll, { passive: true });
		container.addEventListener('touchstart', handleScrollStart, { passive: true });
		container.addEventListener('touchend', handleScrollEnd, { passive: true });
		container.addEventListener('mousedown', handleScrollStart);
		container.addEventListener('mouseup', handleScrollEnd);

		return () => {
			container.removeEventListener('scroll', handleScroll);
			container.removeEventListener('touchstart', handleScrollStart);
			container.removeEventListener('touchend', handleScrollEnd);
			container.removeEventListener('mousedown', handleScrollStart);
			container.removeEventListener('mouseup', handleScrollEnd);
			clearTimeout(scrollTimeout);
		};
	}, [index, hasUserInteracted]);

	return (
		<div ref={carouselRef} className="relative" aria-roledescription="carousel">
			<div className="overflow-hidden rounded-3xl group">
				<div ref={containerRef} className="flex snap-x snap-always snap-mandatory overflow-x-auto scroll-smooth scrollbar-hide">
					{slides.map((slide, i) => {
						const { fields: { heading, image, cta, ctaText, description }, contentID } = slide;
						return (
							<div
								key={contentID}
								data-carousel-slide
								className="relative flex-shrink-0 w-full snap-center" style={{ minWidth: "100%" }}
								aria-hidden={i !== index}
							>
								<div className="relative h-[480px] md:h-[560px] dark:saturate-0">
									<AgilityPic
										image={image}
										className="w-full h-full object-cover"
										fallbackWidth={400}
										sources={[
											{ media: "(min-width: 1280px)", width: 1200 },
											{ media: "(min-width: 640px)", width: 800 },
											{ media: "(max-width: 639px)", width: 640 },
										]}
									/>
									<div className="absolute inset-0 bg-gradient-to-t from-gray-800/80 via-gray-600/40 to-transparent" />
									<div className="absolute bottom-0 left-0 right-0 h-2/3 bg-gradient-to-t from-gray-700/60 to-transparent" />
									<div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12 text-white max-w-2xl">
										<h4 className="text-2xl md:text-4xl font-semibold drop-shadow-md" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.4)' }} data-agility-field="heading">{heading}</h4>
										{description && <p className="mt-3 text-base md:text-lg drop-shadow-sm" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.3)' }} data-agility-field="description">{description}</p>}
										{cta?.href && (
											<div className="mt-6 drop-shadow-md" data-agility-field="cta">
												<Button href={cta.href} target={cta.target} variant="primary">{ctaText || cta.text || 'Learn more'}</Button>
											</div>
										)}
									</div>
								</div>
							</div>
						);
					})}
				</div>
				{/* Navigation Buttons */}
				<div className="pointer-events-none absolute inset-0 flex items-center justify-between p-4">
					<button
						onClick={prev}
						aria-label="Previous slide"
						className="pointer-events-auto h-14 w-14 rounded-full border border-white/70 backdrop-blur-sm flex items-center justify-center text-white bg-black/30 hover:bg-black/50 transition cursor-pointer"
					>
						<span className="sr-only">Previous</span>
						<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
					</button>
					<button
						onClick={next}
						aria-label="Next slide"
						className="pointer-events-auto h-14 w-14 rounded-full border border-white/70 backdrop-blur-sm flex items-center justify-center text-white bg-black/30 hover:bg-black/50 transition cursor-pointer"
					>
						<span className="sr-only">Next</span>
						<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6" /></svg>
					</button>
				</div>
			</div>
			{/* Dots */}
			<div className="flex justify-center mt-6 gap-3" role="tablist" aria-label="Slides">
				{slides.map((_, i) => (
					<button
						key={i}
						aria-label={`Go to slide ${i + 1}`}
						aria-selected={i === index}
						role="tab"
						onClick={() => goTo(i)}
						className={clsx("h-3 w-3 rounded-full transition", i === index ? "bg-gray-900 dark:bg-white scale-100" : "bg-gray-400/70 hover:bg-gray-500 dark:bg-gray-600 dark:hover:bg-gray-500 scale-90")}
					/>
				))}
			</div>
		</div>
	);
};

export default CarouselClient;
