'use client'

export function useViewTransition() {
	const isSupported = typeof document !== 'undefined' && !!document.startViewTransition

	const startViewTransition = (callback: () => void) => {
		if (document.startViewTransition) {
			document.startViewTransition(callback)
		} else {
			callback()
		}
	}

	return {
		isSupported,
		startViewTransition,
	}
}

export function createPostImageTransitionName(contentID: string | number) {
	return `post-image-${contentID}`
}
