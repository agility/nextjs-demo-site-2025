import { Container } from '@/components/container'
import { GradientBackground } from '@/components/gradient'
import { Navbar } from '@/components/header/navbar'
import '@/styles/tailwind.css'
import { ChevronRightIcon } from '@heroicons/react/24/solid'

import type { Metadata } from 'next'
import Link from 'next/link'
import type React from 'react'

import { getHeaderContent } from "@/lib/cms-content/getHeaderContent"
import { getAgilityContext } from '@/lib/cms/getAgilityContext'

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


  // get the header content
  const { locale, sitemap } = await getAgilityContext()
  const header = await getHeaderContent({ sitemap, locale })

  return (
    <html lang="en">
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
      </head>
      <body className="text-gray-950 antialiased">
        <main className="overflow-hidden">
          <GradientBackground />
          <Container>
            {header &&
              <Navbar header={header} />
            }
          </Container>
          {children}


        </main>

      </body>
    </html>
  )
}
