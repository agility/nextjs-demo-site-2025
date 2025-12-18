"use client"

import { Switch } from "@headlessui/react";
import { useState, useEffect } from "react";

export const DarkModeToggle = () => {
	const [darkMode, setDarkMode] = useState(false)
	const [isManualOverride, setIsManualOverride] = useState(false)

	useEffect(() => {
		// Check if user has manually set a preference
		const storedOverride = localStorage.getItem('darkModeOverride')
		const darkModePreference = window.matchMedia("(prefers-color-scheme: dark)");

		let initialDarkMode = false
		let hasOverride = false

		if (storedOverride !== null) {
			// User has manually set a preference
			initialDarkMode = storedOverride === 'true'
			hasOverride = true
		} else {
			// Use system preference
			initialDarkMode = darkModePreference.matches
			hasOverride = false
		}

		setDarkMode(initialDarkMode)
		setIsManualOverride(hasOverride)

		// Apply immediately
		document.documentElement.classList.toggle('dark', initialDarkMode)

		function handleSystemPreferenceChange(event: any) {
			// Check if override still exists (user might have cleared it)
			const currentOverride = localStorage.getItem('darkModeOverride')
			if (currentOverride === null) {
				// No override, follow system preference
				setDarkMode(event.matches)
				setIsManualOverride(false)
				document.documentElement.classList.toggle('dark', event.matches)
			}
		}

		// Always listen for system preference changes
		darkModePreference.addEventListener("change", handleSystemPreferenceChange);

		return () => {
			darkModePreference.removeEventListener("change", handleSystemPreferenceChange);
		}

	}, [])

	useEffect(() => {
		// Set the dark mode class on the html element
		document.documentElement.classList.toggle('dark', darkMode)

		// When user manually toggles, mark as override and save
		if (isManualOverride) {
			localStorage.setItem('darkModeOverride', darkMode.toString())
		}
	}, [darkMode, isManualOverride])

	const handleToggle = (checked: boolean) => {
		setDarkMode(checked)
		setIsManualOverride(true)
	}

	return (
		<Switch
			checked={darkMode}
			onChange={handleToggle}
			title="Toggle dark mode"
			className="group relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-gray-300 dark:bg-gray-700 transition-colors duration-200 ease-in-out focus:ring-2 focus:ring-gray-600 focus:ring-offset-2 focus:outline-hidden data-checked:bg-gray-600"
		>
			<span className="sr-only">Toggle dark mode</span>
			<span className="pointer-events-none relative inline-block size-5 transform rounded-full bg-white dark:bg-gray-900 shadow-xs ring-0 transition duration-200 ease-in-out group-data-checked:translate-x-5">
				<span
					aria-hidden="true"
					className="absolute inset-0 flex size-full items-center justify-center transition-opacity duration-200 ease-in group-data-checked:opacity-0 group-data-checked:duration-100 group-data-checked:ease-out"
				>
					{/* LIGHT MODE */}
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
						<path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
					</svg>
				</span>
				<span
					aria-hidden="true"
					className="absolute inset-0 flex size-full items-center justify-center opacity-0 transition-opacity duration-100 ease-out group-data-checked:opacity-100 group-data-checked:duration-200 group-data-checked:ease-in"
				>
					{/* DARK MODE */}
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#ccc" className="size-6">
						<path fillRule="evenodd" d="M9.528 1.718a.75.75 0 0 1 .162.819A8.97 8.97 0 0 0 9 6a9 9 0 0 0 9 9 8.97 8.97 0 0 0 3.463-.69.75.75 0 0 1 .981.98 10.503 10.503 0 0 1-9.694 6.46c-5.799 0-10.5-4.7-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 0 1 .818.162Z" clipRule="evenodd" />
					</svg>


				</span>
			</span>
		</Switch>
	)
}