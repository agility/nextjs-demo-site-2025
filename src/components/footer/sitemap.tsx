import { Link } from '../link'
import type { IFooter } from '@/lib/cms-content/getFooterContent'

function SitemapHeading({ children }: { children: React.ReactNode }) {
	return <h3 className="text-sm/6 font-medium text-gray-950/50">{children}</h3>
}

function SitemapLinks({ children }: { children: React.ReactNode }) {
	return <ul className="mt-6 space-y-4 text-sm/6">{children}</ul>
}

function SitemapLink(props: React.ComponentPropsWithoutRef<typeof Link>) {
	return (
		<li>
			<Link
				{...props}
				className="font-medium text-gray-950 data-hover:text-gray-950/75"
			/>
		</li>
	)
}

interface SitemapProps {
	footerData: IFooter
}

export function Sitemap({ footerData }: SitemapProps) {
	return (
		<>
			<div>
				<SitemapHeading>{footerData.col1Heading}</SitemapHeading>
				<SitemapLinks>
					{footerData.col1Links.map((link, i) => (
						<SitemapLink key={`col1-${i}`} href={link.link.href}>
							{link.link.text}
						</SitemapLink>
					))}
				</SitemapLinks>
			</div>
			<div>
				<SitemapHeading>{footerData.col2Heading}</SitemapHeading>
				<SitemapLinks>
					{footerData.col2Links.map((link, i) => (
						<SitemapLink key={`col2-${i}`} href={link.link.href}>
							{link.link.text}
						</SitemapLink>
					))}
				</SitemapLinks>
			</div>
			<div>
				<SitemapHeading>{footerData.col3Heading}</SitemapHeading>
				<SitemapLinks>
					{footerData.col3Links.map((link, i) => (
						<SitemapLink key={`col3-${i}`} href={link.link.href}>
							{link.link.text}
						</SitemapLink>
					))}
				</SitemapLinks>
			</div>
			<div>
				<SitemapHeading>{footerData.col4Heading}</SitemapHeading>
				<SitemapLinks>
					{footerData.col4Links.map((link, i) => (
						<SitemapLink key={`col4-${i}`} href={link.link.href}>
							{link.link.text}
						</SitemapLink>
					))}
				</SitemapLinks>
			</div>
		</>
	)
}
