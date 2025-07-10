
import { BackgroundHero } from "./BackgroundHero";
import { BentoSection } from "./BentoSection";
import { Header } from "./Header";
import { LogoStrip } from "./LogoStrip";
import NoComponentFound from "./NoComponentFound";
import { PostListing } from "./post-listing/PostListing.server";
import PostDetails from "./post-details/PostDetails";
import { PricingCards } from "./pricing/PricingCards";
import { PricingTable } from "./pricing/PricingTable";
import { FrequentlyAskedQuestions } from "./pricing/FrequentlyAskedQuestions";
import { Testimonial } from "./pricing/Testimonial";

import RichTextArea from "./RichTextArea";


// All of the Agility Page Module Components that are in use in this site need to be imported into this index file.
// Place Page Modules in allModules array below, passing in a name and the component.

const allModules = [
	{ name: "RichTextArea", module: RichTextArea },
	{ name: "BackgroundHero", module: BackgroundHero },
	{ name: "BentoSection", module: BentoSection },
	{ name: "Header", module: Header },
	{ name: "LogoStrip", module: LogoStrip },
	{ name: "PostListing", module: PostListing },
	{ name: "PostDetails", module: PostDetails },
	{ name: "PricingCards", module: PricingCards },
	{ name: "PricingTable", module: PricingTable },
	{ name: "FrequentlyAskedQuestions", module: FrequentlyAskedQuestions },
	{ name: "Testimonial", module: Testimonial }
];

/**
 * Get the Agility Component/Module by name.
 * If the component is not found, a default component will be returned.
 * @param moduleName
 * @returns
 */
export const getModule = (moduleName: string): any | null => {

	if (!moduleName) return null;
	const obj = allModules.find(
		(m) => m.name.toLowerCase() === moduleName.toLowerCase()
	);
	if (!obj) return NoComponentFound;
	return obj.module
};
