'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Star, 
  ArrowRight, 
  Paintbrush, 
  Home, 
  Layers, 
  Check, 
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import Logo from '@/components/Logo';
import { Project, Testimonial } from '@/types';
import { BUSINESS_CONFIG } from '@/data/initialData';
import { getStoredProjects, getStoredTestimonials } from '@/lib/storage';

export default function HomePage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [activeProjectView, setActiveProjectView] = useState<{ [key: string]: 'after' | 'before' }>({});

  useEffect(() => {
    const load = () => {
      setProjects(getStoredProjects());
      setTestimonials(getStoredTestimonials());
    };
    load();
    window.addEventListener('apex_data_updated', load);
    return () => window.removeEventListener('apex_data_updated', load);
  }, []);

  const toggleView = (id: string, view: 'after' | 'before') => {
    setActiveProjectView(prev => ({ ...prev, [id]: view }));
  };

  const services = [
    {
      title: 'Interior Painting & Decorating',
      href: '/projects',
      icon: Home,
      gradient: 'from-slate-700 to-slate-900',
      description: 'Transforming living spaces, bedrooms, hallways, and woodwork with clean lines, smooth preparation, and durable finishes.',
      buttonText: 'Explore Interior Work',
    },
    {
      title: 'Exterior Painting & Facades',
      href: '/projects',
      icon: Paintbrush,
      gradient: 'from-blue-700 to-slate-900',
      description: 'Long-lasting weather protection for coastal masonry, rendered walls, exterior timbers, and front doors throughout Dartmouth.',
      buttonText: 'View Exterior Projects',
    },
    {
      title: 'Specialist Wallpapering',
      href: '/projects',
      icon: Layers,
      gradient: 'from-amber-700 to-slate-900',
      description: 'Precision hanging of designer feature wallpapers, lining paper, and pattern matching with meticulous care.',
      buttonText: 'See Wallpaper Finishes',
    },
  ];

  return (
    <div className="space-y-0 pb-0">
      
      {/* 1. HERO SECTION (Ship Inn style with centered circular badge) */}
      <section className="relative h-[80vh] md:h-[90vh] w-full overflow-hidden bg-slate-950 text-white flex items-center justify-center">
        
        {/* Background Image with warm coastal dusk overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=85"
            alt="Beautifully painted home interior in Devon"
            fill
            sizes="100vw"
            className="object-cover brightness-75 contrast-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-slate-950/40 to-slate-950/80" />
        </div>

        {/* Hero Center Content */}
        <div className="relative z-10 text-center max-w-4xl mx-auto px-6 space-y-6 sm:space-y-8 animate-in fade-in duration-700">
          
          {/* Circular Badge Logo */}
          <Logo variant="circle" />

          {/* Headline */}
          <div className="space-y-2">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif font-normal tracking-tight text-white drop-shadow-md">
              <span className="block text-slate-200 text-xl sm:text-3xl mb-2 font-sans font-light tracking-wide uppercase">
                Welcome to
              </span>
              <span className="block font-semibold text-amber-200">
                Sistine Decorating
              </span>
            </h1>
            <p className="text-base sm:text-xl md:text-2xl text-slate-200 font-light max-w-2xl mx-auto drop-shadow">
              Quality Painting &amp; Decorating in Dartmouth &amp; South Devon
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-2">
            <Link
              href="/projects"
              className="w-full sm:w-auto bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-sans font-bold px-8 py-3.5 rounded-full text-base sm:text-lg shadow-xl hover:scale-105 transition-all duration-300 inline-flex items-center justify-center gap-2"
            >
              <span>View Our Work</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/contact"
              className="w-full sm:w-auto bg-white/20 hover:bg-white/30 text-white border-2 border-white/60 hover:border-white backdrop-blur-md font-sans font-semibold px-8 py-3.5 rounded-full text-base sm:text-lg shadow-lg hover:scale-105 transition-all duration-300 inline-flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4 text-amber-300" />
              <span>Contact Us</span>
            </Link>
          </div>

        </div>
      </section>

      {/* 2. INTRODUCTION & STORY (Just like The Ship Inn) */}
      <section className="py-16 sm:py-24 bg-[#faf9f5]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-6 mb-16">
            <span className="text-xs font-semibold tracking-widest text-amber-800 uppercase bg-amber-100/70 px-4 py-1.5 rounded-full">
              Dartmouth, South Devon
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-slate-900 leading-tight">
              Painting &amp; Decorating with Pride
            </h2>
            <div className="text-base sm:text-lg text-slate-600 space-y-4 leading-relaxed font-normal">
              <p>
                Based at <strong>15 Southtown in Dartmouth</strong>, Sistine Decorating provides professional interior and exterior painting services for homeowners, holiday cottages, and residential properties across Dartmouth, Kingswear, Stoke Fleming, and the wider South Hams.
              </p>
              <p>
                We believe that good decorating is built on thorough preparation, attention to detail, and a tidy, respectful way of working in your home. Whether refreshing a single room, wallpapering a feature wall, or repainting an entire coastal facade, we deliver clean, lasting results.
              </p>
            </div>
          </div>

          {/* 3 Simple Service Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10">
            {services.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <div
                  key={idx}
                  className="flex flex-col justify-between items-center text-center p-8 rounded-3xl bg-white border border-slate-200/70 shadow-sm hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="w-full flex flex-col items-center">
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-md bg-gradient-to-br ${item.gradient} text-white group-hover:scale-110 transition-transform duration-300`}>
                      <IconComp className="w-8 h-8 text-amber-200" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-serif font-semibold text-slate-900 mb-3 group-hover:text-amber-800 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-slate-600 text-sm sm:text-base mb-8 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <Link
                    href={item.href}
                    className="inline-flex items-center gap-2 bg-slate-100 group-hover:bg-slate-900 text-slate-800 group-hover:text-white font-sans font-semibold text-sm px-6 py-2.5 rounded-full transition-all duration-300"
                  >
                    <span>{item.buttonText}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 3. FEATURED WORK SHOWCASE */}
      <section className="py-16 sm:py-24 bg-white border-t border-slate-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-2">
              <span className="text-xs font-semibold tracking-widest text-amber-800 uppercase bg-amber-50 px-3 py-1 rounded-full">
                Recent Projects
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif text-slate-900">
                Completed Work in Dartmouth
              </h2>
            </div>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-sm font-semibold text-slate-800 hover:text-amber-700 transition-colors"
            >
              <span>View All Portfolio Items</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.slice(0, 3).map((project) => {
              const currentView = activeProjectView[project.id] || 'after';
              const imgUrl = currentView === 'before' && project.beforeImage ? project.beforeImage : project.afterImage;

              return (
                <div
                  key={project.id}
                  className="bg-[#faf9f5] rounded-2xl border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                >
                  {/* Photo Container */}
                  <div className="relative aspect-[4/3] w-full bg-slate-900">
                    <Image
                      src={imgUrl}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 400px"
                      className="object-cover"
                    />
                    
                    {/* Category */}
                    <div className="absolute top-3 left-3">
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-slate-900/80 text-white backdrop-blur-sm">
                        {project.category}
                      </span>
                    </div>

                    {/* Simple Before/After Toggle */}
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

                  {/* Body Content */}
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
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 4. CLIENT REVIEWS SECTION */}
      <section className="py-16 sm:py-20 bg-[#f5f3ee] border-t border-slate-200/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-semibold tracking-widest text-amber-800 uppercase bg-amber-100 px-3 py-1 rounded-full">
              Local Recommendations
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-slate-900">
              What Our Clients Say
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {testimonials.map((test) => (
              <div
                key={test.id}
                className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/80 shadow-xs flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(test.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                    ))}
                  </div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    {test.projectType}
                  </p>
                  <blockquote className="text-sm text-slate-700 leading-relaxed italic font-serif">
                    &ldquo;{test.reviewText}&rdquo;
                  </blockquote>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-slate-900 font-serif">{test.clientName}</p>
                    <p className="text-xs text-slate-500">{test.location}</p>
                  </div>
                  <span className="text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                    {test.source}
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 5. CALL TO ACTION SECTION (Ship Inn style) */}
      <section className="relative py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 text-white overflow-hidden">
        <div className="relative max-w-4xl mx-auto text-center px-6 space-y-6">
          <span className="inline-block bg-amber-400/20 text-amber-300 font-sans font-semibold text-xs uppercase tracking-widest px-4 py-1.5 rounded-full border border-amber-400/30">
            Dartmouth &amp; South Hams
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-normal text-white tracking-tight">
            Planning Your Next Decorating Project?
          </h2>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto font-light leading-relaxed">
            Contact Sistine Decorating today for friendly advice and a straightforward, no-obligation quotation for your home.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <a
              href={`tel:${BUSINESS_CONFIG.phone.replace(/\s+/g, '')}`}
              className="w-full sm:w-auto bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-sans font-bold px-8 py-4 rounded-full text-base sm:text-lg shadow-xl hover:scale-105 transition-all inline-flex items-center justify-center gap-2"
            >
              <Phone className="w-5 h-5 text-slate-950" />
              <span>Call: {BUSINESS_CONFIG.phone}</span>
            </a>
            <Link
              href="/contact"
              className="w-full sm:w-auto bg-white/15 hover:bg-white/25 text-white border border-white/40 hover:border-white font-sans font-semibold px-8 py-4 rounded-full text-base sm:text-lg shadow-lg hover:scale-105 transition-all inline-flex items-center justify-center gap-2"
            >
              <Mail className="w-5 h-5 text-white" />
              <span>Send Message</span>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
