'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Phone, 
  MessageSquare, 
  Shield, 
  Star, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  Paintbrush, 
  Home, 
  Layers, 
  Wrench, 
  Building2, 
  Clock, 
  CheckCheck,
  Upload,
  MapPin
} from 'lucide-react';
import BeforeAfterSlider from '@/components/BeforeAfterSlider';
import ProjectCard from '@/components/ProjectCard';
import TestimonialCard from '@/components/TestimonialCard';
import QuoteModal from '@/components/QuoteModal';
import { Project, Testimonial, ProjectCategory } from '@/types';
import { BUSINESS_CONFIG } from '@/data/initialData';
import { getStoredProjects, getStoredTestimonials } from '@/lib/storage';

export default function HomePage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [activeHeroSliderProject, setActiveHeroSliderProject] = useState<Project | null>(null);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [selectedServiceForModal, setSelectedServiceForModal] = useState<string>('Interior Decorating');

  // Load from dynamic storage
  useEffect(() => {
    const loadData = () => {
      const p = getStoredProjects();
      const t = getStoredTestimonials();
      setProjects(p);
      setTestimonials(t);
      if (p.length > 0 && !activeHeroSliderProject) {
        const featured = p.find(proj => proj.featured) || p[0];
        setActiveHeroSliderProject(featured);
      }
    };

    loadData();
    window.addEventListener('apex_data_updated', loadData);
    return () => window.removeEventListener('apex_data_updated', loadData);
  }, [activeHeroSliderProject]);

  const categories = ['All', 'Interior', 'Exterior', 'Wallpapering', 'Restoration & Woodwork'];

  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  const featuredBeforeAfterProjects = projects.filter((p) => p.beforeImage);

  const services = [
    {
      title: 'Interior Decorating',
      category: 'Interior',
      icon: Home,
      image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80',
      description: 'Flawless emulsion & woodwork finishes. Specialists in period cornicing, lime plaster walls, and dust-free Mirka extraction sanding.',
      features: ['Dustless HEPA sanding', 'Heritage lime & breathable paints', 'Ceiling & cornice plaster repairs'],
    },
    {
      title: 'Exterior Masonry & Timber',
      category: 'Exterior',
      icon: Paintbrush,
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
      description: 'Long-lasting weather protection using breathable mineral silicate systems (Keim & Zinsser) with up to 15-year durability guarantees.',
      features: ['Bath stone & render cleaning', '15-Year mineral coatings', 'Fascias, soffits & ironwork'],
    },
    {
      title: 'Sash Window Care & Bio-Resin',
      category: 'Restoration & Woodwork',
      icon: Wrench,
      image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
      description: 'Certified Repair Care International timber restoration. We splice damaged sills, eliminate wet-rot, and restore smooth sliding action.',
      features: ['Permanent resin repairs', 'Sill spliced replacements', 'Draught proofing & re-cording'],
    },
    {
      title: 'Specialist Wallpapering & Murals',
      category: 'Wallpapering',
      icon: Layers,
      image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80',
      description: 'Master hanging of luxury hand-printed papers (Morris & Co, Cole & Son, Farrow & Ball, Zoffany) with laser-accurate pattern alignment.',
      features: ['Heavy lining paper cross-lining', 'Wide-width commercial vinyls', 'Invisible butt seams'],
    },
    {
      title: 'Kitchen Cabinet & Fine Spraying',
      category: 'Restoration & Woodwork',
      icon: Sparkles,
      image: 'https://images.unsplash.com/photo-1556912173-3bb406ef7e77?auto=format&fit=crop&w=800&q=80',
      description: 'Factory-grade airless spray painting for bespoke in-frame kitchens and architectural woodwork with ultra-durable 2K polyurethane enamels.',
      features: ['Showroom smooth 10% dead matte', 'High chemical & scratch resistance', 'Substantial savings vs replacement'],
    },
    {
      title: 'Commercial & Retail Decorating',
      category: 'Commercial',
      icon: Building2,
      image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=800&q=80',
      description: 'High-speed, out-of-hours commercial decorating for boutique hotels, offices, restaurants, and retail spaces with zero downtime.',
      features: ['Out-of-hours & weekend schedules', 'Heavy duty washable coatings', 'RAMS & full safety compliance'],
    },
  ];

  return (
    <div className="space-y-20 lg:space-y-28 pb-16">
      
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-slate-950 text-white pt-12 pb-20 lg:pt-20 lg:pb-32">
        
        {/* Background glow & subtle pattern */}
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#c69234_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Value Prop & Calls to Action */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Trust Badge Pill */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-700 text-xs font-semibold text-amber-400 backdrop-blur-sm">
                <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Now Booking Spring &amp; Summer Projects Across Gloucestershire &amp; Bath</span>
              </div>

              {/* Main Headline */}
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
                Master Painting, Decorating &amp;{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-200">
                  Heritage Restoration
                </span>
              </h1>

              {/* Subheadline */}
              <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
                Transforming Georgian townhouses, Cotswold stone residences, and modern luxury spaces. City &amp; Guilds master tradesmen delivering dust-free preparation, fine spray finishes, and 15-year exterior guarantees.
              </p>

              {/* Conversion Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedServiceForModal('Interior Decorating');
                    setIsQuoteModalOpen(true);
                  }}
                  className="px-8 py-4 bg-amber-600 hover:bg-amber-500 active:bg-amber-700 text-white font-bold text-base rounded-xl shadow-trade-gold hover:shadow-xl transition-all flex items-center justify-center gap-2 group"
                >
                  <Sparkles className="w-5 h-5 text-amber-200 group-hover:rotate-12 transition-transform" />
                  <span>Request a Free Quote</span>
                </button>

                <a
                  href={`tel:${BUSINESS_CONFIG.phone.replace(/\s+/g, '')}`}
                  className="px-6 py-4 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-white font-semibold text-base rounded-xl transition-all flex items-center justify-center gap-2.5"
                >
                  <Phone className="w-4 h-4 text-amber-400" />
                  <span>{BUSINESS_CONFIG.phone}</span>
                </a>
              </div>

              {/* WhatsApp Secondary Link */}
              <div className="flex items-center gap-3 pt-1 text-xs text-slate-400">
                <span>Prefer fast messaging?</span>
                <a
                  href={`https://wa.me/447700900842?text=Hi%20Apex%20Decorating,%20I'd%20like%20to%20send%20photos%20for%20a%20quote`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-semibold"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Chat directly on WhatsApp ({BUSINESS_CONFIG.mobile})</span>
                </a>
              </div>

              {/* Trust Badges Bar */}
              <div className="pt-6 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-amber-400 shrink-0" />
                  <span className="text-slate-300 font-medium">£5M Fully Insured</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  <span className="text-slate-300 font-medium">Clean Site Guarantee</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400 shrink-0" />
                  <span className="text-slate-300 font-medium">5.0 Star Trade Rating</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                  <span className="text-slate-300 font-medium">Fixed-Price Quotes</span>
                </div>
              </div>

            </div>

            {/* Right Column: Hero Visual Feature (Interactive Preview Card) */}
            <div className="lg:col-span-5">
              <div className="bg-slate-900/90 rounded-2xl p-4 sm:p-5 border border-slate-800 shadow-2xl space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    Featured Recent Project
                  </span>
                  <span className="text-xs text-slate-400">Cheltenham, GL50</span>
                </div>
                
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-slate-950 border border-slate-800">
                  <Image
                    src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80"
                    alt="Georgian drawing room completed by Apex"
                    fill
                    sizes="(max-width: 768px) 100vw, 500px"
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent p-4">
                    <p className="text-sm font-bold text-white">Grade II Georgian Drawing Room</p>
                    <p className="text-xs text-slate-300">Farrow &amp; Ball emulsion &amp; fibrous cornice reconstruction</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 pt-1 text-center text-xs">
                  <div className="p-2 rounded-lg bg-slate-950/60 border border-slate-800">
                    <p className="font-bold text-amber-400">100%</p>
                    <p className="text-[10px] text-slate-400">Dust Extraction</p>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-950/60 border border-slate-800">
                    <p className="font-bold text-amber-400">4 Coats</p>
                    <p className="text-[10px] text-slate-400">Hand Finishing</p>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-950/60 border border-slate-800">
                    <p className="font-bold text-amber-400">10 Yr</p>
                    <p className="text-[10px] text-slate-400">Durability Spec</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. INTERACTIVE BEFORE & AFTER COMPARISON SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
            Real Work, Real Results
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Interactive Before &amp; After Showcase
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Drag the slider horizontally to reveal how our meticulous timber repair, plaster consolidation, and multi-coat finishes revive neglected spaces.
          </p>
        </div>

        {/* Project Switcher Tabs */}
        {featuredBeforeAfterProjects.length > 1 && (
          <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
            {featuredBeforeAfterProjects.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setActiveHeroSliderProject(p)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  activeHeroSliderProject?.id === p.id
                    ? 'bg-slate-900 text-white shadow-md'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {p.title.split(' ')[0]} {p.title.split(' ')[1]} ({p.category})
              </button>
            ))}
          </div>
        )}

        {/* Active Comparison Slider */}
        {activeHeroSliderProject && activeHeroSliderProject.beforeImage && (
          <div className="max-w-5xl mx-auto">
            <BeforeAfterSlider
              beforeImage={activeHeroSliderProject.beforeImage}
              afterImage={activeHeroSliderProject.afterImage}
              title={activeHeroSliderProject.title}
              category={activeHeroSliderProject.category}
              location={activeHeroSliderProject.location}
              description={activeHeroSliderProject.description}
            />
          </div>
        )}
      </section>

      {/* 3. CORE SERVICES GRID */}
      <section className="bg-slate-100/70 py-16 lg:py-24 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                Specialist Trade Capabilities
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Craftsmanship Tailored to Heritage &amp; Contemporary Homes
              </h2>
              <p className="text-slate-600 text-sm sm:text-base">
                Every project begins with thorough surface diagnostics and protective sheeting. We exclusively apply trade-grade mineral, lime, and micro-porous formulations.
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                setSelectedServiceForModal('Interior Decorating');
                setIsQuoteModalOpen(true);
              }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm rounded-xl transition-all shrink-0"
            >
              <span>Book Site Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((srv, idx) => {
              const IconComp = srv.icon;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-trade hover:shadow-trade-lg transition-all duration-300 flex flex-col justify-between group"
                >
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-900">
                    <Image
                      src={srv.image}
                      alt={srv.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 400px"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3 p-2 rounded-xl bg-slate-950/80 backdrop-blur-sm text-amber-400 border border-slate-700">
                      <IconComp className="w-5 h-5" />
                    </div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-3">
                      <h3 className="text-xl font-bold text-slate-900 group-hover:text-amber-700 transition-colors">
                        {srv.title}
                      </h3>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        {srv.description}
                      </p>
                      <ul className="space-y-1.5 pt-2 border-t border-slate-100">
                        {srv.features.map((feat, fIdx) => (
                          <li key={fIdx} className="flex items-center gap-2 text-xs text-slate-700">
                            <CheckCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setSelectedServiceForModal(srv.title);
                        setIsQuoteModalOpen(true);
                      }}
                      className="w-full pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-amber-700 hover:text-amber-800 transition-colors"
                    >
                      <span>Inquire About This Service</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 4. FILTERABLE PROJECT PORTFOLIO */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
              Verified Track Record
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Recent Residential &amp; Commercial Projects
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Browse our portfolio of completed projects. Click &apos;Before&apos; and &apos;After&apos; on any card to view the underlying transformation.
            </p>
          </div>

          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm font-bold text-amber-700 hover:text-amber-800 transition-colors shrink-0"
          >
            <span>View Full Portfolio Gallery ({projects.length} Works)</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeCategory === cat
                  ? 'bg-amber-600 text-white shadow-md'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.slice(0, 6).map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onOpenSlider={(p) => {
                setActiveHeroSliderProject(p);
                window.scrollTo({ top: 600, behavior: 'smooth' });
              }}
            />
          ))}
        </div>
      </section>

      {/* 5. VERIFIED TESTIMONIALS SECTION */}
      <section className="bg-slate-900 text-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-400/20">
                100% Client Satisfaction
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                What Homeowners &amp; Architects Say
              </h2>
              <p className="text-slate-400 text-sm sm:text-base">
                Read authentic feedback from period property owners and commercial clients across Cheltenham, Bath, Bristol, and the Cotswolds.
              </p>
            </div>

            <Link
              href="/reviews"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-amber-300 font-semibold text-xs sm:text-sm rounded-xl border border-slate-700 transition-all shrink-0"
            >
              <span>View All Verified Testimonials</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.slice(0, 3).map((test) => (
              <TestimonialCard key={test.id} testimonial={test} />
            ))}
          </div>

        </div>
      </section>

      {/* 6. ON-PAGE QUOTE ESTIMATOR & INQUIRY FORM */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-trade-lg overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          
          {/* Left Column: Guarantees & Contact Direct */}
          <div className="lg:col-span-5 bg-slate-950 text-white p-8 sm:p-10 lg:p-12 flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-400/20">
                Free Site Estimates
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Ready to Discuss Your Next Project?
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Whether you need a full townhouse restoration, bespoke sash window timber splicing, or designer wallpapering, we provide clear itemised schedules with fixed quotations.
              </p>

              <div className="space-y-4 pt-2 text-sm">
                <div className="flex items-start gap-3">
                  <div className="p-1.5 rounded-lg bg-amber-500/20 text-amber-400">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">No-Obligation Surveys</p>
                    <p className="text-xs text-slate-400">Detailed written specifications with paint system breakdown</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-1.5 rounded-lg bg-amber-500/20 text-amber-400">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">Dustless Preparation</p>
                    <p className="text-xs text-slate-400">HEPA extraction prevents plaster residue throughout your home</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-1.5 rounded-lg bg-amber-500/20 text-amber-400">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">24-Month Workmanship Warranty</p>
                    <p className="text-xs text-slate-400">Guaranteed protection against flaking, bubbling, or peeling</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-800 space-y-3">
              <p className="text-xs text-slate-400">Need urgent advice?</p>
              <a
                href={`tel:${BUSINESS_CONFIG.phone.replace(/\s+/g, '')}`}
                className="text-base font-bold text-amber-400 hover:text-amber-300 flex items-center gap-2"
              >
                <Phone className="w-4 h-4" />
                <span>Call {BUSINESS_CONFIG.phone}</span>
              </a>
            </div>
          </div>

          {/* Right Column: Direct Inquiry Form */}
          <div className="lg:col-span-7 p-8 sm:p-10 lg:p-12 bg-white">
            <h4 className="text-xl font-bold text-slate-900 mb-6">
              Send Your Project Specifications
            </h4>
            
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                setIsQuoteModalOpen(true);
              }}
              className="space-y-4"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Full name"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 bg-slate-50 text-slate-900 text-sm focus:bg-white focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="Mobile / Landline"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 bg-slate-50 text-slate-900 text-sm focus:bg-white focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 bg-slate-50 text-slate-900 text-sm focus:bg-white focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Postcode / Town *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. GL50 1QZ"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 bg-slate-50 text-slate-900 text-sm focus:bg-white focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Primary Service Required
                </label>
                <select
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 bg-slate-50 text-slate-900 text-sm focus:bg-white focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                >
                  <option>Interior Decorating &amp; Cornice Painting</option>
                  <option>Exterior Masonry &amp; Silicate Systems</option>
                  <option>Sash Window Repair &amp; Bio-Resin</option>
                  <option>Specialist Wallpapering &amp; Murals</option>
                  <option>Kitchen Cabinet Spray Refinishing</option>
                  <option>Commercial &amp; Office Refurbishment</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Brief Project Notes
                </label>
                <textarea
                  rows={3}
                  placeholder="Number of rooms, ceiling heights, timber damage, preferred paint brands..."
                  className="w-full px-3.5 py-2 rounded-lg border border-slate-300 bg-slate-50 text-slate-900 text-sm focus:bg-white focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                />
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setIsQuoteModalOpen(true)}
                  className="w-full py-3.5 bg-amber-600 hover:bg-amber-500 active:bg-amber-700 text-white font-bold text-sm rounded-xl shadow-trade hover:shadow-trade-gold transition-all flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Launch Detailed Quote Request with Photo Upload</span>
                </button>
              </div>

              <p className="text-[11px] text-slate-400 text-center">
                🔒 Zero tracking cookies deployed. We respond within 24 business hours.
              </p>
            </form>
          </div>

        </div>
      </section>

      {/* 7. COVERAGE AREA CALLOUT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-2xl p-8 border border-slate-800">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            <div className="space-y-2 md:col-span-1">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
                Regional Coverage
              </span>
              <h3 className="text-xl font-bold">Serving the South West &amp; Cotswolds</h3>
              <p className="text-xs text-slate-400">
                Operating across a 40-mile radius from our Cheltenham and Bath workshops.
              </p>
            </div>

            <div className="md:col-span-2 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
              {BUSINESS_CONFIG.coverageAreas.map((area, idx) => (
                <div key={idx} className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-950/60 border border-slate-800">
                  <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span className="font-semibold text-slate-200">{area}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Quote Modal */}
      <QuoteModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
        preselectedService={selectedServiceForModal}
      />
    </div>
  );
}
