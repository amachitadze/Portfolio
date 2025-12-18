import React from 'react';
import { Translation } from '../types';
import { SKILLS } from '../constants';
import { THEME } from '../theme';

interface AboutProps {
  t: Translation;
}

const About: React.FC<AboutProps> = ({ t }) => {
  return (
    <section 
      className="snap-start min-h-screen flex items-center justify-center px-6 md:px-12 py-12"
      style={{ backgroundColor: THEME.colors.backgroundSecondary }}
      id="about"
    >
      <div 
        className="max-w-7xl w-full p-12 md:p-24 rounded-[28px] shadow-sm flex flex-col justify-center min-h-[70vh]"
        style={{ backgroundColor: THEME.colors.cardBackground }}
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16">
          {/* Left Side: About Text */}
          <div className="md:col-span-7 space-y-12">
            <div>
              <h2 className="text-[11px] font-medium tracking-[0.2em] uppercase text-zinc-400 mb-16">
                {t.aboutMeTitle}
              </h2>
              <div className="space-y-10 text-xl md:text-2xl text-zinc-600 dark:text-zinc-300 leading-snug font-normal">
                <p>{t.aboutMeText1}</p>
                <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed">{t.aboutMeText2}</p>
              </div>
            </div>
          </div>

          {/* Right Side: Skills */}
          <div className="md:col-span-5 md:pl-16">
            <h2 className="text-[11px] font-medium tracking-[0.2em] uppercase text-zinc-400 mb-12">
              {t.skillsTitle}
            </h2>
            <div className="space-y-6">
              {SKILLS.map((skill, idx) => (
                <div key={idx} className="flex items-center gap-4 group">
                  <div className="w-2 h-2 rounded-full bg-zinc-300 dark:bg-zinc-700"></div>
                  <span className="text-lg text-zinc-600 dark:text-zinc-300 font-normal">
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