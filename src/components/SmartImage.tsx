'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image, { ImageProps } from 'next/image';

const webpFallbackCache = new Map<string, string>();

interface SmartImageProps extends Omit<ImageProps, 'src'> {
  src: string;
  useNativeImg?: boolean;
}

export default function SmartImage({
  src,
  alt,
  useNativeImg = false,
  onError,
  ...rest
}: SmartImageProps) {
  const [resolvedSrc, setResolvedSrc] = useState<string>(() => webpFallbackCache.get(src) || src);
  const [attemptedFallback, setAttemptedFallback] = useState<boolean>(false);

  useEffect(() => {
    setResolvedSrc(webpFallbackCache.get(src) || src);
    setAttemptedFallback(false);
  }, [src]);

  const handleImageError = useCallback(
    async (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
      if (!attemptedFallback && src && src.startsWith('data:image/avif')) {
        setAttemptedFallback(true);
        const cached = webpFallbackCache.get(src);
        if (cached) {
          setResolvedSrc(cached);
          return;
        }
        try {
          const res = await fetch('/api/convert-image', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              dataUrl: src,
              format: 'webp',
            }),
          });
          if (res.ok) {
            const json = await res.json();
            if (json?.webpDataUrl || json?.dataUrl) {
              const fallbackUrl = json.webpDataUrl || json.dataUrl;
              webpFallbackCache.set(src, fallbackUrl);
              setResolvedSrc(fallbackUrl);
              return;
            }
          }
        } catch {
          // Ignore network error on fallback
        }
      }

      if (onError) {
        onError(e);
      }
    },
    [attemptedFallback, src, onError]
  );

  if (useNativeImg) {
    const { fill, priority, sizes, quality, placeholder, blurDataURL, loader, unoptimized, ...imgProps } = rest;
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={resolvedSrc}
        alt={alt}
        onError={handleImageError}
        {...(imgProps as React.ImgHTMLAttributes<HTMLImageElement>)}
      />
    );
  }

  return (
    <Image
      src={resolvedSrc}
      alt={alt}
      onError={handleImageError}
      {...rest}
    />
  );
}

