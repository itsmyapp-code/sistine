'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight, MapPin, Layers } from 'lucide-react';
import { Project } from '@/types';

interface ProjectGalleryModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectGalleryModal({ project, onClose }: ProjectGalleryModalProps) {
  const [currentIdx, setCurrentIdx] = useState<number>(0);

  if (!project) return null;

  const allImages = project.images && project.images.length > 0
    ? project.images
    : [project.afterImage, ...(project.beforeImage ? [project.beforeImage] : [])];

  const handlePrev = () => {
    setCurrentIdx((prev) => (prev === 0 ? allImages.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIdx((prev) => (prev === allImages.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-5xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-200 my-auto"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="p-4 sm:p-6 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
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

        {/* Main Image Slider Viewport */}
        <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full bg-slate-950 overflow-hidden">
          <Image
            src={allImages[currentIdx]}
            alt={`${project.title} photo ${currentIdx + 1}`}
            fill
            sizes="(max-width: 1200px) 100vw, 1200px"
            className="object-contain"
            priority
          />

          {/* Previous / Next Arrows */}
          {allImages.length > 1 && (
            <>
              <button
                type="button"
                onClick={handlePrev}
                className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition-all shadow-lg"
                aria-label="Previous photo"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition-all shadow-lg"
                aria-label="Next photo"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}

          {/* Photo Counter */}
          <div className="absolute bottom-4 left-4 bg-slate-950/80 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-amber-400" />
            <span>Photo {currentIdx + 1} of {allImages.length}</span>
          </div>
        </div>

        {/* Thumbnails Row */}
        {allImages.length > 1 && (
          <div className="p-3 sm:p-4 bg-slate-100 border-b border-slate-200 flex items-center gap-2.5 overflow-x-auto">
            {allImages.map((img, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentIdx(idx)}
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
        <div className="p-6 sm:p-8 bg-white space-y-4">
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
