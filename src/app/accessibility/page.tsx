import React from 'react';
import { Metadata } from 'next';
import { BUSINESS_CONFIG } from '@/data/initialData';

export const metadata: Metadata = {
  title: 'Accessibility Statement',
  description: 'WCAG 2.1 Level AA compliance statement for Apex Decorating & Restoration.',
};

export default function AccessibilityPage() {
  return (
    <div className="py-12 lg:py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      
      <div className="border-b border-slate-200 pb-6 space-y-2">
        <span className="text-xs font-bold uppercase tracking-widest text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
          Digital Inclusivity Standards
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Accessibility Statement (WCAG 2.1 AA)
        </h1>
        <p className="text-sm text-slate-500">
          Effective Date: 27 September 2026 | {BUSINESS_CONFIG.legalName}
        </p>
      </div>

      <div className="prose prose-slate max-w-none space-y-6 text-sm leading-relaxed text-slate-700">
        
        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900">1. Our Commitment</h2>
          <p>
            {BUSINESS_CONFIG.legalName} is committed to ensuring digital accessibility for all visitors, including individuals with visual, auditory, motor, or cognitive disabilities. We continually refine our web infrastructure to align with the <strong>Web Content Accessibility Guidelines (WCAG) 2.1 Level AA</strong> standards.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900">2. Technical Measures &amp; Features Implemented</h2>
          <ul className="list-disc pl-5 space-y-1.5">
            <li><strong>Keyboard Navigation:</strong> All interactive elements, before/after comparison sliders, and modal dialogues are operable using a standard keyboard (Tab, Shift+Tab, Enter, Escape, and Arrow keys).</li>
            <li><strong>Visible Focus Indicators:</strong> High-contrast focus rings (2px solid amber) ensure clear visibility when navigating via assistive devices.</li>
            <li><strong>Screen Reader Semantics:</strong> Full HTML5 semantic markup, descriptive ARIA attributes, and image alt text across all before-and-after project photos.</li>
            <li><strong>Color Contrast:</strong> Minimum 4.5:1 text-to-background contrast ratios for standard copy and 3:1 for large graphical components.</li>
            <li><strong>Skip to Content:</strong> A dedicated skip link at the top of every page allows quick bypass of repeated header navigation.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900">3. Feedback &amp; Assistance</h2>
          <p>
            If you encounter any difficulty accessing content or navigating any part of our website, please contact our team:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Email: <a href={`mailto:${BUSINESS_CONFIG.email}`} className="text-amber-700 underline font-semibold">{BUSINESS_CONFIG.email}</a></li>
            <li>Telephone: <a href={`tel:${BUSINESS_CONFIG.phone.replace(/\s+/g, '')}`} className="text-amber-700 underline font-semibold">{BUSINESS_CONFIG.phone}</a></li>
          </ul>
          <p>
            We welcome your feedback and aim to provide adjustments within 3 business days.
          </p>
        </section>

      </div>
    </div>
  );
}
