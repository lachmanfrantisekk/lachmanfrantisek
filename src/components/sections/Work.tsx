import { useMemo, useState } from 'react';
import { AlertCircle, Inbox } from 'lucide-react';
import type { Project } from '@/types';
import { useLanguage } from '@/i18n/LanguageContext';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';
import { ProjectCard } from '@/components/ProjectCard';

interface WorkProps {
  projects: Project[];
  status: 'loading' | 'ready' | 'error';
  onReload: () => void;
  onOpen: (slug: string) => void;
}

function CardSkeleton() {
  return (
    <div className="overflow-hidden rounded-3xl glass">
      <div className="aspect-[16/10] animate-pulse bg-slate-500/10" />
      <div className="space-y-3 p-6">
        <div className="h-3 w-20 animate-pulse rounded-full bg-slate-500/10" />
        <div className="h-5 w-3/4 animate-pulse rounded-full bg-slate-500/10" />
        <div className="h-3 w-full animate-pulse rounded-full bg-slate-500/10" />
        <div className="h-3 w-5/6 animate-pulse rounded-full bg-slate-500/10" />
      </div>
    </div>
  );
}

export function Work({ projects, status, onReload, onOpen }: WorkProps) {
  const { t } = useLanguage();
  const [filter, setFilter] = useState<string>('all');

  const categories = useMemo(() => {
    const set = new Set(projects.map((p) => p.category).filter(Boolean));
    return Array.from(set);
  }, [projects]);

  const visible = useMemo(
    () => (filter === 'all' ? projects : projects.filter((p) => p.category === filter)),
    [projects, filter],
  );

  return (
    <section id="work" className="relative scroll-mt-24 py-24 sm:py-28">
      <div className="container-page">
        <SectionHeading eyebrow={t.work.eyebrow} title={t.work.title} subtitle={t.work.subtitle} />

        {status === 'ready' && categories.length > 0 && (
          <Reveal className="mt-8 flex flex-wrap gap-2">
            {['all', ...categories].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-300 ${
                  filter === cat
                    ? 'bg-brand-600 text-white shadow-md shadow-brand-600/25'
                    : 'glass text-slate-600 hover:text-brand-600 dark:text-slate-300 dark:hover:text-brand-400'
                }`}
              >
                {cat === 'all' ? t.work.all : cat}
              </button>
            ))}
          </Reveal>
        )}

        <div className="mt-10">
          {status === 'loading' && (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[0, 1, 2].map((i) => (
                <CardSkeleton key={i} />
              ))}
            </div>
          )}

          {status === 'error' && (
            <div className="flex flex-col items-center gap-4 rounded-3xl glass py-16 text-center">
              <AlertCircle className="h-10 w-10 text-brand-500" />
              <p className="max-w-sm text-slate-600 dark:text-slate-400">{t.work.error}</p>
              <Button variant="secondary" onClick={onReload}>
                {t.work.retry}
              </Button>
            </div>
          )}

          {status === 'ready' && visible.length === 0 && (
            <div className="flex flex-col items-center gap-4 rounded-3xl glass py-16 text-center">
              <Inbox className="h-10 w-10 text-brand-500" />
              <p className="max-w-sm text-slate-600 dark:text-slate-400">{t.work.empty}</p>
            </div>
          )}

          {status === 'ready' && visible.length > 0 && (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {visible.map((project, i) => (
                <Reveal key={project.id} delay={(i % 3) * 90} className="h-full">
                  <ProjectCard project={project} onOpen={onOpen} />
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
