
import React, { useEffect } from 'react';
import { Project } from '../types';

interface ProjectDetailProps {
  project: Project;
  onBack: () => void;
}

const ProjectDetail: React.FC<ProjectDetailProps> = ({ project, onBack }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 animate-in fade-in duration-500">
      <button 
        onClick={onBack}
        className="fixed top-8 left-8 z-50 px-6 py-3 bg-zinc-100/80 dark:bg-zinc-900/80 backdrop-blur-md rounded-full text-sm font-medium flex items-center gap-2 hover:scale-105 transition-all shadow-sm border border-zinc-200/50 dark:border-zinc-800/50"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back
      </button>

      <div className="relative w-full h-[65vh] overflow-hidden">
        <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-zinc-950 via-transparent to-transparent" />
      </div>

      <div className="max-w-5xl mx-auto px-6 py-16 -mt-32 relative z-10">
        <div className="flex gap-2 mb-8">
          {project.tags.map((tag, idx) => (
            <span key={idx} className="px-4 py-1.5 bg-zinc-100 dark:bg-zinc-900 rounded-full text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">
              {tag}
            </span>
          ))}
        </div>

        <h1 className="text-5xl md:text-8xl font-black mb-12 tracking-tight text-zinc-900 dark:text-zinc-50">
          {project.title}
        </h1>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-24">
          <div>
            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest block mb-2">Year</span>
            <p className="text-lg text-zinc-800 dark:text-zinc-200">{project.year}</p>
          </div>
          <div>
            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest block mb-2">Client</span>
            <p className="text-lg text-zinc-800 dark:text-zinc-200">{project.client}</p>
          </div>
        </div>

        {/* HTML Content Rendering */}
        <article 
          className="prose dark:prose-invert prose-xl max-w-none antialiased text-zinc-600 dark:text-zinc-400 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: project.content }}
        />
        
        <div className="mt-32 pt-20 border-t border-zinc-100 dark:border-zinc-900">
          <p className="text-[10px] font-black uppercase tracking-[0.5em] text-zinc-300 dark:text-zinc-800 text-center">
            END OF CASE STUDY
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
