import { NextResponse } from 'next/server';
import { optimizeBufferToAvifOrWebp } from '@/lib/serverImageOptimizer';

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get('content-type') || '';

    let inputBuffer: Buffer | null = null;
    let maxWidth = 1600;
    let avifQuality = 72;
    let webpQuality = 82;
    let forceFormat: 'avif' | 'webp' | undefined = undefined;

    if (contentType.includes('multipart/form-data')) {
      const formData = await request.formData();
      const file = formData.get('file') as File | null;
      if (!file) {
        return NextResponse.json({ error: 'No image file provided.' }, { status: 400 });
      }
      const arrayBuffer = await file.arrayBuffer();
      inputBuffer = Buffer.from(arrayBuffer);

      const widthParam = formData.get('maxWidth');
      if (widthParam) maxWidth = Number(widthParam) || 1600;

      const formatParam = formData.get('format');
      if (formatParam === 'avif' || formatParam === 'webp') {
        forceFormat = formatParam;
      }
    } else {
      const body = await request.json();
      const { dataUrl, maxWidth: bodyWidth, quality, format } = body;
      if (!dataUrl || typeof dataUrl !== 'string') {
        return NextResponse.json({ error: 'Invalid image payload.' }, { status: 400 });
      }
      const match = dataUrl.match(/^data:image\/[a-zA-Z0-9.+-]+;base64,(.+)$/);
      if (!match) {
        return NextResponse.json({ error: 'Invalid base64 data URL.' }, { status: 400 });
      }
      inputBuffer = Buffer.from(match[1], 'base64');
      if (bodyWidth) maxWidth = Number(bodyWidth) || 1600;
      if (quality) {
        const normalizedQ = quality <= 1 ? Math.round(quality * 100) : Math.round(quality);
        webpQuality = Math.min(95, Math.max(50, normalizedQ));
        avifQuality = Math.min(90, Math.max(45, normalizedQ - 8));
      }
      if (format === 'avif' || format === 'webp') {
        forceFormat = format;
      }
    }

    const result = await optimizeBufferToAvifOrWebp(inputBuffer, {
      maxWidth,
      avifQuality,
      webpQuality,
      forceFormat,
    });

    return NextResponse.json({
      success: true,
      dataUrl: result.dataUrl,
      format: result.format,
      avifDataUrl: result.avifDataUrl,
      webpDataUrl: result.webpDataUrl,
      byteLength: result.byteLength,
    });
  } catch (error: any) {
    console.error('Error converting image to AVIF/WebP:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to convert image.' },
      { status: 500 }
    );
  }
}

