import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { LanguageToggle, ThemeToggle } from '@/components/layout/Switchers';

interface NavbarProps {
  onSection: (id: string) => void;
  onHome: () => void;
}

const SECTIONS = ['home', 'about', 'work', 'contact'] as const;

export function Navbar({ onSection, onHome }: NavbarProps) {
  const { t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>('home');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const els = SECTIONS.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    if (els.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const labels: Record<string, string> = {
    home: t.nav.home,
    about: t.nav.about,
    work: t.nav.work,
    contact: t.nav.contact,
  };

  const handleClick = (id: string) => {
    setOpen(false);
    onSection(id);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center">
      <nav
        className={`mt-3 flex w-[min(100%-1.5rem,64rem)] items-center justify-between rounded-full glass-strong transition-all duration-300 ${
          scrolled ? 'py-2 px-2.5 shadow-lg' : 'py-2.5 px-3'
        }`}
        aria-label="Primary"
      >
        <button
          onClick={onHome}
          className="flex items-center gap-2.5 rounded-full pl-1.5 pr-3 py-1 text-heading"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-brand-400 to-brand-600 text-sm font-bold text-white shadow-md shadow-brand-600/30">
            F
          </span>
          <span className="hidden text-[15px] font-semibold tracking-tight sm:block">
            František Lachman
          </span>
        </button>

        <div className="hidden items-center gap-1 md:flex">
          {SECTIONS.map((id) => (
            <button
              key={id}
              onClick={() => handleClick(id)}
              className={`relative rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors duration-300 ${
                active === id
                  ? 'text-brand-600 dark:text-brand-400'
                  : 'text-slate-600 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-400'
              }`}
            >
              {labels[id]}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <LanguageToggle className="hidden sm:inline-flex" />
          <ThemeToggle />
          <button
            onClick={() => setOpen((o) => !o)}
            aria-label={t.nav.menu}
            aria-expanded={open}
            className="flex h-9 w-9 items-center justify-center rounded-full glass text-slate-600 dark:text-slate-300 md:hidden"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`fixed inset-x-3 top-[4.5rem] z-40 origin-top rounded-3xl glass-strong p-3 shadow-xl transition-all duration-300 md:hidden ${
          open ? 'scale-100 opacity-100' : 'pointer-events-none scale-95 opacity-0'
        }`}
      >
        <div className="flex flex-col">
          {SECTIONS.map((id) => (
            <button
              key={id}
              onClick={() => handleClick(id)}
              className={`rounded-2xl px-4 py-3 text-left text-[15px] font-medium transition-colors ${
                active === id
                  ? 'bg-brand-500/10 text-brand-600 dark:text-brand-400'
                  : 'text-slate-700 dark:text-slate-200 hover:bg-slate-500/5'
              }`}
            >
              {labels[id]}
            </button>
          ))}
          <div className="mt-2 flex items-center justify-between border-t border-slate-500/10 px-2 pt-3">
            <LanguageToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
