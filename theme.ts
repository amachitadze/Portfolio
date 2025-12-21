
/**
 * 🎨 აპლიკაციის ვიზუალური თემის კონფიგურაცია.
 */
export const THEME = {
  colors: {
    white: '#ffffff',
    black: '#32353F',
    background: '#ffffff',
    backgroundSecondary: '#f8f9fa',
    cardBackground: '#ffffff',
    textPrimary: '#32353F',
    textSecondary: '#64748b',
    textMuted: '#94a3b8',
    accent: '#FFC93C',
    border: '#f1f5f9',
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
      size: 'text-5xl md:text-7xl lg:text-[100px]',
      weight: 'font-black',
      // შემცირებული დაშორება ასოებს შორის უფრო სოლიდური იერსახისთვის
      tracking: 'tracking-[-0.03em]',
      leading: 'leading-[1.05]',
    },
    label: {
      size: 'text-[11px]',
      weight: 'font-bold',
      // დაშორება შემცირდა 0.4em-დან 0.1em-მდე
      tracking: 'tracking-[0.1em]',
    }
  },

  fonts: {
    main: "'Google Sans', 'Noto Sans Georgian', sans-serif",
  }
};
