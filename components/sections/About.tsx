
import React from 'react';
import { Translation } from '../../types';
import { SKILLS } from '../../constants';
import { THEME } from '../../theme';

/**
 * ℹ️ 'ჩემს შესახებ' სექცია - მინიმალისტური დიზაინი ნორმალური ტექსტის ზომით.
 */
const About: React.FC<{ t: Translation }> = ({ t }) => {
  const { typography, colors, spacing } = THEME;
  
  return (
    <section 
      className={`snap-start min-h-screen flex items-center justify-center px-6 md:px-12 ${spacing.sectionPadding} bg-zinc-50 dark:bg-zinc-950`}
      id="about"
    >
      <div 
        className="max-w-7xl w-full p-10 md:p-20 rounded-[40px] shadow-sm flex flex-col justify-center border border-zinc-100 dark:border-zinc-900"
        style={{ backgroundColor: colors.white }}
      >
        <div className={`grid grid-cols-1 lg:grid-cols-12 ${spacing.containerGap}`}>
          
          {/* 📝 ბიოგრაფიის მხარე */}
          <div className="lg:col-span-7">
            <h2 className={`${typography.label.size} ${typography.label.weight} ${typography.label.tracking} uppercase text-zinc-300 mb-12 opacity-70`}>
              01 — {t.aboutMeTitle}
            </h2>
            <div 
              className={`${typography.aboutBio.size} ${typography.aboutBio.weight} ${typography.aboutBio.leading} ${typography.aboutBio.tracking} antialiased`}
              style={{ color: colors.black }}
            >
              <p className="mb-8">{t.aboutMeText1}</p>
              <p className="text-zinc-500 dark:text-zinc-400 font-light italic">
                {t.aboutMeText2}
              </p>
            </div>
          </div>
          
          {/* 🛠️ უნარების მხარე */}
          <div className="lg:col-span-5 lg:pl-16 lg:border-l border-zinc-100 dark:border-zinc-900">
            <h2 className={`${typography.label.size} ${typography.label.weight} ${typography.label.tracking} uppercase text-zinc-300 mb-10 opacity-70`}>
              02 — {t.skillsTitle}
            </h2>
            <div className="space-y-5">
              {SKILLS.map((skill, idx) => (
                <div key={idx} className="flex items-center gap-4 group cursor-default">
                  <div 
                    className="w-1.5 h-1.5 rounded-full transition-all duration-300 group-hover:scale-150"
                    style={{ backgroundColor: colors.accent }}
                  ></div>
                  <span className="text-base md:text-lg text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
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
