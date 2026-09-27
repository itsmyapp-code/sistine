'use client';

import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Shield, 
  AlertTriangle, 
  CheckCircle2, 
  Sparkles,
  Upload,
  X
} from 'lucide-react';
import { BUSINESS_CONFIG } from '@/data/initialData';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    postcode: '',
    address: '',
    service: 'Interior Decorating',
    timeframe: 'Within 2 - 4 Weeks',
    description: '',
  });

  const [photos, setPhotos] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotos((prev) => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removePhoto = (index: number) => {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, uploadedPhotos: photos }),
      });
    } catch {
      // Local fallback
    }
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  return (
    <div className="py-12 lg:py-16 space-y-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold uppercase tracking-widest text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
          Get in Touch
        </span>
        <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          Direct Contact &amp; Site Surveys
        </h1>
        <p className="text-base text-slate-600 leading-relaxed">
          Request an on-site consultation, inquire about upcoming availability, or request an emergency repair assessment.
        </p>
      </div>

      {/* Emergency Repair Alert Box */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
          <div>
            <h2 className="text-sm font-bold text-amber-900">Urgent Timber Rot &amp; Water Damage Assessments</h2>
            <p className="text-xs text-amber-800 mt-0.5">
              Experiencing active water ingress, burst pipe ceiling damage, or rotted window frames requiring immediate resin stabilization? Call our priority site mobile.
            </p>
          </div>
        </div>
        <a
          href={`tel:${BUSINESS_CONFIG.mobile.replace(/\s+/g, '')}`}
          className="px-4 py-2 bg-amber-700 hover:bg-amber-800 text-white font-bold text-xs rounded-lg shrink-0 transition-colors"
        >
          Priority Site Line: {BUSINESS_CONFIG.mobile}
        </a>
      </div>

      {/* Main Grid: Contact Cards & Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Direct Details */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Card: Office & Mobile */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-trade space-y-5">
            <h2 className="text-base font-bold text-slate-900 uppercase tracking-wider">
              Direct Channels
            </h2>
            <div className="space-y-4 text-sm text-slate-700">
              <div className="flex items-start gap-3.5">
                <div className="p-2 rounded-lg bg-amber-50 text-amber-700 shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-semibold uppercase">Office Landline</p>
                  <a href={`tel:${BUSINESS_CONFIG.phone.replace(/\s+/g, '')}`} className="font-bold text-slate-900 hover:text-amber-700 text-base">
                    {BUSINESS_CONFIG.phone}
                  </a>
                  <p className="text-xs text-slate-400 mt-0.5">Quotes, schedules &amp; invoices</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="p-2 rounded-lg bg-emerald-50 text-emerald-700 shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-semibold uppercase">Site Mobile &amp; WhatsApp</p>
                  <a href={`tel:${BUSINESS_CONFIG.mobile.replace(/\s+/g, '')}`} className="font-bold text-slate-900 hover:text-amber-700 text-base">
                    {BUSINESS_CONFIG.mobile}
                  </a>
                  <p className="text-xs text-slate-400 mt-0.5">Direct line to senior craftsman</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="p-2 rounded-lg bg-slate-100 text-slate-700 shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-semibold uppercase">Direct Email</p>
                  <a href={`mailto:${BUSINESS_CONFIG.email}`} className="font-bold text-slate-900 hover:text-amber-700 break-all">
                    {BUSINESS_CONFIG.email}
                  </a>
                  <p className="text-xs text-slate-400 mt-0.5">Send blueprints, specs &amp; tender docs</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="p-2 rounded-lg bg-slate-100 text-slate-700 shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-semibold uppercase">Registered Workshop</p>
                  <p className="font-medium text-slate-800 text-xs leading-relaxed">
                    {BUSINESS_CONFIG.address}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Card: Working Hours & Insurance */}
          <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-7 border border-slate-800 space-y-4">
            <h2 className="text-base font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-400" />
              Operating Hours
            </h2>
            <p className="text-xs text-slate-300 leading-relaxed">
              {BUSINESS_CONFIG.workingHours}
            </p>
            <div className="pt-3 border-t border-slate-800 flex items-center gap-2 text-xs text-amber-400">
              <Shield className="w-4 h-4 shrink-0" />
              <span>{BUSINESS_CONFIG.insuranceCoverage}</span>
            </div>
          </div>

        </div>

        {/* Right Column: Full Inquiry Form */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-trade">
          <h2 className="text-xl font-bold text-slate-900 mb-2">
            Submit Your Quote Request
          </h2>
          <p className="text-xs text-slate-500 mb-6">
            Fill out the details below. We examine each inquiry thoroughly and respond within 24 business hours.
          </p>

          {isSubmitted ? (
            <div className="text-center py-12 space-y-4">
              <CheckCircle2 className="w-16 h-16 text-emerald-600 mx-auto" />
              <h4 className="text-2xl font-bold text-slate-900">Inquiry Sent Successfully!</h4>
              <p className="text-sm text-slate-600 max-w-md mx-auto">
                Thank you for contacting Apex Decorating &amp; Restoration. We will review your specification and reach out promptly.
              </p>
              <button
                type="button"
                onClick={() => {
                  setIsSubmitted(false);
                  setFormData({
                    fullName: '',
                    phone: '',
                    email: '',
                    postcode: '',
                    address: '',
                    service: 'Interior Decorating',
                    timeframe: 'Within 2 - 4 Weeks',
                    description: '',
                  });
                  setPhotos([]);
                }}
                className="px-6 py-2.5 bg-slate-900 text-white font-semibold text-xs rounded-lg"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. James & Fiona Miller"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Telephone *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="e.g. 07700 900 123"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@example.com"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Property Postcode *</label>
                  <input
                    type="text"
                    required
                    value={formData.postcode}
                    onChange={(e) => setFormData({ ...formData, postcode: e.target.value })}
                    placeholder="e.g. GL50 1QZ"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Service Required</label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:border-amber-500"
                  >
                    <option value="Interior Decorating">Interior Decorating &amp; Painting</option>
                    <option value="Exterior Masonry & Timber">Exterior Masonry &amp; Silicate</option>
                    <option value="Sash Window Care & Restoration">Sash Window Bio-Resin Repair</option>
                    <option value="Wallpapering & Murals">Specialist Wallpapering</option>
                    <option value="Woodwork & Kitchen Spraying">Kitchen Cabinet Spraying</option>
                    <option value="Commercial Decorating">Commercial &amp; Retail Refits</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Target Timeline</label>
                  <select
                    value={formData.timeframe}
                    onChange={(e) => setFormData({ ...formData, timeframe: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:border-amber-500"
                  >
                    <option value="Urgent / Within 7 Days">Urgent / Within 7 Days</option>
                    <option value="Within 2 - 4 Weeks">Within 2 - 4 Weeks</option>
                    <option value="Next 1 - 3 Months">Next 1 - 3 Months</option>
                    <option value="Flexible / Planning Ahead">Flexible / Planning Ahead</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Project Details &amp; Notes</label>
                <textarea
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Tell us about the property, rooms, ceiling heights, timber damage or desired finishes..."
                  className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-sm focus:border-amber-500"
                />
              </div>

              {/* Photo Upload */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                  Attach Site Photos (Optional)
                </label>
                <label className="flex items-center gap-2 px-4 py-2 border border-dashed border-slate-400 rounded-lg bg-slate-50 hover:bg-amber-50/50 cursor-pointer text-xs text-slate-700 transition-colors w-fit">
                  <Upload className="w-4 h-4 text-amber-600" />
                  <span>Upload Room / Window Photos</span>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                </label>

                {photos.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {photos.map((p, idx) => (
                      <div key={idx} className="relative w-16 h-16 rounded-lg overflow-hidden border border-slate-200 group">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={p} alt={`Upload ${idx + 1}`} className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => removePhoto(idx)}
                          className="absolute top-1 right-1 bg-black/70 text-white rounded-full p-0.5"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 bg-amber-600 hover:bg-amber-500 text-white font-bold text-sm rounded-xl shadow-trade hover:shadow-trade-gold transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>{isSubmitting ? 'Sending Request...' : 'Send Quote Request'}</span>
              </button>

              <p className="text-[11px] text-slate-400 text-center">
                🔒 Protected by UK GDPR principles. We never share your data with 3rd parties.
              </p>
            </form>
          )}
        </div>

      </div>

    </div>
  );
}
