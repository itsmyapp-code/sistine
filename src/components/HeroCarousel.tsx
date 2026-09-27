'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Phone, ChevronLeft, ChevronRight } from 'lucide-react';
import Logo from './Logo';
import { BUSINESS_CONFIG } from '@/data/initialData';

const HERO_SLIDES = [
  {
    url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=85',
    alt: 'Coastal Devon home interior decorated by Sistine',
  },
  {
    url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=2000&q=85',
    alt: 'Pristine exterior painted facade in South Devon',
  },
  {
    url: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=2000&q=85',
    alt: 'Period drawing room painted in heritage neutral tones',
  },
  {
    url: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=2000&q=85',
    alt: 'Specialist wallpapering and woodwork finish',
  },
];

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === HERO_SLIDES.length - 1 ? 0 : prev + 1));
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === 0 ? HERO_SLIDES.length - 1 : prev - 1));
  }, []);

  // Auto-advance slides every 7 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 7000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <section className="relative h-[80vh] md:h-[92vh] w-full overflow-hidden bg-slate-950 text-white flex items-center justify-center">
      
      {/* Background Carousel Slides with Ken Burns Effect */}
      {HERO_SLIDES.map((slide, index) => {
        const isActive = index === currentSlide;
        return (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              isActive ? 'opacity-100 z-0' : 'opacity-0 pointer-events-none'
            }`}
          >
            <div className={`relative w-full h-full ${isActive ? 'animate-ken-burns' : ''}`}>
              <Image
                src={slide.url}
                alt={slide.alt}
                fill
                sizes="100vw"
                className="object-cover brightness-75 contrast-105"
                priority={index === 0}
              />
            </div>
            {/* Subtle cinematic gradient overlays */}
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-slate-950/40 to-slate-950/80 pointer-events-none" />
          </div>
        );
      })}

      {/* Hero Center Overlay Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6 space-y-6 sm:space-y-8 animate-in fade-in duration-700">
        
        {/* Circular Sistine Dome Badge */}
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

      {/* Slide Navigation Controls at Bottom (The Ship Inn style) */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
        {/* Dots */}
        <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/20">
          {HERO_SLIDES.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setCurrentSlide(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`transition-all duration-300 rounded-full ${
                currentSlide === idx
                  ? 'w-6 h-2 bg-amber-400 shadow-sm'
                  : 'w-2 h-2 bg-white/60 hover:bg-white'
              }`}
            />
          ))}
        </div>

        {/* Prev / Next Mini Controls */}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={prevSlide}
            aria-label="Previous slide"
            className="w-8 h-8 rounded-full border border-white/40 bg-black/40 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-all"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={nextSlide}
            aria-label="Next slide"
            className="w-8 h-8 rounded-full border border-white/40 bg-black/40 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-all"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

    </section>
  );
}
