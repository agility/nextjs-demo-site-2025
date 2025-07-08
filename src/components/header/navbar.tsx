'use client'

import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@headlessui/react'
import { Bars2Icon, ChevronRightIcon } from '@heroicons/react/24/solid'
import { motion } from "motion/react"
import { Link } from '../link'
import { Logo } from '../logo'
import { PlusGrid, PlusGridItem, PlusGridRow } from '../plus-grid'
import type { IHeaderData } from '@/lib/cms-content/getHeaderContent'
import { DesktopNav } from './desktop-nav'
import { MobileNav } from './mobile-nav'
import { useState } from 'react'

const links = [
  { href: '/pricing', label: 'Pricing' },
  { href: '/company', label: 'Company' },
  { href: '/blog', label: 'Blog' },
  { href: '/login', label: 'Login' },
]



interface Props {
  header: IHeaderData
}

export function Navbar({ header }: Props) {

  const [showMobileNav, setShowMobileNav] = useState(false)

  return (
    <header className="pt-12 sm:pt-16 z-10 relative">
      <PlusGrid>
        <PlusGridRow className="relative flex justify-between">
          <div className="relative flex gap-6">
            <PlusGridItem className="p-3">
              <Link href="/" title="Home" className='flex items-center gap-2 text-gray-900 hover:text-gray-800 text-xl'>
                <img src={header.logo.url} alt={header.siteName} className="h-9 hover:animate-spin" />
                <span >{header.siteName}</span>
              </Link>
            </PlusGridItem>
            {header.bannerLink && (
              <div className="relative hidden items-center py-3 lg:flex">
                <Link
                  href={header.bannerLink.href}
                  target={header.bannerLink.target}
                  className="flex items-center gap-1 rounded-full hover:text-shadow-xs bg-gray-900/20 px-3 py-0.5 text-sm/6 font-medium text-white data-hover:bg-gray-950/30 transition-all"
                >
                  {header.bannerLink.text}
                  <ChevronRightIcon className="size-4" />
                </Link>
              </div>
            )}
          </div>
          <DesktopNav links={header.links} />
          <button
            className="flex size-12 items-center justify-center self-center rounded-lg data-hover:bg-black/5 lg:hidden"
            aria-label="Open main menu"
            onClick={() => setShowMobileNav(!showMobileNav)}
          >
            <Bars2Icon className="size-6" />
          </button>
        </PlusGridRow>
      </PlusGrid>
      <MobileNav links={header.links}
        showMobileNav={showMobileNav}
        onClose={() => setShowMobileNav(false)} />
    </header>
  )
}


