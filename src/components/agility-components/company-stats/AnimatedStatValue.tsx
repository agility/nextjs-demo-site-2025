'use client'

import { motion, useInView, useMotionValue, useSpring, useTransform } from 'motion/react'
import { useEffect, useRef } from 'react'

interface AnimatedStatValueProps {
	value: string
}

export const AnimatedStatValue = ({ value }: AnimatedStatValueProps) => {
	const ref = useRef(null)
	const isInView = useInView(ref, { once: true, amount: 0.5 })

	// Enhanced regex to find ANY number in the string, including cases like "$70M" or "99.9%"
	const match = value.match(/^([^\d]*)([\d,]+\.?\d*)(.*)$/)

	if (!match) {
		// If no number found, return the original value
		return <span ref={ref}>{value}</span>
	}

	const [, prefix, numberStr, suffix] = match
	const number = parseFloat(numberStr.replace(/,/g, ''))

	// Determine if it's a decimal number
	const decimals = numberStr.includes('.') ? numberStr.split('.')[1].length : 0

	// Check if original had commas to preserve formatting
	const hasCommas = numberStr.includes(',')

	// Adjust animation duration based on number size - smaller numbers get longer animations
	const duration = number < 10 ? 2.5 : number < 100 ? 2.0 : number < 1000 ? 1.5 : 1.0

	const motionValue = useMotionValue(0)
	const spring = useSpring(motionValue, {
		damping: 25,
		stiffness: number < 10 ? 50 : number < 100 ? 75 : 100,
		duration: duration
	})
	const display = useTransform(spring, (num) => {
		const formatted = num.toFixed(decimals)
		// Add commas back if the original had them and the number is >= 1000
		if (hasCommas && num >= 1000) {
			return parseFloat(formatted).toLocaleString('en-US', {
				minimumFractionDigits: decimals,
				maximumFractionDigits: decimals
			})
		}
		return formatted
	})

	useEffect(() => {
		motionValue.set(isInView ? number : 0)
	}, [isInView, number, motionValue])

	return (
		<span ref={ref}>
			{prefix}
			<motion.span>{display}</motion.span>
			{suffix}
		</span>
	)
}
