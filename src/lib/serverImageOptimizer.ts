import sharp from 'sharp';

export interface OptimizeImageOptions {
  maxWidth?: number;
  avifQuality?: number;
  webpQuality?: number;
  forceFormat?: 'avif' | 'webp';
}

export interface OptimizeImageResult {
  dataUrl: string;
  format: 'avif' | 'webp';
  avifDataUrl?: string;
  webpDataUrl: string;
  byteLength: number;
}

/**
 * Converts a Buffer or base64 data URL into AVIF (primary) with automatic fallback to WebP.
 * Always generates a WebP fallback and tries AVIF first unless forceFormat === 'webp'.
 */
export async function optimizeBufferToAvifOrWebp(
  inputBuffer: Buffer,
  options: OptimizeImageOptions = {}
): Promise<OptimizeImageResult> {
  const {
    maxWidth = 1600,
    avifQuality = 72,
    webpQuality = 82,
    forceFormat,
  } = options;

  const basePipeline = sharp(inputBuffer, { failOn: 'none' })
    .rotate() // Auto-orient based on EXIF
    .resize({
      width: maxWidth,
      withoutEnlargement: true,
    });

  // Always generate WebP as reliable fallback
  const webpBuffer = await basePipeline
    .clone()
    .webp({ quality: webpQuality, effort: 4 })
    .toBuffer();
  const webpDataUrl = `data:image/webp;base64,${webpBuffer.toString('base64')}`;

  if (forceFormat === 'webp') {
    return {
      dataUrl: webpDataUrl,
      format: 'webp',
      webpDataUrl,
      byteLength: webpBuffer.byteLength,
    };
  }

  try {
    const avifBuffer = await basePipeline
      .clone()
      .avif({ quality: avifQuality, effort: 4 })
      .toBuffer();
    const avifDataUrl = `data:image/avif;base64,${avifBuffer.toString('base64')}`;

    // If forceFormat is 'avif' or AVIF is smaller/equal to WebP, use AVIF primary; otherwise fallback to WebP
    if (forceFormat === 'avif' || avifBuffer.byteLength <= webpBuffer.byteLength * 1.05) {
      return {
        dataUrl: avifDataUrl,
        format: 'avif',
        avifDataUrl,
        webpDataUrl,
        byteLength: avifBuffer.byteLength,
      };
    }
  } catch (err) {
    console.warn('AVIF encoding failed, falling back to WebP:', err);
  }

  return {
    dataUrl: webpDataUrl,
    format: 'webp',
    webpDataUrl,
    byteLength: webpBuffer.byteLength,
  };
}

/**
 * Ensures any data:image/... base64 string (e.g. jpeg, png) is converted to AVIF (with WebP fallback).
 * Leaves remote/static URLs or already-optimized AVIF/WebP data URLs untouched unless requested.
 */
export async function ensureModernImageDataUrl(
  imageStr: string | null | undefined,
  maxWidth = 1600
): Promise<string | null | undefined> {
  if (!imageStr || typeof imageStr !== 'string') return imageStr;
  if (!imageStr.startsWith('data:image/')) return imageStr;

  // Already AVIF or WebP
  if (imageStr.startsWith('data:image/avif;base64,') || imageStr.startsWith('data:image/webp;base64,')) {
    return imageStr;
  }

  const base64Match = imageStr.match(/^data:image\/[a-zA-Z0-9.+-]+;base64,(.+)$/);
  if (!base64Match) return imageStr;

  try {
    const buffer = Buffer.from(base64Match[1], 'base64');
    const optimized = await optimizeBufferToAvifOrWebp(buffer, { maxWidth });
    return optimized.dataUrl;
  } catch (err) {
    console.warn('Failed to convert legacy base64 image in CMS:', err);
    return imageStr;
  }
}

