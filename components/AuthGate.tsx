
import React, { useState } from 'react';
import { useApp } from '../store/AppContext';
import { TRANSLATIONS } from '../constants';

interface AuthGateProps {
  title: string;
  subtitle: string;
  onSuccess: (password: string) => void;
  onBack: () => void;
}

const AuthGate: React.FC<AuthGateProps> = ({ title, subtitle, onSuccess, onBack }) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { setView, lang } = useApp();
  const t = TRANSLATIONS[lang];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSuccess(password);
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-white dark:bg-zinc-950 p-6 animate-in fade-in duration-700">
      <div className="w-full max-w-[380px] flex flex-col items-center">
        <div className="w-16 h-16 bg-zinc-50 dark:bg-zinc-900 rounded-[24px] flex items-center justify-center mb-10 border border-zinc-100 dark:border-zinc-800 shadow-sm">
          <svg className="w-7 h-7 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>

        <h1 className="text-2xl font-black text-zinc-900 dark:text-zinc-50 mb-3 tracking-tight text-center">{title}</h1>
        <p className="text-zinc-400 dark:text-zinc-500 text-[13px] mb-12 font-bold uppercase tracking-wider text-center">{subtitle}</p>

        <form onSubmit={handleSubmit} className="w-full space-y-4">
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Password"
              className="w-full px-6 py-5 bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-[20px] focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-white transition-all text-sm font-bold tracking-tight pr-14 text-center"
              autoFocus
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-6 top-1/2 -translate-y-1/2 text-zinc-300 hover:text-zinc-500 transition-colors"
            >
              {showPassword ? (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" /></svg>
              ) : (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
              )}
            </button>
          </div>

          <button
            type="submit"
            className="w-full py-5 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-[20px] font-black text-[11px] uppercase tracking-wide shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            Unlock Access
          </button>
        </form>

        <div className="mt-12 flex flex-col items-center gap-6">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setView('GALLERY')}
              className="px-6 py-3 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 rounded-full text-[10px] font-black uppercase tracking-wide hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-all active:scale-95"
            >
              View Work Process
            </button>
            <button 
              onClick={() => setView('BRAND')}
              className="px-6 py-3 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 rounded-full text-[10px] font-black uppercase tracking-wide hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-all active:scale-95"
            >
              {t.brandTitle}
            </button>
          </div>

          <button
            onClick={onBack}
            className="text-[10px] font-black uppercase tracking-widest text-zinc-300 hover:text-zinc-600 dark:hover:text-zinc-100 transition-colors"
          >
            Return Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthGate;
