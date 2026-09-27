import React from 'react';
import { Metadata } from 'next';
import { BUSINESS_CONFIG } from '@/data/initialData';

export const metadata: Metadata = {
  title: 'Cookie Policy',
  description: 'Strictly necessary cookie parameters and DUAA 2025 compliance details for Apex Decorating.',
};

export default function CookiesPage() {
  return (
    <div className="py-12 lg:py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      
      <div className="border-b border-slate-200 pb-6 space-y-2">
        <span className="text-xs font-bold uppercase tracking-widest text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
          DUAA &amp; PECR Transparency
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Cookie Policy &amp; Storage Notice
        </h1>
        <p className="text-sm text-slate-500">
          Effective Date: 27 September 2026 | {BUSINESS_CONFIG.legalName}
        </p>
      </div>

      <div className="prose prose-slate max-w-none space-y-6 text-sm leading-relaxed text-slate-700">
        
        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900">1. Overview &amp; Statutory Framework</h2>
          <p>
            This Cookie Policy explains how {BUSINESS_CONFIG.legalName} manages cookies and browser local storage on developer.itsmyapp.co.uk in full compliance with the Privacy and Electronic Communications Regulations (PECR), the UK General Data Protection Regulation (UK GDPR), and the statutory exemptions introduced under the <strong>Data (Use and Access) Act (DUAA 2025)</strong>.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900">2. Strictly Necessary &amp; First-Party Local Storage</h2>
          <p>
            We deploy <strong>zero commercial advertising cookies</strong> and zero cross-site data aggregators. The only storage keys utilized by our platform are strictly necessary for security, accessibility, and user preference state:
          </p>

          <div className="overflow-x-auto my-4">
            <table className="min-w-full text-xs border border-slate-200 divide-y divide-slate-200">
              <thead className="bg-slate-50 font-bold text-slate-900 text-left">
                <tr>
                  <th className="p-3">Key / Cookie Name</th>
                  <th className="p-3">Type</th>
                  <th className="p-3">Purpose</th>
                  <th className="p-3">Duration</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-700">
                <tr>
                  <td className="p-3 font-mono font-semibold">apex_cookie_consent_v1</td>
                  <td className="p-3">Local Storage</td>
                  <td className="p-3">Stores your explicit consent or rejection preference to avoid recurring banners.</td>
                  <td className="p-3">12 Months</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono font-semibold">apex_admin_auth_session</td>
                  <td className="p-3">Session Storage</td>
                  <td className="p-3">Maintains temporary PIN authorization state for the admin management portal.</td>
                  <td className="p-3">Browser Session Close</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono font-semibold">apex_projects_data_v1</td>
                  <td className="p-3">Local Storage</td>
                  <td className="p-3">Caches recently published portfolio case studies for offline/fast retrieval.</td>
                  <td className="p-3">Persistent (Client-side)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900">3. Equal Prominence &amp; First-Layer Rejection</h2>
          <p>
            In compliance with UK Information Commissioner&rsquo;s Office (ICO) mandates and the Digital Markets, Competition and Consumers Act (DMCCA), our consent layer gives &ldquo;Reject All&rdquo; and &ldquo;Accept All&rdquo; options identical visual styling, contrast, and font sizing. Users are never subjected to dark patterns or convoluted multi-click opt-out trees.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900">4. Managing Your Preferences</h2>
          <p>
            You can clear or block cookies at any time via your web browser settings (Chrome, Safari, Firefox, Edge). Clearing your browser cache will reset your cookie consent choice upon your next visit.
          </p>
        </section>

      </div>
    </div>
  );
}
