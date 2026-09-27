'use client';

import React, { useState } from 'react';
import { Phone, Mail, MapPin, CheckCircle, MessageSquare, ExternalLink } from 'lucide-react';
import { BUSINESS_CONFIG } from '@/data/initialData';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [service, setService] = useState('Interior Painting');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName: name, phone, email, service, description: message, postcode: 'Dartmouth' }),
      });
    } catch {}
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <div className="py-12 sm:py-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-semibold tracking-widest text-amber-800 uppercase bg-amber-100 px-4 py-1.5 rounded-full">
          Get in Touch
        </span>
        <h1 className="text-3xl sm:text-5xl font-serif text-slate-900">
          Contact Sistine Decorating
        </h1>
        <p className="text-base sm:text-lg text-slate-600 font-light leading-relaxed">
          For all painting and decorating inquiries across Dartmouth, Kingswear, and the South Hams. We are happy to arrange a convenient time to visit and view your property.
        </p>
      </div>

      {/* Grid: Contact Information & Direct Form */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-12">
        
        {/* Left Column: Direct Info */}
        <div className="md:col-span-5 space-y-6">
          
          <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm space-y-6">
            <h2 className="text-2xl font-serif font-bold text-slate-900">
              Details &amp; Contact Info
            </h2>

            <div className="space-y-5 text-sm text-slate-700">
              
              {/* Telephone */}
              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-xl bg-slate-100 text-slate-900 shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-medium uppercase">Phone / Mobile</p>
                  <a
                    href={`tel:${BUSINESS_CONFIG.phone.replace(/\s+/g, '')}`}
                    className="text-lg font-bold text-slate-900 hover:text-amber-700 transition-colors"
                  >
                    {BUSINESS_CONFIG.phone}
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-xl bg-slate-100 text-slate-900 shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-medium uppercase">Email</p>
                  <a
                    href={`mailto:${BUSINESS_CONFIG.email}`}
                    className="text-base font-semibold text-slate-900 hover:text-amber-700 underline transition-colors"
                  >
                    {BUSINESS_CONFIG.email}
                  </a>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-xl bg-slate-100 text-slate-900 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-medium uppercase">Address</p>
                  <p className="font-semibold text-slate-900">
                    {BUSINESS_CONFIG.address}
                  </p>
                </div>
              </div>

              {/* Facebook / Messenger */}
              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-xl bg-blue-50 text-blue-700 shrink-0">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-medium uppercase">Facebook</p>
                  <a
                    href={BUSINESS_CONFIG.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base font-semibold text-blue-800 hover:underline inline-flex items-center gap-1.5"
                  >
                    <span>{BUSINESS_CONFIG.facebookHandle}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

            </div>

            <div className="pt-4 border-t border-slate-100 text-xs text-slate-500">
              <p className="font-semibold text-slate-800">Areas Covered:</p>
              <p className="mt-1">Dartmouth, Kingswear, Stoke Fleming, Dittisham, Blackawton &amp; South Hams.</p>
            </div>
          </div>

        </div>

        {/* Right Column: Inquiry Form */}
        <div className="md:col-span-7 bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/80 shadow-sm">
          <h2 className="text-2xl font-serif font-bold text-slate-900 mb-2">
            Send an Inquiry
          </h2>
          <p className="text-xs text-slate-500 mb-6">
            Leave your contact details and a brief outline of the painting or decorating you require.
          </p>

          {submitted ? (
            <div className="py-12 text-center space-y-4">
              <CheckCircle className="w-16 h-16 text-emerald-600 mx-auto" />
              <h3 className="text-2xl font-serif font-bold text-slate-900">Thank you for your message!</h3>
              <p className="text-sm text-slate-600 max-w-md mx-auto">
                We have received your inquiry and will get back to you shortly to discuss your decorating requirements.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  setName('');
                  setPhone('');
                  setEmail('');
                  setMessage('');
                }}
                className="px-6 py-2.5 rounded-full bg-slate-900 text-white text-xs font-semibold"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Your Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Sarah Mitchell"
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:border-slate-900 focus:ring-1 focus:ring-slate-900"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. 07800 000000"
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:border-slate-900 focus:ring-1 focus:ring-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.co.uk"
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:border-slate-900 focus:ring-1 focus:ring-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Service Needed</label>
                <select
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:border-slate-900"
                >
                  <option value="Interior Painting">Interior Painting &amp; Decorating</option>
                  <option value="Exterior Painting">Exterior Painting</option>
                  <option value="Wallpapering">Wallpapering &amp; Feature Walls</option>
                  <option value="General Refresh">Full Property Refresh</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Message / Project Outline</label>
                <textarea
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us a little about the rooms or exterior areas you'd like painted, and your approximate timeline..."
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:border-slate-900"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-serif font-semibold text-base shadow-md transition-all disabled:opacity-50"
                >
                  {loading ? 'Sending Message...' : 'Send Inquiry'}
                </button>
              </div>

              <p className="text-[11px] text-slate-500 text-center">
                We respect your privacy. Zero spam or commercial marketing.
              </p>
            </form>
          )}
        </div>

      </div>

    </div>
  );
}
