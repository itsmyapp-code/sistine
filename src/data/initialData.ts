import { Project, Testimonial, HeroSlide } from '@/types';
import defaultHeroSlides from './heroSlides.json';
import defaultProjects from './projects.json';
import defaultTestimonials from './testimonials.json';

export const BUSINESS_CONFIG = {
  name: 'Sistine Decorating',
  tagline: 'DECORATE • RESTORE • REFURBISH',
  legalName: 'Sistine Decorating',
  phone: '07803 258507',
  phoneRaw: '07803258507',
  whatsapp: '447803258507',
  whatsappDisplay: '07803 258507',
  email: 'sistine@live.co.uk',
  dataPrivacyLeadEmail: 'sistine@live.co.uk',
  address: '15 Southtown, Dartmouth, Devon, TQ6 9BX',
  postcode: 'TQ6 9BX',
  facebook: 'https://www.facebook.com/sistinedecoration',
  facebookHandle: 'sistinedecoration',
  coverageAreas: [
    'Dartmouth',
    'South Hams'
  ],
  workingHours: 'Monday – Friday: 08:00 – 17:30 | Saturday: By Appointment',
  insuranceCoverage: 'Fully Insured Public Liability',
};

export const INITIAL_HERO_SLIDES: HeroSlide[] = defaultHeroSlides as HeroSlide[];

export const INITIAL_PROJECTS: Project[] = defaultProjects as Project[];

export const INITIAL_TESTIMONIALS: Testimonial[] = defaultTestimonials as Testimonial[];

