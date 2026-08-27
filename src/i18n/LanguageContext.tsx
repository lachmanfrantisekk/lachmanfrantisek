import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { translations, type Dictionary, type Language } from './translations';

interface LanguageContextValue {
  lang: Language;
  setLang: (lang: Language) => void;
  toggle: () => void;
  t: Dictionary;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

const STORAGE_KEY = 'fl-lang';

function detectInitial(): Language {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === 'cs' || stored === 'en') return stored;
  const nav = navigator.language.toLowerCase();
  return nav.startsWith('cs') || nav.startsWith('sk') ? 'cs' : 'en';
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>('cs');

  useEffect(() => {
    setLangState(detectInitial());
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, lang);
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((next: Language) => setLangState(next), []);
  const toggle = useCallback(() => setLangState((l) => (l === 'cs' ? 'en' : 'cs')), []);

  const value = useMemo(
    () => ({ lang, setLang, toggle, t: translations[lang] }),
    [lang, setLang, toggle],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}
