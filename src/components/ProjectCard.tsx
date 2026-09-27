'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { MapPin, CheckCircle2, ArrowRight } from 'lucide-react';
import { Project } from '@/types';

interface ProjectCardProps {
  project: Project;
  onOpenSlider?: (project: Project) => void;
}

export default function ProjectCard({ project, onOpenSlider }: ProjectCardProps) {
  const [activeView, setActiveView] = useState<'after' | 'before'>('after');
  const currentImage = activeView === 'before' && project.beforeImage ? project.beforeImage : project.afterImage;

  return (
    <div className="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-trade hover:shadow-trade-lg transition-all duration-300 flex flex-col">
      {/* Image Showcase Container */}
      <div className="relative aspect-[16/11] w-full overflow-hidden bg-slate-900">
        <Image
          src={currentImage}
          alt={`${project.title} - ${activeView} state`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Category Badge */}
        <div className="absolute top-3 left-3 z-10">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-900/85 text-white backdrop-blur-sm border border-slate-700">
            {project.category}
          </span>
        </div>

        {/* Before / After Mini Switcher (if before image is present) */}
        {project.beforeImage && (
          <div className="absolute bottom-3 right-3 z-10 bg-slate-950/80 backdrop-blur-md p-1 rounded-lg border border-slate-700/60 flex items-center gap-1 text-[11px] font-semibold text-white">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setActiveView('before');
              }}
              className={`px-2 py-0.5 rounded transition-colors ${
                activeView === 'before' ? 'bg-amber-600 text-white' : 'text-slate-300 hover:text-white'
              }`}
            >
              Before
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setActiveView('after');
              }}
              className={`px-2 py-0.5 rounded transition-colors ${
                activeView === 'after' ? 'bg-white text-slate-900' : 'text-slate-300 hover:text-white'
              }`}
            >
              After
            </button>
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2.5">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-700">
            <MapPin className="w-3.5 h-3.5 shrink-0" />
            <span>{project.location}</span>
          </div>

          <h3 className="text-lg font-bold text-slate-900 group-hover:text-amber-700 transition-colors leading-snug">
            {project.title}
          </h3>

          <p className="text-sm text-slate-600 line-clamp-2 leading-relaxed">
            {project.description}
          </p>

          {project.scopeDetails && project.scopeDetails.length > 0 && (
            <ul className="pt-2 space-y-1.5 border-t border-slate-100">
              {project.scopeDetails.slice(0, 2).map((detail, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs text-slate-600">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {onOpenSlider && project.beforeImage && (
          <button
            type="button"
            onClick={() => onOpenSlider(project)}
            className="pt-3 w-full flex items-center justify-between text-xs font-bold text-slate-900 hover:text-amber-600 transition-colors border-t border-slate-100"
          >
            <span>Interactive Comparison</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
