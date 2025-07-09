'use client'

import { ChevronRightIcon } from '@heroicons/react/24/solid'
import { Link } from '../link'

// CSS keyframes style for the shine effect
// The technique is from https://ysfkaya.com/shine-text-effect-in-css-and-tailwind-css
const shineStyle = `
  @keyframes shine {
    from {
      left: -100%;
    }
    to {
      left: 100%;
    }
  }

  .shine-effect {
    position: relative;
    overflow: hidden;
  }

  .shine-effect::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 50%;
    height: 100%;
    background: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0),
      rgba(255, 255, 255, 0.6),
      rgba(255, 255, 255, 0)
    );
    transform: skewX(-25deg);
    animation: shine 5s infinite ease-in-out;
    pointer-events: none;
  }
`;

interface BannerLinkProps {
  href: string;
  text: string;
  target?: string;
}

export function BannerLink({ href, text, target }: BannerLinkProps) {
  return (
    <div className="relative items-center py-3 flex">
      <style jsx>{shineStyle}</style>
      <Link
        href={href}
        target={target}
        className="flex items-center gap-1 rounded-full hover:text-shadow-xs bg-gray-900/50 dark:bg-gray-700/50 px-3 py-0.5 text-sm/6 font-medium text-white dark:text-gray-200 data-hover:bg-gray-950/30 dark:data-hover:bg-gray-600/30 transition-all shine-effect"
      >
        {text}
        <ChevronRightIcon className="size-4" />
      </Link>
    </div>
  );
}
