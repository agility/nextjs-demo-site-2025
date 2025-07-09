import type { IFooter } from '@/lib/cms-content/getFooterContent'

interface CopyrightProps {
	footerData: IFooter
	siteName: string
}

export function Copyright({ footerData, siteName }: CopyrightProps) {
	const currentYear = new Date().getFullYear()

	return (
		<div className="text-sm/6 text-gray-950 dark:text-gray-50">
			{`© ${currentYear} ${footerData.copyright}`}
		</div>
	)
}
