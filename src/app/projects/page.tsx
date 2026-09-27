'use client';

import React, { useState, useEffect } from 'react';
import { Search, Filter, Sparkles, X } from 'lucide-react';
import ProjectCard from '@/components/ProjectCard';
import BeforeAfterSlider from '@/components/BeforeAfterSlider';
import QuoteModal from '@/components/QuoteModal';
import { Project, ProjectCategory } from '@/types';
import { getStoredProjects } from '@/lib/storage';

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  useEffect(() => {
    const load = () => {
      setProjects(getStoredProjects());
    };
    load();
    window.addEventListener('apex_data_updated', load);
    return () => window.removeEventListener('apex_data_updated', load);
  }, []);

  const categories = ['All', 'Interior', 'Exterior', 'Wallpapering', 'Restoration & Woodwork', 'Commercial'];

  const filteredProjects = projects.filter((project) => {
    const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory;
    const matchesSearch = 
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="py-12 lg:py-16 space-y-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold uppercase tracking-widest text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
          Master Portfolio &amp; Case Studies
        </span>
        <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          Recent Painting &amp; Restoration Work
        </h1>
        <p className="text-base text-slate-600 leading-relaxed">
          Explore our collection of heritage townhouses, bespoke timber repairs, designer wallpapers, and fine spray kitchen transformations.
        </p>
      </div>

      {/* Controls Bar (Search & Categories) */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-6 shadow-trade flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by town or project type..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 bg-slate-50 text-sm text-slate-900 focus:bg-white focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

      </div>

      {/* Gallery Grid */}
      {filteredProjects.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 p-8 space-y-4">
          <p className="text-lg font-bold text-slate-800">No projects found matching your criteria.</p>
          <p className="text-sm text-slate-500">Try adjusting your search terms or category filter.</p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
            }}
            className="px-4 py-2 bg-slate-900 text-white text-xs font-semibold rounded-lg"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onOpenSlider={(p) => setActiveModalProject(p)}
            />
          ))}
        </div>
      )}

      {/* CTA Strip */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <h2 className="text-2xl font-bold text-white">Have a similar property requiring specialist attention?</h2>
          <p className="text-sm text-slate-300">
            We provide comprehensive itemised quotes with fixed start dates and guaranteed schedules.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setIsQuoteModalOpen(true)}
          className="px-6 py-3.5 bg-amber-600 hover:bg-amber-500 text-white font-bold text-sm rounded-xl shadow-trade-gold transition-all shrink-0 flex items-center gap-2"
        >
          <Sparkles className="w-4 h-4" />
          <span>Request a Free Quote</span>
        </button>
      </div>

      {/* Interactive Before & After Modal */}
      {activeModalProject && activeModalProject.beforeImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800">
              <span className="font-bold text-sm text-amber-400">
                Interactive Before &amp; After Comparison
              </span>
              <button
                type="button"
                onClick={() => setActiveModalProject(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 sm:p-6">
              <BeforeAfterSlider
                beforeImage={activeModalProject.beforeImage}
                afterImage={activeModalProject.afterImage}
                title={activeModalProject.title}
                category={activeModalProject.category}
                location={activeModalProject.location}
                description={activeModalProject.description}
              />
            </div>
          </div>
        </div>
      )}

      {/* Global Quote Modal */}
      <QuoteModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
      />
    </div>
  );
}
