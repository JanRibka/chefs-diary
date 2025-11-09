"use client";

import Link from "next/link";
import { GiChefToque, GiScrollQuill } from "react-icons/gi";

export default function SiteLogo({ size }: { size?: number }) {
  const style = size ? { width: `${Math.round(size * 1.2)}px`, height: `${Math.round(size * 0.8)}px` } : undefined;

  return (
    <Link href="/" aria-label="Kuchařův deník - domů" className="flex items-center gap-3">
      <div className="relative shadow-[0_8px_20px_rgba(0,0,0,0.28)]" style={style}>
        <svg
          className="absolute inset-0 w-full h-full block"
          viewBox="0 0 80 64"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="blobGrad" x1="0" y1="0" x2="1" y2="1">
              {/* colors mapped to Tailwind: orange-600, red-600, pink-600 */}
              <stop offset="0%" stopColor="#EA580C" />
              <stop offset="50%" stopColor="#DC2626" />
              <stop offset="100%" stopColor="#DB2777" />
            </linearGradient>
            <filter id="soft" x="-30%" y="-30%" width="160%" height="160%">
              <feDropShadow dx="0" dy="6" stdDeviation="8" floodOpacity="0.22" />
            </filter>
            <filter id="outerGlow" x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur stdDeviation="6" result="b" />
              <feComposite in="b" in2="SourceGraphic" operator="out" result="c" />
              <feColorMatrix type="matrix" values="0 0 0 0 0.05  0 0 0 0 0.02  0 0 0 0 0.01  0 0 0 0.6" />
            </filter>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2.2" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <path
            d="M5 20C5 10 18 5 30 8C45 12 68 5 75 22C82 39 68 58 48 57C30 56 12 54 8 40C5 30 5 30 5 20Z"
            fill="url(#blobGrad)"
            filter="url(#soft) url(#outerGlow)"
          />
        </svg>

        <div className="relative z-10 flex items-center justify-center w-full h-full drop-shadow-[0_6px_12px_rgba(0,0,0,0.4)]">
          <GiScrollQuill className="w-8 h-8 text-white" />
          <GiChefToque className="w-8 h-8 text-white -ml-1" />
        </div>
      </div>
      <div className="flex flex-col">
        <span className="font-black text-xl leading-tight tracking-wide bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 bg-clip-text text-transparent">
          KUCHAŘŮV
        </span>
        <span className="font-bold text-base leading-tight tracking-wide bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 bg-clip-text text-transparent -mt-1">
          DENÍK
        </span>
      </div>
    </Link>
  );
}
