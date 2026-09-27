'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { 
  Lock, 
  KeyRound, 
  Plus, 
  Upload, 
  Trash2, 
  Star, 
  CheckCircle, 
  Eye, 
  RotateCcw, 
  Sparkles, 
  ShieldCheck, 
  LogOut,
  Image as ImageIcon
} from 'lucide-react';
import { Project, Testimonial, ProjectCategory, ReviewSource } from '@/types';
import { 
  getStoredProjects, 
  saveStoredProjects, 
  getStoredTestimonials, 
  saveStoredTestimonials, 
  resetToDefaults 
} from '@/lib/storage';

const DEFAULT_PIN = '1234';

// Canvas-based client-side image compression
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
        const dataUrl = canvas.toDataURL('image/jpeg', quality);
        resolve(dataUrl);
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

  // Stored state
  const [projects, setProjects] = useState<Project[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  // Project form state
  const [projectTitle, setProjectTitle] = useState('');
  const [projectCategory, setProjectCategory] = useState<ProjectCategory>('Interior');
  const [projectLocation, setProjectLocation] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [projectBeforeImage, setProjectBeforeImage] = useState<string>('');
  const [projectAfterImage, setProjectAfterImage] = useState<string>('');
  const [projectFeatured, setProjectFeatured] = useState(false);
  const [projectScope1, setProjectScope1] = useState('');
  const [projectScope2, setProjectScope2] = useState('');
  const [isCompressingProject, setIsCompressingProject] = useState(false);
  const [projectSuccessMsg, setProjectSuccessMsg] = useState('');

  // Testimonial form state
  const [testClientName, setTestClientName] = useState('');
  const [testLocation, setTestLocation] = useState('');
  const [testProjectType, setTestProjectType] = useState('');
  const [testRating, setTestRating] = useState(5);
  const [testReviewText, setTestReviewText] = useState('');
  const [testSource, setTestSource] = useState<ReviewSource>('Facebook');
  const [testSuccessMsg, setTestSuccessMsg] = useState('');

  // Check session authorization on mount
  useEffect(() => {
    try {
      const sessionAuth = sessionStorage.getItem('apex_admin_auth_session');
      if (sessionAuth === 'true') {
        setIsAuthenticated(true);
      }
    } catch {
      // Ignore in SSR
    }
  }, []);

  // Reload data
  const loadAllData = () => {
    setProjects(getStoredProjects());
    setTestimonials(getStoredTestimonials());
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadAllData();
    }
  }, [isAuthenticated]);

  // Handle PIN submit
  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput === DEFAULT_PIN) {
      try {
        sessionStorage.setItem('apex_admin_auth_session', 'true');
      } catch {}
      setIsAuthenticated(true);
      setPinError('');
    } else {
      setPinError('Invalid Security PIN. (Default demo PIN is 1234)');
    }
  };

  const handleLogout = () => {
    try {
      sessionStorage.removeItem('apex_admin_auth_session');
    } catch {}
    setIsAuthenticated(false);
    setPinInput('');
  };

  // Image Upload Handlers with Canvas Compression
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

  // Create Project
  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectAfterImage) {
      alert('Please upload an After image (completed finish).');
      return;
    }

    const scopeList: string[] = [];
    if (projectScope1.trim()) scopeList.push(projectScope1.trim());
    if (projectScope2.trim()) scopeList.push(projectScope2.trim());

    const newProj: Project = {
      id: `proj-${Date.now()}`,
      slug: projectTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      title: projectTitle,
      category: projectCategory,
      location: projectLocation,
      beforeImage: projectBeforeImage || undefined,
      afterImage: projectAfterImage,
      description: projectDescription,
      scopeDetails: scopeList.length > 0 ? scopeList : undefined,
      featured: projectFeatured,
      publishedAt: new Date().toISOString().split('T')[0],
    };

    const updated = [newProj, ...projects];
    saveStoredProjects(updated);
    setProjects(updated);
    setProjectSuccessMsg('Project created and published successfully!');

    // Reset Form
    setProjectTitle('');
    setProjectLocation('');
    setProjectDescription('');
    setProjectBeforeImage('');
    setProjectAfterImage('');
    setProjectFeatured(false);
    setProjectScope1('');
    setProjectScope2('');

    setTimeout(() => setProjectSuccessMsg(''), 4000);
  };

  // Delete Project
  const handleDeleteProject = (id: string) => {
    if (confirm('Are you sure you want to remove this project?')) {
      const updated = projects.filter((p) => p.id !== id);
      saveStoredProjects(updated);
      setProjects(updated);
    }
  };

  // Toggle Featured Project
  const handleToggleFeatured = (id: string) => {
    const updated = projects.map((p) => (p.id === id ? { ...p, featured: !p.featured } : p));
    saveStoredProjects(updated);
    setProjects(updated);
  };

  // Create Testimonial
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
      verifiedLink: testSource === 'Facebook' ? 'https://facebook.com/reviews/apex-decorating-cheltenham' : undefined,
    };

    const updated = [newTest, ...testimonials];
    saveStoredTestimonials(updated);
    setTestimonials(updated);
    setTestSuccessMsg('Testimonial added and published to review feed!');

    setTestClientName('');
    setTestLocation('');
    setTestProjectType('');
    setTestReviewText('');

    setTimeout(() => setTestSuccessMsg(''), 4000);
  };

  // Delete Testimonial
  const handleDeleteTestimonial = (id: string) => {
    if (confirm('Are you sure you want to delete this testimonial?')) {
      const updated = testimonials.filter((t) => t.id !== id);
      saveStoredTestimonials(updated);
      setTestimonials(updated);
    }
  };

  // Reset to initial demo records
  const handleResetDefaults = () => {
    if (confirm('Reset projects and testimonials back to original seed data?')) {
      resetToDefaults();
      loadAllData();
      alert('All collections reset to initial trade seed data.');
    }
  };

  // PIN GATE SCREEN
  if (!isAuthenticated) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md bg-white rounded-3xl border border-slate-200 p-8 shadow-trade-lg space-y-6">
          
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-slate-900 text-amber-400 flex items-center justify-center mx-auto shadow-md">
              <Lock className="w-7 h-7" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Apex Client Portal
            </h1>
            <p className="text-xs text-slate-500">
              Enter your master authorization PIN to manage portfolio projects and testimonials.
            </p>
          </div>

          <form onSubmit={handlePinSubmit} className="space-y-4">
            <div>
              <label htmlFor="admin-pin-input" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2 text-center">
                Security PIN Code
              </label>
              <div className="relative">
                <KeyRound className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  id="admin-pin-input"
                  type="password"
                  maxLength={6}
                  value={pinInput}
                  onChange={(e) => {
                    setPinInput(e.target.value);
                    setPinError('');
                  }}
                  placeholder="Enter 4-digit PIN (1234)"
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-300 text-center text-lg font-mono tracking-widest text-slate-900 focus:border-amber-500 focus:ring-2 focus:ring-amber-500"
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
              className="w-full py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
            >
              <span>Unlock Admin Dashboard</span>
            </button>

            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-[11px] text-slate-500 text-center">
              💡 <strong>Default Demo PIN:</strong> <span className="font-mono font-bold text-slate-800">1234</span>
            </div>
          </form>

        </div>
      </div>
    );
  }

  // AUTHENTICATED ADMIN DASHBOARD
  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      
      {/* Top Bar */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-trade">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
              Management Portal
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Apex Decorating CMS
          </h1>
          <p className="text-xs text-slate-400">
            Outstatic &amp; local collection management. Client-side canvas image optimizer active.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleResetDefaults}
            className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Demo Data</span>
          </button>
          <button
            type="button"
            onClick={handleLogout}
            className="px-4 py-2 rounded-lg bg-rose-900/80 hover:bg-rose-800 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Lock Portal</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-3 border-b border-slate-200 pb-2">
        <button
          type="button"
          onClick={() => setActiveTab('projects')}
          className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all ${
            activeTab === 'projects'
              ? 'bg-amber-600 text-white shadow-sm'
              : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          Manage Projects ({projects.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('testimonials')}
          className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all ${
            activeTab === 'testimonials'
              ? 'bg-amber-600 text-white shadow-sm'
              : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          Manage Testimonials ({testimonials.length})
        </button>
      </div>

      {/* SECTION 1: PROJECTS TAB */}
      {activeTab === 'projects' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Project Uploader Form */}
          <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-6 shadow-trade space-y-6">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Upload New Portfolio Project
              </h2>
              <p className="text-xs text-slate-500">
                Add high-res photos. Images are automatically compressed before storing.
              </p>
            </div>

            {projectSuccessMsg && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold rounded-lg flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>{projectSuccessMsg}</span>
              </div>
            )}

            <form onSubmit={handleCreateProject} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                  Project Title *
                </label>
                <input
                  type="text"
                  required
                  value={projectTitle}
                  onChange={(e) => setProjectTitle(e.target.value)}
                  placeholder="e.g. Victorian Hallway & Staircase Restoration"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                    Category *
                  </label>
                  <select
                    value={projectCategory}
                    onChange={(e) => setProjectCategory(e.target.value as ProjectCategory)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:border-amber-500"
                  >
                    <option value="Interior">Interior</option>
                    <option value="Exterior">Exterior</option>
                    <option value="Wallpapering">Wallpapering</option>
                    <option value="Restoration & Woodwork">Restoration &amp; Woodwork</option>
                    <option value="Commercial">Commercial</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                    Town / Location *
                  </label>
                  <input
                    type="text"
                    required
                    value={projectLocation}
                    onChange={(e) => setProjectLocation(e.target.value)}
                    placeholder="e.g. Cheltenham, GL50"
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                  Short Description *
                </label>
                <textarea
                  required
                  rows={3}
                  value={projectDescription}
                  onChange={(e) => setProjectDescription(e.target.value)}
                  placeholder="Details on paint systems, plaster repair, bio-resin woodwork, dust extraction..."
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:border-amber-500"
                />
              </div>

              {/* Image Uploaders (Before & After) */}
              <div className="space-y-3 pt-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                    Before Image (Optional for comparison slider)
                  </label>
                  <label className="flex items-center gap-2 px-3 py-2 border border-dashed border-slate-300 rounded-lg bg-slate-50 hover:bg-slate-100 cursor-pointer text-xs text-slate-700">
                    <Upload className="w-4 h-4 text-amber-600" />
                    <span>Select Before Photo</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleBeforeImageFile}
                      className="hidden"
                    />
                  </label>
                  {projectBeforeImage && (
                    <div className="mt-2 relative w-20 h-20 rounded-lg overflow-hidden border">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={projectBeforeImage} alt="Before preview" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => setProjectBeforeImage('')}
                        className="absolute top-1 right-1 bg-black/70 text-white rounded p-0.5 text-[10px]"
                      >
                        ✕
                      </button>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                    After Image (Required - Completed Apex Finish) *
                  </label>
                  <label className="flex items-center gap-2 px-3 py-2 border border-dashed border-slate-300 rounded-lg bg-slate-50 hover:bg-slate-100 cursor-pointer text-xs text-slate-700">
                    <Upload className="w-4 h-4 text-emerald-600" />
                    <span>Select After Photo</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleAfterImageFile}
                      className="hidden"
                    />
                  </label>
                  {projectAfterImage && (
                    <div className="mt-2 relative w-20 h-20 rounded-lg overflow-hidden border border-emerald-500">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={projectAfterImage} alt="After preview" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => setProjectAfterImage('')}
                        className="absolute top-1 right-1 bg-black/70 text-white rounded p-0.5 text-[10px]"
                      >
                        ✕
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Scope Points */}
              <div className="space-y-2 pt-1">
                <label className="block text-xs font-semibold text-slate-700 uppercase">
                  Key Scope Highlights (Optional)
                </label>
                <input
                  type="text"
                  value={projectScope1}
                  onChange={(e) => setProjectScope1(e.target.value)}
                  placeholder="e.g. Mirka HEPA dustless sanding applied"
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs"
                />
                <input
                  type="text"
                  value={projectScope2}
                  onChange={(e) => setProjectScope2(e.target.value)}
                  placeholder="e.g. Farrow & Ball Estate Emulsion in Stiffkey Blue"
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs"
                />
              </div>

              {/* Featured toggle */}
              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="feat-checkbox"
                  checked={projectFeatured}
                  onChange={(e) => setProjectFeatured(e.target.checked)}
                  className="rounded border-slate-300 text-amber-600 focus:ring-amber-500"
                />
                <label htmlFor="feat-checkbox" className="text-xs font-semibold text-slate-700">
                  Feature this project prominently on Homepage slider
                </label>
              </div>

              <button
                type="submit"
                disabled={isCompressingProject}
                className="w-full py-3 bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>{isCompressingProject ? 'Compressing & Saving...' : 'Publish Project to Site'}</span>
              </button>
            </form>
          </div>

          {/* Active Projects List */}
          <div className="lg:col-span-7 space-y-4">
            <h2 className="text-lg font-bold text-slate-900">
              Active Project Records ({projects.length})
            </h2>

            <div className="space-y-3">
              {projects.map((proj) => (
                <div
                  key={proj.id}
                  className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-slate-900 shrink-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={proj.afterImage} alt={proj.title} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded">
                          {proj.category}
                        </span>
                        {proj.featured && (
                          <span className="text-[10px] font-bold text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded flex items-center gap-1">
                            <Sparkles className="w-3 h-3" /> Featured
                          </span>
                        )}
                      </div>
                      <h4 className="text-sm font-bold text-slate-900 mt-1 line-clamp-1">
                        {proj.title}
                      </h4>
                      <p className="text-xs text-slate-500">{proj.location}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                    <button
                      type="button"
                      onClick={() => handleToggleFeatured(proj.id)}
                      className={`px-2.5 py-1 rounded text-xs font-medium border ${
                        proj.featured
                          ? 'bg-amber-50 border-amber-300 text-amber-800'
                          : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                      title="Toggle Homepage feature"
                    >
                      {proj.featured ? 'Featured' : 'Set Feature'}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteProject(proj.id)}
                      className="p-1.5 rounded text-rose-600 hover:bg-rose-50 border border-slate-200"
                      title="Delete project"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* SECTION 2: TESTIMONIALS TAB */}
      {activeTab === 'testimonials' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Create Testimonial Form */}
          <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-6 shadow-trade space-y-6">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Create Verified Testimonial
              </h2>
              <p className="text-xs text-slate-500">
                Add written customer feedback or authenticated Facebook reviews.
              </p>
            </div>

            {testSuccessMsg && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold rounded-lg flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>{testSuccessMsg}</span>
              </div>
            )}

            <form onSubmit={handleCreateTestimonial} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                  Client Name *
                </label>
                <input
                  type="text"
                  required
                  value={testClientName}
                  onChange={(e) => setTestClientName(e.target.value)}
                  placeholder="e.g. Julian & Sarah Montgomery"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                    Town / Location *
                  </label>
                  <input
                    type="text"
                    required
                    value={testLocation}
                    onChange={(e) => setTestLocation(e.target.value)}
                    placeholder="e.g. Montpellier, Cheltenham"
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                    Project Type *
                  </label>
                  <input
                    type="text"
                    required
                    value={testProjectType}
                    onChange={(e) => setTestProjectType(e.target.value)}
                    placeholder="e.g. Georgian Drawing Room"
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                    Star Rating (1–5)
                  </label>
                  <select
                    value={testRating}
                    onChange={(e) => setTestRating(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:border-amber-500"
                  >
                    <option value={5}>⭐⭐⭐⭐⭐ (5/5 Stars)</option>
                    <option value={4}>⭐⭐⭐⭐ (4/5 Stars)</option>
                    <option value={3}>⭐⭐⭐ (3/5 Stars)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                    Source
                  </label>
                  <select
                    value={testSource}
                    onChange={(e) => setTestSource(e.target.value as ReviewSource)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:border-amber-500"
                  >
                    <option value="Facebook">Facebook Review</option>
                    <option value="Direct Quote">Direct Client Review</option>
                    <option value="Google Verified">Google Verified</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                  Testimonial Copy *
                </label>
                <textarea
                  required
                  rows={4}
                  value={testReviewText}
                  onChange={(e) => setTestReviewText(e.target.value)}
                  placeholder="Client feedback regarding dustless sanding, punctuality, finish quality..."
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:border-amber-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>Publish Testimonial</span>
              </button>
            </form>
          </div>

          {/* Active Testimonials List */}
          <div className="lg:col-span-7 space-y-4">
            <h2 className="text-lg font-bold text-slate-900">
              Active Testimonials Feed ({testimonials.length})
            </h2>

            <div className="space-y-3">
              {testimonials.map((test) => (
                <div
                  key={test.id}
                  className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-amber-500">
                      {[...Array(test.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-500" />
                      ))}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                        {test.source}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleDeleteTestimonial(test.id)}
                        className="p-1 text-rose-600 hover:bg-rose-50 rounded"
                        title="Delete review"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <p className="text-xs text-slate-700 italic">
                    &ldquo;{test.reviewText}&rdquo;
                  </p>

                  <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-100">
                    <span className="font-bold text-slate-800">{test.clientName} ({test.location})</span>
                    <span>{test.projectType}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
