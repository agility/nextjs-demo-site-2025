"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { ContentItem, ImageField, URLField } from "@agility/nextjs";
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
	autoAdvanceMs?: number
}

export const CarouselClient = ({ slides, autoAdvanceMs = 8000 }: CarouselClientProps) => {
	const [index, setIndex] = useState(0);
	const timerRef = useRef<NodeJS.Timeout | null>(null);
	const containerRef = useRef<HTMLDivElement | null>(null);

	const goTo = useCallback((i: number) => {
		setIndex((prev) => {
			const next = (i + slides.length) % slides.length;
			return next;
		});
	}, [slides.length]);

	const next = useCallback(() => goTo(index + 1), [index, goTo]);
	const prev = useCallback(() => goTo(index - 1), [index, goTo]);

	useEffect(() => {
		if (!autoAdvanceMs) return;
		if (timerRef.current) clearTimeout(timerRef.current);
		timerRef.current = setTimeout(() => {
			next();
		}, autoAdvanceMs);
		return () => { if (timerRef.current) clearTimeout(timerRef.current); };
	}, [index, autoAdvanceMs, next]);

	useEffect(() => {
		const el = containerRef.current;
		if (!el) return;
		const slide = el.querySelectorAll<HTMLElement>("[data-carousel-slide]")[index];
		if (slide) {
			slide.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
		}
	}, [index]);

	return (
		<div className="relative" aria-roledescription="carousel">
			<div className="overflow-hidden rounded-3xl group">
				<div ref={containerRef} className="flex snap-x snap-mandatory overflow-x-auto scroll-smooth scrollbar-hide">
					{slides.map((slide, i) => {
						const { fields: { heading, image, cta, ctaText, description }, contentID } = slide;
						return (
							<div
								key={contentID}
								data-carousel-slide
								className="relative flex-shrink-0 w-full snap-center" style={{ minWidth: "100%" }}
								aria-hidden={i !== index}
							>
								<div className="relative h-[480px] md:h-[560px]">
									<img src={image.url} alt={heading} className="w-full h-full object-cover" />
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
						className="pointer-events-auto h-14 w-14 rounded-full border border-white/70 backdrop-blur-sm flex items-center justify-center text-white bg-black/30 hover:bg-black/50 transition"
					>
						<span className="sr-only">Previous</span>
						<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
					</button>
					<button
						onClick={next}
						aria-label="Next slide"
						className="pointer-events-auto h-14 w-14 rounded-full border border-white/70 backdrop-blur-sm flex items-center justify-center text-white bg-black/30 hover:bg-black/50 transition"
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
