'use client'

import React from "react"
import { AgilityPic, type ImageField } from "@agility/nextjs"
import { createPostImageTransitionName } from "@/lib/hooks/useViewTransition"
import { unstable_ViewTransition as ViewTransition } from 'react'

interface PostImageProps {
	image: ImageField
	contentID: string | number
	className?: string
}

export const PostImage: React.FC<PostImageProps> = ({
	image,
	contentID,
	className = "mb-10 aspect-3/2 w-full rounded-2xl object-cover shadow-xl dark:grayscale"
}) => {
	return (
		<ViewTransition name={createPostImageTransitionName(contentID)}>
			<AgilityPic
				data-agility-field="image"
				image={image}
				fallbackWidth={800}
				className={className}
			/>
		</ViewTransition>
	)
}
