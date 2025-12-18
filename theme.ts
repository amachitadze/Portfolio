
/**
 * აპლიკაციის ვიზუალური თემის კონფიგურაცია.
 * აქ შეგიძლიათ შეცვალოთ ნებისმიერი ვიზუალური პარამეტრი მთელ საიტზე.
 */
export const THEME = {
  colors: {
    // ძირითადი ფერები
    white: '#ffffff',           // სუფთა თეთრი ფონი
    black: '#000000',           // ბუნებრივი შავი (აქ შეგიძლიათ შეცვალოთ ტექსტის და ელემენტების ფერი)
    
    // ფონის პარამეტრები
    background: '#ffffff',      // საიტის მთავარი თეთრი ფონი
    backgroundSecondary: '#f9f9fb', // სექციებს შორის გამოსაყოფი მკრთალი ფონი
    cardBackground: '#ffffff',  // პროექტების და ბლოკების ბარათების ფონი
    
    // ტექსტის ფერები
    textPrimary: '#000000',     // მთავარი ტექსტის ფერი (ბუნებრივი შავი)
    textSecondary: '#64748b',   // ნაკლებად მნიშვნელოვანი ტექსტის ფერი (რუხი)
    textMuted: '#94a3b8',       // მკრთალი ტექსტის ფერი (მაგ. თარიღებისთვის)
    
    // აქცენტები და ჩარჩოები
    accent: '#10b981',          // აქცენტის ფერი (მაგ. მწვანე ინდიკატორი "Available for work")
    border: '#e2e8f0',          // ჩარჩოების და გამყოფების ფერი
    
    // მუქი რეჟიმის (Dark Mode) პარამეტრები
    dark: {
      background: '#0c0d0f',    // მუქი ფონი
      backgroundSecondary: '#1a1c22', // მუქი მეორადი ფონი
      cardBackground: '#1a1c22', // მუქი ბარათების ფონი
      textPrimary: '#ffffff',    // მუქი რეჟიმის თეთრი ტექსტი
      textSecondary: '#94a3b8',  // მუქი რეჟიმის რუხი ტექსტი
      border: '#334155',         // მუქი რეჟიმის ჩარჩოები
    }
  },

  /**
   * ტიპოგრაფიის პარამეტრები.
   * მომხმარებლის მოთხოვნით, ყველა სისქე (weight) არის ერთიანი (font-normal).
   */
  typography: {
    // მთავარი სათაური (Hero Section)
    heroTitle: {
      size: 'text-5xl md:text-8xl lg:text-[110px]', // ზომა სხვადასხვა ეკრანისთვის
      weight: 'font-normal',                         // სისქე (შეგიძლიათ შეცვალოთ font-light ან font-bold-ზე)
      tracking: 'tracking-tighter',                  // ასოებს შორის დაშორება
      leading: 'leading-[0.95]',                     // ხაზებს შორის დაშორება
    },
    // სექციების სათაურები
    sectionTitle: {
      size: 'text-3xl md:text-5xl',                  // ზომა
      weight: 'font-normal',                         // სისქე
      tracking: 'tracking-tighter',                  // დაშორება
    },
    // ფუთერის დიდი სათაური
    footerTitle: {
      size: 'text-6xl md:text-9xl',                  // ზომა
      weight: 'font-normal',                         // სისქე
      tracking: 'tracking-tighter',                  // დაშორება
    },
    // მცირე წარწერები (Labels)
    label: {
      size: 'text-[10px]',                           // ზომა
      weight: 'font-normal',                         // სისქე
      tracking: 'tracking-[0.4em]',                  // დიდი დაშორება ასოებს შორის (Uppercase სტილისთვის)
    },
    // ძირითადი ტექსტი
    body: {
      size: 'text-base md:text-lg',                  // ზომა
      weight: 'font-normal',                         // სისქე
      leading: 'leading-relaxed',                    // ხაზებს შორის დაშორება კომფორტული კითხვისთვის
    }
  },

  /**
   * ფონტების კონფიგურაცია.
   * დატოვებულია მხოლოდ Google Sans მომხმარებლის მოთხოვნით.
   */
  fonts: {
    main: "'Google Sans', sans-serif", // მთავარი ფონტი მთელი საიტისთვის
  }
};
