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
          (!gradientColors || gradientColors == "yellow-pink") ?
            'bg-linear-115 from-[#fff1be] from-28% via-[#ee87cb] via-70% to-[#b060ff] dark:from-[#8a7a3b] dark:via-[#a3428a] dark:to-[#6a29ab] sm:bg-linear-145' :
            gradientColors == "3-blues" ?
              'bg-linear-115 from-[#00e5ff] from-28% via-[#4444AB] via-70% to-[#000985] dark:from-[#00a9bd] dark:via-[#373782] dark:to-[#000761] sm:bg-linear-145' :
              gradientColors == "green-blue-yellow" ?
                'bg-linear-115 from-[#2A7B9B] from-28% via-[#57C785] via-70% to-[#EDDD53] dark:from-[#1d5469] dark:via-[#408c5f] dark:to-[#a69b37] sm:bg-linear-145' :
                gradientColors == "3-reds" ?
                  'bg-linear-115 from-[#EDBBBB] from-28% via-[#CF1D90] via-70% to-[#FF0008] dark:from-[#a98383] dark:via-[#8f1463] dark:to-[#b80006] sm:bg-linear-145' :
                  gradientColors == "grays" ?
                    'bg-linear-115 from-white/90 from-28% via-gray-300/80 via-70% to-gray-600/50 dark:from-white/15 dark:via-gray-500/25 dark:to-gray-600/50 backdrop-blur-[2px] sm:bg-linear-145' : "",
        )}
      >{children}</div>
    )
  } else {
    return (
      <>
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
        {/* Overlay for better contrast with the background image in both modes */}
        <div className="absolute inset-0 z-0 bg-white/10 dark:bg-black/30 backdrop-blur-[1px]" />
        <div className="relative z-10">{children}</div>
      </>

    )
  }
}

