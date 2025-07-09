import type { ImageField } from '@agility/nextjs/types'
import { clsx } from 'clsx'

interface GradientProps {
  className?: string
  backgroundType?: string
  backgroundImage?: ImageField
  children?: React.ReactNode
}

export const Gradient = ({
  className,
  backgroundType,
  backgroundImage,
  children
}: GradientProps) => {

  if (backgroundType !== "background-image") {
    const gradientColors = backgroundType || "yellow-pink"
    return (
      <div
        className={clsx(
          className,
          (!gradientColors || gradientColors == "yellow-pink") ? 'bg-linear-115 from-[#fff1be] from-28% via-[#ee87cb] via-70% to-[#b060ff] sm:bg-linear-145' :
            gradientColors == "3-blues" ? 'bg-linear-115 from-[#00e5ff] from-28% via-[#4444AB] via-70% to-[#000985] sm:bg-linear-145' :
              gradientColors == "green-blue-yellow" ? 'bg-linear-115 from-[#2A7B9B] from-28% via-[#57C785] via-70% to-[#EDDD53] sm:bg-linear-145' :
                gradientColors == "3-reds" ? 'bg-linear-115 from-[#EDBBBB] from-28% via-[#CF1D90] via-70% to-[#FF0008] sm:bg-linear-145' :
                  gradientColors == "grays" ? 'bg-linear-115 from-[#f8f9fa] from-28% via-[#adb5bd] via-70% to-[#343a40] sm:bg-linear-145' : "",
        )}
      >{children}</div>
    )
  } else {
    return (
      <div
        className={className}
        style={{
          backgroundImage: `url(${backgroundImage?.url}?format=auto&w=2200)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed',
        }}
      >{children}</div>
    )
  }
}

export function GradientBackground() {
  return (
    <div className="relative mx-auto max-w-7xl">
      <div
        className={clsx(
          'absolute -top-44 -right-60 h-60 w-xl transform-gpu md:right-0',
          'bg-linear-115 from-[#fff1be] from-28% via-[#ee87cb] via-70% to-[#b060ff]',
          'rotate-[-10deg] rounded-full blur-3xl',
        )}
      />
    </div>
  )
}
