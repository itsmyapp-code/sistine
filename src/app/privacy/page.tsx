import React from 'react';
import { Metadata } from 'next';
import { BUSINESS_CONFIG } from '@/data/initialData';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'UK GDPR and DUAA compliant privacy policy for Apex Decorating & Restoration.',
};

export default function PrivacyPage() {
  return (
    <div className="py-12 lg:py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      
      <div className="border-b border-slate-200 pb-6 space-y-2">
        <span className="text-xs font-bold uppercase tracking-widest text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
          UK GDPR &amp; DUAA Compliance
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Privacy Policy &amp; Data Rights Notice
        </h1>
        <p className="text-sm text-slate-500">
          Last Updated: 27 September 2026 | Controller: {BUSINESS_CONFIG.legalName}
        </p>
      </div>

      {/* Mandatory Public Transparency Callout Block */}
      <div className="p-6 rounded-2xl bg-amber-50/80 border border-amber-200 text-slate-800 space-y-2">
        <p className="font-bold text-amber-900 text-base">
          Data Privacy &amp; Compliance Queries:
        </p>
        <p className="text-sm text-slate-700 leading-relaxed">
          For any questions regarding your data rights, or to submit an inquiry, please contact our Data Privacy Lead directly at{' '}
          <a 
            href={`mailto:${BUSINESS_CONFIG.dataPrivacyLeadEmail}`} 
            className="text-amber-800 font-bold underline hover:text-amber-900"
          >
            {BUSINESS_CONFIG.dataPrivacyLeadEmail}
          </a>. We formally acknowledge all compliance submissions within 30 days.
        </p>
      </div>

      <div className="prose prose-slate max-w-none space-y-6 text-sm leading-relaxed text-slate-700">
        
        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900">1. Data Controller Identification</h2>
          <p>
            {BUSINESS_CONFIG.legalName} (Company No. {BUSINESS_CONFIG.registrationNo}) operates as the Data Controller under the UK General Data Protection Regulation (UK GDPR), Data Protection Act 2018 (DPA 2018), and Data (Use and Access) Act (DUAA 2025).
          </p>
          <p>
            Our designated Data Privacy Lead can be contacted at <strong>{BUSINESS_CONFIG.dataPrivacyLeadEmail}</strong>.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900">2. Principle of Data Minimization &amp; Information We Collect</h2>
          <p>
            In accordance with UK GDPR Article 5(1)(c), we enforce strict data minimization. We only collect details essential to providing decorating quotations and executing contractual works:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Identity Data:</strong> Full name, company title (if commercial).</li>
            <li><strong>Contact Data:</strong> Telephone number, email address, postal address, site location postcode.</li>
            <li><strong>Project Data:</strong> Architectural photographs voluntarily uploaded for estimate scoping, room dimensions, paint specifications.</li>
            <li><strong>Financial Data:</strong> Bank transfer confirmation and invoice history (no raw card data is retained on web servers).</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900">3. Lawful Grounds for Processing</h2>
          <p>We process personal data under the following Article 6 lawful bases:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Contract Performance (Article 6(1)(b)):</strong> Necessary to conduct on-site surveys, prepare quotes, purchase paint materials, and fulfill decorating agreements.</li>
            <li><strong>Legal Obligation (Article 6(1)(c)):</strong> Maintaining HMRC financial and tax accounting records for the statutory 6-year period.</li>
            <li><strong>Legitimate Interest (Article 6(1)(f)):</strong> First-party security monitoring, preventing spam on quote forms, and direct follow-ups regarding requested estimates.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900">4. Zero Surveillance &amp; Cookie Architecture</h2>
          <p>
            We operate a <strong>Zero Telemetry &amp; Zero Surveillance</strong> website architecture. We deploy zero third-party behavioral advertising trackers, zero invasive pixel beacons, and zero cross-site profiling scripts.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900">5. Subject Access Requests (SAR) &amp; Your Statutory Rights</h2>
          <p>Under UK GDPR and DUAA, you hold specific enforceable rights:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Right of Access:</strong> Obtain confirmation of whether your data is processed and receive a free copy of your personal data file.</li>
            <li><strong>Right to Rectification:</strong> Request correction of inaccurate property addresses or telephone numbers.</li>
            <li><strong>Right to Erasure (&ldquo;Right to be Forgotten&rdquo;):</strong> Request deletion of contact files where statutory HMRC retention no longer applies.</li>
            <li><strong>Right to Restrict Processing:</strong> Limit how we process your contact details.</li>
          </ul>
          <p>
            To exercise any of these rights, email <strong>{BUSINESS_CONFIG.dataPrivacyLeadEmail}</strong>. We enforce a statutory SLA to acknowledge and fulfill requests within <strong>30 calendar days</strong>.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900">6. Supervisory Authority Complaints</h2>
          <p>
            You have the right to lodge a complaint with the UK supervisory authority: Information Commissioner&rsquo;s Office (ICO), Wycliffe House, Water Lane, Wilmslow, Cheshire, SK9 5AF (<a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer" className="text-amber-700 underline">ico.org.uk</a>).
          </p>
        </section>

      </div>
    </div>
  );
}
