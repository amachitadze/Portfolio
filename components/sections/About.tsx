
import React from 'react';
import { Translation } from '../../types';
import { SKILLS } from '../../constants';
import { THEME } from '../../theme';

/**
 * ℹ️ 'ჩემს შესახებ' სექცია
 * ეს კომპონენტი პასუხისმგებელია ბიოგრაფიისა და უნარების გამოჩენაზე.
 */
const About: React.FC<{ t: Translation }> = ({ t }) => {
  const { typography, colors } = THEME;
  
  return (
    <section 
      className="snap-start min-h-screen flex items-center justify-center px-4 md:px-12 py-16 md:py-24 bg-zinc-50 dark:bg-[#1a1c22]"
      id="about"
    >
      <div 
        className="max-w-7xl w-full p-6 md:p-20 lg:p-24 rounded-[24px] md:rounded-[32px] shadow-[0_4px_24px_rgba(0,0,0,0.02)] flex flex-col justify-center min-h-[70vh] border border-zinc-100 dark:border-zinc-800/50"
        style={{ backgroundColor: colors.white }}
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 lg:gap-24">
          {/* 📝 მარცხენა მხარე: ტექსტური ინფორმაცია */}
          <div className="md:col-span-7 space-y-8 md:space-y-12">
            <div>
              <h2 className={`${typography.label.size} ${typography.label.weight} ${typography.label.tracking} uppercase text-zinc-400 mb-8 md:mb-16 opacity-70`}>
                01 — {t.aboutMeTitle}
              </h2>
              <div 
                className="space-y-6 md:space-y-10 text-lg md:text-2xl lg:text-3xl leading-[1.3] md:leading-[1.4] font-normal antialiased"
                style={{ color: colors.black }}
              >
                <p>{t.aboutMeText1}</p>
                <p className="text-zinc-400 dark:text-zinc-500 font-light italic leading-relaxed">
                  {t.aboutMeText2}
                </p>
              </div>
            </div>
          </div>
          
          {/* 🛠️ მარჯვენა მხარე: უნარების ჩამონათვალი */}
          <div className="md:col-span-5 md:pl-12 lg:pl-20 md:border-l border-zinc-50 dark:border-zinc-800/50">
            <h2 className={`${typography.label.size} ${typography.label.weight} ${typography.label.tracking} uppercase text-zinc-400 mb-8 md:mb-12 opacity-70`}>
              02 — {t.skillsTitle}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-4 md:gap-5">
              {SKILLS.map((skill, idx) => (
                <div key={idx} className="flex items-center gap-3 md:gap-4 group cursor-default">
                  {/* ✨ აქცენტის ფერი გამოყენებულია წერტილებისთვის */}
                  <div 
                    className="w-1 md:w-1.5 h-1 md:h-1.5 rounded-full bg-zinc-200 dark:bg-zinc-700 transition-all duration-300 group-hover:scale-150"
                    style={{ backgroundColor: colors.accent }}
                  ></div>
                  <span className="text-sm md:text-lg text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 transition-colors duration-300 font-normal antialiased">
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
