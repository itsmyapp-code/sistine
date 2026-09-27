'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams, useRouter } from 'next/navigation';
import { MapPin, ArrowRight, Layers, Camera } from 'lucide-react';
import { Project } from '@/types';
import { getStoredProjects } from '@/lib/storage';
import ProjectGalleryModal from '@/components/ProjectGalleryModal';

const categories = ['All', 'Interior', 'Exterior', 'Wallpapering'];

function ProjectsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedProjectForGallery, setSelectedProjectForGallery] = useState<Project | null>(null);

  useEffect(() => {
    const load = () => {
      setProjects(getStoredProjects());
    };
    load();
    window.addEventListener('apex_data_updated', load);
    return () => window.removeEventListener('apex_data_updated', load);
  }, []);

  // Sync selected category with URL query parameter
  useEffect(() => {
    const categoryParam = searchParams.get('category') || searchParams.get('cat');
    if (categoryParam) {
      const match = categories.find(
        (c) => c.toLowerCase() === categoryParam.toLowerCase()
      );
      if (match) {
        setSelectedCategory(match);
      }
    } else {
      setSelectedCategory('All');
    }
  }, [searchParams]);

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    if (cat === 'All') {
      router.push('/projects', { scroll: false });
    } else {
      router.push(`/projects?category=${encodeURIComponent(cat)}`, { scroll: false });
    }
  };

  const filteredProjects = selectedCategory === 'All'
    ? projects
    : projects.filter((p) => p.category === selectedCategory);

  return (
    <div className="py-12 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-semibold tracking-widest text-amber-800 uppercase bg-amber-100 px-4 py-1.5 rounded-full">
          Portfolio &amp; Work Completed
        </span>
        <h1 className="text-3xl sm:text-5xl font-serif text-slate-900">
          Our Recent Work
        </h1>
        <p className="text-base sm:text-lg text-slate-600 font-light leading-relaxed">
          Browse through completed painting and decorating projects across Dartmouth and the South Hams. Click any job to view the full photo gallery.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 border-b border-slate-200 pb-6">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => handleCategoryChange(cat)}
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
        {filteredProjects.length === 0 ? (
          <div className="col-span-full text-center py-16 bg-white rounded-2xl border border-slate-200 p-8">
            <p className="text-slate-600 font-serif text-lg">No projects found in this category.</p>
            <button
              onClick={() => handleCategoryChange('All')}
              className="mt-4 px-6 py-2 bg-slate-900 text-white rounded-full text-sm font-medium"
            >
              View All Projects
            </button>
          </div>
        ) : (
          filteredProjects.map((project) => {
            const photoCount = project.images && project.images.length > 0 ? project.images.length : (project.beforeImage ? 2 : 1);

            return (
              <div
                key={project.id}
                onClick={() => setSelectedProjectForGallery(project)}
                className="group cursor-pointer bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div className="relative aspect-[4/3] w-full bg-slate-900 overflow-hidden">
                  <Image
                    src={project.afterImage}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 400px"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Category Pill */}
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-slate-900/80 text-white backdrop-blur-sm">
                      {project.category}
                    </span>
                  </div>

                  {/* Multiple Images Counter Pill */}
                  <div className="absolute bottom-3 right-3 bg-slate-950/80 backdrop-blur-sm px-2.5 py-1 rounded-full flex items-center gap-1.5 text-xs font-medium text-white shadow">
                    <Camera className="w-3.5 h-3.5 text-amber-400" />
                    <span>{photoCount} Photos</span>
                  </div>
                </div>

                <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-1.5 text-xs text-amber-800 font-medium">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{project.location}</span>
                    </div>

                    <h3 className="text-xl font-serif font-bold text-slate-900 group-hover:text-amber-800 transition-colors">
                      {project.title}
                    </h3>

                    <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">
                      {project.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-800 group-hover:text-amber-700 transition-colors">
                    <span>View All {photoCount} Photos &amp; Job Details</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Gallery Modal */}
      <ProjectGalleryModal
        project={selectedProjectForGallery}
        onClose={() => setSelectedProjectForGallery(null)}
      />

      {/* CTA */}
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

export default function ProjectsPage() {
  return (
    <Suspense fallback={<div className="py-24 text-center text-slate-500">Loading portfolio...</div>}>
      <ProjectsContent />
    </Suspense>
  );
}
