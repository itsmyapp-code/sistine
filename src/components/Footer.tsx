import React from 'react';
import Link from 'next/link';
import { Phone, Mail, MapPin, Shield, CheckCircle2, Clock, Lock } from 'lucide-react';
import { BUSINESS_CONFIG } from '@/data/initialData';

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">Footer</h2>
      
      {/* Top Value Assurance Ribbon */}
      <div className="bg-slate-900 border-b border-slate-800 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-sm">
          <div className="flex items-center gap-3">
            <Shield className="w-6 h-6 text-amber-400 shrink-0" />
            <div>
              <p className="font-semibold text-white">£5M Comprehensive Liability</p>
              <p className="text-xs text-slate-400">Direct Line Insurance Insured</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-6 h-6 text-amber-400 shrink-0" />
            <div>
              <p className="font-semibold text-white">Clean Site Guarantee</p>
              <p className="text-xs text-slate-400">Mirka HEPA dust-free extraction</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-6 h-6 text-amber-400 shrink-0" />
            <div>
              <p className="font-semibold text-white">City & Guilds Certified</p>
              <p className="text-xs text-slate-400">Master trade craftsmanship</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Clock className="w-6 h-6 text-amber-400 shrink-0" />
            <div>
              <p className="font-semibold text-white">Transparent Estimates</p>
              <p className="text-xs text-slate-400">Guaranteed fixed-price quotes</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Company Brand Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded bg-amber-500 flex items-center justify-center font-bold text-slate-950 text-lg">
                A
              </span>
              <span className="text-xl font-bold tracking-tight text-white">
                Apex Decorating
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Master painting, heritage property restoration, airless spray finishes, and specialist wallpaper hanging across Gloucestershire, Bath, the Cotswolds, and Bristol.
            </p>
            <div className="pt-2 text-xs text-slate-500 space-y-1">
              <p>{BUSINESS_CONFIG.legalName} (Reg: {BUSINESS_CONFIG.registrationNo})</p>
              <p>VAT Reg: {BUSINESS_CONFIG.vatNumber}</p>
            </div>
          </div>

          {/* Direct Contact */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-200">
              Direct Contact
            </h3>
            <ul className="space-y-3 text-sm text-slate-300">
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <a href={`tel:${BUSINESS_CONFIG.phone.replace(/\s+/g, '')}`} className="hover:text-amber-400 font-medium block">
                    {BUSINESS_CONFIG.phone} (Office)
                  </a>
                  <a href={`tel:${BUSINESS_CONFIG.mobile.replace(/\s+/g, '')}`} className="hover:text-amber-400 text-xs text-slate-400 block mt-0.5">
                    {BUSINESS_CONFIG.mobile} (Site Mobile / WhatsApp)
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <a href={`mailto:${BUSINESS_CONFIG.email}`} className="hover:text-amber-400 break-all">
                  {BUSINESS_CONFIG.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <span className="text-xs text-slate-400">
                  {BUSINESS_CONFIG.address}
                </span>
              </li>
            </ul>
          </div>

          {/* Coverage & Services */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-200">
              Coverage & Services
            </h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link href="/projects" className="hover:text-white transition-colors">Interior & Heritage Decorating</Link></li>
              <li><Link href="/projects" className="hover:text-white transition-colors">Exterior Masonry & Silicate Coating</Link></li>
              <li><Link href="/projects" className="hover:text-white transition-colors">Sash Window Care & Bio-Resin Repair</Link></li>
              <li><Link href="/projects" className="hover:text-white transition-colors">Specialist Wallpapering & Murals</Link></li>
              <li><Link href="/projects" className="hover:text-white transition-colors">Fine Finish Kitchen Cabinet Spraying</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Emergency Water Damage Repainting</Link></li>
            </ul>
          </div>

          {/* Compliance & Regulatory Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-200">
              Legal & Compliance
            </h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link href="/terms" className="hover:text-amber-400 transition-colors">Terms of Service</Link></li>
              <li><Link href="/privacy" className="hover:text-amber-400 transition-colors">Privacy Policy (UK GDPR)</Link></li>
              <li><Link href="/cookies" className="hover:text-amber-400 transition-colors">Cookie Policy (DUAA 2025)</Link></li>
              <li><Link href="/accessibility" className="hover:text-amber-400 transition-colors">Accessibility Statement</Link></li>
              <li>
                <Link href="/admin" className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-amber-400 mt-2 transition-colors">
                  <Lock className="w-3.5 h-3.5" />
                  Client & Admin Portal
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Public Transparency Callout (MANDATED TEXT BLOCK) */}
        <div className="mt-12 pt-8 border-t border-slate-800/80">
          <div className="p-5 rounded-lg bg-slate-900/80 border border-slate-800 text-sm text-slate-300">
            <p className="font-semibold text-amber-400 mb-1">
              Data Privacy &amp; Compliance Queries:
            </p>
            <p className="text-slate-300">
              For any questions regarding your data rights, or to submit an inquiry, please contact our Data Privacy Lead directly at{' '}
              <a 
                href="mailto:hello@itsmyapp.co.uk" 
                className="text-amber-400 underline hover:text-amber-300 font-medium"
              >
                hello@itsmyapp.co.uk
              </a>. We formally acknowledge all compliance submissions within 30 days.
            </p>
          </div>

          {/* Copyright & Sub-footer */}
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
            <p>© {new Date().getFullYear()} {BUSINESS_CONFIG.name}. All rights reserved.</p>
            <p>Built for trade excellence &amp; UK regulatory compliance.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
