'use client';

import React, { useState, useEffect } from 'react';
import { Download, X, Share, PlusSquare, WifiOff, Check } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

export default function PwaInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [isIos, setIsIos] = useState(false);
  const [showIosInstructions, setShowIosInstructions] = useState(false);
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    // 1. Service Worker Registration
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker
          .register('/sw.js')
          .then((registration) => {
            // Check for updates
            registration.addEventListener('updatefound', () => {
              const installingWorker = registration.installing;
              if (installingWorker) {
                installingWorker.addEventListener('statechange', () => {
                  if (
                    installingWorker.state === 'installed' &&
                    navigator.serviceWorker.controller
                  ) {
                    console.log('[PWA] New version available.');
                  }
                });
              }
            });
          })
          .catch((err) => {
            console.error('[PWA] Service worker registration failed:', err);
          });
      });
    }

    // 2. Check if already installed in standalone mode
    const isStandalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as unknown as { standalone?: boolean }).standalone === true;

    if (isStandalone) {
      setIsInstalled(true);
      return;
    }

    // 3. Check dismissal memory (don't re-prompt within 7 days if user dismissed)
    const dismissedTime = localStorage.getItem('sistine_pwa_dismissed');
    if (dismissedTime) {
      const daysSinceDismiss = (Date.now() - parseInt(dismissedTime, 10)) / (1000 * 60 * 60 * 24);
      if (daysSinceDismiss < 7) {
        setIsDismissed(true);
      }
    }

    // 4. Listen for beforeinstallprompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setIsInstallable(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // 5. Detect iOS Safari
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent) && !isStandalone;
    const isSafari = /safari/.test(userAgent) && !/chrome|crios|fxios/.test(userAgent);
    if (isIosDevice && isSafari) {
      setIsIos(true);
      setIsInstallable(true);
    }

    // 6. Online/Offline status listeners
    const updateOnlineStatus = () => {
      setIsOffline(!navigator.onLine);
    };

    setIsOffline(!navigator.onLine);
    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('online', updateOnlineStatus);
      window.removeEventListener('offline', updateOnlineStatus);
    };
  }, []);

  const handleInstallClick = async () => {
    if (isIos) {
      setShowIosInstructions(true);
      return;
    }

    if (!deferredPrompt) return;

    await deferredPrompt.prompt();
    const choice = await deferredPrompt.userChoice;

    if (choice.outcome === 'accepted') {
      setIsInstallable(false);
      setDeferredPrompt(null);
    }
  };

  const handleDismiss = () => {
    setIsDismissed(true);
    localStorage.setItem('sistine_pwa_dismissed', Date.now().toString());
  };

  return (
    <>
      {/* Offline Status Pill */}
      {isOffline && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-amber-500 text-slate-950 font-medium px-4 py-2 rounded-full shadow-lg flex items-center gap-2 text-sm border border-amber-400 animate-in fade-in slide-in-from-top-4 duration-300">
          <WifiOff className="w-4 h-4" />
          <span>You are browsing offline</span>
        </div>
      )}

      {/* PWA Install Banner */}
      {!isInstalled && !isDismissed && isInstallable && (
        <div className="fixed bottom-20 md:bottom-6 right-4 left-4 md:left-auto md:max-w-md z-40 bg-slate-900/95 backdrop-blur-md text-white p-4 rounded-2xl shadow-2xl border border-slate-700 animate-in fade-in slide-in-from-bottom-6 duration-300">
          <div className="flex items-start gap-3">
            {/* Logo Thumbnail */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/icons/icon-192x192.png"
              alt="Sistine App Icon"
              className="w-12 h-12 rounded-xl object-contain bg-white p-1 border border-white/20 shrink-0"
            />

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h4 className="font-serif font-semibold text-slate-100 text-base leading-tight">
                  Install Sistine App
                </h4>
                <button
                  onClick={handleDismiss}
                  className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors"
                  aria-label="Dismiss install prompt"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <p className="text-xs text-slate-300 mt-1 line-clamp-2">
                Install for instant offline access to quotes, galleries & direct call support.
              </p>

              <div className="flex items-center gap-2 mt-3">
                <button
                  onClick={handleInstallClick}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 font-semibold text-xs transition-colors shadow-sm"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Install App</span>
                </button>

                <button
                  onClick={handleDismiss}
                  className="px-3 py-1.5 rounded-lg text-slate-400 hover:text-slate-200 text-xs font-medium transition-colors"
                >
                  Not now
                </button>
              </div>
            </div>
          </div>

          {/* iOS Safari Instructions Modal / Tooltip */}
          {showIosInstructions && (
            <div className="mt-3 pt-3 border-t border-slate-700/80 text-xs text-slate-300 space-y-2">
              <p className="font-medium text-amber-300">To install on iPhone or iPad:</p>
              <ol className="space-y-1.5 list-none pl-0">
                <li className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full bg-slate-800 text-[10px] flex items-center justify-center font-bold text-amber-400">1</span>
                  <span>Tap the <strong>Share</strong> button <Share className="w-3.5 h-3.5 inline mx-0.5 text-blue-400" /> at bottom of Safari</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full bg-slate-800 text-[10px] flex items-center justify-center font-bold text-amber-400">2</span>
                  <span>Scroll down & select <strong>Add to Home Screen</strong> <PlusSquare className="w-3.5 h-3.5 inline mx-0.5 text-white" /></span>
                </li>
              </ol>
              <button
                onClick={() => setShowIosInstructions(false)}
                className="w-full text-center text-xs text-amber-400 hover:underline pt-1"
              >
                Got it
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
}
