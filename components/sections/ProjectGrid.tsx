
import React, { useState, useEffect } from 'react';
import { Translation, Project } from '../../types';
import { useApp } from '../../store/AppContext';
import { THEME } from '../../theme';

const ProjectGrid: React.FC<{ t: Translation }> = ({ t }) => {
  const { setView, setSelectedProject, projects, isLoading } = useApp();
  const { colors } = THEME;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [projectsPerPage, setProjectsPerPage] = useState(4);
  
  useEffect(() => {
    const updateSize = () => {
      if (window.innerWidth < 768) {
        setProjectsPerPage(2);
      } else {
        setProjectsPerPage(4);
      }
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const maxIndex = projects.length > 0 ? Math.ceil(projects.length / projectsPerPage) - 1 : 0;

  const handleNext = () => setCurrentIndex(prev => Math.min(prev + 1, maxIndex));
  const handlePrev = () => setCurrentIndex(prev => Math.max(prev - 1, 0));

  const onProjectClick = (project: Project) => {
    setSelectedProject(project);
    setView('DETAIL');
  };

  const NavigationControls = ({ className = "" }: { className?: string }) => (
    <div className={`flex items-center gap-4 md:gap-6 ${className}`}>
      <button 
        onClick={handlePrev} 
        disabled={currentIndex === 0} 
        className={`w-10 md:w-12 h-10 md:h-12 rounded-full border border-zinc-200 dark:border-zinc-800 flex items-center justify-center transition-all ${currentIndex === 0 ? 'opacity-20 cursor-not-allowed' : 'hover:bg-zinc-50 dark:hover:bg-zinc-900 active:scale-90 shadow-sm'}`}
        style={{ color: colors.black }}
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <div className="flex items-center gap-2">
        {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
          <div 
            key={idx} 
            className={`transition-all duration-500 ${currentIndex === idx ? 'w-6 md:w-8 h-1.5 md:h-2 rounded-full' : 'w-1.5 md:w-2 h-1.5 md:h-2 bg-zinc-200 dark:bg-zinc-800 rounded-full'}`} 
            style={currentIndex === idx ? { backgroundColor: colors.accent } : {}}
          />
        ))}
      </div>

      <button 
        onClick={handleNext} 
        disabled={currentIndex === maxIndex} 
        className={`w-10 md:w-12 h-10 md:h-12 rounded-full border border-zinc-200 dark:border-zinc-800 flex items-center justify-center transition-all ${currentIndex === maxIndex ? 'opacity-20 cursor-not-allowed' : 'hover:bg-zinc-50 dark:hover:bg-zinc-900 active:scale-90 shadow-sm'}`}
        style={{ color: colors.black }}
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );

  return (
    <section id="work" className="snap-start min-h-screen py-24 md:py-32 px-4 md:px-12 flex flex-col justify-center max-w-7xl mx-auto relative overflow-hidden bg-white dark:bg-[#0c0d0f]">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-20 gap-8">
        <div className="flex-1">
          <h2 className="text-[10px] md:text-[11px] font-normal tracking-wider uppercase text-zinc-400 mb-4 opacity-60">
            03 — {t.selectedWork}
          </h2>
          {/* აქ წაიშალა <br /> რომ ტექსტი იყოს ერთ ხაზზე */}
          <h3 
            className="text-4xl md:text-6xl font-black tracking-tight leading-none whitespace-nowrap"
            style={{ color: colors.black }}
          >
            {t.selectedWork}
          </h3>
        </div>
        
        {projects.length > projectsPerPage && <NavigationControls className="hidden md:flex" />}
      </div>

      {isLoading ? (
        <div className="flex justify-center py-40">
          <div className="w-8 h-8 border-2 border-zinc-100 border-t-zinc-900 rounded-full animate-spin"></div>
        </div>
      ) : projects.length === 0 ? (
        <div className="py-20 text-center border-2 border-dashed border-zinc-100 dark:border-zinc-900 rounded-[40px]">
          <p className="text-zinc-300 uppercase text-[10px] font-black tracking-widest">ჯერჯერობით პროექტები არ არის</p>
        </div>
      ) : (
        <div className="relative overflow-hidden mb-16 md:mb-20">
          <div 
            className="flex transition-transform duration-1000 cubic-bezier(0.23, 1, 0.32, 1)" 
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {Array.from({ length: maxIndex + 1 }).map((_, pageIdx) => (
              <div key={pageIdx} className="min-w-full grid grid-cols-1 md:grid-cols-2 gap-x-10 md:gap-x-14 gap-y-12 md:gap-y-20">
                {projects.slice(pageIdx * projectsPerPage, (pageIdx + 1) * projectsPerPage).map((project) => (
                  <div key={project.id} className="group cursor-pointer" onClick={() => onProjectClick(project)}>
                    <div className="overflow-hidden rounded-[28px] md:rounded-[40px] bg-zinc-50 dark:bg-zinc-900 mb-6 md:mb-8 aspect-[16/10] relative border border-zinc-100 dark:border-zinc-800/50">
                      <img 
                        src={project.image} 
                        alt={project.title} 
                        className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-[1.04] transition-all duration-1000 ease-out" 
                      />
                      <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-500"></div>
                    </div>
                    <div className="flex justify-between items-start px-2 md:px-4">
                      <div className="max-w-[80%]">
                        <h3 
                          className="text-2xl md:text-3xl font-black mb-3 tracking-tight leading-tight"
                          style={{ color: colors.black }}
                        >
                          {project.title}
                        </h3>
                        <div className="flex flex-wrap gap-x-4 gap-y-2">
                          {project.tags.map((tag, idx) => (
                            <span key={idx} className="text-[9px] md:text-[10px] font-normal text-zinc-400 dark:text-zinc-500 uppercase tracking-wide">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div 
                        className="w-10 md:w-14 h-10 md:h-14 rounded-full border border-zinc-100 dark:border-zinc-800 flex items-center justify-center transition-all duration-500 shadow-sm group-hover:bg-zinc-900 group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-zinc-900"
                        style={{ borderColor: colors.accent }}
                      >
                        <svg className="w-4 md:w-5 h-4 md:h-5 -rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}

      {projects.length > projectsPerPage && (
        <div className="flex justify-center mt-4 md:hidden">
          <NavigationControls />
        </div>
      )}
    </section>
  );
};

export default ProjectGrid;
