'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Phone, MessageSquare, Menu, X, Shield, Sparkles, MapPin } from 'lucide-react';
import { BUSINESS_CONFIG } from '@/data/initialData';
import QuoteModal from './QuoteModal';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Projects & Portfolio', href: '/projects' },
    { name: 'Client Reviews', href: '/reviews' },
    { name: 'Contact & Areas', href: '/contact' },
  ];

  return (
    <>
      {/* Top Value / Emergency Direct Call Ribbon */}
      <div className="bg-slate-950 text-slate-200 border-b border-slate-800 text-xs py-2 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-amber-400 font-medium">
              <Shield className="w-3.5 h-3.5" />
              Fully Insured £5M
            </span>
            <span className="hidden md:inline-flex items-center gap-1 text-slate-400">
              <MapPin className="w-3 h-3 text-slate-400" />
              Covering Cheltenham, Bath, Bristol &amp; Cotswolds
            </span>
          </div>

          <div className="flex items-center gap-4 ml-auto sm:ml-0">
            {/* Direct Phone */}
            <a
              href={`tel:${BUSINESS_CONFIG.phone.replace(/\s+/g, '')}`}
              className="flex items-center gap-1.5 hover:text-amber-400 font-medium transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span>Call: <strong className="text-white">{BUSINESS_CONFIG.phone}</strong></span>
            </a>

            {/* Direct WhatsApp */}
            <a
              href={`https://wa.me/447700900842?text=Hello%20Apex%20Decorating,%20I%20would%20like%20to%20request%20a%20quote`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp Us</span>
            </a>
          </div>

        </div>
      </div>

      {/* Main Header Bar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Brand Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-amber-400 font-extrabold text-xl shadow-md group-hover:scale-105 transition-transform">
                A
              </div>
              <div>
                <span className="block font-display font-extrabold text-lg sm:text-xl text-slate-900 tracking-tight leading-tight">
                  Apex Decorating
                </span>
                <span className="block text-[11px] font-semibold text-amber-700 tracking-widest uppercase">
                  &amp; Restoration
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`text-sm font-semibold transition-colors relative py-1 ${
                      isActive 
                        ? 'text-amber-700' 
                        : 'text-slate-700 hover:text-amber-700'
                    }`}
                  >
                    {link.name}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-600 rounded-full" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Desktop Action Buttons */}
            <div className="hidden sm:flex items-center gap-3">
              <button
                type="button"
                onClick={() => setIsQuoteModalOpen(true)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-amber-600 hover:bg-amber-500 active:bg-amber-700 text-white font-bold text-sm shadow-md hover:shadow-trade-gold transition-all"
              >
                <Sparkles className="w-4 h-4" />
                <span>Request Free Quote</span>
              </button>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex items-center gap-2 lg:hidden">
              <button
                type="button"
                onClick={() => setIsQuoteModalOpen(true)}
                className="sm:hidden px-3 py-1.5 rounded-md bg-amber-600 text-white font-bold text-xs shadow-sm"
              >
                Free Quote
              </button>
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-lg text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                aria-label="Toggle navigation menu"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-4 pb-6 space-y-3 shadow-xl">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded-lg font-semibold text-sm ${
                  pathname === link.href
                    ? 'bg-amber-50 text-amber-800'
                    : 'text-slate-800 hover:bg-slate-50'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-3 border-t border-slate-100 space-y-2">
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsQuoteModalOpen(true);
                }}
                className="w-full py-3 rounded-lg bg-amber-600 text-white font-bold text-sm text-center shadow-md block"
              >
                Request Free Site Survey / Quote
              </button>
              <a
                href={`tel:${BUSINESS_CONFIG.phone.replace(/\s+/g, '')}`}
                className="w-full py-2.5 rounded-lg border border-slate-300 text-slate-800 font-semibold text-sm text-center flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 text-amber-600" />
                Call {BUSINESS_CONFIG.phone}
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Quote Modal */}
      <QuoteModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
      />
    </>
  );
}
