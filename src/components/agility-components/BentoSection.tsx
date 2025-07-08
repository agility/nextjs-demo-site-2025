import { getContentItem } from "@/lib/cms/getContentItem";
import type { ContentItem, ImageField, UnloadedModuleProps } from "@agility/nextjs";
import { Container } from "../container";
import { Keyboard } from "../keyboard";
import { LogoCluster } from "../logo-cluster";
import { Map } from "../map";
import { Subheading, Heading } from "../text";
import { getContentList } from "@/lib/cms/getContentList";
import { AnimatedBentoCard } from "../animated-bento-card";

interface IBentoSection {
	subheading: string
	heading: string
	bentoCards: { referencename: string }
}

interface IBentoCard {
	eyebrow: string
	title: string
	description: string
	graphic: ImageField
}

export const BentoSection = async ({ module, languageCode }: UnloadedModuleProps) => {
	const {
		fields: {
			subheading,
			heading,
			bentoCards: { referencename: cardsReferenceName },
		},
		contentID,
	} = await getContentItem<IBentoSection>({
		contentID: module.contentid,
		languageCode,
	})

	//now go get the bento cards
	let bentoCards = await getContentList({
		referenceName: cardsReferenceName,
		languageCode,
		take: 20, // adjust as needed
	})

	return (
		<Container className="mt-20" data-agility-component={contentID}>
			<Subheading data-agility-field="subheading">{subheading}</Subheading>
			<Heading as="h3" className="mt-2 max-w-3xl" data-agility-field="heading">
				{heading}
			</Heading>

			<div className="mt-10 grid grid-cols-1 gap-4 sm:mt-16 lg:grid-cols-6 lg:grid-rows-2">
				{bentoCards.items.map((card: any, index: number) => {
					const {
						fields: { eyebrow, title, description, graphic },
						contentID
					} = card as ContentItem<IBentoCard>

					// Calculate grid classes based on card position
					const itemsCount = bentoCards.items.length;
					const isFirst = index === 0;
					const isLast = index === itemsCount - 1;
					const isSecond = index === 1;
					const isEven = itemsCount % 2 === 0;

					// Determine appropriate classes based on position
					let positionClasses = '';

					if (itemsCount <= 2) {
						// If we only have 1 or 2 items, make them span 3 columns each
						positionClasses = isFirst
							? "lg:col-span-3 lg:rounded-tl-4xl"
							: "lg:col-span-3 lg:rounded-tr-4xl";
					} else if (index < 2) {
						// First row - large cards (3 columns each)
						positionClasses = isFirst
							? "lg:col-span-3 lg:rounded-tl-4xl"
							: "lg:col-span-3 lg:rounded-tr-4xl";
					} else {
						// Second row - smaller cards (2 columns each)
						if (isLast && !isEven && index % 3 === 2) {
							// Last card in an odd-count collection (needing special treatment)
							positionClasses = "lg:col-span-2 lg:rounded-br-4xl";
						} else if (index === 2) {
							// First card in second row
							positionClasses = "lg:col-span-2 lg:rounded-bl-4xl";
						} else if (isLast && (index === 4 || (itemsCount === 3 && index === 2))) {
							// Last card in the grid
							positionClasses = "lg:col-span-2 lg:rounded-br-4xl";
						} else {
							// Middle card in second row
							positionClasses = "lg:col-span-2";
						}
					}

					// Mobile specific classes
					const mobileClasses = isFirst
						? "max-lg:rounded-t-4xl"
						: (isLast ? "max-lg:rounded-b-4xl" : "");

					// Animation delay based on index - stagger for visual interest
					// Different delays for different rows to create a pleasing effect
					const isFirstRow = index < 2;
					const delay = 0.1 + (isFirstRow ? index * 0.05 : (index - 2) * 0.05 + 0.1);

					return (
						<AnimatedBentoCard
							key={contentID}
							eyebrow={eyebrow}
							title={title}
							description={description}
							className={`${positionClasses} ${mobileClasses}`}
							delay={delay}
							graphic={
								<div
									className="h-80 bg-cover bg-center"
									style={{ backgroundImage: `url(${graphic.url})` }}
								/>
							}
							fade={['bottom']}
						/>
					)
				})}
			</div>
		</Container>
	)
}

