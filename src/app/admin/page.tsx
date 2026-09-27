'use client';

import React, { useState, useEffect, useRef } from 'react';
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
  Clock,
  Check,
  Edit3,
  ArrowUp,
  ArrowDown,
  Image as ImageIcon,
  Sliders,
  Layers,
  Sparkles,
  Cloud,
  RefreshCw,
  Globe,
  Key,
  HelpCircle,
  BookOpen,
  UploadCloud,
  ChevronRight,
  Info,
  Settings,
  Eye
} from 'lucide-react';
import Logo from '@/components/Logo';
import { Project, Testimonial, ProjectCategory, HeroSlide } from '@/types';
import { 
  getStoredProjects, 
  saveStoredProjects, 
  getStoredTestimonials, 
  saveStoredTestimonials,
  getStoredHeroSlides,
  saveStoredHeroSlides,
  resetToDefaults,
  getGitHubToken,
  saveGitHubToken,
  syncDataToOnline
} from '@/lib/storage';

const DEFAULT_PIN = '1234';

async function compressImage(file: File, maxWidth = 1600, quality = 0.85): Promise<string> {
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
  const [activeTab, setActiveTab] = useState<'projects' | 'hero' | 'testimonials'>('projects');

  const [projects, setProjects] = useState<Project[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [heroSlides, setHeroSlides] = useState<HeroSlide[]>([]);

  // Project form state
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [projectTitle, setProjectTitle] = useState('');
  const [projectCategory, setProjectCategory] = useState<ProjectCategory>('Interior');
  const [projectLocation, setProjectLocation] = useState('Dartmouth');
  const [projectDescription, setProjectDescription] = useState('');
  const [projectImages, setProjectImages] = useState<string[]>([]);
  const [isCompressingProject, setIsCompressingProject] = useState(false);
  const [projectSuccessMsg, setProjectSuccessMsg] = useState('');

  // Hero form state
  const [newHeroUrl, setNewHeroUrl] = useState('');
  const [newHeroAlt, setNewHeroAlt] = useState('');
  const [isCompressingHero, setIsCompressingHero] = useState(false);
  const [heroSuccessMsg, setHeroSuccessMsg] = useState('');

  // Testimonial form state
  const [testClientName, setTestClientName] = useState('');
  const [testLocation, setTestLocation] = useState('Dartmouth');
  const [testProjectType, setTestProjectType] = useState('Interior Painting');
  const [testRating, setTestRating] = useState(5);
  const [testReviewText, setTestReviewText] = useState('');
  const [testSuccessMsg, setTestSuccessMsg] = useState('');

  // Online Sync State & Help Guide
  const [githubToken, setGithubToken] = useState('');
  const [tokenInput, setTokenInput] = useState('');
  const [showTokenSettings, setShowTokenSettings] = useState(false);
  const [showHelpGuide, setShowHelpGuide] = useState(false);
  const [syncStatus, setSyncStatus] = useState<{ msg: string; type: 'success' | 'error' | 'info' | '' }>({ msg: '', type: '' });
  const [isSyncingAll, setIsSyncingAll] = useState(false);

  const projectFormRef = useRef<HTMLDivElement>(null);

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
    setHeroSlides(getStoredHeroSlides());
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadAllData();
      const saved = getGitHubToken();
      setGithubToken(saved);
      setTokenInput(saved);
    }
  }, [isAuthenticated]);

  const handleSaveGithubToken = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanToken = tokenInput.trim();
    saveGitHubToken(cleanToken);
    setGithubToken(cleanToken);
    setSyncStatus({
      msg: cleanToken ? '✓ Cloud access key saved. Live publishing enabled!' : 'Access key cleared.',
      type: 'success'
    });
    setShowTokenSettings(false);
  };

  const handlePublishToLiveWebsite = async () => {
    setIsSyncingAll(true);
    setSyncStatus({ msg: 'Publishing your updates to the live website...', type: 'info' });
    try {
      const pRes = await syncDataToOnline('projects', projects);
      const hRes = await syncDataToOnline('hero', heroSlides);
      const tRes = await syncDataToOnline('testimonials', testimonials);

      if (pRes?.githubSynced || hRes?.githubSynced || tRes?.githubSynced) {
        setSyncStatus({
          msg: '✓ Successfully published all updates! The live website is updated across all devices.',
          type: 'success'
        });
      } else if (!githubToken) {
        setSyncStatus({
          msg: '✓ Changes saved locally. (To push live globally across all devices, configure your Cloud Key once in Vercel or in Settings below).',
          type: 'info'
        });
      } else {
        setSyncStatus({
          msg: pRes?.githubMessage || 'Unable to complete live publishing. Please check your cloud settings.',
          type: 'error'
        });
      }
    } catch (e: any) {
      setSyncStatus({ msg: `Publishing error: ${e?.message || e}`, type: 'error' });
    } finally {
      setIsSyncingAll(false);
    }
  };


  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput === DEFAULT_PIN) {
      try {
        sessionStorage.setItem('apex_admin_auth_session', 'true');
      } catch {}
      setIsAuthenticated(true);
      setPinError('');
    } else {
      setPinError('Incorrect PIN code. Please try again.');
    }
  };

  const handleLogout = () => {
    try {
      sessionStorage.removeItem('apex_admin_auth_session');
    } catch {}
    setIsAuthenticated(false);
    setPinInput('');
  };

  // --- PROJECT MANAGEMENT HANDLERS ---
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

  const startEditProject = (project: Project) => {
    setEditingProjectId(project.id);
    setProjectTitle(project.title);
    setProjectCategory(project.category);
    setProjectLocation(project.location);
    setProjectDescription(project.description);
    setProjectImages(project.images && project.images.length > 0 ? project.images : [project.afterImage]);
    
    if (projectFormRef.current) {
      projectFormRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const cancelEditProject = () => {
    setEditingProjectId(null);
    setProjectTitle('');
    setProjectCategory('Interior');
    setProjectLocation('Dartmouth');
    setProjectDescription('');
    setProjectImages([]);
  };

  const handleSaveProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (projectImages.length === 0) {
      alert('Please upload at least one photo of the work carried out.');
      return;
    }

    if (editingProjectId) {
      // Update existing project
      const updated = projects.map(p => {
        if (p.id === editingProjectId) {
          return {
            ...p,
            title: projectTitle,
            category: projectCategory,
            location: projectLocation,
            description: projectDescription,
            afterImage: projectImages[0],
            images: projectImages,
          };
        }
        return p;
      });

      saveStoredProjects(updated);
      setProjects(updated);
      setProjectSuccessMsg(`Project "${projectTitle}" updated successfully!`);
      cancelEditProject();
    } else {
      // Create new project
      const newProj: Project = {
        id: `proj-${Date.now()}`,
        slug: projectTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
        title: projectTitle,
        category: projectCategory,
        location: projectLocation,
        afterImage: projectImages[0],
        images: projectImages,
        description: projectDescription,
        publishedAt: new Date().toISOString().split('T')[0],
      };

      const updated = [newProj, ...projects];
      saveStoredProjects(updated);
      setProjects(updated);
      setProjectSuccessMsg(`Project with ${projectImages.length} photos published!`);
      cancelEditProject();
    }

    setTimeout(() => setProjectSuccessMsg(''), 4000);
  };

  const handleDeleteProject = (id: string, title: string) => {
    if (confirm(`Are you sure you want to delete "${title}"?`)) {
      const updated = projects.filter((p) => p.id !== id);
      saveStoredProjects(updated);
      setProjects(updated);
      if (editingProjectId === id) {
        cancelEditProject();
      }
      setProjectSuccessMsg(`Project "${title}" deleted.`);
      setTimeout(() => setProjectSuccessMsg(''), 3000);
    }
  };

  // --- HERO CAROUSEL MANAGEMENT HANDLERS ---
  const handleHeroFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsCompressingHero(true);
    try {
      const compressed = await compressImage(files[0], 2000, 0.88);
      const newSlide: HeroSlide = {
        id: `hero-${Date.now()}`,
        url: compressed,
        alt: newHeroAlt.trim() || 'Sistine Decorating Dartmouth',
      };
      const updated = [...heroSlides, newSlide];
      saveStoredHeroSlides(updated);
      setHeroSlides(updated);
      setNewHeroAlt('');
      setHeroSuccessMsg('New hero image uploaded & added to carousel!');
      setTimeout(() => setHeroSuccessMsg(''), 4000);
    } catch (err) {
      console.error(err);
      alert('Error uploading hero image.');
    } finally {
      setIsCompressingHero(false);
    }
  };

  const handleAddHeroUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newHeroUrl.trim()) return;

    const newSlide: HeroSlide = {
      id: `hero-${Date.now()}`,
      url: newHeroUrl.trim(),
      alt: newHeroAlt.trim() || 'Sistine Decorating Dartmouth',
    };
    const updated = [...heroSlides, newSlide];
    saveStoredHeroSlides(updated);
    setHeroSlides(updated);
    setNewHeroUrl('');
    setNewHeroAlt('');
    setHeroSuccessMsg('Hero image added to carousel!');
    setTimeout(() => setHeroSuccessMsg(''), 4000);
  };

  const handleDeleteHeroSlide = (id: string) => {
    if (heroSlides.length <= 1) {
      alert('You must keep at least one hero slide.');
      return;
    }
    if (confirm('Remove this slide from the homepage carousel?')) {
      const updated = heroSlides.filter(s => s.id !== id);
      saveStoredHeroSlides(updated);
      setHeroSlides(updated);
      setHeroSuccessMsg('Hero slide removed.');
      setTimeout(() => setHeroSuccessMsg(''), 3000);
    }
  };

  const handleMoveHeroSlide = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === heroSlides.length - 1) return;

    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    const copy = [...heroSlides];
    const [moved] = copy.splice(index, 1);
    copy.splice(targetIndex, 0, moved);

    saveStoredHeroSlides(copy);
    setHeroSlides(copy);
  };

  // --- TESTIMONIAL HANDLERS ---
  const handleCreateTestimonial = (e: React.FormEvent) => {
    e.preventDefault();
    const newTest: Testimonial = {
      id: `test-${Date.now()}`,
      clientName: testClientName,
      location: testLocation,
      projectType: testProjectType,
      rating: testRating,
      reviewText: testReviewText,
      status: 'approved',
      publishedAt: new Date().toISOString().split('T')[0],
    };

    const updated = [newTest, ...testimonials];
    saveStoredTestimonials(updated);
    setTestimonials(updated);
    setTestSuccessMsg('Testimonial approved & published!');

    setTestClientName('');
    setTestLocation('Dartmouth');
    setTestProjectType('Interior Painting');
    setTestReviewText('');

    setTimeout(() => setTestSuccessMsg(''), 4000);
  };

  const handleApproveReview = (id: string) => {
    const updated = testimonials.map(t => t.id === id ? { ...t, status: 'approved' as const } : t);
    saveStoredTestimonials(updated);
    setTestimonials(updated);
    setTestSuccessMsg('Review approved and published to website!');
    setTimeout(() => setTestSuccessMsg(''), 4000);
  };

  const handleDeleteTestimonial = (id: string) => {
    if (confirm('Are you sure you want to delete this review?')) {
      const updated = testimonials.filter((t) => t.id !== id);
      saveStoredTestimonials(updated);
      setTestimonials(updated);
    }
  };

  const pendingReviews = testimonials.filter(t => t.status === 'pending');
  const approvedReviews = testimonials.filter(t => t.status === 'approved' || (t as any).status === undefined);

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
              Enter PIN to manage homepage hero images, project galleries, and reviews.
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
                  placeholder="Enter 4-digit PIN"
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
            Manage your hero carousel, edit/delete Dartmouth job galleries, and moderate client reviews.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => {
              if (confirm('Reset to initial Dartmouth default data?')) {
                resetToDefaults();
                loadAllData();
              }
            }}
            className="px-3 py-2 rounded-lg bg-slate-800 text-slate-300 text-xs font-semibold flex items-center gap-1.5 hover:bg-slate-700 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Demo</span>
          </button>
          <button
            type="button"
            onClick={handleLogout}
            className="px-4 py-2 rounded-lg bg-rose-900/80 text-white text-xs font-semibold flex items-center gap-1.5 hover:bg-rose-800 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Lock</span>
          </button>
        </div>
      </div>

      {/* Live Website Status & Publishing Toolbar */}
      <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
        <div className="flex items-start sm:items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-800 shrink-0">
            <Globe className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-semibold text-slate-900">
                Website Content Manager
              </h3>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
                Live &amp; Ready
              </span>
            </div>
            <p className="text-xs text-slate-600 mt-0.5">
              Add or edit jobs, photos, and reviews below. Click <strong>Update the Website</strong> to publish your changes live.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 self-stretch sm:self-auto shrink-0">
          <button
            type="button"
            onClick={() => setShowHelpGuide(!showHelpGuide)}
            className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 shadow-sm ${
              showHelpGuide 
                ? 'bg-amber-100 text-amber-900 border border-amber-300' 
                : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 text-amber-700" />
            <span>{showHelpGuide ? 'Hide Help Guide' : 'How-To Guide'}</span>
          </button>

          <button
            type="button"
            disabled={isSyncingAll}
            onClick={handlePublishToLiveWebsite}
            className="px-4 py-2 text-xs font-bold rounded-lg bg-slate-900 hover:bg-slate-800 text-white transition-all flex items-center gap-2 shadow-sm disabled:opacity-50 hover:shadow-md"
          >
            <UploadCloud className={`w-4 h-4 text-amber-400 ${isSyncingAll ? 'animate-bounce' : ''}`} />
            <span>{isSyncingAll ? 'Publishing...' : 'Update the Website'}</span>
          </button>
        </div>
      </div>

      {/* Interactive Step-by-Step Help Guide */}
      {showHelpGuide && (
        <div className="bg-white border border-amber-200/90 rounded-3xl p-6 sm:p-7 shadow-md space-y-6 animate-in fade-in slide-in-from-top-3 duration-200">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                💡
              </div>
              <div>
                <h3 className="text-base font-serif font-bold text-slate-900">
                  How-To &amp; Admin Help Instructions
                </h3>
                <p className="text-xs text-slate-500">
                  Quick guide on what you can change and how to manage your website content.
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setShowHelpGuide(false)}
              className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Guide Card 1 */}
            <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 sm:p-5 space-y-2.5">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-sm font-serif">
                <span className="w-6 h-6 rounded-full bg-slate-900 text-white text-xs flex items-center justify-center font-sans font-bold">1</span>
                <span>Job Galleries &amp; Projects</span>
              </div>
              <ul className="text-xs text-slate-600 space-y-1.5 list-disc pl-5 leading-relaxed">
                <li><strong>Adding a Job:</strong> Fill in the job title, select category (<em>Interior, Exterior, Wallpapering</em>), type location &amp; description, and click <strong>Choose Photos</strong>.</li>
                <li><strong>Multiple Photos:</strong> You can select multiple photos from your device at once.</li>
                <li><strong>Cover Photo:</strong> The first photo is shown on the gallery card. Click <strong>Set as Cover</strong> on any photo to make it the main image.</li>
                <li><strong>Editing &amp; Deleting:</strong> Click <strong>Edit</strong> on any job card to change details, or <strong>Delete</strong> to remove it.</li>
              </ul>
            </div>

            {/* Guide Card 2 */}
            <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 sm:p-5 space-y-2.5">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-sm font-serif">
                <span className="w-6 h-6 rounded-full bg-slate-900 text-white text-xs flex items-center justify-center font-sans font-bold">2</span>
                <span>Homepage Hero Slides</span>
              </div>
              <ul className="text-xs text-slate-600 space-y-1.5 list-disc pl-5 leading-relaxed">
                <li><strong>What it is:</strong> These are the large full-width showcase photos that glide smoothly at the very top of your homepage.</li>
                <li><strong>Adding a Slide:</strong> Switch to the <strong>Hero Carousel Slides</strong> tab, upload an image, and provide a short description.</li>
                <li><strong>Changing the Order:</strong> Click <strong>▲ Move Up</strong> or <strong>▼ Move Down</strong> to decide which photo visitors see first.</li>
                <li><strong>Deleting:</strong> Remove outdated photos with a single click.</li>
              </ul>
            </div>

            {/* Guide Card 3 */}
            <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 sm:p-5 space-y-2.5">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-sm font-serif">
                <span className="w-6 h-6 rounded-full bg-slate-900 text-white text-xs flex items-center justify-center font-sans font-bold">3</span>
                <span>Client Reviews &amp; Moderation</span>
              </div>
              <ul className="text-xs text-slate-600 space-y-1.5 list-disc pl-5 leading-relaxed">
                <li><strong>Customer Submissions:</strong> Reviews submitted by clients on your website arrive with a <strong>Pending</strong> badge.</li>
                <li><strong>Approve &amp; Publish:</strong> Click <strong>Approve</strong> to display positive testimonials on the public Reviews page.</li>
                <li><strong>Add Direct Reviews:</strong> You can also manually add reviews you received via text, phone, or in person.</li>
              </ul>
            </div>

            {/* Guide Card 4 */}
            <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-4 sm:p-5 space-y-2.5">
              <div className="flex items-center gap-2 text-amber-950 font-bold text-sm font-serif">
                <span className="w-6 h-6 rounded-full bg-amber-600 text-white text-xs flex items-center justify-center font-sans font-bold">4</span>
                <span>Publishing to the Live Site</span>
              </div>
              <ul className="text-xs text-slate-700 space-y-1.5 list-disc pl-5 leading-relaxed">
                <li>Whenever you make changes, click the dark <strong>Update the Website</strong> button at the top.</li>
                <li>Your updates are automatically saved and broadcast across all devices, phones, and computers.</li>
                <li>Visitors to both <code>sistine.itsmyapp.co.uk</code> and your main website will immediately see the new work!</li>
              </ul>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Need to change technical cloud settings?</span>
            <button
              type="button"
              onClick={() => {
                setShowTokenSettings(!showTokenSettings);
                setShowHelpGuide(false);
              }}
              className="text-amber-800 font-semibold hover:underline flex items-center gap-1"
            >
              <Key className="w-3.5 h-3.5" />
              <span>Configure Cloud Access Key</span>
            </button>
          </div>
        </div>
      )}

      {/* Cloud Access Key Settings Modal */}
      {showTokenSettings && (
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Key className="w-4 h-4 text-amber-700" />
              <span>Cloud Publishing Key</span>
            </h4>
            <button
              type="button"
              onClick={() => setShowTokenSettings(false)}
              className="text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed">
            If you manage website deployment credentials, you can save your publishing key here or in your Vercel Environment Variables (<code className="bg-slate-100 px-1 py-0.5 rounded text-slate-800 font-mono">GITHUB_TOKEN</code>).
          </p>

          <form onSubmit={handleSaveGithubToken} className="space-y-3">
            <input
              type="password"
              value={tokenInput}
              onChange={(e) => setTokenInput(e.target.value)}
              placeholder="Paste cloud access key..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-mono focus:border-slate-900 focus:ring-1 focus:ring-slate-900"
            />
            <div className="flex items-center gap-2">
              <button
                type="submit"
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg shadow-sm"
              >
                Save Key
              </button>
              {githubToken && (
                <button
                  type="button"
                  onClick={() => {
                    saveGitHubToken('');
                    setGithubToken('');
                    setTokenInput('');
                    setSyncStatus({ msg: 'Access key removed.', type: 'info' });
                    setShowTokenSettings(false);
                  }}
                  className="px-3 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-semibold rounded-lg"
                >
                  Clear Key
                </button>
              )}
            </div>
          </form>
        </div>
      )}

      {/* Global Sync Status Message */}
      {syncStatus.msg && (
        <div className={`p-3.5 text-xs font-semibold rounded-xl flex items-center justify-between gap-3 ${
          syncStatus.type === 'success' 
            ? 'bg-emerald-50 border border-emerald-200 text-emerald-800' 
            : syncStatus.type === 'error'
            ? 'bg-rose-50 border border-rose-200 text-rose-800'
            : 'bg-blue-50 border border-blue-200 text-blue-800'
        }`}>
          <div className="flex items-center gap-2">
            {syncStatus.type === 'success' && <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />}
            {syncStatus.type === 'error' && <X className="w-4 h-4 text-rose-600 shrink-0" />}
            {syncStatus.type === 'info' && <Cloud className="w-4 h-4 text-blue-600 shrink-0" />}
            <span>{syncStatus.msg}</span>
          </div>
          <button
            type="button"
            onClick={() => setSyncStatus({ msg: '', type: '' })}
            className="text-slate-400 hover:text-slate-600 shrink-0"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Navigation Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-3">
        <button
          type="button"
          onClick={() => setActiveTab('projects')}
          className={`px-5 py-2.5 rounded-full font-serif text-sm font-semibold transition-all flex items-center gap-2 ${
            activeTab === 'projects'
              ? 'bg-slate-900 text-white shadow-sm'
              : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Job Galleries &amp; Projects ({projects.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('hero')}
          className={`px-5 py-2.5 rounded-full font-serif text-sm font-semibold transition-all flex items-center gap-2 ${
            activeTab === 'hero'
              ? 'bg-slate-900 text-white shadow-sm'
              : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          <ImageIcon className="w-4 h-4" />
          <span>Hero Carousel Slides ({heroSlides.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('testimonials')}
          className={`px-5 py-2.5 rounded-full font-serif text-sm font-semibold transition-all relative flex items-center gap-2 ${
            activeTab === 'testimonials'
              ? 'bg-slate-900 text-white shadow-sm'
              : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          <Star className="w-4 h-4" />
          <span>Reviews ({testimonials.length})</span>
          {pendingReviews.length > 0 && (
            <span className="ml-1 bg-amber-500 text-slate-950 font-bold text-xs px-2 py-0.5 rounded-full">
              {pendingReviews.length} Pending
            </span>
          )}
        </button>
      </div>

      {/* ================= TAB 1: PROJECTS & GALLERIES ================= */}
      {activeTab === 'projects' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Project Form (Create or Edit) */}
          <div ref={projectFormRef} className="lg:col-span-6 bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-sm space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-serif font-bold text-slate-900 flex items-center gap-2">
                  {editingProjectId ? (
                    <>
                      <Edit3 className="w-5 h-5 text-amber-600" />
                      <span>Edit Job Details</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-5 h-5 text-slate-900" />
                      <span>Add New Job &amp; Photos</span>
                    </>
                  )}
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  {editingProjectId 
                    ? 'Modify text, update categories, add/remove photos, or change cover image.' 
                    : 'Upload multi-image photo galleries of completed painting & decorating work.'}
                </p>
              </div>

              {editingProjectId && (
                <button
                  type="button"
                  onClick={cancelEditProject}
                  className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700"
                >
                  Cancel Edit
                </button>
              )}
            </div>

            {projectSuccessMsg && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold rounded-xl flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>{projectSuccessMsg}</span>
              </div>
            )}

            <form onSubmit={handleSaveProject} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-700 mb-1">Project / Job Title *</label>
                <input
                  type="text"
                  required
                  value={projectTitle}
                  onChange={(e) => setProjectTitle(e.target.value)}
                  placeholder="e.g. Victorian Drawing Room & Cornice Painting"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-slate-900 focus:ring-1 focus:ring-slate-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-700 mb-1">Category *</label>
                  <select
                    value={projectCategory}
                    onChange={(e) => setProjectCategory(e.target.value as ProjectCategory)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-slate-900"
                  >
                    <option value="Interior">Interior Painting</option>
                    <option value="Exterior">Exterior Painting</option>
                    <option value="Wallpapering">Specialist Wallpapering</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-700 mb-1">Location *</label>
                  <input
                    type="text"
                    required
                    value={projectLocation}
                    onChange={(e) => setProjectLocation(e.target.value)}
                    placeholder="e.g. Southtown, Dartmouth"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-700 mb-1">Job Description *</label>
                <textarea
                  required
                  rows={3}
                  value={projectDescription}
                  onChange={(e) => setProjectDescription(e.target.value)}
                  placeholder="Details of the work carried out, room preparation, paint finishes applied..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-slate-900"
                />
              </div>

              {/* Photo Upload & Gallery Manager */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold uppercase text-slate-700">
                  Job Photos (Upload Multiple) *
                </label>
                <label className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-slate-300 hover:border-slate-900 rounded-2xl bg-slate-50 hover:bg-slate-100/60 cursor-pointer transition-colors group">
                  <Upload className="w-6 h-6 text-slate-400 group-hover:text-slate-800 mb-1" />
                  <span className="text-xs font-semibold text-slate-700">
                    {isCompressingProject ? 'Compressing Photos...' : 'Click to Add Photos'}
                  </span>
                  <span className="text-[11px] text-slate-400">Select multiple files from computer or phone</span>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleMultipleImagesUpload}
                    className="hidden"
                    disabled={isCompressingProject}
                  />
                </label>

                {projectImages.length > 0 && (
                  <div className="space-y-2 pt-2">
                    <p className="text-xs font-semibold text-slate-700">
                      {projectImages.length} Photo(s) Attached (First photo is Main Cover):
                    </p>
                    <div className="grid grid-cols-3 gap-2.5">
                      {projectImages.map((img, idx) => (
                        <div key={idx} className="relative aspect-[4/3] rounded-xl overflow-hidden border border-slate-200 group bg-slate-100 shadow-xs">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={img} alt={`Photo ${idx + 1}`} className="w-full h-full object-cover" />
                          
                          {idx === 0 && (
                            <span className="absolute top-1 left-1 bg-amber-500 text-slate-950 text-[10px] font-bold px-2 py-0.5 rounded shadow">
                              Cover Photo
                            </span>
                          )}

                          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5 p-1">
                            {idx !== 0 && (
                              <button
                                type="button"
                                onClick={() => setAsCoverPhoto(idx)}
                                className="px-2 py-1 rounded bg-white text-slate-900 text-[10px] font-semibold hover:bg-amber-400 transition-colors"
                                title="Make this the Primary Cover Photo"
                              >
                                Set Cover
                              </button>
                            )}
                            <button
                              type="button"
                              onClick={() => removePhoto(idx)}
                              className="p-1.5 rounded bg-rose-600 hover:bg-rose-500 text-white transition-colors"
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

              <div className="pt-2 flex gap-3">
                <button
                  type="submit"
                  disabled={isCompressingProject || projectImages.length === 0}
                  className={`flex-1 py-3.5 rounded-xl font-semibold text-sm transition-all shadow-sm flex items-center justify-center gap-2 ${
                    editingProjectId
                      ? 'bg-amber-600 hover:bg-amber-500 text-white'
                      : 'bg-slate-900 hover:bg-slate-800 text-white'
                  } disabled:opacity-50`}
                >
                  <Check className="w-4 h-4" />
                  <span>
                    {isCompressingProject 
                      ? 'Compressing Photos...' 
                      : editingProjectId 
                        ? 'Save Project Changes' 
                        : `Publish Job (${projectImages.length} Photos)`}
                  </span>
                </button>

                {editingProjectId && (
                  <button
                    type="button"
                    onClick={cancelEditProject}
                    className="px-5 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm rounded-xl transition-all"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Active Projects List */}
          <div className="lg:col-span-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-serif font-bold text-slate-900">
                Active Job Galleries ({projects.length})
              </h2>
              <span className="text-xs text-slate-500">Click &quot;Edit&quot; to modify text or photos</span>
            </div>

            <div className="space-y-3">
              {projects.map((p) => {
                const count = p.images?.length || 1;
                const isCurrent = editingProjectId === p.id;

                return (
                  <div 
                    key={p.id} 
                    className={`bg-white p-4 rounded-2xl border transition-all flex items-start justify-between gap-4 shadow-xs ${
                      isCurrent ? 'border-amber-500 ring-2 ring-amber-500/20 bg-amber-50/20' : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-start gap-3.5">
                      <div className="relative w-20 h-16 rounded-xl overflow-hidden bg-slate-900 shrink-0 shadow-inner">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={p.afterImage} alt={p.title} className="w-full h-full object-cover" />
                        <span className="absolute bottom-1 right-1 bg-black/80 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                          {count}📷
                        </span>
                      </div>
                      <div>
                        <h3 className="font-serif font-bold text-sm text-slate-900 line-clamp-1">{p.title}</h3>
                        <p className="text-xs text-slate-500 mt-0.5">{p.category} • {p.location}</p>
                        <p className="text-[11px] text-slate-400 mt-1 line-clamp-1">{p.description}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        type="button"
                        onClick={() => startEditProject(p)}
                        className={`p-2 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors ${
                          isCurrent 
                            ? 'bg-amber-600 text-white' 
                            : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                        }`}
                        title="Edit Project Details & Photos"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Edit</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteProject(p.id, p.title)}
                        className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                        title="Delete Project"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      )}

      {/* ================= TAB 2: HERO CAROUSEL SLIDES ================= */}
      {activeTab === 'hero' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Add Hero Slide Form */}
          <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-sm space-y-5">
            <div>
              <h2 className="text-xl font-serif font-bold text-slate-900 flex items-center gap-2">
                <Upload className="w-5 h-5 text-slate-900" />
                <span>Add Hero Image</span>
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Upload a high-resolution photo to appear in the Ken Burns homepage carousel.
              </p>
            </div>

            {heroSuccessMsg && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold rounded-xl flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>{heroSuccessMsg}</span>
              </div>
            )}

            {/* Upload File */}
            <div className="space-y-3">
              <label className="block text-xs font-semibold uppercase text-slate-700">Option 1: Upload Photo File</label>
              <label className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-slate-300 hover:border-slate-900 rounded-2xl bg-slate-50 hover:bg-slate-100/60 cursor-pointer transition-colors group">
                <ImageIcon className="w-8 h-8 text-slate-400 group-hover:text-slate-800 mb-2" />
                <span className="text-xs font-semibold text-slate-700">
                  {isCompressingHero ? 'Optimizing Image...' : 'Click to Upload Hero Image'}
                </span>
                <span className="text-[11px] text-slate-400">JPG, PNG, or WebP</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleHeroFileUpload}
                  className="hidden"
                  disabled={isCompressingHero}
                />
              </label>
            </div>

            <div className="relative flex items-center justify-center">
              <div className="border-t border-slate-200 w-full" />
              <span className="bg-white px-3 text-xs text-slate-400 uppercase font-semibold">Or</span>
              <div className="border-t border-slate-200 w-full" />
            </div>

            {/* Add via URL */}
            <form onSubmit={handleAddHeroUrl} className="space-y-3">
              <label className="block text-xs font-semibold uppercase text-slate-700">Option 2: Add Image by URL</label>
              <input
                type="url"
                required
                value={newHeroUrl}
                onChange={(e) => setNewHeroUrl(e.target.value)}
                placeholder="https://images.unsplash.com/photo-..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm"
              />
              <input
                type="text"
                value={newHeroAlt}
                onChange={(e) => setNewHeroAlt(e.target.value)}
                placeholder="Description / Alt text (optional)"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm"
              />
              <button
                type="submit"
                className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-xl transition-all"
              >
                Add Slide from URL
              </button>
            </form>
          </div>

          {/* Active Hero Slides Manager */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-serif font-bold text-slate-900">
                Active Hero Carousel Slides ({heroSlides.length})
              </h2>
              <span className="text-xs text-slate-500">Ken Burns effect cycles every 7s</span>
            </div>

            <div className="space-y-3">
              {heroSlides.map((slide, idx) => (
                <div key={slide.id} className="bg-white p-4 rounded-2xl border border-slate-200 flex items-center justify-between gap-4 shadow-xs">
                  <div className="flex items-center gap-3.5">
                    <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-700 font-bold text-xs flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <div className="relative w-24 h-16 rounded-xl overflow-hidden bg-slate-900 shrink-0 shadow-inner">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={slide.url} alt={slide.alt} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-900 line-clamp-1">{slide.alt}</p>
                      <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-1 font-mono">{slide.url.slice(0, 45)}...</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      type="button"
                      disabled={idx === 0}
                      onClick={() => handleMoveHeroSlide(idx, 'up')}
                      className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 disabled:opacity-30"
                      title="Move slide earlier"
                    >
                      <ArrowUp className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      disabled={idx === heroSlides.length - 1}
                      onClick={() => handleMoveHeroSlide(idx, 'down')}
                      className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 disabled:opacity-30"
                      title="Move slide later"
                    >
                      <ArrowDown className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteHeroSlide(slide.id)}
                      className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50 transition-colors ml-1"
                      title="Delete Slide"
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

      {/* ================= TAB 3: REVIEWS MODERATION ================= */}
      {activeTab === 'testimonials' && (
        <div className="space-y-8">
          
          {testSuccessMsg && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold rounded-xl flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              <span>{testSuccessMsg}</span>
            </div>
          )}

          {/* Pending Reviews Section */}
          {pendingReviews.length > 0 && (
            <div className="bg-amber-50/80 border-2 border-amber-300 rounded-3xl p-6 sm:p-8 space-y-4">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-amber-700" />
                <h2 className="text-xl font-serif font-bold text-amber-950">
                  Client Reviews Awaiting Approval ({pendingReviews.length})
                </h2>
              </div>
              <p className="text-xs text-amber-800">
                These reviews were submitted by clients on the website and are hidden from the public until you click &quot;Approve &amp; Publish&quot;.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                {pendingReviews.map((t) => (
                  <div key={t.id} className="bg-white p-5 rounded-2xl border border-amber-200 shadow-sm space-y-3 flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-amber-500">
                          {[...Array(t.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                          ))}
                        </div>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
                          Pending Approval
                        </span>
                      </div>
                      <p className="text-xs font-semibold text-slate-500 uppercase">{t.projectType}</p>
                      <p className="text-sm text-slate-700 italic font-serif">&ldquo;{t.reviewText}&rdquo;</p>
                      <p className="text-xs font-bold text-slate-900">{t.clientName} ({t.location})</p>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => handleDeleteTestimonial(t.id)}
                        className="px-3 py-1.5 rounded-lg text-rose-600 hover:bg-rose-50 text-xs font-semibold border border-rose-200"
                      >
                        Reject / Delete
                      </button>
                      <button
                        type="button"
                        onClick={() => handleApproveReview(t.id)}
                        className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-1 shadow-sm"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Approve &amp; Publish</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Add Review & Published List */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Create Testimonial Form */}
            <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-sm space-y-4">
              <h2 className="text-xl font-serif font-bold text-slate-900">Add Approved Review Directly</h2>
              <form onSubmit={handleCreateTestimonial} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase mb-1">Client Name *</label>
                  <input
                    type="text"
                    required
                    value={testClientName}
                    onChange={(e) => setTestClientName(e.target.value)}
                    placeholder="e.g. Mark & Sarah Jenkins"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm"
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
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase mb-1">Work Done</label>
                    <input
                      type="text"
                      required
                      value={testProjectType}
                      onChange={(e) => setTestProjectType(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase mb-1">Review Text *</label>
                  <textarea
                    required
                    rows={3}
                    value={testReviewText}
                    onChange={(e) => setTestReviewText(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-xl transition-all"
                >
                  Publish Approved Review
                </button>
              </form>
            </div>

            {/* Approved Reviews List */}
            <div className="lg:col-span-7 space-y-3">
              <h2 className="text-xl font-serif font-bold text-slate-900">
                Published Live Reviews ({approvedReviews.length})
              </h2>
              {approvedReviews.map((t) => (
                <div key={t.id} className="bg-white p-4 rounded-2xl border border-slate-200 space-y-2 shadow-xs">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-amber-500">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                      ))}
                    </div>
                    <button
                      type="button"
                      onClick={() => handleDeleteTestimonial(t.id)}
                      className="text-rose-600 p-1.5 hover:bg-rose-50 rounded-lg transition-colors"
                      title="Delete review"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-xs text-slate-700 italic font-serif">&ldquo;{t.reviewText}&rdquo;</p>
                  <p className="text-[11px] text-slate-500 font-bold">{t.clientName} ({t.location}) • {t.projectType}</p>
                </div>
              ))}
            </div>

          </div>

        </div>
      )}

    </div>
  );
}
