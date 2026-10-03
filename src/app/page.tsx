'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Phone, 
  Mail, 
  ArrowRight, 
  Paintbrush, 
  Home, 
  Layers
} from 'lucide-react';
import HeroCarousel from '@/components/HeroCarousel';
import { BUSINESS_CONFIG } from '@/data/initialData';

export default function HomePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Painter',
    'name': 'Sistine Professional Decorators',
    'description': 'Professional residential painting and decorating services in Dartmouth and the South Hams. Interior and exterior painting, specialist wallpapering, and refurbishment.',
    'image': 'https://sistine.itsmyapp.co.uk/images/hero-1.jpg',
    '@id': 'https://sistine.itsmyapp.co.uk',
    'url': 'https://sistine.itsmyapp.co.uk',
    'telephone': BUSINESS_CONFIG.phone,
    'priceRange': '££',
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': '15 Southtown',
      'addressLocality': 'Dartmouth',
      'addressRegion': 'Devon',
      'postalCode': BUSINESS_CONFIG.postcode,
      'addressCountry': 'GB',
    },
    'geo': {
      '@type': 'GeoCoordinates',
      'latitude': 50.3488,
      'longitude': -3.5794,
    },
    'areaServed': [
      { '@type': 'City', 'name': 'Dartmouth' },
      { '@type': 'AdministrativeArea', 'name': 'South Hams' },
      { '@type': 'AdministrativeArea', 'name': 'Devon' },
      { '@type': 'Place', 'name': 'Kingswear' },
      { '@type': 'Place', 'name': 'Totnes' },
    ],
    'openingHoursSpecification': [
      {
        '@type': 'OpeningHoursSpecification',
        'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        'opens': '08:00',
        'closes': '17:30',
      },
    ],
    'hasOfferCatalog': {
      '@type': 'OfferCatalog',
      'name': 'Painting and Decorating Services',
      'itemListElement': [
        {
          '@type': 'Offer',
          'itemOffered': {
            '@type': 'Service',
            'name': 'Interior Painting & Decorating',
          },
        },
        {
          '@type': 'Offer',
          'itemOffered': {
            '@type': 'Service',
            'name': 'Exterior Painting & Facades',
          },
        },
        {
          '@type': 'Offer',
          'itemOffered': {
            '@type': 'Service',
            'name': 'Specialist Wallpapering',
          },
        },
      ],
    },
    'sameAs': [
      BUSINESS_CONFIG.facebook,
    ],
  };

  const services = [
    {
      title: 'Interior Painting & Decorating',
      href: '/projects?category=Interior',
      icon: Home,
      gradient: 'from-slate-700 to-slate-900',
      description: 'Transforming living spaces, bedrooms, hallways, and woodwork with clean lines, smooth preparation, and durable finishes.',
      buttonText: 'Explore Interior Work',
    },
    {
      title: 'Exterior Painting & Facades',
      href: '/projects?category=Exterior',
      icon: Paintbrush,
      gradient: 'from-blue-700 to-slate-900',
      description: 'Long-lasting weather protection for coastal masonry, rendered walls, exterior timbers, and front doors throughout Dartmouth.',
      buttonText: 'View Exterior Projects',
    },
    {
      title: 'Specialist Wallpapering',
      href: '/projects?category=Wallpapering',
      icon: Layers,
      gradient: 'from-amber-700 to-slate-900',
      description: 'Precision hanging of designer feature wallpapers, lining paper, and pattern matching with meticulous care.',
      buttonText: 'See Wallpaper Finishes',
    },
  ];

  return (
    <div className="space-y-0 pb-0">
      {/* JSON-LD Local SEO Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* 1. HERO CAROUSEL WITH KEN BURNS EFFECT */}
      <HeroCarousel />

      {/* 2. INTRODUCTION & STORY */}
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
                Based in Dartmouth, Sistine Decorators provides professional interior and exterior painting services for homeowners, holiday cottages, and residential properties across Dartmouth and the wider South Hams.
              </p>
              <p>
                We believe that good decorating is built on thorough preparation, attention to detail, and a tidy, respectful way of working in your home. Whether refreshing a single room, wallpapering a feature wall, or repainting an entire coastal facade, we deliver clean, lasting results.
              </p>
            </div>
          </div>

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

      {/* 3. CALL TO ACTION SECTION */}
      <section className="relative py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 text-white overflow-hidden">
        <div className="relative max-w-4xl mx-auto text-center px-6 space-y-6">
          <span className="inline-block bg-amber-400/20 text-amber-300 font-sans font-semibold text-xs uppercase tracking-widest px-4 py-1.5 rounded-full border border-amber-400/30">
            Dartmouth &amp; South Hams
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-normal text-white tracking-tight">
            Planning Your Next Decorating Project?
          </h2>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto font-light leading-relaxed">
            Contact Sistine Professional Decorators today for friendly advice and a straightforward, no-obligation quotation for your home.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <a
              href={`tel:${BUSINESS_CONFIG.phoneRaw || '07803258507'}`}
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

