import { Button } from '../button'
import { Subheading } from '../text'
import type { IFooter } from '@/lib/cms-content/getFooterContent'

interface CallToActionProps {
	footerData: IFooter
}

export function CallToAction({ footerData }: CallToActionProps) {
	return (
		<div className="relative pt-20 pb-16 text-center sm:py-24">
			<hgroup>
				<Subheading>{footerData.ctaSubheading}</Subheading>
				<p className="mt-6 text-3xl font-medium tracking-tight text-gray-950 dark:text-gray-50 sm:text-5xl">
					{footerData.ctaHeading}
				</p>
			</hgroup>
			<p className="mx-auto mt-6 max-w-xs text-sm/6 text-gray-500 dark:text-gray-400">
				{footerData.ctaDescription}
			</p>
			<div className="mt-6">
				<Button className="w-full sm:w-auto" href={footerData.ctaCTA.href}>
					{footerData.ctaCTA.text}
				</Button>
			</div>
		</div>
	)
}
