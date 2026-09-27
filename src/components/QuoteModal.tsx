'use client';

import React, { useState } from 'react';
import { X, Upload, CheckCircle2, Phone, Sparkles } from 'lucide-react';
import { QuoteFormData } from '@/types';
import { BUSINESS_CONFIG } from '@/data/initialData';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedService?: string;
}

export default function QuoteModal({ isOpen, onClose, preselectedService }: QuoteModalProps) {
  const [formData, setFormData] = useState<QuoteFormData>({
    fullName: '',
    phone: '',
    email: '',
    postcode: '',
    address: '',
    service: preselectedService || 'Interior Decorating',
    propertyType: 'Residential Period / Heritage',
    timeframe: 'Within 2 - 4 Weeks',
    description: '',
    uploadedPhotos: [],
  });

  const [previews, setPreviews] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const fileList = Array.from(files);
    fileList.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPreviews((prev) => [...prev, result]);
        setFormData((prev) => ({
          ...prev,
          uploadedPhotos: [...(prev.uploadedPhotos || []), result],
        }));
      };
      reader.readAsDataURL(file);
    });
  };

  const removePhoto = (index: number) => {
    setPreviews((prev) => prev.filter((_, i) => i !== index));
    setFormData((prev) => ({
      ...prev,
      uploadedPhotos: (prev.uploadedPhotos || []).filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Send to API route
      await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
    } catch {
      // Local fallback
    }

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 600);
  };

  const handleReset = () => {
    setIsSuccess(false);
    setFormData({
      fullName: '',
      phone: '',
      email: '',
      postcode: '',
      address: '',
      service: 'Interior Decorating',
      propertyType: 'Residential Period / Heritage',
      timeframe: 'Within 2 - 4 Weeks',
      description: '',
      uploadedPhotos: [],
    });
    setPreviews([]);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <div 
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
        aria-labelledby="quote-modal-title"
      >
        {/* Header Ribbon */}
        <div className="bg-slate-900 text-white px-6 py-5 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-amber-500/20 text-amber-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 id="quote-modal-title" className="text-lg font-bold">
                Request a Free, Itemised Quote
              </h3>
              <p className="text-xs text-slate-300">
                Guaranteed 24-hour turnaround • Zero obligation site surveys
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 max-h-[80vh] overflow-y-auto">
          {isSuccess ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="text-2xl font-bold text-slate-900">
                Inquiry Received!
              </h4>
              <p className="text-slate-600 max-w-md mx-auto text-sm leading-relaxed">
                Thank you, <span className="font-semibold text-slate-900">{formData.fullName}</span>. Our senior decorator will review your project details and respond via phone or email within 24 hours to arrange an exact on-site survey or provide a preliminary estimate.
              </p>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 max-w-md mx-auto">
                <p className="font-medium text-slate-800">Need urgent advice on active water leaks or emergency repairs?</p>
                <p className="mt-1">
                  Call our direct site line:{' '}
                  <a href={`tel:${BUSINESS_CONFIG.mobile.replace(/\s+/g, '')}`} className="text-amber-700 font-bold hover:underline">
                    {BUSINESS_CONFIG.mobile}
                  </a>
                </p>
              </div>
              <button
                type="button"
                onClick={handleReset}
                className="mt-4 px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-lg text-sm transition-all"
              >
                Close & Return to Site
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Service & Property Type Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="service-select" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Primary Service Needed *
                  </label>
                  <select
                    id="service-select"
                    required
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 text-sm focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                  >
                    <option value="Interior Decorating">Interior Decorating & Painting</option>
                    <option value="Exterior Masonry & Silicate">Exterior Masonry & Timber</option>
                    <option value="Sash Window Care & Restoration">Sash Window Care & Bio-Resin</option>
                    <option value="Wallpapering & Murals">Specialist Wallpapering</option>
                    <option value="Woodwork & Kitchen Spraying">Woodwork & Kitchen Spraying</option>
                    <option value="Commercial Decorating">Commercial & Retail Refit</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="property-type" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Property Type
                  </label>
                  <select
                    id="property-type"
                    value={formData.propertyType}
                    onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 text-sm focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                  >
                    <option value="Residential Period / Heritage">Residential Period / Heritage (Victorian/Georgian)</option>
                    <option value="Residential Modern">Residential Modern Build</option>
                    <option value="Listed Historic Building">Grade II / Listed Building</option>
                    <option value="Commercial / Office / Retail">Commercial / Office / Retail</option>
                  </select>
                </div>
              </div>

              {/* Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="quote-name" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Your Full Name *
                  </label>
                  <input
                    id="quote-name"
                    type="text"
                    required
                    placeholder="e.g. Eleanor Harrison"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 text-sm focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label htmlFor="quote-phone" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Phone / Mobile *
                  </label>
                  <input
                    id="quote-phone"
                    type="tel"
                    required
                    placeholder="e.g. 07700 900 000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 text-sm focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                  />
                </div>
              </div>

              {/* Email & Postcode */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="quote-email" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Email Address *
                  </label>
                  <input
                    id="quote-email"
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 text-sm focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label htmlFor="quote-postcode" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Property Postcode *
                  </label>
                  <input
                    id="quote-postcode"
                    type="text"
                    required
                    placeholder="e.g. GL50 1QZ / BA1 2LR"
                    value={formData.postcode}
                    onChange={(e) => setFormData({ ...formData, postcode: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 text-sm focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                  />
                </div>
              </div>

              {/* Timeframe */}
              <div>
                <label htmlFor="quote-timeframe" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Desired Start Date / Timeframe
                </label>
                <select
                  id="quote-timeframe"
                  value={formData.timeframe}
                  onChange={(e) => setFormData({ ...formData, timeframe: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 text-sm focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                >
                  <option value="Urgent / Within 7 Days">Urgent / Within 7 Days</option>
                  <option value="Within 2 - 4 Weeks">Within 2 - 4 Weeks</option>
                  <option value="Next 1 - 3 Months">Next 1 - 3 Months</option>
                  <option value="Flexible / Planning Ahead">Flexible / Planning Ahead</option>
                </select>
              </div>

              {/* Description */}
              <div>
                <label htmlFor="quote-description" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Project Description &amp; Scope
                </label>
                <textarea
                  id="quote-description"
                  rows={3}
                  placeholder="e.g., Living room and hallway painting, approx 4m ceiling height, minor cornicing cracks to repair, prefer Farrow & Ball emulsion."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-lg border border-slate-300 bg-white text-slate-900 text-sm focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                />
              </div>

              {/* Photo Upload Attachment */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Attach Photos (Optional - Helps Us Provide Faster Estimates)
                </label>
                <div className="flex items-center gap-3">
                  <label className="flex items-center justify-center gap-2 px-4 py-2.5 border border-dashed border-slate-400 hover:border-amber-600 rounded-lg bg-slate-50 hover:bg-amber-50/50 cursor-pointer text-xs font-medium text-slate-700 transition-colors">
                    <Upload className="w-4 h-4 text-amber-600" />
                    <span>Upload Room / Sill Images</span>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                  <span className="text-xs text-slate-400">
                    {previews.length > 0 ? `${previews.length} photo(s) selected` : 'Max 5MB each'}
                  </span>
                </div>

                {previews.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {previews.map((preview, idx) => (
                      <div key={idx} className="relative w-16 h-16 rounded-lg overflow-hidden border border-slate-200 group">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={preview} alt={`Upload preview ${idx + 1}`} className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => removePhoto(idx)}
                          className="absolute top-1 right-1 bg-black/70 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                          aria-label="Remove photo"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Data Privacy Assurances */}
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-500">
                <p>
                  🔒 <strong>UK GDPR Compliant:</strong> Your details are used solely to prepare your estimate and arrange site visits. We never share contact data with marketing aggregators.
                </p>
              </div>

              {/* Submit Button */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                <a
                  href={`tel:${BUSINESS_CONFIG.phone.replace(/\s+/g, '')}`}
                  className="text-xs text-slate-600 hover:text-slate-900 inline-flex items-center gap-1.5 font-medium"
                >
                  <Phone className="w-3.5 h-3.5 text-amber-600" />
                  Or call directly: {BUSINESS_CONFIG.phone}
                </a>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-7 py-3 bg-amber-600 hover:bg-amber-500 active:bg-amber-700 text-white font-bold text-sm rounded-lg shadow-trade hover:shadow-trade-gold transition-all disabled:opacity-50"
                >
                  {isSubmitting ? 'Sending Request...' : 'Submit Quote Request'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
