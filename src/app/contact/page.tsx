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
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    try {
      const response = await fetch('https://formspree.io/f/mzedwzjr', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          name,
          phone,
          email,
          service,
          message,
          _subject: `New Decorating Inquiry from ${name} (${service})`,
        }),
      });

      if (response.ok) {
        setSubmitted(true);
        // Also sync lead into MailerLite in background
        fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, phone, email, service, message }),
        }).catch(() => {});
      } else {
        const data = await response.json();
        if (data && data.errors) {
          setErrorMessage(data.errors.map((err: any) => err.message).join(', '));
        } else {
          setErrorMessage('There was a problem submitting your form. Please try again or call us directly.');
        }
      }
    } catch (err) {
      setErrorMessage('Network error submitting your form. Please call us directly on 07803 258507.');
    } finally {
      setLoading(false);
    }
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
          For all painting and decorating inquiries across Dartmouth and the wider South Hams. We are happy to arrange a convenient time to visit and view your property.
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
                    href={`tel:${BUSINESS_CONFIG.phoneRaw || '07803258507'}`}
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

              {/* WhatsApp */}
              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600 shrink-0">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.669-.699c.983.538 1.849.78 2.791.78h.005c3.182 0 5.768-2.587 5.768-5.766.001-3.182-2.585-5.766-5.765-5.766zm6.845 5.765c-.001 3.774-3.072 6.844-6.845 6.844-.972 0-2.18-.284-3.149-.785l-3.482.913.931-3.398c-.628-1.077-.962-2.317-.962-3.574.002-3.773 3.072-6.844 6.846-6.844 3.774 0 6.844 3.071 6.844 6.844zm-1.879 2.573c-.104-.174-.383-.279-.8-.487-.417-.21-2.464-1.216-2.846-1.355-.382-.14-.66-.21-.938.21-.278.418-1.078 1.357-1.321 1.636-.243.279-.487.314-.904.105s-1.764-.651-3.361-2.073c-1.242-1.107-2.08-2.474-2.323-2.892-.243-.418-.026-.644.183-.852.188-.187.418-.488.627-.732.209-.244.279-.418.418-.697.139-.279.07-.523-.035-.732-.105-.209-.939-2.264-1.287-3.1-.339-.815-.684-.705-.939-.718-.243-.013-.522-.016-.8-.016s-.731.105-1.114.523c-.383.418-1.462 1.429-1.462 3.486s1.497 4.043 1.706 4.322c.209.279 2.946 4.498 7.136 6.309 3.48 1.503 4.19 1.205 4.939 1.135.748-.07 2.464-1.008 2.812-1.983.348-.976.348-1.812.243-1.986z"/>
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-medium uppercase">WhatsApp</p>
                  <a
                    href={`https://wa.me/${BUSINESS_CONFIG.whatsapp || '447803258507'}?text=${encodeURIComponent('Hello Sistine Decorating, I would like to inquire about painting and decorating services.')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base font-semibold text-emerald-700 hover:text-emerald-800 hover:underline inline-flex items-center gap-1.5 transition-colors"
                  >
                    <span>Message on WhatsApp ({BUSINESS_CONFIG.whatsappDisplay || BUSINESS_CONFIG.phone})</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Facebook / Messenger */}
              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-xl bg-[#1877F2]/10 text-[#1877F2] shrink-0">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-medium uppercase">Facebook</p>
                  <a
                    href={BUSINESS_CONFIG.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base font-semibold text-[#1877F2] hover:underline inline-flex items-center gap-1.5"
                  >
                    <span>{BUSINESS_CONFIG.facebookHandle}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

            </div>

            <div className="pt-4 border-t border-slate-100 text-xs text-slate-500">
              <p className="font-semibold text-slate-800">Areas Covered:</p>
              <p className="mt-1">Dartmouth &amp; South Hams.</p>
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

          {errorMessage && (
            <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-sm text-red-700">
              {errorMessage}
            </div>
          )}

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
                  setErrorMessage('');
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
                  name="name"
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
                    name="phone"
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
                    name="email"
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
                  name="service"
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:border-slate-900"
                >
                  <option value="Interior Painting">Interior Painting &amp; Decorating</option>
                  <option value="Exterior Painting">Exterior Painting</option>
                  <option value="General Refresh">Full Property Refresh</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Message / Project Outline</label>
                <textarea
                  name="message"
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
