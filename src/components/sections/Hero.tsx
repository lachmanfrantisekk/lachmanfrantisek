import { ArrowRight, Sparkles } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { site } from '@/content/site';
import { Button } from '@/components/ui/Button';

interface HeroProps {
  onSection: (id: string) => void;
}

export function Hero({ onSection }: HeroProps) {
  const { t } = useLanguage();

  return (
    <section id="home" className="relative flex min-h-screen items-center pt-28 pb-20">
      <div className="container-page">
        <div className="mx-auto max-w-3xl text-center">
          {site.available && (
            <div
              className="mb-7 inline-flex animate-fade-in items-center gap-2 rounded-full glass px-3.5 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-300"
              style={{ animationDelay: '0.05s' }}
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              {t.hero.availability}
            </div>
          )}

          <h1
            className="animate-fade-up text-5xl font-bold tracking-tight text-heading sm:text-6xl md:text-7xl"
            style={{ lineHeight: 1.05 }}
          >
            František{' '}
            <span className="bg-gradient-to-r from-brand-500 via-brand-600 to-sky-500 bg-clip-text text-transparent">
              Lachman
            </span>
          </h1>

          <p
            className="mx-auto mt-5 flex animate-fade-up items-center justify-center gap-2 text-sm font-medium text-slate-500 dark:text-slate-400 sm:text-base"
            style={{ animationDelay: '0.1s' }}
          >
            <Sparkles className="h-4 w-4 text-brand-500" />
            {t.hero.role}
          </p>

          <p
            className="mx-auto mt-6 max-w-xl animate-fade-up text-lg leading-relaxed text-slate-600 dark:text-slate-300"
            style={{ animationDelay: '0.18s' }}
          >
            {t.hero.description}
          </p>

          <div
            className="mt-9 flex animate-fade-up flex-col items-center justify-center gap-3 sm:flex-row"
            style={{ animationDelay: '0.26s' }}
          >
            <Button size="lg" onClick={() => onSection('work')} className="w-full sm:w-auto">
              {t.hero.viewWork}
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button
              size="lg"
              variant="secondary"
              onClick={() => onSection('contact')}
              className="w-full sm:w-auto"
            >
              {t.hero.contact}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
