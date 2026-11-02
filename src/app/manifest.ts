import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Sistine Decorating | Dartmouth & South Devon',
    short_name: 'Sistine',
    description: 'Professional painting and decorating in Dartmouth and the wider South Hams. Interior and exterior residential decorating with quality finishes.',
    start_url: '/',
    display: 'standalone',
    background_color: '#faf9f5',
    theme_color: '#1e293b',
    orientation: 'any',
    scope: '/',
    id: '/',
    categories: ['lifestyle', 'business', 'home'],
    icons: [
      {
        src: '/icons/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icons/icon-maskable-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/icons/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icons/icon-maskable-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
    shortcuts: [
      {
        name: 'Get a Free Quote',
        short_name: 'Quote',
        description: 'Request a free decorating quote',
        url: '/#quote',
        icons: [{ src: '/icons/icon-192x192.png', sizes: '192x192' }],
      },
      {
        name: 'View Projects',
        short_name: 'Projects',
        description: 'Browse recent decorating work and galleries',
        url: '/#projects',
        icons: [{ src: '/icons/icon-192x192.png', sizes: '192x192' }],
      },
      {
        name: 'Call Sistine',
        short_name: 'Call',
        description: 'Call Mark on 07803 258507',
        url: 'tel:07803258507',
        icons: [{ src: '/icons/icon-192x192.png', sizes: '192x192' }],
      },
    ],
  };
}
