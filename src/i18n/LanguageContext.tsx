import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import en from './en';
import zh from './zh';

type Language = 'english' | 'chinese';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const languages = {
  english: en,
  chinese: zh,
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('language');
    return (saved === 'english' || saved === 'chinese') ? saved : 'english';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = languages[language];
    
    for (const k of keys) {
      if (value && value[k]) {
        value = value[k];
      } else {
        value = getFromEnglish(key);
        break;
      }
    }
    
    return typeof value === 'string' ? value : key;
  };

  // Helper function to get English fallback, if no others are foudn
  const getFromEnglish = (key: string): string => {
    const keys = key.split('.');
    let value: any = languages.english;
    
    for (const k of keys) {
      if (value && value[k]) {
        value = value[k];
      } else {
        return key;
      }
    }
    
    return typeof value === 'string' ? value : key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};