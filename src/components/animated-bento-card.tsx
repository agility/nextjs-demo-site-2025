'use client'

import { useRef } from 'react'
import { motion, useInView } from 'motion/react'
import { BentoCard } from './bento-card'
import type { ReactNode } from 'react'
import clsx from 'clsx'

interface AnimatedBentoCardProps {
	delay?: number;
	eyebrow: ReactNode;
	title: ReactNode;
	description: ReactNode;
	className?: string;
	graphic: ReactNode;
	fade?: ('top' | 'bottom')[];
}

export const AnimatedBentoCard = ({
	delay = 0,
	eyebrow,
	title,
	description,
	className,
	graphic,
	fade = []
}: AnimatedBentoCardProps) => {
	const ref = useRef<HTMLDivElement>(null)
	const isInView = useInView(ref, {
		amount: 0.3,
		once: true
	})

	return (
		<div ref={ref} className={clsx(`overflow-hidden`, className)}>
			<motion.div
				initial={{ opacity: 0, y: 50 }}
				animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
				transition={{
					duration: 0.6,
					delay: delay,
					ease: [0.25, 0.1, 0.25, 1]
				}}
				style={{ willChange: 'transform, opacity' }}
				className="h-full"
			>
				<BentoCard
					eyebrow={eyebrow}
					title={title}
					description={description}
					className="h-full"

					fade={fade}
					graphic={
						<motion.div
							initial={{ scale: 1.1, y: 15 }}
							animate={isInView ? { scale: 1, y: 0 } : { scale: 1.1, y: 15 }}
							transition={{
								duration: 0.7,
								delay: delay + 0.1,
								ease: [0.25, 0.1, 0.25, 1]
							}}
						>
							{graphic}
						</motion.div>
					}
				/>
			</motion.div>
		</div>
	)
}
