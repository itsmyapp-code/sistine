import React from 'react';

interface LogoProps {
  className?: string;
  variant?: 'light' | 'dark' | 'circle';
}

export default function Logo({ className = "h-16 w-auto", variant = 'dark' }: LogoProps) {
  const isLight = variant === 'light';
  const strokeColor = isLight ? '#ffffff' : '#1e293b';
  const textColor = isLight ? '#ffffff' : '#1e293b';
  const subtitleColor = isLight ? '#cbd5e1' : '#64748b';

  if (variant === 'circle') {
    return (
      <div className="bg-white rounded-full w-28 h-28 sm:w-36 sm:h-36 mx-auto flex flex-col items-center justify-center shadow-xl border border-slate-100 p-4 select-none">
        <svg viewBox="0 0 200 130" className="w-full h-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Architectural Dome Illustration */}
          <g stroke="#2c3e50" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none">
            {/* Main Center Dome */}
            <path d="M 100 15 L 100 8 M 98 8 L 102 8" />
            <path d="M 100 15 C 80 16 70 38 70 60 L 130 60 C 130 38 120 16 100 15 Z" />
            <path d="M 80 25 C 75 35 74 48 74 60" />
            <path d="M 90 18 C 87 30 86 45 86 60" />
            <path d="M 100 15 L 100 60" />
            <path d="M 110 18 C 113 30 114 45 114 60" />
            <path d="M 120 25 C 125 35 126 48 126 60" />
            {/* Dome Drum / Windows */}
            <rect x="68" y="60" width="64" height="12" />
            <line x1="78" y1="60" x2="78" y2="72" />
            <line x1="88" y1="60" x2="88" y2="72" />
            <line x1="100" y1="60" x2="100" y2="72" />
            <line x1="112" y1="60" x2="112" y2="72" />
            <line x1="122" y1="60" x2="122" y2="72" />
            {/* Left Pavilion */}
            <path d="M 50 40 L 50 35 M 48 35 L 52 35" />
            <path d="M 50 40 C 40 42 35 52 35 65 L 65 65 C 65 52 60 42 50 40 Z" />
            <rect x="34" y="65" width="32" height="8" />
            {/* Right Pavilion */}
            <path d="M 150 40 L 150 35 M 148 35 L 152 35" />
            <path d="M 150 40 C 140 42 135 52 135 65 L 165 65 C 165 52 160 42 150 40 Z" />
            <rect x="134" y="65" width="32" height="8" />
            {/* Base Entablature */}
            <line x1="20" y1="73" x2="180" y2="73" strokeWidth="2.5" />
          </g>

          {/* Typography */}
          <text
            x="100"
            y="104"
            textAnchor="middle"
            fontFamily="'Cinzel', 'Playfair Display', Georgia, serif"
            fontSize="26"
            fontWeight="600"
            letterSpacing="5"
            fill="#2c3e50"
          >
            SISTINE
          </text>
          <text
            x="100"
            y="120"
            textAnchor="middle"
            fontFamily="system-ui, -apple-system, sans-serif"
            fontSize="6.5"
            fontWeight="500"
            letterSpacing="2.5"
            fill="#64748b"
          >
            DECORATE • RESTORE • REFURBISH
          </text>
        </svg>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <svg viewBox="0 0 200 130" className="h-12 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g stroke={strokeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none">
          <path d="M 100 15 L 100 8 M 98 8 L 102 8" />
          <path d="M 100 15 C 80 16 70 38 70 60 L 130 60 C 130 38 120 16 100 15 Z" />
          <path d="M 80 25 C 75 35 74 48 74 60" />
          <path d="M 90 18 C 87 30 86 45 86 60" />
          <path d="M 100 15 L 100 60" />
          <path d="M 110 18 C 113 30 114 45 114 60" />
          <path d="M 120 25 C 125 35 126 48 126 60" />
          <rect x="68" y="60" width="64" height="12" />
          <line x1="78" y1="60" x2="78" y2="72" />
          <line x1="88" y1="60" x2="88" y2="72" />
          <line x1="100" y1="60" x2="100" y2="72" />
          <line x1="112" y1="60" x2="112" y2="72" />
          <line x1="122" y1="60" x2="122" y2="72" />
          <path d="M 50 40 L 50 35 M 48 35 L 52 35" />
          <path d="M 50 40 C 40 42 35 52 35 65 L 65 65 C 65 52 60 42 50 40 Z" />
          <rect x="34" y="65" width="32" height="8" />
          <path d="M 150 40 L 150 35 M 148 35 L 152 35" />
          <path d="M 150 40 C 140 42 135 52 135 65 L 165 65 C 165 52 160 42 150 40 Z" />
          <rect x="134" y="65" width="32" height="8" />
          <line x1="20" y1="73" x2="180" y2="73" strokeWidth="2.5" />
        </g>
        <text
          x="100"
          y="104"
          textAnchor="middle"
          fontFamily="'Cinzel', 'Playfair Display', Georgia, serif"
          fontSize="26"
          fontWeight="600"
          letterSpacing="5"
          fill={textColor}
        >
          SISTINE
        </text>
        <text
          x="100"
          y="120"
          textAnchor="middle"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontSize="6.5"
          fontWeight="500"
          letterSpacing="2.5"
          fill={subtitleColor}
        >
          DECORATE • RESTORE • REFURBISH
        </text>
      </svg>
    </div>
  );
}
