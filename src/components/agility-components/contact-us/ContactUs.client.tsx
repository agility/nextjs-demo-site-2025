'use client'

import { useState } from 'react'
import { Button } from '@/components/button'
import { clsx } from 'clsx'

interface FormData {
	firstName: string
	lastName: string
	email: string
	phone: string
	message: string
}

interface FormState {
	status: 'idle' | 'loading' | 'success' | 'error'
	errors: Partial<FormData>
}

interface ContactUsClientProps {
	submitURL: string
	successMessage: string
	errorMessage: string
	loadingMessage: string
}

export function ContactUsClient({ submitURL, successMessage, errorMessage, loadingMessage }: ContactUsClientProps) {
	const [formData, setFormData] = useState<FormData>({
		firstName: '',
		lastName: '',
		email: '',
		phone: '',
		message: ''
	})
	
	const [formState, setFormState] = useState<FormState>({
		status: 'idle',
		errors: {}
	})

	const validateForm = (): boolean => {
		const errors: Partial<FormData> = {}
		
		if (!formData.firstName.trim()) {
			errors.firstName = 'First name is required'
		}
		
		if (!formData.lastName.trim()) {
			errors.lastName = 'Last name is required'
		}
		
		if (!formData.email.trim()) {
			errors.email = 'Email is required'
		} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
			errors.email = 'Please enter a valid email address'
		}
		
		if (!formData.message.trim()) {
			errors.message = 'Message is required'
		}

		setFormState(prev => ({ ...prev, errors }))
		return Object.keys(errors).length === 0
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		
		if (!validateForm()) {
			return
		}

		setFormState({ status: 'loading', errors: {} })

		try {
			const response = await fetch(submitURL, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(formData),
			})

			if (response.ok) {
				setFormState({ status: 'success', errors: {} })
				setFormData({
					firstName: '',
					lastName: '',
					email: '',
					phone: '',
					message: ''
				})
			} else {
				throw new Error('Form submission failed')
			}
		} catch (error) {
			setFormState({ status: 'error', errors: {} })
		}
	}

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target
		setFormData(prev => ({ ...prev, [name]: value }))
		
		// Clear specific field error when user starts typing
		if (formState.errors[name as keyof FormData]) {
			setFormState(prev => ({
				...prev,
				errors: { ...prev.errors, [name]: undefined }
			}))
		}
	}

	if (formState.status === 'success') {
		return (
			<div className="rounded-2xl bg-green-50 dark:bg-green-900/20 p-6 border border-green-200 dark:border-green-800">
				<div className="flex">
					<div className="flex-shrink-0">
						<svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
							<path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.236 4.53L7.53 10.53a.75.75 0 00-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
						</svg>
					</div>
					<div className="ml-3">
						<p className="text-sm font-medium text-green-800 dark:text-green-200">
							{successMessage}
						</p>
					</div>
				</div>
			</div>
		)
	}

	return (
		<form onSubmit={handleSubmit} className="space-y-6">
			{formState.status === 'error' && (
				<div className="rounded-2xl bg-red-50 dark:bg-red-900/20 p-6 border border-red-200 dark:border-red-800">
					<div className="flex">
						<div className="flex-shrink-0">
							<svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
								<path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
							</svg>
						</div>
						<div className="ml-3">
							<p className="text-sm font-medium text-red-800 dark:text-red-200">
								{errorMessage}
							</p>
						</div>
					</div>
				</div>
			)}

			<div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
				<div>
					<label htmlFor="firstName" className="block text-sm font-semibold leading-6 text-gray-900 dark:text-gray-100">
						First name *
					</label>
					<div className="mt-2.5">
						<input
							type="text"
							name="firstName"
							id="firstName"
							value={formData.firstName}
							onChange={handleChange}
							className={clsx(
								"block w-full rounded-lg border-0 px-3.5 py-2 text-gray-900 dark:text-gray-100 shadow-sm ring-1 ring-inset placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 bg-white dark:bg-gray-800 transition-colors",
								formState.errors.firstName
									? "ring-red-300 dark:ring-red-700 focus:ring-red-500 dark:focus:ring-red-400"
									: "ring-gray-300 dark:ring-gray-600 focus:ring-indigo-600 dark:focus:ring-indigo-400"
							)}
							placeholder="First name"
						/>
						{formState.errors.firstName && (
							<p className="mt-2 text-sm text-red-600 dark:text-red-400">{formState.errors.firstName}</p>
						)}
					</div>
				</div>
				
				<div>
					<label htmlFor="lastName" className="block text-sm font-semibold leading-6 text-gray-900 dark:text-gray-100">
						Last name *
					</label>
					<div className="mt-2.5">
						<input
							type="text"
							name="lastName"
							id="lastName"
							value={formData.lastName}
							onChange={handleChange}
							className={clsx(
								"block w-full rounded-lg border-0 px-3.5 py-2 text-gray-900 dark:text-gray-100 shadow-sm ring-1 ring-inset placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 bg-white dark:bg-gray-800 transition-colors",
								formState.errors.lastName
									? "ring-red-300 dark:ring-red-700 focus:ring-red-500 dark:focus:ring-red-400"
									: "ring-gray-300 dark:ring-gray-600 focus:ring-indigo-600 dark:focus:ring-indigo-400"
							)}
							placeholder="Last name"
						/>
						{formState.errors.lastName && (
							<p className="mt-2 text-sm text-red-600 dark:text-red-400">{formState.errors.lastName}</p>
						)}
					</div>
				</div>
			</div>
			
			<div>
				<label htmlFor="email" className="block text-sm font-semibold leading-6 text-gray-900 dark:text-gray-100">
					Email *
				</label>
				<div className="mt-2.5">
					<input
						type="email"
						name="email"
						id="email"
						value={formData.email}
						onChange={handleChange}
						className={clsx(
							"block w-full rounded-lg border-0 px-3.5 py-2 text-gray-900 dark:text-gray-100 shadow-sm ring-1 ring-inset placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 bg-white dark:bg-gray-800 transition-colors",
							formState.errors.email
								? "ring-red-300 dark:ring-red-700 focus:ring-red-500 dark:focus:ring-red-400"
								: "ring-gray-300 dark:ring-gray-600 focus:ring-indigo-600 dark:focus:ring-indigo-400"
						)}
						placeholder="Email address"
					/>
					{formState.errors.email && (
						<p className="mt-2 text-sm text-red-600 dark:text-red-400">{formState.errors.email}</p>
					)}
				</div>
			</div>
			
			<div>
				<label htmlFor="phone" className="block text-sm font-semibold leading-6 text-gray-900 dark:text-gray-100">
					Phone number
				</label>
				<div className="mt-2.5">
					<input
						type="tel"
						name="phone"
						id="phone"
						value={formData.phone}
						onChange={handleChange}
						className="block w-full rounded-lg border-0 px-3.5 py-2 text-gray-900 dark:text-gray-100 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-600 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:focus:ring-indigo-400 sm:text-sm sm:leading-6 bg-white dark:bg-gray-800 transition-colors"
						placeholder="Phone number"
					/>
				</div>
			</div>
			
			<div>
				<label htmlFor="message" className="block text-sm font-semibold leading-6 text-gray-900 dark:text-gray-100">
					Message *
				</label>
				<div className="mt-2.5">
					<textarea
						name="message"
						id="message"
						rows={4}
						value={formData.message}
						onChange={handleChange}
						className={clsx(
							"block w-full rounded-lg border-0 px-3.5 py-2 text-gray-900 dark:text-gray-100 shadow-sm ring-1 ring-inset placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 bg-white dark:bg-gray-800 transition-colors resize-none",
							formState.errors.message
								? "ring-red-300 dark:ring-red-700 focus:ring-red-500 dark:focus:ring-red-400"
								: "ring-gray-300 dark:ring-gray-600 focus:ring-indigo-600 dark:focus:ring-indigo-400"
						)}
						placeholder="Tell us about your project..."
					/>
					{formState.errors.message && (
						<p className="mt-2 text-sm text-red-600 dark:text-red-400">{formState.errors.message}</p>
					)}
				</div>
			</div>
			
			<div>
				<Button 
					type="submit"
					disabled={formState.status === 'loading'}
					className="w-full justify-center disabled:opacity-50"
				>
					{formState.status === 'loading' ? loadingMessage : 'Send message'}
				</Button>
			</div>
		</form>
	)
}
