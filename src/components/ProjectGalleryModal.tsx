'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight, Layers, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';
import { Project } from '@/types';

interface ProjectGalleryModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectGalleryModal({ project, onClose }: ProjectGalleryModalProps) {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [panPosition, setPanPosition] = useState<{ x: number; y: number }>({ x: 50, y: 50 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const imageContainerRef = useRef<HTMLDivElement>(null);

  // Reset index and zoom when project changes
  useEffect(() => {
    if (project) {
      setCurrentIdx(0);
      setZoomLevel(1);
      setPanPosition({ x: 50, y: 50 });
    }
  }, [project]);

  // Reset zoom when navigating between slides
  const resetZoom = useCallback(() => {
    setZoomLevel(1);
    setPanPosition({ x: 50, y: 50 });
  }, []);

  const allImages = project
    ? project.images && project.images.length > 0
      ? project.images
      : [project.afterImage, ...(project.beforeImage ? [project.beforeImage] : [])]
    : [];

  const handlePrev = useCallback(() => {
    resetZoom();
    setCurrentIdx((prev) => (prev === 0 ? allImages.length - 1 : prev - 1));
  }, [allImages.length, resetZoom]);

  const handleNext = useCallback(() => {
    resetZoom();
    setCurrentIdx((prev) => (prev === allImages.length - 1 ? 0 : prev + 1));
  }, [allImages.length, resetZoom]);

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.75, 3));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => {
      const next = Math.max(prev - 0.75, 1);
      if (next === 1) setPanPosition({ x: 50, y: 50 });
      return next;
    });
  };

  const toggleZoom = (e: React.MouseEvent<HTMLDivElement>) => {
    if (zoomLevel > 1) {
      resetZoom();
    } else {
      if (imageContainerRef.current) {
        const rect = imageContainerRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        setPanPosition({ x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) });
      }
      setZoomLevel(2);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (zoomLevel <= 1 || !imageContainerRef.current) return;
    const rect = imageContainerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setPanPosition({ x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) });
  };

  // Keyboard navigation & controls
  useEffect(() => {
    if (!project) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (zoomLevel > 1) {
          resetZoom();
        } else {
          onClose();
        }
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === '+' || e.key === '=') {
        setZoomLevel((prev) => Math.min(prev + 0.5, 3));
      } else if (e.key === '-' || e.key === '_') {
        setZoomLevel((prev) => {
          const next = Math.max(prev - 0.5, 1);
          if (next === 1) setPanPosition({ x: 50, y: 50 });
          return next;
        });
      } else if (e.key === '0') {
        resetZoom();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, zoomLevel, handlePrev, handleNext, onClose, resetZoom]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/90 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-5xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-200 my-auto flex flex-col max-h-[92vh]"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="p-4 sm:p-5 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800 shrink-0">
          <div>
            <span className="text-xs font-semibold text-amber-300 uppercase tracking-widest">
              {project.category} • {project.location}
            </span>
            <h3 className="text-lg sm:text-2xl font-serif font-bold text-white mt-0.5">
              {project.title}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Main Image Slider Viewport with Zoom capability */}
        <div 
          ref={imageContainerRef}
          onClick={toggleZoom}
          onMouseMove={handleMouseMove}
          className={`relative aspect-[16/10] sm:aspect-[16/9] w-full bg-slate-950 overflow-hidden select-none ${
            zoomLevel > 1 ? 'cursor-zoom-out' : 'cursor-zoom-in'
          }`}
          title={zoomLevel > 1 ? 'Click to zoom out' : 'Click to zoom in'}
        >
          <div
            className="w-full h-full relative transition-transform duration-200 ease-out"
            style={{
              transform: `scale(${zoomLevel})`,
              transformOrigin: `${panPosition.x}% ${panPosition.y}%`,
            }}
          >
            <Image
              src={allImages[currentIdx]}
              alt={`${project.title} photo ${currentIdx + 1}`}
              fill
              sizes="(max-width: 1200px) 100vw, 1200px"
              className="object-contain"
              priority
              draggable={false}
            />
          </div>

          {/* Floating Zoom Controls Bar */}
          <div 
            className="absolute top-4 right-4 z-20 flex items-center gap-1.5 bg-slate-950/85 backdrop-blur-md px-2.5 py-1.5 rounded-full border border-white/20 text-white shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={handleZoomOut}
              disabled={zoomLevel <= 1}
              className={`p-1.5 rounded-full transition-colors ${
                zoomLevel <= 1 ? 'opacity-40 cursor-not-allowed' : 'hover:bg-white/20 text-white'
              }`}
              aria-label="Zoom out"
              title="Zoom out (-)"
            >
              <ZoomOut className="w-4 h-4" />
            </button>

            <span className="text-xs font-semibold px-1 min-w-[3rem] text-center font-mono text-amber-300">
              {Math.round(zoomLevel * 100)}%
            </span>

            <button
              type="button"
              onClick={handleZoomIn}
              disabled={zoomLevel >= 3}
              className={`p-1.5 rounded-full transition-colors ${
                zoomLevel >= 3 ? 'opacity-40 cursor-not-allowed' : 'hover:bg-white/20 text-white'
              }`}
              aria-label="Zoom in"
              title="Zoom in (+)"
            >
              <ZoomIn className="w-4 h-4" />
            </button>

            {zoomLevel > 1 && (
              <button
                type="button"
                onClick={resetZoom}
                className="p-1.5 rounded-full hover:bg-white/20 text-amber-300 transition-colors ml-0.5 border-l border-white/20 pl-2"
                aria-label="Reset zoom"
                title="Reset zoom (0)"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Previous / Next Arrows */}
          {allImages.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrev();
                }}
                className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition-all shadow-lg z-20"
                aria-label="Previous photo"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition-all shadow-lg z-20"
                aria-label="Next photo"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}

          {/* Bottom Left Info / Hint Badge */}
          <div className="absolute bottom-4 left-4 z-20 flex items-center gap-2">
            <div className="bg-slate-950/80 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 border border-white/10">
              <Layers className="w-3.5 h-3.5 text-amber-400" />
              <span>Photo {currentIdx + 1} of {allImages.length}</span>
            </div>

            <div className="hidden sm:inline-flex bg-slate-950/80 backdrop-blur-sm text-slate-300 px-3 py-1 rounded-full text-[11px] font-medium border border-white/10">
              {zoomLevel > 1 ? 'Move mouse to pan • Click to zoom out' : 'Click image to zoom in'}
            </div>
          </div>
        </div>

        {/* Thumbnails Row */}
        {allImages.length > 1 && (
          <div className="p-3 sm:p-4 bg-slate-100 border-b border-slate-200 flex items-center gap-2.5 overflow-x-auto shrink-0">
            {allImages.map((img, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  resetZoom();
                  setCurrentIdx(idx);
                }}
                className={`relative w-16 h-12 sm:w-20 sm:h-14 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${
                  currentIdx === idx ? 'border-amber-500 scale-105 shadow-sm' : 'border-transparent opacity-70 hover:opacity-100'
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}

        {/* Project Description & Details */}
        <div className="p-6 sm:p-8 bg-white space-y-4 overflow-y-auto">
          <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-light">
            {project.description}
          </p>

          {project.scopeDetails && project.scopeDetails.length > 0 && (
            <div className="pt-3 border-t border-slate-100">
              <h4 className="text-xs font-semibold text-slate-900 uppercase tracking-wider mb-2">
                Work Carried Out:
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600">
                {project.scopeDetails.map((detail, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-amber-600 font-bold">•</span>
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

