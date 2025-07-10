import { Container } from '@/components/container'
import { Navbar } from '@/components/header/navbar'
import '@/styles/tailwind.css'
import '@/styles/view-transitions.css'

import type { Metadata } from 'next'
import type React from 'react'

import { getHeaderContent } from "@/lib/cms-content/getHeaderContent"
import { getAgilityContext } from '@/lib/cms/getAgilityContext'

import { getFooterContent } from '@/lib/cms-content/getFooterContent'
import { Footer } from '@/components/footer/footer'
import PreviewBar from '@/components/preview-bar'

export const metadata: Metadata = {
  title: {
    template: '%s - Radiant',
    default: 'Radiant - Close every deal',
  },
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {

  const { locale, isDevelopmentMode, isPreview } = await getAgilityContext()
  // get the header content
  const header = await getHeaderContent({ locale })
  const footer = await getFooterContent({ locale })

  return (
    <html lang="en" className="overflow-x-hidden">
      <head>
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/css?f%5B%5D=switzer@400,500,600,700&amp;display=swap"
        />
        <link
          rel="alternate"
          type="application/rss+xml"
          title="The Radiant Blog"
          href="/blog/feed.xml"
        />
        <meta name="view-transition" content="same-origin" />
      </head>
      <body className="text-gray-950 antialiased overflow-x-hidden dark:bg-black dark:text-gray-200 transition-colors">
        <main>
          {/* <GradientBackground /> */}
          <Container>
            {header &&
              <Navbar header={header} />
            }
          </Container>
          {children}
          {footer && header &&
            <Footer footerData={footer} logo={header.logo} siteName={header.siteName} />
          }

        </main>
        <PreviewBar
          {...{ isDevelopmentMode, isPreview }}
        />
      </body>
    </html>
  )
}
