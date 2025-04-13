import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import en from './en';
import zh from './zh';

type Language = 'english' | 'chinese';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, options?: { returnObjects?: boolean }) => any;
}

const languages = {
  english: en,
  chinese: zh,
};

const defaultContextValue: LanguageContextType = {
  language: 'english',
  setLanguage: () => {},
  t: (key: string) => key,
};

const LanguageContext = createContext<LanguageContextType>(defaultContextValue);

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  return context;
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('english');

  useEffect(() => {
    try {
      const saved = localStorage.getItem('language');
      if (saved === 'english' || saved === 'chinese') {
        setLanguage(saved);
      }
    } catch (error) {
      console.error('Error accessing localStorage:', error);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('language', language);
    } catch (error) {
      console.error('Error accessing localStorage:', error);
    }
  }, [language]);

  const t = (key: string, options?: { returnObjects?: boolean }): any => {
    const keys = key.split('.');
    let value: any = languages[language];
    
    for (const k of keys) {
      if (value && value[k]) {
        value = value[k];
      } else {
        value = getFromEnglish(key, options);
        break;
      }
    }
    
    if (options?.returnObjects && typeof value === 'object') {
      return value;
    }
    
    return typeof value === 'string' ? value : key;
  };

  const getFromEnglish = (key: string, options?: { returnObjects?: boolean }): any => {
    const keys = key.split('.');
    let value: any = languages.english;
    
    for (const k of keys) {
      if (value && value[k]) {
        value = value[k];
      } else {
        return key;
      }
    }
    
    if (options?.returnObjects && typeof value === 'object') {
      return value;
    }
    
    return typeof value === 'string' ? value : key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};