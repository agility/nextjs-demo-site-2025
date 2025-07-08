'use client'

import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@headlessui/react'
import { Bars2Icon } from '@heroicons/react/24/solid'
import { motion } from "motion/react"
import { Link } from '../link'
import { Logo } from '../logo'
import { PlusGrid, PlusGridItem, PlusGridRow } from '../plus-grid'
import type { IHeaderData } from '@/lib/cms-content/getHeaderContent'
import { DesktopNav } from './desktop-nav'
import { MobileNav } from './mobile-nav'
import { BannerLink } from './banner-link'
import { useState } from 'react'

const links = [
  { href: '/pricing', label: 'Pricing' },
  { href: '/company', label: 'Company' },
  { href: '/blog', label: 'Blog' },
  { href: '/login', label: 'Login' },
]

// The links shown in the navigation

interface Props {
  header: IHeaderData
}

export function Navbar({ header }: Props) {

  const [showMobileNav, setShowMobileNav] = useState(false)

  return (
    <>
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
                <div className="hidden lg:block">
                  <BannerLink
                    href={header.bannerLink.href}
                    text={header.bannerLink.text}
                    target={header.bannerLink.target}
                  />
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
    </>
  )
}


