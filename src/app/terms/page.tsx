import React from 'react';
import { Metadata } from 'next';
import { BUSINESS_CONFIG } from '@/data/initialData';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms and conditions of trade for Apex Decorating & Restoration.',
};

export default function TermsPage() {
  return (
    <div className="py-12 lg:py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      
      <div className="border-b border-slate-200 pb-6 space-y-2">
        <span className="text-xs font-bold uppercase tracking-widest text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
          Legal &amp; Contractual Terms
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Terms of Service &amp; Trade Agreement
        </h1>
        <p className="text-sm text-slate-500">
          Effective Date: 27 September 2026 | {BUSINESS_CONFIG.legalName}
        </p>
      </div>

      <div className="prose prose-slate max-w-none space-y-6 text-sm leading-relaxed text-slate-700">
        
        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900">1. Quotations, Estimates &amp; Validity</h2>
          <p>
            1.1. All written quotations issued by {BUSINESS_CONFIG.legalName} (&ldquo;Apex&rdquo;) remain valid for acceptance for <strong>30 calendar days</strong> from the date of issue.
          </p>
          <p>
            1.2. Quotations are strictly based on visual site inspections and agreed specifications. Any unforeseen structural decay, severe hidden lime plaster failure, or concealed timber dry-rot uncovered during surface preparation will be documented with photographic evidence and quoted as a formal variation prior to commencement of additional remedial work.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900">2. Client Obligations &amp; Property Access</h2>
          <p>
            2.1. <strong>Site Access:</strong> The client agrees to provide clear, uninterrupted access to the specified working areas during standard trade hours ({BUSINESS_CONFIG.workingHours}) and provide access to continuous running water and electrical power.
          </p>
          <p>
            2.2. <strong>Furnishings &amp; Valuables:</strong> While Apex utilizes high-grade heavy cotton dust-sheets and Corex floor protection, clients are requested to remove delicate ornaments, breakables, and small personal possessions from rooms prior to commencement.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900">3. Paint Specifications, Finishes &amp; Color Match</h2>
          <p>
            3.1. Paint formulations (including Farrow &amp; Ball, Little Greene, Keim, Benjamin Moore, and Zinsser) are mixed to standard manufacturer tolerances. Batch variations can occur between separate production lots.
          </p>
          <p>
            3.2. Color samples applied to walls or swatches provided by designers are indicative. Sheen levels (e.g. 3% dead matte vs 20% eggshell) will reflect natural lighting conditions unique to each room.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900">4. Payment Terms &amp; Milestones</h2>
          <p>
            4.1. Residential contracts with a total value exceeding £1,500 may require a 20% material mobilization deposit upon booking to secure scheduled trade dates and order bespoke paint formulations.
          </p>
          <p>
            4.2. Interim milestone payments may apply to multi-week renovation schedules as detailed in the quotation schedule. The balance is due within 7 calendar days of practical completion and snagging sign-off.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900">5. 24-Month Craftsmanship Warranty &amp; Limitation of Liability</h2>
          <p>
            5.1. Apex warrants all internal and external coatings against flaking, bubbling, or peeling arising from workmanship defects for a period of <strong>24 months</strong> from completion.
          </p>
          <p>
            5.2. Warranty exclusions: The guarantee does not cover structural ground settlement cracking, active water leaks originating from internal plumbing or roof failure, moisture ingress beyond agreed scope, or mechanical client impacts.
          </p>
          <p>
            5.3. Liability is supported by {BUSINESS_CONFIG.insuranceCoverage}.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900">6. Governing Law &amp; Jurisdiction</h2>
          <p>
            6.1. These terms are governed by the laws of England &amp; Wales, and the parties submit to the exclusive jurisdiction of the English courts.
          </p>
        </section>

      </div>
    </div>
  );
}
