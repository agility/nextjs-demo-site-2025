import '@/styles/tailwind.css'
import '@/styles/view-transitions.css'

import type { Metadata } from 'next'
import type React from 'react'
import Script from 'next/script'

export const metadata: Metadata = {
  title: {
    template: '%s',
    default: 'Galaxy Tech'
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="overflow-x-hidden">
      <head>
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/css?f%5B%5D=switzer@400,500,600,700&amp;display=swap"
        />
        <meta name="view-transition" content="same-origin" />
      </head>
      <body
        data-agility-guid={process.env.AGILITY_GUID}
        className="text-gray-950 antialiased overflow-x-hidden dark:bg-black dark:text-gray-200 transition-colors">
        <main>
          {children}
        </main>
        {/* Web Studio SDK */}
        <Script src="https://unpkg.com/@agility/web-studio-sdk@latest/dist/index.js" />
      </body>
    </html>
  )
}
