'use client';

import React, { useState, useEffect } from 'react';
import { 
  Lock, 
  KeyRound, 
  Plus, 
  Upload, 
  Trash2, 
  Star, 
  CheckCircle, 
  RotateCcw, 
  Sparkles, 
  LogOut 
} from 'lucide-react';
import Logo from '@/components/Logo';
import { Project, Testimonial, ProjectCategory, ReviewSource } from '@/types';
import { 
  getStoredProjects, 
  saveStoredProjects, 
  getStoredTestimonials, 
  saveStoredTestimonials, 
  resetToDefaults 
} from '@/lib/storage';

const DEFAULT_PIN = '1234';

async function compressImage(file: File, maxWidth = 1200, quality = 0.82): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = document.createElement('img');
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(img.src);
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', quality));
      };
      img.onerror = (error) => reject(error);
    };
    reader.onerror = (error) => reject(error);
  });
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [pinInput, setPinInput] = useState<string>('');
  const [pinError, setPinError] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'projects' | 'testimonials'>('projects');

  const [projects, setProjects] = useState<Project[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  // Project form state
  const [projectTitle, setProjectTitle] = useState('');
  const [projectCategory, setProjectCategory] = useState<ProjectCategory>('Interior');
  const [projectLocation, setProjectLocation] = useState('Dartmouth');
  const [projectDescription, setProjectDescription] = useState('');
  const [projectBeforeImage, setProjectBeforeImage] = useState<string>('');
  const [projectAfterImage, setProjectAfterImage] = useState<string>('');
  const [projectFeatured, setProjectFeatured] = useState(false);
  const [isCompressingProject, setIsCompressingProject] = useState(false);
  const [projectSuccessMsg, setProjectSuccessMsg] = useState('');

  // Testimonial form state
  const [testClientName, setTestClientName] = useState('');
  const [testLocation, setTestLocation] = useState('Dartmouth');
  const [testProjectType, setTestProjectType] = useState('Interior Painting');
  const [testRating, setTestRating] = useState(5);
  const [testReviewText, setTestReviewText] = useState('');
  const [testSource, setTestSource] = useState<ReviewSource>('Facebook');
  const [testSuccessMsg, setTestSuccessMsg] = useState('');

  useEffect(() => {
    try {
      const sessionAuth = sessionStorage.getItem('apex_admin_auth_session');
      if (sessionAuth === 'true') {
        setIsAuthenticated(true);
      }
    } catch {}
  }, []);

  const loadAllData = () => {
    setProjects(getStoredProjects());
    setTestimonials(getStoredTestimonials());
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadAllData();
    }
  }, [isAuthenticated]);

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput === DEFAULT_PIN) {
      try {
        sessionStorage.setItem('apex_admin_auth_session', 'true');
      } catch {}
      setIsAuthenticated(true);
      setPinError('');
    } else {
      setPinError('Invalid PIN. (Default demo PIN is 1234)');
    }
  };

  const handleLogout = () => {
    try {
      sessionStorage.removeItem('apex_admin_auth_session');
    } catch {}
    setIsAuthenticated(false);
    setPinInput('');
  };

  const handleBeforeImageFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsCompressingProject(true);
    try {
      const compressed = await compressImage(file);
      setProjectBeforeImage(compressed);
    } catch {
      alert('Error processing before image');
    } finally {
      setIsCompressingProject(false);
    }
  };

  const handleAfterImageFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsCompressingProject(true);
    try {
      const compressed = await compressImage(file);
      setProjectAfterImage(compressed);
    } catch {
      alert('Error processing after image');
    } finally {
      setIsCompressingProject(false);
    }
  };

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectAfterImage) {
      alert('Please upload an After image.');
      return;
    }

    const newProj: Project = {
      id: `proj-${Date.now()}`,
      slug: projectTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      title: projectTitle,
      category: projectCategory,
      location: projectLocation,
      beforeImage: projectBeforeImage || undefined,
      afterImage: projectAfterImage,
      description: projectDescription,
      featured: projectFeatured,
      publishedAt: new Date().toISOString().split('T')[0],
    };

    const updated = [newProj, ...projects];
    saveStoredProjects(updated);
    setProjects(updated);
    setProjectSuccessMsg('Project published to portfolio!');

    setProjectTitle('');
    setProjectLocation('Dartmouth');
    setProjectDescription('');
    setProjectBeforeImage('');
    setProjectAfterImage('');
    setProjectFeatured(false);

    setTimeout(() => setProjectSuccessMsg(''), 4000);
  };

  const handleDeleteProject = (id: string) => {
    if (confirm('Delete this project?')) {
      const updated = projects.filter((p) => p.id !== id);
      saveStoredProjects(updated);
      setProjects(updated);
    }
  };

  const handleCreateTestimonial = (e: React.FormEvent) => {
    e.preventDefault();
    const newTest: Testimonial = {
      id: `test-${Date.now()}`,
      clientName: testClientName,
      location: testLocation,
      projectType: testProjectType,
      rating: testRating,
      reviewText: testReviewText,
      source: testSource,
      publishedAt: new Date().toISOString().split('T')[0],
      verifiedLink: testSource === 'Facebook' ? 'https://facebook.com/Sistine' : undefined,
    };

    const updated = [newTest, ...testimonials];
    saveStoredTestimonials(updated);
    setTestimonials(updated);
    setTestSuccessMsg('Testimonial published!');

    setTestClientName('');
    setTestLocation('Dartmouth');
    setTestProjectType('Interior Painting');
    setTestReviewText('');

    setTimeout(() => setTestSuccessMsg(''), 4000);
  };

  const handleDeleteTestimonial = (id: string) => {
    if (confirm('Delete this testimonial?')) {
      const updated = testimonials.filter((t) => t.id !== id);
      saveStoredTestimonials(updated);
      setTestimonials(updated);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md bg-white rounded-3xl border border-slate-200 p-8 shadow-sm space-y-6">
          <div className="text-center space-y-3">
            <Logo variant="circle" />
            <h1 className="text-2xl font-serif font-bold text-slate-900 tracking-tight">
              Sistine Admin Portal
            </h1>
            <p className="text-xs text-slate-500">
              Enter PIN to manage projects and client reviews.
            </p>
          </div>

          <form onSubmit={handlePinSubmit} className="space-y-4">
            <div>
              <div className="relative">
                <KeyRound className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  maxLength={6}
                  value={pinInput}
                  onChange={(e) => {
                    setPinInput(e.target.value);
                    setPinError('');
                  }}
                  placeholder="Enter PIN (1234)"
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-300 text-center text-lg font-mono tracking-widest text-slate-900 focus:border-slate-900"
                  autoFocus
                />
              </div>
              {pinError && (
                <p className="text-xs text-rose-600 font-medium text-center mt-2">
                  {pinError}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm rounded-xl transition-all shadow-sm"
            >
              Unlock Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="py-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      
      {/* Top Bar */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white">
            Sistine Decorating Portal
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage your Dartmouth portfolio photos and reviews.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => {
              if (confirm('Reset to initial Dartmouth projects?')) {
                resetToDefaults();
                loadAllData();
              }
            }}
            className="px-3 py-2 rounded-lg bg-slate-800 text-slate-300 text-xs font-semibold flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Demo</span>
          </button>
          <button
            type="button"
            onClick={handleLogout}
            className="px-4 py-2 rounded-lg bg-rose-900/80 text-white text-xs font-semibold flex items-center gap-1.5"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Lock</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-3 border-b border-slate-200 pb-2">
        <button
          type="button"
          onClick={() => setActiveTab('projects')}
          className={`px-5 py-2 rounded-full font-serif text-sm font-semibold transition-all ${
            activeTab === 'projects'
              ? 'bg-slate-900 text-white shadow-sm'
              : 'bg-white text-slate-700 border border-slate-200'
          }`}
        >
          Projects ({projects.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('testimonials')}
          className={`px-5 py-2 rounded-full font-serif text-sm font-semibold transition-all ${
            activeTab === 'testimonials'
              ? 'bg-slate-900 text-white shadow-sm'
              : 'bg-white text-slate-700 border border-slate-200'
          }`}
        >
          Reviews ({testimonials.length})
        </button>
      </div>

      {/* Projects Form & List */}
      {activeTab === 'projects' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
            <h2 className="text-xl font-serif font-bold text-slate-900">Add Project</h2>
            {projectSuccessMsg && (
              <p className="p-2.5 bg-emerald-50 text-emerald-800 text-xs rounded-lg">{projectSuccessMsg}</p>
            )}

            <form onSubmit={handleCreateProject} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase mb-1">Title</label>
                <input
                  type="text"
                  required
                  value={projectTitle}
                  onChange={(e) => setProjectTitle(e.target.value)}
                  placeholder="e.g. Southtown Victorian Hallway"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold uppercase mb-1">Category</label>
                  <select
                    value={projectCategory}
                    onChange={(e) => setProjectCategory(e.target.value as ProjectCategory)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm"
                  >
                    <option value="Interior">Interior</option>
                    <option value="Exterior">Exterior</option>
                    <option value="Wallpapering">Wallpapering</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase mb-1">Location</label>
                  <input
                    type="text"
                    required
                    value={projectLocation}
                    onChange={(e) => setProjectLocation(e.target.value)}
                    placeholder="e.g. Dartmouth"
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase mb-1">Description</label>
                <textarea
                  required
                  rows={3}
                  value={projectDescription}
                  onChange={(e) => setProjectDescription(e.target.value)}
                  placeholder="Short description of the decorating work..."
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm"
                />
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold uppercase mb-1">Before Photo (Optional)</label>
                  <input type="file" accept="image/*" onChange={handleBeforeImageFile} className="text-xs" />
                  {projectBeforeImage && <p className="text-xs text-emerald-600 mt-1">✓ Before loaded</p>}
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase mb-1">After Photo (Required) *</label>
                  <input type="file" accept="image/*" onChange={handleAfterImageFile} className="text-xs" />
                  {projectAfterImage && <p className="text-xs text-emerald-600 mt-1">✓ After loaded</p>}
                </div>
              </div>

              <button
                type="submit"
                disabled={isCompressingProject}
                className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-xl transition-all"
              >
                {isCompressingProject ? 'Processing...' : 'Publish Project'}
              </button>
            </form>
          </div>

          <div className="lg:col-span-7 space-y-3">
            <h2 className="text-xl font-serif font-bold text-slate-900">Current Projects ({projects.length})</h2>
            {projects.map((p) => (
              <div key={p.id} className="bg-white p-4 rounded-xl border border-slate-200 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.afterImage} alt={p.title} className="w-14 h-14 rounded-lg object-cover" />
                  <div>
                    <h3 className="font-serif font-bold text-sm text-slate-900">{p.title}</h3>
                    <p className="text-xs text-slate-500">{p.category} • {p.location}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleDeleteProject(p.id)}
                  className="p-1.5 text-rose-600 hover:bg-rose-50 rounded"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

        </div>
      )}

      {/* Testimonials Form & List */}
      {activeTab === 'testimonials' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
            <h2 className="text-xl font-serif font-bold text-slate-900">Add Review</h2>
            {testSuccessMsg && <p className="p-2.5 bg-emerald-50 text-emerald-800 text-xs rounded-lg">{testSuccessMsg}</p>}
            <form onSubmit={handleCreateTestimonial} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase mb-1">Client Name</label>
                <input
                  type="text"
                  required
                  value={testClientName}
                  onChange={(e) => setTestClientName(e.target.value)}
                  placeholder="e.g. Mark & Sarah"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold uppercase mb-1">Location</label>
                  <input
                    type="text"
                    required
                    value={testLocation}
                    onChange={(e) => setTestLocation(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase mb-1">Work Done</label>
                  <input
                    type="text"
                    required
                    value={testProjectType}
                    onChange={(e) => setTestProjectType(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase mb-1">Review Text</label>
                <textarea
                  required
                  rows={3}
                  value={testReviewText}
                  onChange={(e) => setTestReviewText(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-xl transition-all"
              >
                Publish Review
              </button>
            </form>
          </div>

          <div className="lg:col-span-7 space-y-3">
            <h2 className="text-xl font-serif font-bold text-slate-900">Current Reviews ({testimonials.length})</h2>
            {testimonials.map((t) => (
              <div key={t.id} className="bg-white p-4 rounded-xl border border-slate-200 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-serif font-bold text-sm text-slate-900">{t.clientName} ({t.location})</span>
                  <button type="button" onClick={() => handleDeleteTestimonial(t.id)} className="text-rose-600 p-1">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="text-xs text-slate-600 italic">&ldquo;{t.reviewText}&rdquo;</p>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
