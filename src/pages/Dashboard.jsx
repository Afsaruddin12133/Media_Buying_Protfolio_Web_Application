import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { collection, addDoc, serverTimestamp, getDocs, deleteDoc, doc, orderBy, query, updateDoc, setDoc, getDoc } from 'firebase/firestore';
import { uploadImageToCloudinary } from '../utils/cloudinary';

export default function Dashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('portfolio');
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');
  const [userAuth, setUserAuth] = useState(null);
  const [checkingAuth, setCheckingAuth] = useState(true);

  // Management State
  const [portfolioItems, setPortfolioItems] = useState([]);
  const [caseStudyItems, setCaseStudyItems] = useState([]);
  const [testimonialItems, setTestimonialItems] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  // Hero Video Settings State
  const [heroVideoInput, setHeroVideoInput] = useState('');
  const [heroVideoSaved, setHeroVideoSaved] = useState('');

  // Editing State
  const [editingItemId, setEditingItemId] = useState(null);
  const [pOldThumbnail, setPOldThumbnail] = useState('');
  const [cOldImage, setCOldImage] = useState('');
  const [tOldImage, setTOldImage] = useState('');

  // Protect route with Firebase Auth
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserAuth(user);
      } else {
        navigate('/login');
      }
      setCheckingAuth(false);
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/login');
  };

  const fetchItems = async () => {
    setIsFetching(true);
    try {
      if (activeTab === 'managePortfolio') {
        const q = query(collection(db, 'videoPortfolio'), orderBy('createdAt', 'desc'));
        const snap = await getDocs(q);
        const data = [];
        snap.forEach(d => data.push({ id: d.id, ...d.data() }));
        setPortfolioItems(data);
      } else if (activeTab === 'manageCaseStudy') {
        const q = query(collection(db, 'caseStudies'), orderBy('createdAt', 'desc'));
        const snap = await getDocs(q);
        const data = [];
        snap.forEach(d => data.push({ id: d.id, ...d.data() }));
        setCaseStudyItems(data);
      } else if (activeTab === 'manageTestimonial') {
        const q = query(collection(db, 'testimonials'), orderBy('createdAt', 'desc'));
        const snap = await getDocs(q);
        const data = [];
        snap.forEach(d => data.push({ id: d.id, ...d.data() }));
        setTestimonialItems(data);
      }
    } catch (err) {
      console.error("Error fetching items:", err);
      setMsg("Failed to load items.");
    }
    setIsFetching(false);
  };

  useEffect(() => {
    if (activeTab === 'managePortfolio' || activeTab === 'manageCaseStudy' || activeTab === 'manageTestimonial') {
      fetchItems();
    }
  }, [activeTab]);

  // Fetch current hero video URL from Firestore on mount
  useEffect(() => {
    const fetchHeroVideo = async () => {
      try {
        const snap = await getDoc(doc(db, 'settings', 'heroVideo'));
        if (snap.exists()) {
          const url = snap.data().url || '';
          setHeroVideoSaved(url);
          setHeroVideoInput(url);
        }
      } catch (err) {
        console.error('Failed to fetch hero video setting:', err);
      }
    };
    fetchHeroVideo();
  }, []);

  const saveHeroVideoUrl = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg('');
    try {
      await setDoc(doc(db, 'settings', 'heroVideo'), { url: heroVideoInput }, { merge: true });
      setHeroVideoSaved(heroVideoInput);
      setMsg('Hero video URL updated successfully! Refresh the homepage to see the change.');
    } catch (err) {
      console.error(err);
      setMsg('Error saving hero video URL: ' + err.message);
    }
    setLoading(false);
  };

  const handleDelete = async (collectionName, id) => {
    if (!window.confirm("Are you sure you want to delete this item? This action cannot be undone.")) return;
    
    try {
      await deleteDoc(doc(db, collectionName, id));
      setMsg("Item deleted successfully.");
      fetchItems(); // Refresh list
    } catch (err) {
      console.error(err);
      setMsg("Failed to delete item: " + err.message);
    }
  };

  // Portfolio Form State
  const [pTitle, setPTitle] = useState('');
  const [pCategory, setPCategory] = useState('');
  const [pDescription, setPDescription] = useState('');
  const [pMediaType, setPMediaType] = useState('video'); // 'video' or 'image'
  const [pVideoUrl, setPVideoUrl] = useState('');
  const [pThumbnail, setPThumbnail] = useState(null); // Used for both video thumbnail and image screenshot

  // Case Study Form State
  const [cTitle, setCTitle] = useState('');
  const [cCategory, setCCategory] = useState('');
  const [cTag, setCTag] = useState('');
  const [cDetails, setCDetails] = useState('');
  const [cDuration, setCDuration] = useState('');
  const [cSpent, setCSpent] = useState('');
  const [cResult, setCResult] = useState('');
  const [cCTR, setCCTR] = useState('');
  const [cROAS, setCROAS] = useState('');
  const [cImage, setCImage] = useState(null);

  // Testimonial Form State
  const [tName, setTName] = useState('');
  const [tRole, setTRole] = useState('');
  const [tText, setTText] = useState('');
  const [tImage, setTImage] = useState(null);

  const cancelEdit = () => {
    setEditingItemId(null);
    setPOldThumbnail('');
    setCOldImage('');
    setTOldImage('');
    // Reset Portfolio Form
    setPTitle(''); setPCategory(''); setPDescription(''); setPVideoUrl(''); setPThumbnail(null); setPMediaType('video');
    // Reset Case Study Form
    setCTitle(''); setCCategory(''); setCTag(''); setCDetails('');
    setCDuration(''); setCSpent(''); setCResult(''); setCCTR(''); setCROAS(''); setCImage(null);
    // Reset Testimonial Form
    setTName(''); setTRole(''); setTText(''); setTImage(null);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    cancelEdit();
    setMsg('');
  };

  const handleEditPortfolio = (item) => {
    setEditingItemId(item.id);
    setPTitle(item.title);
    setPCategory(item.category);
    setPDescription(item.description);
    setPMediaType(item.mediaType || 'video');
    setPVideoUrl(item.videoUrl || '');
    setPOldThumbnail(item.thumbnail || '');
    setPThumbnail(null);
    setActiveTab('portfolio');
    setMsg('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleEditCaseStudy = (item) => {
    setEditingItemId(item.id);
    setCTitle(item.title);
    setCCategory(item.category);
    setCTag(item.tag || '');
    setCDetails(item.details);
    setCDuration(item.metrics?.Duration || '');
    setCSpent(item.metrics?.Spent || '');
    setCResult(item.metrics?.Result || '');
    setCCTR(item.metrics?.CTR || '');
    setCROAS(item.metrics?.ROAS || '');
    setCOldImage(item.image || '');
    setCImage(null);
    setActiveTab('caseStudy');
    setMsg('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleEditTestimonial = (item) => {
    setEditingItemId(item.id);
    setTName(item.name || '');
    setTRole(item.role || '');
    setTText(item.text || '');
    setTOldImage(item.image || '');
    setTImage(null);
    setActiveTab('testimonial');
    setMsg('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const submitPortfolio = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg('');

    if (pMediaType === 'image' && !pThumbnail && !pOldThumbnail) {
      setMsg('Error: Full Image / Screenshot is required for image type.');
      setLoading(false);
      return;
    }

    try {
      let thumbnailUrl = pOldThumbnail;
      if (pThumbnail) {
        thumbnailUrl = await uploadImageToCloudinary(pThumbnail);
      }

      const payload = {
        title: pTitle,
        category: pCategory,
        description: pDescription,
        mediaType: pMediaType,
        videoUrl: pMediaType === 'video' ? pVideoUrl : '',
        thumbnail: thumbnailUrl,
      };

      if (editingItemId) {
        await updateDoc(doc(db, 'videoPortfolio', editingItemId), payload);
        setMsg('Portfolio item updated successfully!');
      } else {
        payload.createdAt = serverTimestamp();
        await addDoc(collection(db, 'videoPortfolio'), payload);
        setMsg('Portfolio item added successfully!');
      }

      cancelEdit();
    } catch (err) {
      console.error(err);
      setMsg(`Error ${editingItemId ? 'updating' : 'adding'} portfolio item: ` + err.message);
    }
    setLoading(false);
  };

  const submitCaseStudy = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg('');

    if (!cImage && !cOldImage) {
      setMsg('Error: Cover image is required for case studies.');
      setLoading(false);
      return;
    }

    try {
      let imageUrl = cOldImage;
      if (cImage) {
        imageUrl = await uploadImageToCloudinary(cImage);
      }

      const metrics = {
        Duration: cDuration,
        Spent: cSpent,
        Result: cResult,
        CTR: cCTR,
        ROAS: cROAS
      };

      const payload = {
        title: cTitle,
        category: cCategory,
        tag: cTag,
        details: cDetails,
        metrics: metrics,
        image: imageUrl,
      };

      if (editingItemId) {
        await updateDoc(doc(db, 'caseStudies', editingItemId), payload);
        setMsg('Case Study updated successfully!');
      } else {
        payload.createdAt = serverTimestamp();
        await addDoc(collection(db, 'caseStudies'), payload);
        setMsg('Case Study added successfully!');
      }

      cancelEdit();
    } catch (err) {
      console.error(err);
      setMsg(`Error ${editingItemId ? 'updating' : 'adding'} case study: ` + err.message);
    }
    setLoading(false);
  };

  const submitTestimonial = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg('');

    try {
      let imageUrl = tOldImage;
      if (tImage) {
        imageUrl = await uploadImageToCloudinary(tImage);
      }

      const payload = {
        name: tName,
        role: tRole,
        text: tText,
        image: imageUrl,
      };

      if (editingItemId) {
        await updateDoc(doc(db, 'testimonials', editingItemId), payload);
        setMsg('Testimonial updated successfully!');
      } else {
        payload.createdAt = serverTimestamp();
        await addDoc(collection(db, 'testimonials'), payload);
        setMsg('Testimonial added successfully!');
      }

      cancelEdit();
    } catch (err) {
      console.error(err);
      setMsg(`Error ${editingItemId ? 'updating' : 'adding'} testimonial: ` + err.message);
    }
    setLoading(false);
  };

  if (checkingAuth) {
    return <div className="min-h-screen bg-brandBg flex items-center justify-center font-bold uppercase tracking-widest text-brandAccent">Checking authentication...</div>;
  }

  if (!userAuth) return null;

  return (
    <div className="min-h-screen bg-brandBg pt-16 px-6 md:px-12 pb-24">
      <div className="max-w-5xl mx-auto">
        
        {/* Top Action Bar */}
        <div className="flex justify-between items-center mb-12 border-b border-black/10 pb-6">
          <button onClick={() => navigate('/')} className="px-6 py-3 bg-brandAccent text-white text-xs font-bold uppercase tracking-widest hover:bg-black transition-colors shadow-[4px_4px_0px_#000000]">
            ← Go to Website
          </button>
          <button onClick={handleLogout} className="px-6 py-3 border border-black/20 bg-white text-[#000] text-xs font-bold uppercase tracking-widest hover:bg-red-500 hover:text-white hover:border-red-500 transition-colors shadow-[4px_4px_0px_var(--color-brandMuted)]">
            Logout
          </button>
        </div>

        {/* Page Title */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-display font-black uppercase tracking-tighter">Dashboard of this website</h1>
        </div>

        {/* Organized Navigation Dashboard */}
        <div className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Add New Section */}
            <div className="bg-white p-6 md:p-8 border border-black/10 shadow-[8px_8px_0px_var(--color-brandAccent)]">
              <h3 className="text-sm font-bold uppercase tracking-widest text-brandMuted mb-6 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-brandAccent"></span>
                Create New Content
              </h3>
              <div className="flex flex-col gap-3">
                <button 
                  onClick={() => handleTabChange('portfolio')}
                  className={`text-left text-xs font-bold uppercase tracking-widest px-5 py-4 border transition-all ${activeTab === 'portfolio' ? 'bg-brandAccent text-white border-brandAccent shadow-[4px_4px_0px_#000000]' : 'bg-brandBg text-black border-black/10 hover:border-brandAccent'}`}
                >
                  + Add Portfolio Video
                </button>
                <button 
                  onClick={() => handleTabChange('caseStudy')}
                  className={`text-left text-xs font-bold uppercase tracking-widest px-5 py-4 border transition-all ${activeTab === 'caseStudy' ? 'bg-brandAccent text-white border-brandAccent shadow-[4px_4px_0px_#000000]' : 'bg-brandBg text-black border-black/10 hover:border-brandAccent'}`}
                >
                  + Add Case Study
                </button>
                <button 
                  onClick={() => handleTabChange('testimonial')}
                  className={`text-left text-xs font-bold uppercase tracking-widest px-5 py-4 border transition-all ${activeTab === 'testimonial' ? 'bg-brandAccent text-white border-brandAccent shadow-[4px_4px_0px_#000000]' : 'bg-brandBg text-black border-black/10 hover:border-brandAccent'}`}
                >
                  + Add Testimonial
                </button>
                <button 
                  onClick={() => handleTabChange('heroVideo')}
                  className={`text-left text-xs font-bold uppercase tracking-widest px-5 py-4 border transition-all ${activeTab === 'heroVideo' ? 'bg-brandAccent text-white border-brandAccent shadow-[4px_4px_0px_#000000]' : 'bg-brandBg text-black border-black/10 hover:border-brandAccent'}`}
                >
                  🎬 Hero Video URL
                </button>
              </div>
            </div>

            {/* Manage Section */}
            <div className="bg-white p-6 md:p-8 border border-black/10 shadow-[8px_8px_0px_#000000]">
              <h3 className="text-sm font-bold uppercase tracking-widest text-brandMuted mb-6 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-black"></span>
                Manage Existing
              </h3>
              <div className="flex flex-col gap-3">
                <button 
                  onClick={() => handleTabChange('managePortfolio')}
                  className={`text-left text-xs font-bold uppercase tracking-widest px-5 py-4 border transition-all ${activeTab === 'managePortfolio' ? 'bg-black text-white border-black shadow-[4px_4px_0px_var(--color-brandAccent)]' : 'bg-brandBg text-black border-black/10 hover:border-black'}`}
                >
                  Manage Portfolio
                </button>
                <button 
                  onClick={() => handleTabChange('manageCaseStudy')}
                  className={`text-left text-xs font-bold uppercase tracking-widest px-5 py-4 border transition-all ${activeTab === 'manageCaseStudy' ? 'bg-black text-white border-black shadow-[4px_4px_0px_var(--color-brandAccent)]' : 'bg-brandBg text-black border-black/10 hover:border-black'}`}
                >
                  Manage Case Studies
                </button>
                <button 
                  onClick={() => handleTabChange('manageTestimonial')}
                  className={`text-left text-xs font-bold uppercase tracking-widest px-5 py-4 border transition-all ${activeTab === 'manageTestimonial' ? 'bg-black text-white border-black shadow-[4px_4px_0px_var(--color-brandAccent)]' : 'bg-brandBg text-black border-black/10 hover:border-black'}`}
                >
                  Manage Testimonials
                </button>
              </div>
            </div>

          </div>
        </div>

        {msg && (
          <div className={`p-4 mb-8 border font-bold uppercase tracking-widest text-xs ${msg.includes('Error') || msg.includes('Failed') ? 'bg-red-50 border-red-200 text-red-700' : 'bg-green-50 border-green-200 text-green-700'}`}>
            {msg}
          </div>
        )}

        {/* HERO VIDEO SETTINGS FORM */}
        {activeTab === 'heroVideo' && (
          <div className="bg-white p-8 border border-black/10 shadow-[8px_8px_0px_var(--color-brandAccent)] relative">
            <h2 className="text-2xl font-display font-black mb-2 uppercase">Hero Video URL</h2>
            <p className="text-sm text-brandMuted mb-6 font-medium">Paste any YouTube or Vimeo URL below. It will instantly appear on the homepage hero section for all visitors.</p>
            <form onSubmit={saveHeroVideoUrl} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-brandMuted mb-2">Video URL (YouTube / Vimeo)</label>
                <input
                  type="url"
                  required
                  value={heroVideoInput}
                  onChange={e => setHeroVideoInput(e.target.value)}
                  placeholder="e.g. https://www.youtube.com/watch?v=xxxxxx"
                  className="w-full p-3 border border-black/20 focus:border-brandAccent focus:outline-none text-sm"
                />
              </div>
              {heroVideoSaved && (
                <div className="p-3 bg-brandBg border border-black/10 text-[10px] text-brandMuted font-mono break-all">
                  <span className="font-bold uppercase text-black mr-2">Current:</span>{heroVideoSaved}
                </div>
              )}
              <button
                type="submit"
                disabled={loading}
                className="px-8 py-4 bg-brandAccent text-white text-xs font-bold uppercase tracking-widest hover:bg-black transition-colors shadow-[4px_4px_0px_#000000] disabled:opacity-50"
              >
                {loading ? 'Saving...' : 'Save & Publish Video'}
              </button>
            </form>
          </div>
        )}

        {/* PORTFOLIO FORM */}
        {activeTab === 'portfolio' && (
          <div className="bg-white p-8 border border-black/10 shadow-[8px_8px_0px_var(--color-brandAccent)] relative">
            {editingItemId && (
              <div className="absolute -top-3 -right-3 bg-brandAccent text-white px-4 py-1 text-[10px] font-bold uppercase tracking-widest shadow-[2px_2px_0px_#000000]">
                Editing Mode
              </div>
            )}
            <h2 className="text-2xl font-display font-black mb-6 uppercase">{editingItemId ? 'Edit Portfolio Item' : 'New Portfolio Item'}</h2>
            <form onSubmit={submitPortfolio} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-brandMuted mb-2">Title</label>
                  <input type="text" required value={pTitle} onChange={e=>setPTitle(e.target.value)} className="w-full p-3 border border-black/20 focus:border-brandAccent focus:outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-brandMuted mb-2">Category (Service)</label>
                  <input type="text" required value={pCategory} onChange={e=>setPCategory(e.target.value)} placeholder="e.g. Media Buying, Meta Ads" className="w-full p-3 border border-black/20 focus:border-brandAccent focus:outline-none" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-brandMuted mb-2">Media Type</label>
                <select value={pMediaType} onChange={e=>setPMediaType(e.target.value)} className="w-full p-3 border border-black/20 focus:border-brandAccent focus:outline-none bg-white">
                  <option value="video">Video (YouTube / Vimeo)</option>
                  <option value="image">Screenshot / Image Proof</option>
                </select>
              </div>
              
              {pMediaType === 'video' ? (
                <>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-brandMuted mb-2">Video URL</label>
                    <input type="url" required value={pVideoUrl} onChange={e=>setPVideoUrl(e.target.value)} className="w-full p-3 border border-black/20 focus:border-brandAccent focus:outline-none" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-brandMuted mb-2">Thumbnail Image (Optional)</label>
                    {pOldThumbnail && <p className="text-[10px] text-green-600 mb-1 font-bold">Current image attached. Uploading new replaces it.</p>}
                    <input type="file" accept="image/*" onChange={e=>setPThumbnail(e.target.files[0])} className="w-full p-3 border border-black/20 focus:border-brandAccent focus:outline-none" />
                  </div>
                </>
              ) : (
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-brandMuted mb-2">Full Screenshot / Image</label>
                  {pOldThumbnail && <p className="text-[10px] text-green-600 mb-1 font-bold">Current image attached. Uploading new replaces it.</p>}
                  <input type="file" required={!pOldThumbnail} accept="image/*" onChange={e=>setPThumbnail(e.target.files[0])} className="w-full p-3 border border-black/20 focus:border-brandAccent focus:outline-none" />
                </div>
              )}

              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-brandMuted mb-2">Description</label>
                <textarea rows="3" required value={pDescription} onChange={e=>setPDescription(e.target.value)} className="w-full p-3 border border-black/20 focus:border-brandAccent focus:outline-none"></textarea>
              </div>

              <div className="flex gap-4 mt-6">
                <button disabled={loading} type="submit" className="flex-1 py-4 bg-brandAccent text-white font-bold uppercase tracking-widest hover:bg-black transition-colors disabled:opacity-50">
                  {loading ? 'Uploading & Saving...' : (editingItemId ? 'Update Portfolio Item' : 'Save Portfolio Item')}
                </button>
                {editingItemId && (
                  <button type="button" onClick={cancelEdit} className="px-6 py-4 bg-gray-200 text-black font-bold uppercase tracking-widest hover:bg-gray-300 transition-colors">
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>
        )}

        {/* CASE STUDY FORM */}
        {activeTab === 'caseStudy' && (
          <div className="bg-white p-8 border border-black/10 shadow-[8px_8px_0px_var(--color-brandAccent)] relative">
            {editingItemId && (
              <div className="absolute -top-3 -right-3 bg-brandAccent text-white px-4 py-1 text-[10px] font-bold uppercase tracking-widest shadow-[2px_2px_0px_#000000]">
                Editing Mode
              </div>
            )}
            <h2 className="text-2xl font-display font-black mb-6 uppercase">{editingItemId ? 'Edit Case Study' : 'New Case Study'}</h2>
            <form onSubmit={submitCaseStudy} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-brandMuted mb-2">Client / Title</label>
                  <input type="text" required value={cTitle} onChange={e=>setCTitle(e.target.value)} className="w-full p-3 border border-black/20 focus:border-brandAccent focus:outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-brandMuted mb-2">Category (e.g. E-commerce)</label>
                  <input type="text" required value={cCategory} onChange={e=>setCCategory(e.target.value)} className="w-full p-3 border border-black/20 focus:border-brandAccent focus:outline-none" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-brandMuted mb-2">Tag / Service</label>
                  <input type="text" value={cTag} onChange={e=>setCTag(e.target.value)} placeholder="e.g. Meta Ads Scaling" className="w-full p-3 border border-black/20 focus:border-brandAccent focus:outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-brandMuted mb-2">Cover Image</label>
                  {cOldImage && <p className="text-[10px] text-green-600 mb-1 font-bold">Current image attached. Uploading new replaces it.</p>}
                  <input type="file" required={!cOldImage} accept="image/*" onChange={e=>setCImage(e.target.files[0])} className="w-full p-3 border border-black/20 focus:border-brandAccent focus:outline-none" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-brandMuted mb-2">Details (Strategy / Context)</label>
                <textarea rows="3" required value={cDetails} onChange={e=>setCDetails(e.target.value)} className="w-full p-3 border border-black/20 focus:border-brandAccent focus:outline-none"></textarea>
              </div>

              <div className="border-t border-black/10 pt-4 mt-4">
                <h3 className="text-sm font-bold uppercase tracking-widest text-brandMuted mb-4">Metrics Highlights</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-brandMuted mb-2">Duration</label>
                    <input type="text" value={cDuration} onChange={e=>setCDuration(e.target.value)} placeholder="e.g. 6 Months" className="w-full p-2 border border-black/20 focus:border-brandAccent focus:outline-none" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-brandMuted mb-2">Total Spent</label>
                    <input type="text" value={cSpent} onChange={e=>setCSpent(e.target.value)} placeholder="e.g. $150k" className="w-full p-2 border border-black/20 focus:border-brandAccent focus:outline-none" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-brandMuted mb-2">Revenue Result</label>
                    <input type="text" value={cResult} onChange={e=>setCResult(e.target.value)} placeholder="e.g. $800k+" className="w-full p-2 border border-black/20 focus:border-brandAccent focus:outline-none" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-brandMuted mb-2">Avg CTR</label>
                    <input type="text" value={cCTR} onChange={e=>setCCTR(e.target.value)} placeholder="e.g. 2.5%" className="w-full p-2 border border-black/20 focus:border-brandAccent focus:outline-none" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-brandMuted mb-2">ROAS</label>
                    <input type="text" value={cROAS} onChange={e=>setCROAS(e.target.value)} placeholder="e.g. 5.2x" className="w-full p-2 border border-black/20 focus:border-brandAccent focus:outline-none" />
                  </div>
                </div>
              </div>

              <div className="flex gap-4 mt-6">
                <button disabled={loading} type="submit" className="flex-1 py-4 bg-brandAccent text-white font-bold uppercase tracking-widest hover:bg-black transition-colors disabled:opacity-50">
                  {loading ? 'Uploading & Saving...' : (editingItemId ? 'Update Case Study' : 'Save Case Study')}
                </button>
                {editingItemId && (
                  <button type="button" onClick={cancelEdit} className="px-6 py-4 bg-gray-200 text-black font-bold uppercase tracking-widest hover:bg-gray-300 transition-colors">
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>
        )}

        {/* MANAGE PORTFOLIO */}
        {activeTab === 'managePortfolio' && (
          <div className="bg-white p-8 border border-black/10 shadow-[8px_8px_0px_var(--color-brandAccent)]">
            <h2 className="text-2xl font-display font-black mb-6 uppercase">Manage Portfolio Items</h2>
            {isFetching ? (
              <p className="text-xs font-bold uppercase tracking-widest text-brandMuted">Loading...</p>
            ) : portfolioItems.length === 0 ? (
              <p className="text-xs font-bold uppercase tracking-widest text-brandMuted">No portfolio items found.</p>
            ) : (
              <div className="space-y-4">
                {portfolioItems.map(item => (
                  <div key={item.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 border border-black/10 hover:border-brandAccent transition-colors">
                    <div className="mb-4 sm:mb-0">
                      <h3 className="font-bold text-lg leading-tight">{item.title}</h3>
                      <p className="text-xs uppercase tracking-widest text-brandMuted mt-1">{item.category} • {item.mediaType || 'video'}</p>
                    </div>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleEditPortfolio(item)}
                        className="px-4 py-2 border border-black/20 text-[#000] text-[10px] font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-colors"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDelete('videoPortfolio', item.id)}
                        className="px-4 py-2 border border-red-500 text-red-500 text-[10px] font-bold uppercase tracking-widest hover:bg-red-500 hover:text-white transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* MANAGE CASE STUDIES */}
        {activeTab === 'manageCaseStudy' && (
          <div className="bg-white p-8 border border-black/10 shadow-[8px_8px_0px_var(--color-brandAccent)]">
            <h2 className="text-2xl font-display font-black mb-6 uppercase">Manage Case Studies</h2>
            {isFetching ? (
              <p className="text-xs font-bold uppercase tracking-widest text-brandMuted">Loading...</p>
            ) : caseStudyItems.length === 0 ? (
              <p className="text-xs font-bold uppercase tracking-widest text-brandMuted">No case studies found.</p>
            ) : (
              <div className="space-y-4">
                {caseStudyItems.map(item => (
                  <div key={item.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 border border-black/10 hover:border-brandAccent transition-colors">
                    <div className="mb-4 sm:mb-0">
                      <h3 className="font-bold text-lg leading-tight">{item.title}</h3>
                      <p className="text-xs uppercase tracking-widest text-brandMuted mt-1">{item.category}</p>
                    </div>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleEditCaseStudy(item)}
                        className="px-4 py-2 border border-black/20 text-[#000] text-[10px] font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-colors"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDelete('caseStudies', item.id)}
                        className="px-4 py-2 border border-red-500 text-red-500 text-[10px] font-bold uppercase tracking-widest hover:bg-red-500 hover:text-white transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TESTIMONIAL FORM */}
        {activeTab === 'testimonial' && (
          <div className="bg-white p-8 border border-black/10 shadow-[8px_8px_0px_var(--color-brandAccent)] relative">
            {editingItemId && (
              <div className="absolute -top-3 -right-3 bg-brandAccent text-white px-4 py-1 text-[10px] font-bold uppercase tracking-widest shadow-[2px_2px_0px_#000000]">
                Editing Mode
              </div>
            )}
            <h2 className="text-2xl font-display font-black mb-6 uppercase">{editingItemId ? 'Edit Testimonial' : 'New Testimonial'}</h2>
            <form onSubmit={submitTestimonial} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-brandMuted mb-2">Client Name</label>
                  <input type="text" required value={tName} onChange={e=>setTName(e.target.value)} className="w-full p-3 border border-black/20 focus:border-brandAccent focus:outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-brandMuted mb-2">Role / Company</label>
                  <input type="text" required value={tRole} onChange={e=>setTRole(e.target.value)} className="w-full p-3 border border-black/20 focus:border-brandAccent focus:outline-none" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-brandMuted mb-2">Review Text (Optional if adding screenshot)</label>
                <textarea rows="3" value={tText} onChange={e=>setTText(e.target.value)} className="w-full p-3 border border-black/20 focus:border-brandAccent focus:outline-none"></textarea>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-brandMuted mb-2">Screenshot / Image Proof (Optional)</label>
                {tOldImage && <p className="text-[10px] text-green-600 mb-1 font-bold">Current image attached. Uploading new replaces it.</p>}
                <input type="file" accept="image/*" onChange={e=>setTImage(e.target.files[0])} className="w-full p-3 border border-black/20 focus:border-brandAccent focus:outline-none" />
              </div>

              <div className="flex gap-4 mt-6">
                <button disabled={loading} type="submit" className="flex-1 py-4 bg-brandAccent text-white font-bold uppercase tracking-widest hover:bg-black transition-colors disabled:opacity-50">
                  {loading ? 'Uploading & Saving...' : (editingItemId ? 'Update Testimonial' : 'Save Testimonial')}
                </button>
                {editingItemId && (
                  <button type="button" onClick={cancelEdit} className="px-6 py-4 bg-gray-200 text-black font-bold uppercase tracking-widest hover:bg-gray-300 transition-colors">
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>
        )}

        {/* MANAGE TESTIMONIALS */}
        {activeTab === 'manageTestimonial' && (
          <div className="bg-white p-8 border border-black/10 shadow-[8px_8px_0px_var(--color-brandAccent)]">
            <h2 className="text-2xl font-display font-black mb-6 uppercase">Manage Testimonials</h2>
            {isFetching ? (
              <p className="text-xs font-bold uppercase tracking-widest text-brandMuted">Loading...</p>
            ) : testimonialItems.length === 0 ? (
              <p className="text-xs font-bold uppercase tracking-widest text-brandMuted">No testimonials found.</p>
            ) : (
              <div className="space-y-4">
                {testimonialItems.map(item => (
                  <div key={item.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 border border-black/10 hover:border-brandAccent transition-colors">
                    <div className="mb-4 sm:mb-0">
                      <h3 className="font-bold text-lg leading-tight">{item.name}</h3>
                      <p className="text-xs uppercase tracking-widest text-brandMuted mt-1">{item.role}</p>
                    </div>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleEditTestimonial(item)}
                        className="px-4 py-2 border border-black/20 text-[#000] text-[10px] font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-colors"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDelete('testimonials', item.id)}
                        className="px-4 py-2 border border-red-500 text-red-500 text-[10px] font-bold uppercase tracking-widest hover:bg-red-500 hover:text-white transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
