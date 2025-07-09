import * as Headless from '@headlessui/react'
import { clsx } from 'clsx'
import { Link } from './link'

const variants = {
  primary: clsx(
    'inline-flex items-center justify-center px-4 py-[calc(--spacing(2)-1px)]',
    'rounded-full border border-transparent bg-gray-950 dark:bg-gray-100 shadow-md',
    'text-base font-medium whitespace-nowrap text-white dark:text-gray-950',
    'data-disabled:bg-gray-950 dark:data-disabled:bg-gray-100 data-disabled:opacity-40 data-hover:bg-gray-800 dark:data-hover:bg-gray-200 transition-colors',
  ),
  secondary: clsx(
    'relative inline-flex items-center justify-center px-4 py-[calc(--spacing(2)-1px)]',
    'rounded-full border border-transparent bg-white/15 dark:bg-white/20 shadow-md ring-1 ring-[#D15052]/15 dark:ring-white/25',
    'after:absolute after:inset-0 after:rounded-full after:shadow-[inset_0_0_2px_1px_#ffffff4d] dark:after:shadow-[inset_0_0_2px_1px_#ffffff80]',
    'text-base font-medium whitespace-nowrap text-gray-950 dark:text-gray-100',
    'data-disabled:bg-white/15 dark:data-disabled:bg-white/10 data-disabled:opacity-40 data-hover:bg-white/40 dark:data-hover:bg-white/30 transition-colors',
  ),
  outline: clsx(
    'inline-flex items-center justify-center px-2 py-[calc(--spacing(1.5)-1px)]',
    'rounded-lg border border-transparent shadow-sm ring-1 ring-black/10 dark:ring-white/20',
    'text-sm font-medium whitespace-nowrap text-gray-950 dark:text-gray-100',
    'data-disabled:bg-transparent data-disabled:opacity-40 data-hover:bg-gray-50 dark:data-hover:bg-gray-800 transition-colors',
  ),
}

type ButtonProps = {
  variant?: keyof typeof variants
} & (
    | React.ComponentPropsWithoutRef<typeof Link>
    | (Headless.ButtonProps & { href?: undefined })
  )

export function Button({
  variant = 'primary',
  className,
  ...props
}: ButtonProps) {
  className = clsx(className, variants[variant])

  if (typeof props.href === 'undefined') {
    return <Headless.Button {...props} className={className} />
  }

  return <Link {...props} className={className} />
}
