'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, ArrowRight } from 'lucide-react';
import { Project } from '@/types';
import { getStoredProjects } from '@/lib/storage';

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeViews, setActiveViews] = useState<{ [key: string]: 'after' | 'before' }>({});

  useEffect(() => {
    const load = () => {
      setProjects(getStoredProjects());
    };
    load();
    window.addEventListener('apex_data_updated', load);
    return () => window.removeEventListener('apex_data_updated', load);
  }, []);

  const toggleView = (id: string, view: 'after' | 'before') => {
    setActiveViews(prev => ({ ...prev, [id]: view }));
  };

  const categories = ['All', 'Interior', 'Exterior', 'Wallpapering'];

  const filteredProjects = selectedCategory === 'All'
    ? projects
    : projects.filter((p) => p.category === selectedCategory);

  return (
    <div className="py-12 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-semibold tracking-widest text-amber-800 uppercase bg-amber-100 px-4 py-1.5 rounded-full">
          Portfolio
        </span>
        <h1 className="text-3xl sm:text-5xl font-serif text-slate-900">
          Our Recent Work
        </h1>
        <p className="text-base sm:text-lg text-slate-600 font-light leading-relaxed">
          A selection of residential painting, exterior finishes, and wallpapering completed throughout Dartmouth, Kingswear, and the South Hams.
        </p>
      </div>

      {/* Simple Category Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 border-b border-slate-200 pb-6">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setSelectedCategory(cat)}
            className={`px-5 py-2.5 rounded-full text-sm font-serif transition-all ${
              selectedCategory === cat
                ? 'bg-slate-900 text-white shadow-sm font-semibold'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
        {filteredProjects.map((project) => {
          const currentView = activeViews[project.id] || 'after';
          const imgUrl = currentView === 'before' && project.beforeImage ? project.beforeImage : project.afterImage;

          return (
            <div
              key={project.id}
              className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="relative aspect-[4/3] w-full bg-slate-900">
                <Image
                  src={imgUrl}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="object-cover"
                />
                
                <div className="absolute top-3 left-3">
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-slate-900/80 text-white backdrop-blur-sm">
                    {project.category}
                  </span>
                </div>

                {project.beforeImage && (
                  <div className="absolute bottom-3 right-3 bg-slate-950/80 backdrop-blur-sm p-1 rounded-lg flex items-center gap-1 text-xs text-white">
                    <button
                      type="button"
                      onClick={() => toggleView(project.id, 'before')}
                      className={`px-2 py-0.5 rounded transition-colors ${
                        currentView === 'before' ? 'bg-amber-600 text-white' : 'text-slate-300'
                      }`}
                    >
                      Before
                    </button>
                    <button
                      type="button"
                      onClick={() => toggleView(project.id, 'after')}
                      className={`px-2 py-0.5 rounded transition-colors ${
                        currentView === 'after' ? 'bg-white text-slate-900 font-semibold' : 'text-slate-300'
                      }`}
                    >
                      After
                    </button>
                  </div>
                )}
              </div>

              <div className="p-6 space-y-3">
                <div className="flex items-center gap-1.5 text-xs text-amber-800 font-medium">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{project.location}</span>
                </div>

                <h3 className="text-xl font-serif font-bold text-slate-900">
                  {project.title}
                </h3>

                <p className="text-sm text-slate-600 leading-relaxed">
                  {project.description}
                </p>

                {project.scopeDetails && (
                  <ul className="pt-3 border-t border-slate-100 text-xs text-slate-500 space-y-1">
                    {project.scopeDetails.map((s, idx) => (
                      <li key={idx}>• {s}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Simple CTA */}
      <div className="bg-[#f5f3ee] rounded-3xl p-8 sm:p-12 text-center space-y-4 max-w-3xl mx-auto border border-slate-200">
        <h2 className="text-2xl sm:text-3xl font-serif text-slate-900">
          Interested in discussing your home?
        </h2>
        <p className="text-sm sm:text-base text-slate-600 font-light">
          We are happy to visit your property in Dartmouth or nearby to provide a clear, written estimate.
        </p>
        <div className="pt-2">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold transition-all"
          >
            <span>Get in Touch</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

    </div>
  );
}
