
import React, { useState } from 'react';
import { Translation, Project } from '../../types';
import { useApp } from '../../store/AppContext';

interface ProjectGridProps {
  t: Translation;
}

const ProjectGrid: React.FC<ProjectGridProps> = ({ t }) => {
  const { setView, setSelectedProject, projects } = useApp();
  const [currentIndex, setCurrentIndex] = useState(0);
  const projectsPerPage = 2;
  
  // უზრუნველყოფს, რომ მინიმუმ 0 იყოს მნიშვნელობა
  const maxIndex = projects.length > 0 ? Math.ceil(projects.length / projectsPerPage) - 1 : 0;

  const handleNext = () => setCurrentIndex(prev => Math.min(prev + 1, maxIndex));
  const handlePrev = () => setCurrentIndex(prev => Math.max(prev - 1, 0));

  const onProjectClick = (project: Project) => {
    setSelectedProject(project);
    setView('DETAIL');
  };

  // თუ პროექტები საერთოდ არ არის (არც საწყისი), მხოლოდ მაშინ არ გამოჩნდება
  if (!projects || projects.length === 0) return null;

  return (
    <section id="work" className="snap-start min-h-screen py-32 px-6 md:px-12 flex flex-col justify-center max-w-7xl mx-auto relative overflow-hidden">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <h2 className="text-[11px] font-black tracking-[0.4em] uppercase text-zinc-400">
          03 — {t.selectedWork}
        </h2>
        
        <div className="flex items-center gap-6">
          <button onClick={handlePrev} disabled={currentIndex === 0} className={`w-12 h-12 rounded-full border border-zinc-200 dark:border-zinc-800 flex items-center justify-center transition-all ${currentIndex === 0 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-zinc-50 dark:hover:bg-zinc-900 text-brand-black dark:text-white'}`}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" /></svg>
          </button>
          
          <div className="flex items-center gap-2">
            {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
              <div key={idx} className={`transition-all duration-300 ${currentIndex === idx ? 'w-8 h-2.5 bg-brand-black dark:bg-white rounded-full' : 'w-2.5 h-2.5 bg-zinc-300 dark:bg-zinc-700 rounded-full'}`} />
            ))}
          </div>

          <button onClick={handleNext} disabled={currentIndex === maxIndex} className={`w-12 h-12 rounded-full border border-zinc-200 dark:border-zinc-800 flex items-center justify-center transition-all ${currentIndex === maxIndex ? 'opacity-30 cursor-not-allowed' : 'hover:bg-zinc-50 dark:hover:bg-zinc-900 text-brand-black dark:text-white'}`}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>
      </div>

      <div className="relative overflow-hidden">
        <div className="flex transition-transform duration-700 ease-out" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
          {Array.from({ length: maxIndex + 1 }).map((_, pageIdx) => (
            <div key={pageIdx} className="min-w-full grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
              {projects.slice(pageIdx * projectsPerPage, (pageIdx + 1) * projectsPerPage).map((project) => (
                <div key={project.id} className="group cursor-pointer" onClick={() => onProjectClick(project)}>
                  <div className="overflow-hidden rounded-2xl bg-zinc-100 dark:bg-zinc-900 mb-8 aspect-[16/10] relative">
                    <img src={project.image} alt={project.title} className="w-full h-full object-cover grayscale opacity-90 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-[1.03] transition-all duration-1000" />
                  </div>
                  <div className="flex justify-between items-center px-4">
                    <div>
                      <h3 className="text-2xl font-bold text-brand-black dark:text-zinc-100 mb-2 tracking-tight">{project.title}</h3>
                      <div className="flex flex-wrap gap-4">
                        {project.tags.map((tag, idx) => (
                          <span key={idx} className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">{tag}</span>
                        ))}
                      </div>
                    </div>
                    <div className="w-12 h-12 rounded-full border border-zinc-100 dark:border-zinc-900 flex items-center justify-center group-hover:bg-brand-black dark:group-hover:bg-white group-hover:text-white dark:group-hover:text-zinc-950 transition-all duration-300">
                      <svg className="w-5 h-5 -rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectGrid;
