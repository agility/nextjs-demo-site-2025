import { Container } from "../../container"

interface ABTestHeroLoadingProps {
	contentID: number
}

/**
 * Loading component that serves as the static shell for PPR.
 * This provides the layout structure while the dynamic content loads.
 */
export const ABTestHeroLoading = ({ contentID }: ABTestHeroLoadingProps) => {
	return (
		<section className="pt-20" data-agility-component={contentID}>
			<Container>
				<div className="grid gap-8 lg:gap-16 lg:grid-cols-2 lg:items-center min-h-[400px]">
					<div className="space-y-4 order-2 lg:order-1">
						{/* Skeleton for heading */}
						<div className="h-12 bg-gray-200 dark:bg-gray-700 rounded w-4/5 animate-pulse"></div>
						{/* Skeleton for description */}
						<div className="space-y-2">
							<div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-full animate-pulse"></div>
							<div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 animate-pulse"></div>
						</div>
						{/* Skeleton for CTA button */}
						<div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-32 animate-pulse"></div>
					</div>
					{/* Skeleton for image */}
					<div className="h-64 bg-gray-200 dark:bg-gray-700 rounded-2xl animate-pulse order-1 lg:order-2"></div>
				</div>
			</Container>
		</section>
	)
}
