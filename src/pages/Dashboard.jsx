import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('portfolio');
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');

  // Protect route
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) navigate('/login');
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  // Portfolio Form State
  const [pTitle, setPTitle] = useState('');
  const [pCategory, setPCategory] = useState('');
  const [pDescription, setPDescription] = useState('');
  const [pVideoUrl, setPVideoUrl] = useState('');
  const [pThumbnail, setPThumbnail] = useState(null);

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

  const submitPortfolio = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg('');

    const token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('title', pTitle);
    formData.append('category', pCategory);
    formData.append('description', pDescription);
    formData.append('videoUrl', pVideoUrl);
    if (pThumbnail) formData.append('thumbnail', pThumbnail);

    try {
      const res = await fetch('http://localhost:5000/api/portfolio', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData
      });
      if (res.ok) {
        setMsg('Portfolio item added successfully!');
        setPTitle(''); setPCategory(''); setPDescription(''); setPVideoUrl(''); setPThumbnail(null);
      } else {
        setMsg('Error adding portfolio item.');
      }
    } catch (err) {
      setMsg('Server error.');
    }
    setLoading(false);
  };

  const submitCaseStudy = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg('');

    const token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('title', cTitle);
    formData.append('category', cCategory);
    formData.append('tag', cTag);
    formData.append('details', cDetails);
    
    const metrics = {
      Duration: cDuration,
      Spent: cSpent,
      Result: cResult,
      CTR: cCTR,
      ROAS: cROAS
    };
    formData.append('metrics', JSON.stringify(metrics));
    if (cImage) formData.append('image', cImage);

    try {
      const res = await fetch('http://localhost:5000/api/case-studies', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData
      });
      if (res.ok) {
        setMsg('Case Study added successfully!');
        setCTitle(''); setCCategory(''); setCTag(''); setCDetails('');
        setCDuration(''); setCSpent(''); setCResult(''); setCCTR(''); setCROAS('');
        setCImage(null);
      } else {
        setMsg('Error adding case study.');
      }
    } catch (err) {
      setMsg('Server error.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-brandBg pt-24 px-6 md:px-12 pb-24">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-4xl md:text-5xl font-display font-black uppercase tracking-tighter">Admin Dashboard</h1>
          <button onClick={handleLogout} className="px-4 py-2 border border-black/20 text-xs font-bold uppercase hover:bg-black hover:text-white transition-colors">
            Logout
          </button>
        </div>

        <div className="flex gap-4 mb-8 border-b border-black/10 pb-4">
          <button 
            onClick={() => setActiveTab('portfolio')}
            className={`text-sm font-bold uppercase tracking-widest px-4 py-2 ${activeTab === 'portfolio' ? 'bg-brandAccent text-white' : 'text-brandMuted hover:text-black'}`}
          >
            Add Portfolio
          </button>
          <button 
            onClick={() => setActiveTab('caseStudy')}
            className={`text-sm font-bold uppercase tracking-widest px-4 py-2 ${activeTab === 'caseStudy' ? 'bg-brandAccent text-white' : 'text-brandMuted hover:text-black'}`}
          >
            Add Case Study
          </button>
        </div>

        {msg && (
          <div className="p-4 mb-8 bg-green-50 border border-green-200 text-green-700 font-bold uppercase tracking-widest text-xs">
            {msg}
          </div>
        )}

        {/* PORTFOLIO FORM */}
        {activeTab === 'portfolio' && (
          <div className="bg-white p-8 border border-black/10 shadow-[8px_8px_0px_var(--color-brandAccent)]">
            <h2 className="text-2xl font-display font-black mb-6 uppercase">New Portfolio Item</h2>
            <form onSubmit={submitPortfolio} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-brandMuted mb-2">Title</label>
                  <input type="text" required value={pTitle} onChange={e=>setPTitle(e.target.value)} className="w-full p-3 border border-black/20 focus:border-brandAccent focus:outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-brandMuted mb-2">Category</label>
                  <input type="text" required value={pCategory} onChange={e=>setPCategory(e.target.value)} placeholder="e.g. Meta Ads, UGC" className="w-full p-3 border border-black/20 focus:border-brandAccent focus:outline-none" />
                </div>
              </div>
              
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-brandMuted mb-2">Video URL (YouTube/Vimeo)</label>
                <input type="url" required value={pVideoUrl} onChange={e=>setPVideoUrl(e.target.value)} className="w-full p-3 border border-black/20 focus:border-brandAccent focus:outline-none" />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-brandMuted mb-2">Thumbnail Image (Optional)</label>
                <input type="file" accept="image/*" onChange={e=>setPThumbnail(e.target.files[0])} className="w-full p-3 border border-black/20 focus:border-brandAccent focus:outline-none" />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-brandMuted mb-2">Description</label>
                <textarea rows="3" required value={pDescription} onChange={e=>setPDescription(e.target.value)} className="w-full p-3 border border-black/20 focus:border-brandAccent focus:outline-none"></textarea>
              </div>

              <button disabled={loading} type="submit" className="w-full mt-4 py-4 bg-brandAccent text-white font-bold uppercase tracking-widest hover:bg-black transition-colors disabled:opacity-50">
                {loading ? 'Uploading...' : 'Save Portfolio Item'}
              </button>
            </form>
          </div>
        )}

        {/* CASE STUDY FORM */}
        {activeTab === 'caseStudy' && (
          <div className="bg-white p-8 border border-black/10 shadow-[8px_8px_0px_var(--color-brandAccent)]">
            <h2 className="text-2xl font-display font-black mb-6 uppercase">New Case Study</h2>
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
                  <input type="file" required accept="image/*" onChange={e=>setCImage(e.target.files[0])} className="w-full p-3 border border-black/20 focus:border-brandAccent focus:outline-none" />
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

              <button disabled={loading} type="submit" className="w-full mt-6 py-4 bg-brandAccent text-white font-bold uppercase tracking-widest hover:bg-black transition-colors disabled:opacity-50">
                {loading ? 'Uploading...' : 'Save Case Study'}
              </button>
            </form>
          </div>
        )}

      </div>
    </div>
  );
}
