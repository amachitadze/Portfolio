
import React from 'react';
import { Translation } from '../../types';
import { SKILLS } from '../../constants';
import { THEME } from '../../theme';

const About: React.FC<{ t: Translation }> = ({ t }) => {
  const { typography } = THEME;
  
  return (
    <section 
      className="snap-start min-h-screen flex items-center justify-center px-6 md:px-12 py-12 bg-zinc-50 dark:bg-[#1a1c22]"
      id="about"
    >
      <div 
        className="max-w-7xl w-full p-10 md:p-20 lg:p-24 rounded-[32px] shadow-[0_4px_24px_rgba(0,0,0,0.02)] flex flex-col justify-center min-h-[70vh] border border-zinc-100 dark:border-zinc-800/50"
        style={{ backgroundColor: '#ffffff' }}
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 lg:gap-24">
          <div className="md:col-span-7 space-y-12">
            <div>
              <h2 className={`${typography.label.size} ${typography.label.weight} ${typography.label.tracking} uppercase text-zinc-400 mb-16 opacity-70`}>
                01 — {t.aboutMeTitle}
              </h2>
              <div className="space-y-10 text-xl md:text-2xl lg:text-3xl text-brand-black dark:text-zinc-200 leading-[1.3] font-medium antialiased">
                <p>{t.aboutMeText1}</p>
                <p className="text-zinc-400 dark:text-zinc-500 font-light italic leading-relaxed">
                  {t.aboutMeText2}
                </p>
              </div>
            </div>
          </div>
          <div className="md:col-span-5 md:pl-12 lg:pl-20 border-l border-zinc-50 dark:border-zinc-800/50">
            <h2 className={`${typography.label.size} ${typography.label.weight} ${typography.label.tracking} uppercase text-zinc-400 mb-12 opacity-70`}>
              02 — {t.skillsTitle}
            </h2>
            <div className="space-y-5">
              {SKILLS.map((skill, idx) => (
                <div key={idx} className="flex items-center gap-4 group cursor-default">
                  <div className="w-1.5 h-1.5 rounded-full bg-zinc-200 dark:bg-zinc-700 group-hover:bg-brand-black transition-all duration-300"></div>
                  <span className="text-base md:text-lg text-zinc-500 dark:text-zinc-400 group-hover:text-brand-black dark:group-hover:text-zinc-100 transition-colors duration-300 font-normal antialiased">
                    {skill}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
