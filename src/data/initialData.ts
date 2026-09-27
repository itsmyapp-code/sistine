import { Project, Testimonial, HeroSlide } from '@/types';

export const BUSINESS_CONFIG = {
  name: 'Sistine Decorating',
  tagline: 'DECORATE • RESTORE • REFURBISH',
  legalName: 'Sistine Decorating',
  phone: '07803 258507',
  email: 'sistine@live.co.uk',
  dataPrivacyLeadEmail: 'hello@itsmyapp.co.uk',
  address: '15 Southtown, Dartmouth, Devon, TQ6 9BX',
  postcode: 'TQ6 9BX',
  facebook: 'https://facebook.com/Sistine',
  facebookHandle: 'Sistine',
  coverageAreas: [
    'Dartmouth',
    'Kingswear',
    'Stoke Fleming',
    'Dittisham',
    'Blackawton',
    'Totnes & South Hams'
  ],
  workingHours: 'Monday – Friday: 08:00 – 17:30 | Saturday: By Appointment',
  insuranceCoverage: 'Fully Insured Public Liability',
};

export const INITIAL_HERO_SLIDES: HeroSlide[] = [
  {
    id: 'hero-1',
    url: '/images/hero/sistine-painter-dartmouth.jpg',
    alt: 'Sistine Decorating on location in Dartmouth, South Devon',
  },
  {
    id: 'hero-2',
    url: '/images/hero/sistine-exterior-facade.jpg',
    alt: 'Completed exterior facade and staircase in Dartmouth',
  },
  {
    id: 'hero-3',
    url: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=2000&q=85',
    alt: 'Dartmouth Townhouse Interior Decorating by Sistine',
  },
  {
    id: 'hero-4',
    url: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=2000&q=85',
    alt: 'Specialist Wallpapering & Interior Finishes',
  },
];

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'proj-1',
    slug: 'dartmouth-southtown-townhouse-interior',
    title: 'Dartmouth Townhouse Interior Decorating',
    category: 'Interior',
    location: 'Southtown, Dartmouth',
    afterImage: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
    beforeImage: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Complete interior redecoration of a traditional Southtown Dartmouth property. Preparation of walls, ceilings, and woodwork finished in contemporary coastal neutral tones.',
    scopeDetails: [
      'Full surface preparation & dust-controlled sanding',
      'Farrow & Ball breathable emulsion on walls and ceilings',
      'Satinwood finish on skirting boards, doors and architraves',
    ],
    featured: true,
    publishedAt: '2026-08-10',
  },
  {
    id: 'proj-2',
    slug: 'coastal-exterior-masonry-kingswear',
    title: 'Coastal Exterior Painting & Facade',
    category: 'Exterior',
    location: 'Kingswear, River Dart',
    afterImage: '/images/hero/sistine-exterior-facade.jpg',
    beforeImage: 'https://images.unsplash.com/photo-1541123437800-1bb1317badc2?auto=format&fit=crop&w=1200&q=80',
    images: [
      '/images/hero/sistine-exterior-facade.jpg',
      '/images/hero/sistine-painter-dartmouth.jpg',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
    ],
    description: 'Protective exterior masonry painting tailored for coastal weather exposure overlooking the River Dart. High-durability weather-shield coatings.',
    scopeDetails: [
      'Pressure washing and fungal wash treatment',
      'Microporous exterior masonry coating',
      'Gloss finishing on timber fascias and exterior front door',
    ],
    featured: true,
    publishedAt: '2026-07-20',
  },
  {
    id: 'proj-3',
    slug: 'stoke-fleming-botanical-wallpapering',
    title: 'Feature Wallpapering & Master Bedroom',
    category: 'Wallpapering',
    location: 'Stoke Fleming, South Devon',
    afterImage: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
    beforeImage: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Precision hanging of designer botanical patterned wallpaper with matching painted woodwork in soft muted tones.',
    scopeDetails: [
      'Lining paper preparation for perfectly flat foundation',
      'Exact pattern alignment and seamless joints',
      'Complimentary trim painting in eggshell finish',
    ],
    featured: true,
    publishedAt: '2026-08-28',
  },
  {
    id: 'proj-4',
    slug: 'dittisham-cottage-living-room',
    title: 'Riverside Cottage Redecoration',
    category: 'Interior',
    location: 'Dittisham, Devon',
    afterImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    beforeImage: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Fresh, bright coastal interior update for a charming holiday cottage in Dittisham. Clean white ceilings, warm stone walls, and durable woodwork.',
    scopeDetails: [
      'Plaster smoothing and spot repairs',
      'Durable washable emulsion in high-traffic hallways',
      'Clear protective oil on natural timber beams',
    ],
    featured: false,
    publishedAt: '2026-06-15',
  }
];

export const INITIAL_TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    clientName: 'Mark & Sarah Jenkins',
    location: 'Southtown, Dartmouth',
    projectType: 'Full House Interior Redecoration',
    rating: 5,
    reviewText: 'Sistine Decorating transformed our Dartmouth home. Friendly, clean, and totally reliable. The quality of the finish on our walls and woodwork is fantastic. We will definitely use them again.',
    publishedAt: '2026-08-15',
    status: 'approved',
  },
  {
    id: 'test-2',
    clientName: 'Helen Davies',
    location: 'Kingswear',
    projectType: 'Exterior Painting & Windows',
    rating: 5,
    reviewText: 'Living right on the water in Kingswear, our exterior paint takes a beating from the weather. Sistine did an exceptional job preparing the masonry and painting the whole frontage. Looks pristine.',
    publishedAt: '2026-07-25',
    status: 'approved',
  },
  {
    id: 'test-3',
    clientName: 'Jonathan Reed',
    location: 'Stoke Fleming',
    projectType: 'Wallpapering & Dining Room',
    rating: 5,
    reviewText: 'Punctual, tidy, and great attention to detail. The wallpapering in our dining room is immaculate. Highly recommended to anyone in the Dartmouth and South Hams area.',
    publishedAt: '2026-08-30',
    status: 'approved',
  },
];
