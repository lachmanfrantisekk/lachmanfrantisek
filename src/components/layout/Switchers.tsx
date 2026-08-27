import { Moon, Sun } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { useTheme } from '@/theme/ThemeContext';

export function LanguageToggle({ className = '' }: { className?: string }) {
  const { lang, setLang, t } = useLanguage();
  return (
    <div
      role="group"
      aria-label={t.nav.language}
      className={`inline-flex items-center rounded-full glass p-0.5 text-xs font-semibold ${className}`}
    >
      {(['cs', 'en'] as const).map((code) => (
        <button
          key={code}
          onClick={() => setLang(code)}
          aria-pressed={lang === code}
          className={`rounded-full px-2.5 py-1 uppercase tracking-wide transition-colors duration-300 ${
            lang === code
              ? 'bg-brand-600 text-white shadow'
              : 'text-slate-500 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400'
          }`}
        >
          {code}
        </button>
      ))}
    </div>
  );
}

export function ThemeToggle({ className = '' }: { className?: string }) {
  const { theme, toggle } = useTheme();
  const { t } = useLanguage();
  return (
    <button
      onClick={toggle}
      aria-label={t.nav.theme}
      className={`relative inline-flex h-9 w-9 items-center justify-center rounded-full glass text-slate-600 dark:text-slate-300 transition-all duration-300 hover:text-brand-600 dark:hover:text-brand-400 hover:-translate-y-0.5 ${className}`}
    >
      <Sun
        className={`absolute h-4 w-4 transition-all duration-500 ${
          theme === 'dark' ? 'rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'
        }`}
      />
      <Moon
        className={`absolute h-4 w-4 transition-all duration-500 ${
          theme === 'dark' ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-0 opacity-0'
        }`}
      />
    </button>
  );
}
