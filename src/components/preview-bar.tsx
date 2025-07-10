"use client"

import clsx from "clsx"
import Image from "next/image"
import React, { useState } from "react"
import { FaInfoCircle, FaGithub, FaEye, FaTimes, FaChevronDown, FaChevronUp, FaSpinner } from "react-icons/fa"
import { Button } from "./button"

interface Props {
	isPreview: boolean | undefined
	isDevelopmentMode: boolean | undefined
}

/**
 * This is a preview bar that is enabled by default to handle viewing content in preview & live mode, remove this for production use.
 **/
const PreviewBar = ({ isPreview, isDevelopmentMode }: Props) => {
	const [open, setOpen] = useState(false)


	// handle view function to determine preview / live mode
	const handleView = () => {

		if (isDevelopmentMode) {
			alert("You are currently in Development Mode, Live Mode is unavailable.")
		} else {
			if (!isDevelopmentMode && !isPreview) {
				//TODO: don't allow starting preview mode
			} else {
				//exit preview mode
				window.location.href = `/api/preview/exit?slug=${encodeURIComponent(window.location.pathname)}`

			}
		}
	}

	return (
		<div className="fixed top-[40%] right-0.5 z-50 flex flex-col items-end">
			{/* Collapsed floating button */}
			{!open && (
				<>
					<button
						className={clsx(`cursor-pointer rounded-full shadow-lg bg-gray-400 text-white w-10 h-10 flex items-center justify-center border-2 border-white transition-all duration-300 relative overflow-hidden group`,
							`dark:border-gray-700 dark:bg-gray-900 hover:scale-110 hover:shadow-xl`,
							`before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:translate-x-[-100%] before:transition-transform before:duration-700 hover:before:translate-x-[100%]`)}
						onClick={() => setOpen(true)}
						title={isPreview ? 'Preview Mode' : 'Live Mode'}
					>
						<img src="https://static.agilitycms.com/brand/agility-triangle-yellow.svg" alt="Agility Website | Preview Mode" width={20} height={20} className="w-5 h-5" />

					</button>
					{isPreview && (
						<div className="absolute -top-0.5 p-0.5 -right-0.5 dark:bg-gray-600 bg-gray-200 rounded-full flex items-center justify-center">
							<FaEye className="w-3 h-3 text-gray-500 dark:text-gray-200" />
						</div>
					)}
				</>
			)}

			{/* Expanded toolbar */}
			{open && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
					<div className="w-[420px] max-w-[95vw] bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 p-6 flex flex-col gap-4 animate-fade-in relative">
						<button onClick={() => setOpen(false)} className="absolute top-3 right-3 rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition"><FaTimes className="w-6 h-6 text-gray-700 dark:text-gray-200" /></button>
						<div className="flex items-center gap-3 mb-2">
							<img src="https://static.agilitycms.com/layout/img/logo-original.svg" alt="Agility CMS" className="h-7" />
							<span className={`text-sm px-3 py-1 rounded font-bold ${isPreview ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'}`}>{isPreview ? 'Preview' : 'Live'}</span>
						</div>
						<div className="flex flex-col gap-3">
							<p className="text-base text-gray-700 dark:text-gray-200">
								This website is in <span className="font-bold">{isPreview ? 'Preview' : 'Live'}</span> Mode
							</p>
						</div>
						<div className="flex flex-col gap-3">
							{isPreview &&
								<Button
									variant="outline"
									onClick={handleView}
								>
									Exit Preview
								</Button>
							}
							<div className="flex gap-4 justify-between mt-2">
								<a href="https://agilitycms.com/docs" target="_blank" rel="noreferrer" title="Agility Docs" className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-200 hover:underline"><FaInfoCircle />Agility Docs</a>
								<a href="https://github.com/agility/nextjs-demo-site-2025" target="_blank" rel="noreferrer" title="View on GitHub" className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-200 hover:underline"><FaGithub />View Source on GitHub</a>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	)
}

export default PreviewBar
