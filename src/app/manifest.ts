import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Brickly AlexEstate | Real Estate Ecosystem',
    short_name: 'Brickly',
    description: 'Intelligent full-stack real estate discovery, 360 tours, and RERA verified homes.',
    start_url: '/',
    display: 'standalone',
    background_color: '#070d17',
    theme_color: '#16a34a',
    icons: [
      {
        src: '/icon.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
