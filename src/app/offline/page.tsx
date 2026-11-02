'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { WifiOff, Phone, MessageSquare, RotateCw, Home, CheckCircle2 } from 'lucide-react';
import { BUSINESS_CONFIG } from '@/data/initialData';
import Logo from '@/components/Logo';

export default function OfflinePage() {
  const [isChecking, setIsChecking] = useState(false);
  const [isOnline, setIsOnline] = useState(false);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    setIsOnline(typeof navigator !== 'undefined' ? navigator.onLine : false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleRetry = () => {
    setIsChecking(true);
    if (typeof navigator !== 'undefined' && navigator.onLine) {
      window.location.reload();
    } else {
      setTimeout(() => {
        setIsChecking(false);
      }, 1200);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-slate-100 p-8 sm:p-10 text-center relative overflow-hidden">
        {/* Decorative Top Accent */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600" />

        <div className="mb-6 flex justify-center">
          <Logo variant="circle" />
        </div>

        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 mb-5 shadow-inner">
          <WifiOff className="w-7 h-7" />
        </div>

        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 mb-3">
          You are currently offline
        </h1>

        <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-8">
          It looks like you have lost internet connection. You can still reach Mark directly via phone or browse previously cached pages.
        </p>

        {isOnline && (
          <div className="mb-6 p-3 bg-emerald-50 text-emerald-800 rounded-xl text-sm flex items-center justify-center gap-2 border border-emerald-200">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Connection restored! Reloading...</span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-3 mb-8">
          <a
            href={`tel:${BUSINESS_CONFIG.phoneRaw}`}
            className="w-full flex items-center justify-center gap-3 py-3.5 px-6 rounded-xl bg-slate-900 text-white font-medium hover:bg-slate-800 transition-colors shadow-sm"
          >
            <Phone className="w-4 h-4 text-amber-400" />
            <span>Call Mark: {BUSINESS_CONFIG.phone}</span>
          </a>

          <a
            href={`https://wa.me/${BUSINESS_CONFIG.whatsapp}?text=Hi%20Mark,%20I%20would%20like%20to%20discuss%20a%20decorating%20project`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-3 py-3.5 px-6 rounded-xl bg-emerald-600 text-white font-medium hover:bg-emerald-700 transition-colors shadow-sm"
          >
            <MessageSquare className="w-4 h-4" />
            <span>WhatsApp: {BUSINESS_CONFIG.whatsappDisplay}</span>
          </a>

          <button
            onClick={handleRetry}
            disabled={isChecking}
            className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors text-sm font-medium disabled:opacity-50"
          >
            <RotateCw className={`w-4 h-4 ${isChecking ? 'animate-spin text-amber-600' : 'text-slate-500'}`} />
            <span>{isChecking ? 'Checking Connection...' : 'Retry Connection'}</span>
          </button>
        </div>

        {/* Navigation link to cached home */}
        <div className="pt-6 border-t border-slate-100 flex items-center justify-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-amber-600 font-medium transition-colors"
          >
            <Home className="w-4 h-4" />
            <span>Go to Cached Homepage</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
