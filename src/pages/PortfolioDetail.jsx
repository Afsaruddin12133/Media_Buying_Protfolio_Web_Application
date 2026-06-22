import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Play, BarChart2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { api } from '../api/mockDb';
import YoutubeEmbed from '../components/YoutubeEmbed';

export default function PortfolioDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const item = await api.getPortfolioBySlug(slug);
        if (item) {
          setProject(item);
        } else {
          navigate('/#portfolio');
        }
      } catch (error) {
        console.error("Failed to load project details", error);
        navigate('/#portfolio');
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [slug, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-brandBg flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-brandAccent border-t-transparent animate-spin"></div>
      </div>
    );
  }

  if (!project) return null;

  return (
    <div className="min-h-screen bg-brandBg relative pt-20">
      {/* Stark Grid Background */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none z-0" />

      {/* Navigation Bar */}
      <div className="sticky top-[72px] z-40 bg-brandBg border-b border-black/10 py-4">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brandMuted hover:text-brandAccent transition-colors group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back to Showreel
          </button>
          <div className="flex gap-2">
            <span className="px-3 py-1 bg-white border border-black/10 text-[10px] font-bold uppercase tracking-widest text-brandAccent shadow-[2px_2px_0px_var(--color-brandAccent)]">
              {project.category}
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 relative z-10">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-5xl md:text-7xl font-black font-display text-[#000] tracking-tighter uppercase mb-6 leading-none">
            {project.title}
          </h1>
          <p className="text-lg md:text-xl text-brandMuted max-w-3xl font-medium leading-relaxed">
            {project.shortDescription || project.description}
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
          
          {/* Left Column - Details */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* Media Player */}
            {project.videoUrl && (
              <div className="border border-black/10 shadow-[8px_8px_0px_var(--color-brandAccent)] bg-white overflow-hidden">
                {project.videoUrl.includes('youtube.com') || project.videoUrl.includes('youtu.be') ? (
                  <div className="relative pb-[56.25%] h-0">
                    <YoutubeEmbed url={project.videoUrl} title={project.title} />
                  </div>
                ) : (
                  <video controls className="w-full h-auto aspect-video object-cover">
                    <source src={project.videoUrl} type="video/mp4" />
                  </video>
                )}
              </div>
            )}
            
            {!project.videoUrl && project.thumbnail && (
              <div className="border border-black/10 shadow-[8px_8px_0px_var(--color-brandAccent)] bg-white overflow-hidden">
                <img src={project.thumbnail} alt={project.title} className="w-full h-auto object-cover aspect-video grayscale hover:grayscale-0 transition-all duration-500" />
              </div>
            )}

            {/* Project Content */}
            <div className="space-y-12 pt-8">
              {project.challenge && (
                <div>
                  <h3 className="text-2xl font-black font-display text-[#000] uppercase tracking-tighter mb-4 flex items-center gap-3">
                    <span className="w-3 h-3 bg-brandAccent inline-block"></span>
                    The Challenge
                  </h3>
                  <p className="text-brandMuted leading-relaxed font-medium">{project.challenge}</p>
                </div>
              )}
              
              {project.solution && (
                <div>
                  <h3 className="text-2xl font-black font-display text-[#000] uppercase tracking-tighter mb-4 flex items-center gap-3">
                    <span className="w-3 h-3 bg-brandAccent inline-block"></span>
                    Our Solution
                  </h3>
                  <p className="text-brandMuted leading-relaxed font-medium">{project.solution}</p>
                </div>
              )}
              
              {project.content && (
                <div className="prose prose-brandAccent max-w-none">
                  <p className="text-brandMuted leading-relaxed font-medium">{project.content}</p>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Meta Info & Results */}
          <div className="space-y-8">
            
            {/* Meta Card */}
            <div className="p-8 border border-black/10 bg-white shadow-[4px_4px_0px_#000000] space-y-6">
              <div>
                <p className="text-[10px] text-brandMuted uppercase tracking-widest font-bold mb-1">Client</p>
                <p className="text-sm text-[#000] font-black uppercase">{project.client}</p>
              </div>
              <div>
                <p className="text-[10px] text-brandMuted uppercase tracking-widest font-bold mb-1">Industry</p>
                <p className="text-sm text-[#000] font-black uppercase">{project.industry}</p>
              </div>
            </div>

            {/* Results Card */}
            {project.results && project.results.length > 0 && (
              <div className="p-8 border border-brandAccent bg-white shadow-[6px_6px_0px_var(--color-brandAccent)]">
                <div className="flex items-center gap-3 mb-6">
                  <BarChart2 className="text-brandAccent" size={24} />
                  <h3 className="text-sm font-bold text-[#000] uppercase tracking-widest">Key Results</h3>
                </div>
                <ul className="space-y-4">
                  {project.results.map((result, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="text-brandAccent mt-0.5">■</span>
                      <span className="text-sm text-[#000] font-medium leading-snug">{result}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
          </div>
        </div>
      </div>
    </div>
  );
}
