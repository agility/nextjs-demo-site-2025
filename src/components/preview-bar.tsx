"use client"

import clsx from "clsx"
import Image from "next/image"
import React, { useState, useEffect, useRef } from "react"
import { FaInfoCircle, FaGithub, FaEye, FaTimes, FaChevronDown, FaChevronUp, FaSpinner } from "react-icons/fa"
import { Button } from "./button"
import type { IAudience } from "@/lib/types/IAudience"
import type { IRegion } from "@/lib/types/IRegion"
import { useAudienceRegionParams } from "@/lib/hooks/useAudienceRegionParams"


interface Props {
	isPreview: boolean | undefined
	isDevelopmentMode: boolean | undefined
	audiences?: IAudience[]
	regions?: IRegion[]
}

/**
 * This is a preview bar that is enabled by default to handle viewing content in preview & live mode, remove this for production use.
 **/
const PreviewBar = ({ isPreview, isDevelopmentMode, audiences = [], regions = [] }: Props) => {
	const [open, setOpen] = useState(false)
	const [showAudienceDropdown, setShowAudienceDropdown] = useState(false)
	const [showRegionDropdown, setShowRegionDropdown] = useState(false)
	const audienceDropdownRef = useRef<HTMLDivElement>(null)
	const regionDropdownRef = useRef<HTMLDivElement>(null)

	// Use the custom hook for managing audience/region query params
	const {
		selectedAudience,
		selectedRegion,
		selectedAudienceName,
		selectedRegionName,
		setAudience,
		setRegion,
		clearAll,
		hasSelection,
		displayName
	} = useAudienceRegionParams(audiences, regions)

	// Close dropdowns when clicking outside
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (audienceDropdownRef.current && !audienceDropdownRef.current.contains(event.target as Node)) {
				setShowAudienceDropdown(false)
			}
			if (regionDropdownRef.current && !regionDropdownRef.current.contains(event.target as Node)) {
				setShowRegionDropdown(false)
			}
		}

		document.addEventListener('mousedown', handleClickOutside)
		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [])


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
						className={clsx(`cursor-pointer rounded-full shadow-lg bg-gray-400 text-white w-10 h-10 flex items-center justify-center border-2 transition-all duration-300 relative overflow-hidden group`,
							`dark:bg-gray-900 hover:scale-110 hover:shadow-xl`,
							`before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:translate-x-[-100%] before:transition-transform before:duration-700 hover:before:translate-x-[100%]`,
							hasSelection
								? 'border-blue-500 dark:border-blue-400'
								: 'border-white dark:border-gray-700'
						)}
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
					<div className="w-[480px] max-w-[95vw] bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 p-6 flex flex-col gap-4 animate-fade-in relative">
						<button onClick={() => setOpen(false)} className="absolute top-3 right-3 rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition"><FaTimes className="w-6 h-6 text-gray-700 dark:text-gray-200" /></button>
						<div className="flex items-center gap-3 mb-2">
							<img src="https://static.agilitycms.com/layout/img/logo-original.svg" alt="Agility CMS" className="h-7" />
							<span className={`text-sm px-3 py-1 rounded font-bold ${isPreview ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'}`}>{isPreview ? 'Preview' : 'Live'}</span>
						</div>


						{/* Audience and Region Pickers */}
						{(audiences.length > 0 || regions.length > 0) && (
							<div className="border-t border-gray-200 dark:border-gray-700 pt-4">
								<h3 className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-3">Preview As</h3>
								<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
									{/* Audience Picker */}
									{audiences.length > 0 && (
										<div className="relative" ref={audienceDropdownRef}>
											<label className="block text-xs font-medium text-gray-600 dark:text-gray-300 mb-1">
												Audience
											</label>
											<button
												className="w-full px-3 py-2 text-left bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center justify-between"
												onClick={() => setShowAudienceDropdown(!showAudienceDropdown)}
											>
												<span className="text-sm text-gray-700 dark:text-gray-200">
													{selectedAudience ? selectedAudience.name : 'All Audiences'}
												</span>
												{showAudienceDropdown ? <FaChevronUp className="w-3 h-3" /> : <FaChevronDown className="w-3 h-3" />}
											</button>
											{showAudienceDropdown && (
												<div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg z-10 max-h-40 overflow-y-auto">
													<button
														className="w-full px-3 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200"
														onClick={() => {
															setAudience(null)
															setShowAudienceDropdown(false)
														}}
													>
														All Audiences
													</button>
													{audiences.map((audience, index) => (
														<button
															key={index}
															className="w-full px-3 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200"
															onClick={() => {
																setAudience(audience)
																setShowAudienceDropdown(false)
															}}
														>
															{audience.name}
														</button>
													))}
												</div>
											)}
										</div>
									)}

									{/* Region Picker */}
									{regions.length > 0 && (
										<div className="relative" ref={regionDropdownRef}>
											<label className="block text-xs font-medium text-gray-600 dark:text-gray-300 mb-1">
												Region
											</label>
											<button
												className="w-full px-3 py-2 text-left bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center justify-between"
												onClick={() => setShowRegionDropdown(!showRegionDropdown)}
											>
												<span className="text-sm text-gray-700 dark:text-gray-200">
													{selectedRegion ? selectedRegion.name : 'All Regions'}
												</span>
												{showRegionDropdown ? <FaChevronUp className="w-3 h-3" /> : <FaChevronDown className="w-3 h-3" />}
											</button>
											{showRegionDropdown && (
												<div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg z-10 max-h-40 overflow-y-auto">
													<button
														className="w-full px-3 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200"
														onClick={() => {
															setRegion(null)
															setShowRegionDropdown(false)
														}}
													>
														All Regions
													</button>
													{regions.map((region, index) => (
														<button
															key={index}
															className="w-full px-3 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200"
															onClick={() => {
																setRegion(region)
																setShowRegionDropdown(false)
															}}
														>
															{region.name}
														</button>
													))}
												</div>
											)}
										</div>
									)}
								</div>

								{/* Current Selection Display */}
								{hasSelection && (
									<div className="mt-3 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
										<div className="flex items-center justify-between">
											<div>
												<div className="text-xs font-medium text-blue-800 dark:text-blue-200 mb-1">Current Preview Context</div>
												<div className="text-sm text-blue-700 dark:text-blue-300">
													{displayName}
												</div>
											</div>
											<button
												onClick={clearAll}
												className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 underline"
											>
												Clear All
											</button>
										</div>
									</div>
								)}
							</div>
						)}

						<div className="flex flex-col gap-3 mt-3">

							<p className="text-base text-gray-700 dark:text-gray-200">
								This website is in <span className="font-bold">{isPreview ? 'Preview' : 'Live'}</span> Mode
							</p>

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
