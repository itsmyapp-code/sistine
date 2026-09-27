'use client';

import { Project, Testimonial } from '@/types';
import { INITIAL_PROJECTS, INITIAL_TESTIMONIALS } from '@/data/initialData';

const PROJECTS_STORAGE_KEY = 'apex_projects_data_v1';
const TESTIMONIALS_STORAGE_KEY = 'apex_testimonials_data_v1';

export function getStoredProjects(): Project[] {
  if (typeof window === 'undefined') return INITIAL_PROJECTS;
  try {
    const data = localStorage.getItem(PROJECTS_STORAGE_KEY);
    if (!data) {
      localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(INITIAL_PROJECTS));
      return INITIAL_PROJECTS;
    }
    return JSON.parse(data);
  } catch (e) {
    console.error('Error reading projects from storage', e);
    return INITIAL_PROJECTS;
  }
}

export function saveStoredProjects(projects: Project[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(projects));
    window.dispatchEvent(new Event('apex_data_updated'));
  } catch (e) {
    console.error('Error saving projects to storage', e);
  }
}

export function getStoredTestimonials(): Testimonial[] {
  if (typeof window === 'undefined') return INITIAL_TESTIMONIALS;
  try {
    const data = localStorage.getItem(TESTIMONIALS_STORAGE_KEY);
    if (!data) {
      localStorage.setItem(TESTIMONIALS_STORAGE_KEY, JSON.stringify(INITIAL_TESTIMONIALS));
      return INITIAL_TESTIMONIALS;
    }
    return JSON.parse(data);
  } catch (e) {
    console.error('Error reading testimonials from storage', e);
    return INITIAL_TESTIMONIALS;
  }
}

export function saveStoredTestimonials(testimonials: Testimonial[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(TESTIMONIALS_STORAGE_KEY, JSON.stringify(testimonials));
    window.dispatchEvent(new Event('apex_data_updated'));
  } catch (e) {
    console.error('Error saving testimonials to storage', e);
  }
}

export function resetToDefaults(): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(INITIAL_PROJECTS));
  localStorage.setItem(TESTIMONIALS_STORAGE_KEY, JSON.stringify(INITIAL_TESTIMONIALS));
  window.dispatchEvent(new Event('apex_data_updated'));
}
