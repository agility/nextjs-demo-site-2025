import type { ILink } from "@/lib/cms-content/getHeaderContent"
import { DisclosureButton, DisclosurePanel } from "@headlessui/react"
import { Bars2Icon, XMarkIcon } from "@heroicons/react/24/solid"
import { motion, AnimatePresence } from "motion/react"
import Link from "next/link"



interface Props {
	links: ILink[]
	showMobileNav: boolean
	onClose?: () => void
}




export function MobileNav({ links, showMobileNav, onClose }: Props) {


	const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
		// Prevent immediate navigation
		e.preventDefault();

		// Delay the navigation and closing to show the pressed animation
		setTimeout(() => {
			if (onClose) onClose();
			// Navigate after showing the animation
			window.location.href = href;
		}, 400);
	}

	return (
		<>
			{/* Backdrop overlay */}
			<AnimatePresence>
				{showMobileNav && (
					<motion.div
						className="fixed inset-0 bg-black/25 backdrop-blur-sm z-40 lg:hidden"
						initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
						animate={{ opacity: 1, backdropFilter: 'blur(6px)' }}
						exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
						transition={{ duration: 0.3 }}
						onClick={onClose}
					/>
				)}
			</AnimatePresence>

			{/* Navigation panel */}
			<AnimatePresence>
				{showMobileNav && (
					<motion.div
						className="fixed top-0 right-0 h-full z-50 bg-white/90 backdrop-blur-xl shadow-lg w-[250px] lg:hidden"
						initial={{ x: '100%', backdropFilter: 'blur(0px)' }}
						animate={{ x: 0, backdropFilter: 'blur(12px)' }}
						exit={{ x: '100%', backdropFilter: 'blur(0px)' }}
						transition={{ duration: 0.3, ease: 'easeInOut' }}
					>
						<button
							onClick={() => {
								// Delay the close to show the pressed animation
								if (onClose) {
									setTimeout(() => onClose(), 400);
								}
							}}
							className="absolute top-4 right-4 p-2 rounded-full hover:bg-blue-50/70 active:bg-blue-100/80 active:scale-95 transition-all touch-manipulation"
							aria-label="Close navigation"
						>
							<XMarkIcon className="h-6 w-6 text-gray-700" />
						</button>
						<div className="flex flex-col gap-6 py-16 px-6">
							{links.map(({ link }, linkIndex) => (
								<motion.div
									initial={{ opacity: 0, y: -20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{
										duration: 0.3,
										ease: 'easeOut',
										delay: 0.2 + linkIndex * 0.08, // Delay starts after menu opens + staggered for each item
									}}
									key={link.href}
								>
									<Link
										href={link.href}
										target={link.target}
										className="text-base font-medium text-gray-950 block py-2 px-3 -mx-3 rounded-lg hover:bg-blue-50/60 active:bg-blue-100/70 active:scale-97 transition-all touch-manipulation"
										onClick={(e) => handleLinkClick(e, link.href)}
									>
										{link.text}
									</Link>
								</motion.div>
							))}
						</div>

					</motion.div>
				)}
			</AnimatePresence>
		</>
	)
}