
/**
 * აპლიკაციის ვიზუალური თემის კონფიგურაცია.
 */
export const THEME = {
  colors: {
    white: '#ffffff',
    black: '#000000',
    background: '#ffffff',
    backgroundSecondary: '#f9f9fb',
    cardBackground: '#ffffff',
    textPrimary: '#000000',
    textSecondary: '#64748b',
    textMuted: '#94a3b8',
    accent: '#10b981',
    border: '#e2e8f0',
    dark: {
      background: '#0c0d0f',
      backgroundSecondary: '#1a1c22',
      cardBackground: '#1a1c22',
      textPrimary: '#ffffff',
      textSecondary: '#94a3b8',
      border: '#334155',
    }
  },

  typography: {
    heroTitle: {
      size: 'text-5xl md:text-8xl lg:text-[110px]',
      weight: 'font-normal',
      tracking: 'tracking-tight',
      leading: 'leading-[0.95]',
    },
    sectionTitle: {
      size: 'text-4xl md:text-6xl',
      weight: 'font-normal',
      tracking: 'tracking-tight',
    },
    footerTitle: {
      size: 'text-6xl md:text-9xl',
      weight: 'font-normal',
      tracking: 'tracking-tight',
    },
    label: {
      size: 'text-[10px]',
      weight: 'font-normal',
      tracking: 'tracking-wider',
    },
    body: {
      size: 'text-base md:text-lg',
      weight: 'font-normal',
      leading: 'leading-relaxed',
    }
  },

  fonts: {
    main: "'Google Sans', sans-serif",
  }
};
