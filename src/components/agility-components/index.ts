import NoComponentFound from "./NoComponentFound";
import RichTextArea from "./RichTextArea";


// All of the Agility Page Module Components that are in use in this site need to be imported into this index file.
// Place Page Modules in allModules array below, passing in a name and the component.

const allModules = [
	{ name: "RichTextArea", module: RichTextArea },
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
