import React from 'react';
import { Star, CheckCircle, ExternalLink } from 'lucide-react';
import { Testimonial } from '@/types';

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-trade flex flex-col justify-between space-y-4 relative">
      <div className="space-y-3">
        
        {/* Star Rating & Source */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1" aria-label={`Rating: ${testimonial.rating} out of 5 stars`}>
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < testimonial.rating
                    ? 'text-amber-500 fill-amber-500'
                    : 'text-slate-300'
                }`}
              />
            ))}
          </div>

          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
            <CheckCircle className="w-3 h-3" />
            {testimonial.source}
          </span>
        </div>

        {/* Project Type */}
        <p className="text-xs font-semibold text-amber-700 uppercase tracking-wider">
          {testimonial.projectType}
        </p>

        {/* Review Body */}
        <blockquote className="text-sm text-slate-700 leading-relaxed italic">
          &ldquo;{testimonial.reviewText}&rdquo;
        </blockquote>
      </div>

      {/* Author & Verification Meta */}
      <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
        <div>
          <p className="text-sm font-bold text-slate-900">
            {testimonial.clientName}
          </p>
          <p className="text-xs text-slate-500 font-medium">
            {testimonial.location}
          </p>
        </div>

        {testimonial.verifiedLink && (
          <a
            href={testimonial.verifiedLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-slate-400 hover:text-amber-700 inline-flex items-center gap-1 font-medium transition-colors"
            title="Verify review source"
          >
            <span>Verify</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        )}
      </div>
    </div>
  );
}
