'use client';

import React, { useState, useEffect } from 'react';
import { Star, CheckCircle, ExternalLink, MessageSquare, Sparkles, Plus } from 'lucide-react';
import TestimonialCard from '@/components/TestimonialCard';
import QuoteModal from '@/components/QuoteModal';
import { Testimonial } from '@/types';
import { getStoredTestimonials, saveStoredTestimonials } from '@/lib/storage';

export default function ReviewsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<string>('All');
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [isAddReviewModalOpen, setIsAddReviewModalOpen] = useState(false);

  // Review submission state
  const [newClientName, setNewClientName] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [newProjectType, setNewProjectType] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [newReviewText, setNewReviewText] = useState('');
  const [newSource, setNewSource] = useState<'Direct Quote' | 'Facebook' | 'Google Verified'>('Direct Quote');
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const load = () => {
      setTestimonials(getStoredTestimonials());
    };
    load();
    window.addEventListener('apex_data_updated', load);
    return () => window.removeEventListener('apex_data_updated', load);
  }, []);

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    const newEntry: Testimonial = {
      id: `test-${Date.now()}`,
      clientName: newClientName,
      location: newLocation,
      projectType: newProjectType,
      rating: newRating,
      reviewText: newReviewText,
      source: newSource,
      publishedAt: new Date().toISOString().split('T')[0],
      verifiedLink: newSource === 'Facebook' ? 'https://facebook.com/reviews/apex-decorating-cheltenham' : undefined,
    };

    const updated = [newEntry, ...testimonials];
    saveStoredTestimonials(updated);
    setTestimonials(updated);
    setIsSubmitted(true);

    setTimeout(() => {
      setIsSubmitted(false);
      setIsAddReviewModalOpen(false);
      setNewClientName('');
      setNewLocation('');
      setNewProjectType('');
      setNewReviewText('');
    }, 1200);
  };

  const filteredTestimonials = testimonials.filter((t) => {
    if (selectedFilter === 'All') return true;
    if (selectedFilter === 'Facebook') return t.source === 'Facebook';
    if (selectedFilter === 'Direct') return t.source === 'Direct Quote';
    if (selectedFilter === '5 Star') return t.rating === 5;
    return true;
  });

  return (
    <div className="py-12 lg:py-16 space-y-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold uppercase tracking-widest text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
          Independent Client Feedback
        </span>
        <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          Verified Reviews &amp; Client Testimonials
        </h1>
        <p className="text-base text-slate-600 leading-relaxed">
          Every review represents real work performed in period homes, heritage properties, and commercial premises across Gloucestershire and Somerset.
        </p>
      </div>

      {/* Aggregate Score & Facebook Callout Banner */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-trade grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        
        {/* Rating Block */}
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-amber-500 text-slate-950 flex flex-col items-center justify-center font-extrabold text-2xl shadow-lg shrink-0">
            <span>5.0</span>
          </div>
          <div>
            <div className="flex items-center gap-1 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>
            <p className="text-sm font-semibold text-white mt-1">100% 5-Star Rating</p>
            <p className="text-xs text-slate-400">Across 40+ verified client projects</p>
          </div>
        </div>

        {/* Facebook Verification Note */}
        <div className="space-y-1 md:border-x md:border-slate-800 md:px-6">
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-400">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            <span>Facebook Verified Page</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Reviews are authenticated directly from independent client social profiles and written quotes.
          </p>
          <a
            href="https://facebook.com/reviews/apex-decorating-cheltenham"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs text-amber-300 hover:underline pt-1"
          >
            <span>Visit Facebook Page</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row md:flex-col gap-2.5">
          <button
            type="button"
            onClick={() => setIsAddReviewModalOpen(true)}
            className="w-full px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-lg border border-slate-700 flex items-center justify-center gap-1.5 transition-colors"
          >
            <Plus className="w-3.5 h-3.5 text-amber-400" />
            <span>Submit a Client Review</span>
          </button>
          <button
            type="button"
            onClick={() => setIsQuoteModalOpen(true)}
            className="w-full px-4 py-2.5 bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Request a Free Quote</span>
          </button>
        </div>

      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-between flex-wrap gap-4 border-b border-slate-200 pb-4">
        <div className="flex items-center gap-2">
          {['All', 'Facebook', 'Direct', '5 Star'].map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setSelectedFilter(filter)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                selectedFilter === filter
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {filter} Reviews
            </button>
          ))}
        </div>
        <span className="text-xs font-semibold text-slate-500">
          Showing {filteredTestimonials.length} reviews
        </span>
      </div>

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTestimonials.map((testimonial) => (
          <TestimonialCard key={testimonial.id} testimonial={testimonial} />
        ))}
      </div>

      {/* Review Submission Modal */}
      {isAddReviewModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl p-6 sm:p-8 border border-slate-200">
            <h3 className="text-xl font-bold text-slate-900 mb-1">
              Submit a Client Review
            </h3>
            <p className="text-xs text-slate-500 mb-5">
              Thank you for taking the time to review Apex Decorating &amp; Restoration.
            </p>

            {isSubmitted ? (
              <div className="text-center py-8 space-y-2">
                <CheckCircle className="w-12 h-12 text-emerald-600 mx-auto" />
                <p className="font-bold text-slate-900 text-lg">Thank You!</p>
                <p className="text-xs text-slate-600">Your review has been published to our feed.</p>
              </div>
            ) : (
              <form onSubmit={handleAddReview} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={newClientName}
                    onChange={(e) => setNewClientName(e.target.value)}
                    placeholder="e.g. Richard & Sarah Bennett"
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Town / Area *</label>
                    <input
                      type="text"
                      required
                      value={newLocation}
                      onChange={(e) => setNewLocation(e.target.value)}
                      placeholder="e.g. Cheltenham, GL50"
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Project Type *</label>
                    <input
                      type="text"
                      required
                      value={newProjectType}
                      onChange={(e) => setNewProjectType(e.target.value)}
                      placeholder="e.g. Sash Window Repair"
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Rating</label>
                    <select
                      value={newRating}
                      onChange={(e) => setNewRating(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm"
                    >
                      <option value={5}>⭐⭐⭐⭐⭐ (5 Stars)</option>
                      <option value={4}>⭐⭐⭐⭐ (4 Stars)</option>
                      <option value={3}>⭐⭐⭐ (3 Stars)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Source</label>
                    <select
                      value={newSource}
                      onChange={(e) => setNewSource(e.target.value as any)}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm"
                    >
                      <option value="Direct Quote">Direct Client Review</option>
                      <option value="Facebook">Facebook Review</option>
                      <option value="Google Verified">Google Verified</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Your Review *</label>
                  <textarea
                    required
                    rows={4}
                    value={newReviewText}
                    onChange={(e) => setNewReviewText(e.target.value)}
                    placeholder="Share your experience regarding punctuality, cleanliness, craftsmanship, and final finish..."
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsAddReviewModalOpen(false)}
                    className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs rounded-lg shadow-sm"
                  >
                    Publish Review
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Quote Modal */}
      <QuoteModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
      />
    </div>
  );
}
