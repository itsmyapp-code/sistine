import React from 'react';
import Image from 'next/image';

interface LogoProps {
  className?: string;
  variant?: 'light' | 'dark' | 'circle';
}

export default function Logo({ className = "h-16 w-auto", variant = 'dark' }: LogoProps) {
  if (variant === 'circle') {
    return (
      <div className="bg-white rounded-full w-28 h-28 sm:w-36 sm:h-36 mx-auto flex items-center justify-center shadow-2xl border-2 border-white/90 p-2 select-none overflow-hidden hover:scale-105 transition-transform duration-300">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img 
          src="/sistine_logo.jpg" 
          alt="Sistine Decorating - Decorate • Restore • Refurbish" 
          className="w-full h-full object-contain rounded-full"
        />
      </div>
    );
  }

  if (variant === 'light') {
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        <div className="bg-white p-1.5 rounded-xl shadow-sm inline-flex items-center justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src="/sistine_logo.jpg" 
            alt="Sistine Decorating" 
            className="h-10 sm:h-12 w-auto object-contain rounded-lg"
          />
        </div>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img 
        src="/sistine_logo.jpg" 
        alt="Sistine Decorating" 
        className="h-12 sm:h-14 w-auto object-contain rounded-xl shadow-xs"
      />
    </div>
  );
}
