'use client';

import React, { useState, useRef, useCallback } from 'react';
import Image from 'next/image';
import { ArrowLeftRight, Check, RotateCcw } from 'lucide-react';

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  title: string;
  category?: string;
  location?: string;
  description?: string;
}

export default function BeforeAfterSlider({
  beforeImage,
  afterImage,
  title,
  category,
  location,
  description,
}: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [viewMode, setViewMode] = useState<'slider' | 'before' | 'after'>('slider');
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let percentage = (x / rect.width) * 100;
    if (percentage < 0) percentage = 0;
    if (percentage > 100) percentage = 100;
    setSliderPosition(percentage);
  }, []);

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      setSliderPosition((prev) => Math.max(0, prev - 5));
    } else if (e.key === 'ArrowRight') {
      setSliderPosition((prev) => Math.min(100, prev + 5));
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-trade">
      
      {/* Visual Canvas Container */}
      <div
        ref={containerRef}
        className="relative w-full aspect-[4/3] sm:aspect-[16/10] overflow-hidden bg-slate-900 select-none cursor-ew-resize touch-none"
        onMouseDown={(e) => {
          setIsDragging(true);
          handleMove(e.clientX);
        }}
        onMouseUp={() => setIsDragging(false)}
        onMouseLeave={() => setIsDragging(false)}
        onMouseMove={handleMouseMove}
        onTouchStart={(e) => {
          setIsDragging(true);
          handleMove(e.touches[0].clientX);
        }}
        onTouchEnd={() => setIsDragging(false)}
        onTouchMove={handleTouchMove}
        role="slider"
        tabIndex={0}
        aria-label={`Before and after slider comparison for ${title}`}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(sliderPosition)}
        onKeyDown={handleKeyDown}
      >
        {/* AFTER IMAGE (Base layer) */}
        <div className="absolute inset-0 w-full h-full">
          <Image
            src={afterImage}
            alt={`${title} - Completed finish by Apex`}
            fill
            sizes="(max-width: 768px) 100vw, 1200px"
            className="object-cover"
            priority
          />
          <div className="absolute bottom-4 right-4 z-10 bg-slate-900/80 backdrop-blur-sm text-white px-3 py-1 rounded-md text-xs font-semibold tracking-wide border border-slate-700">
            AFTER: Apex Master Finish
          </div>
        </div>

        {/* BEFORE IMAGE (Clipped overlay) */}
        <div
          className="absolute inset-0 w-full h-full overflow-hidden"
          style={{
            clipPath: viewMode === 'before'
              ? 'inset(0 0 0 0)'
              : viewMode === 'after'
              ? 'inset(0 100% 0 0)'
              : `inset(0 ${100 - sliderPosition}% 0 0)`,
          }}
        >
          <Image
            src={beforeImage}
            alt={`${title} - Prior condition`}
            fill
            sizes="(max-width: 768px) 100vw, 1200px"
            className="object-cover grayscale contrast-125 brightness-95"
          />
          <div className="absolute bottom-4 left-4 z-10 bg-black/80 backdrop-blur-sm text-amber-300 px-3 py-1 rounded-md text-xs font-semibold tracking-wide border border-amber-500/30">
            BEFORE: Original State
          </div>
        </div>

        {/* DRAG HANDLE (Visible in slider mode) */}
        {viewMode === 'slider' && (
          <div
            className="slider-handle-line"
            style={{ left: `${sliderPosition}%` }}
          >
            <div
              className="slider-handle-button shadow-xl group"
              aria-hidden="true"
            >
              <ArrowLeftRight className="w-5 h-5 text-slate-800 group-hover:scale-110 transition-transform" />
            </div>
          </div>
        )}

        {/* Floating Instruction Hint */}
        <div className="absolute top-4 left-4 z-20 pointer-events-none hidden sm:block">
          <span className="bg-slate-950/70 backdrop-blur-sm text-white text-[11px] px-2.5 py-1 rounded border border-white/10">
            ↔ Drag slider or use arrow keys
          </span>
        </div>
      </div>

      {/* Info & Mode Toggle Controls */}
      <div className="p-6 bg-white space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              {category && (
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-800">
                  {category}
                </span>
              )}
              {location && (
                <span className="text-xs text-slate-500 font-medium">
                  {location}
                </span>
              )}
            </div>
            <h3 className="text-xl font-bold text-slate-900 tracking-tight">
              {title}
            </h3>
          </div>

          {/* View Mode Buttons */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg border border-slate-200 text-xs font-medium">
            <button
              type="button"
              onClick={() => {
                setViewMode('slider');
                setSliderPosition(50);
              }}
              className={`px-3 py-1.5 rounded-md transition-all ${
                viewMode === 'slider'
                  ? 'bg-white text-slate-900 shadow-sm font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span className="flex items-center gap-1">
                <RotateCcw className="w-3 h-3" />
                Slider
              </span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('before')}
              className={`px-3 py-1.5 rounded-md transition-all ${
                viewMode === 'before'
                  ? 'bg-amber-600 text-white shadow-sm font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Before Only
            </button>
            <button
              type="button"
              onClick={() => setViewMode('after')}
              className={`px-3 py-1.5 rounded-md transition-all ${
                viewMode === 'after'
                  ? 'bg-slate-900 text-white shadow-sm font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span className="flex items-center gap-1">
                <Check className="w-3 h-3" />
                Apex Finish
              </span>
            </button>
          </div>
        </div>

        {description && (
          <p className="text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
            {description}
          </p>
        )}
      </div>

    </div>
  );
}
