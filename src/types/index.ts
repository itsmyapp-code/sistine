export type ProjectCategory = 
  | 'Interior'
  | 'Exterior'
  | 'Wallpapering'
  | 'Restoration & Woodwork'
  | 'Commercial';

export interface Project {
  id: string;
  slug: string;
  title: string;
  category: ProjectCategory;
  location: string;
  beforeImage?: string;
  afterImage: string;
  description: string;
  scopeDetails?: string[];
  featured: boolean;
  publishedAt: string;
  isDraft?: boolean;
}

export type ReviewSource = 'Facebook' | 'Direct Quote' | 'Google Verified' | 'Houzz';

export interface Testimonial {
  id: string;
  clientName: string;
  location: string;
  projectType: string;
  rating: number;
  reviewText: string;
  source: ReviewSource;
  publishedAt: string;
  verifiedLink?: string;
  isDraft?: boolean;
}

export interface QuoteFormData {
  fullName: string;
  phone: string;
  email: string;
  postcode: string;
  address?: string;
  service: string;
  propertyType: string;
  timeframe: string;
  description: string;
  uploadedPhotos?: string[];
}
