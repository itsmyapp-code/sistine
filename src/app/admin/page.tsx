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
  LogOut,
  X,
  Images,
  Camera
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
  const [projectImages, setProjectImages] = useState<string[]>([]);
  const [projectScope1, setProjectScope1] = useState('');
  const [projectScope2, setProjectScope2] = useState('');
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

  // Multi-image file uploader with canvas compression
  const handleMultipleImagesUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsCompressingProject(true);
    try {
      const compressedList: string[] = [];
      for (let i = 0; i < files.length; i++) {
        const compressed = await compressImage(files[i]);
        compressedList.push(compressed);
      }
      setProjectImages(prev => [...prev, ...compressedList]);
    } catch (err) {
      console.error(err);
      alert('Error processing one or more photos.');
    } finally {
      setIsCompressingProject(false);
    }
  };

  const removePhoto = (index: number) => {
    setProjectImages(prev => prev.filter((_, i) => i !== index));
  };

  const setAsCoverPhoto = (index: number) => {
    if (index === 0) return;
    setProjectImages(prev => {
      const copy = [...prev];
      const selected = copy.splice(index, 1)[0];
      return [selected, ...copy];
    });
  };

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (projectImages.length === 0) {
      alert('Please upload at least one photo of the work carried out.');
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
      afterImage: projectImages[0], // First image is cover
      beforeImage: projectImages.length > 1 ? projectImages[projectImages.length - 1] : undefined,
      images: projectImages, // Full gallery of work
      description: projectDescription,
      scopeDetails: scopeList.length > 0 ? scopeList : undefined,
      featured: false,
      publishedAt: new Date().toISOString().split('T')[0],
    };

    const updated = [newProj, ...projects];
    saveStoredProjects(updated);
    setProjects(updated);
    setProjectSuccessMsg(`Project with ${projectImages.length} photos published to portfolio!`);

    setProjectTitle('');
    setProjectLocation('Dartmouth');
    setProjectDescription('');
    setProjectImages([]);
    setProjectScope1('');
    setProjectScope2('');

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
              Enter PIN to manage project photo galleries and client reviews.
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
            Upload multiple photos of completed work, before/after shots, and client reviews.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => {
              if (confirm('Reset to initial Dartmouth projects with multiple photos?')) {
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
          Job Galleries ({projects.length})
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

      {/* Projects Tab */}
      {activeTab === 'projects' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Uploader Form */}
          <div className="lg:col-span-6 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
            <div>
              <h2 className="text-xl font-serif font-bold text-slate-900">Add New Job &amp; Photos</h2>
              <p className="text-xs text-slate-500">Upload multiple photos of work carried out on this job.</p>
            </div>

            {projectSuccessMsg && (
              <p className="p-2.5 bg-emerald-50 text-emerald-800 text-xs rounded-lg">{projectSuccessMsg}</p>
            )}

            <form onSubmit={handleCreateProject} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase mb-1">Project / Job Title *</label>
                <input
                  type="text"
                  required
                  value={projectTitle}
                  onChange={(e) => setProjectTitle(e.target.value)}
                  placeholder="e.g. Victorian Drawing Room &amp; Cornice Painting"
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
                    placeholder="e.g. Southtown, Dartmouth"
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase mb-1">Job Description</label>
                <textarea
                  required
                  rows={3}
                  value={projectDescription}
                  onChange={(e) => setProjectDescription(e.target.value)}
                  placeholder="Details of the work carried out, room preparation, paint finishes applied..."
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm"
                />
              </div>

              {/* Multiple Image Upload Dropzone */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold uppercase">
                  Job Photos (Upload Multiple) *
                </label>
                <label className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-slate-300 hover:border-slate-800 rounded-xl bg-slate-50 cursor-pointer transition-colors group">
                  <Upload className="w-6 h-6 text-slate-400 group-hover:text-slate-800 mb-1" />
                  <span className="text-xs font-semibold text-slate-700">Click to Select Photos</span>
                  <span className="text-[11px] text-slate-400">Select multiple files from your computer or phone</span>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleMultipleImagesUpload}
                    className="hidden"
                  />
                </label>

                {/* Uploaded Photos Grid & Management */}
                {projectImages.length > 0 && (
                  <div className="space-y-2 pt-2">
                    <p className="text-xs font-semibold text-slate-700">
                      {projectImages.length} Photo(s) Attached (First photo is Main Cover):
                    </p>
                    <div className="grid grid-cols-3 gap-2.5">
                      {projectImages.map((img, idx) => (
                        <div key={idx} className="relative aspect-[4/3] rounded-lg overflow-hidden border border-slate-200 group bg-slate-100">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={img} alt={`Upload ${idx + 1}`} className="w-full h-full object-cover" />
                          
                          {idx === 0 && (
                            <span className="absolute bottom-1 left-1 bg-amber-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
                              Cover
                            </span>
                          )}

                          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5 p-1">
                            {idx !== 0 && (
                              <button
                                type="button"
                                onClick={() => setAsCoverPhoto(idx)}
                                className="px-1.5 py-1 rounded bg-white text-slate-900 text-[10px] font-semibold"
                                title="Make Cover Photo"
                              >
                                Set Cover
                              </button>
                            )}
                            <button
                              type="button"
                              onClick={() => removePhoto(idx)}
                              className="p-1 rounded bg-rose-600 text-white"
                              title="Delete Photo"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Scope highlights */}
              <div className="space-y-2 pt-1">
                <label className="block text-xs font-semibold uppercase">Key Details (Optional)</label>
                <input
                  type="text"
                  value={projectScope1}
                  onChange={(e) => setProjectScope1(e.target.value)}
                  placeholder="e.g. Farrow & Ball Estate Emulsion applied"
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs"
                />
                <input
                  type="text"
                  value={projectScope2}
                  onChange={(e) => setProjectScope2(e.target.value)}
                  placeholder="e.g. Satinwood finish on all skirting boards"
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs"
                />
              </div>

              <button
                type="submit"
                disabled={isCompressingProject || projectImages.length === 0}
                className="w-full py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-xl transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>{isCompressingProject ? 'Compressing Photos...' : `Publish Job (${projectImages.length} Photos)`}</span>
              </button>
            </form>
          </div>

          {/* Active Projects List */}
          <div className="lg:col-span-6 space-y-3">
            <h2 className="text-xl font-serif font-bold text-slate-900">
              Active Job Galleries ({projects.length})
            </h2>

            <div className="space-y-3">
              {projects.map((p) => {
                const count = p.images?.length || (p.beforeImage ? 2 : 1);
                return (
                  <div key={p.id} className="bg-white p-4 rounded-xl border border-slate-200 flex items-start justify-between gap-4 shadow-xs">
                    <div className="flex items-start gap-3">
                      <div className="relative w-16 h-14 rounded-lg overflow-hidden bg-slate-900 shrink-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={p.afterImage} alt={p.title} className="w-full h-full object-cover" />
                        <span className="absolute bottom-0.5 right-0.5 bg-black/80 text-white text-[9px] px-1 rounded">
                          {count}📷
                        </span>
                      </div>
                      <div>
                        <h3 className="font-serif font-bold text-sm text-slate-900 line-clamp-1">{p.title}</h3>
                        <p className="text-xs text-slate-500">{p.category} • {p.location}</p>
                        <p className="text-[11px] text-slate-400 mt-1">{count} photos in gallery</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleDeleteProject(p.id)}
                      className="p-1.5 text-rose-600 hover:bg-rose-50 rounded shrink-0"
                      title="Delete job"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      )}

      {/* Testimonials Tab */}
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
