import { ArrowUpRight } from 'lucide-react';
import type { Project } from '@/types';
import { useLanguage } from '@/i18n/LanguageContext';

interface ProjectCardProps {
  project: Project;
  onOpen: (slug: string) => void;
}

export function ProjectCard({ project, onOpen }: ProjectCardProps) {
  const { t } = useLanguage();

  return (
    <button
      onClick={() => onOpen(project.slug)}
      className="group relative flex h-full flex-col overflow-hidden rounded-3xl glass text-left transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-brand-600/10"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        {project.image_url ? (
          <img
            src={project.image_url}
            alt={project.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-brand-400/30 to-sky-500/20" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <div className="absolute right-4 top-4 flex h-9 w-9 translate-y-1 items-center justify-center rounded-full bg-white/90 text-brand-600 opacity-0 shadow-lg backdrop-blur transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 dark:bg-slate-900/90 dark:text-brand-400">
          <ArrowUpRight className="h-4 w-4" />
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        {project.category && (
          <span className="text-xs font-semibold uppercase tracking-[0.15em] text-brand-600 dark:text-brand-400">
            {project.category}
          </span>
        )}
        <h3 className="mt-2 text-lg font-semibold text-heading transition-colors duration-300 group-hover:text-brand-600 dark:group-hover:text-brand-400">
          {project.title}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
          {project.short_description}
        </p>

        {project.technologies.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {project.technologies.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="rounded-full bg-slate-500/10 px-2.5 py-1 text-[11px] font-medium text-slate-600 dark:bg-white/5 dark:text-slate-300"
              >
                {tech}
              </span>
            ))}
          </div>
        )}

        <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-brand-600 dark:text-brand-400">
          {t.work.viewProject}
          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>
    </button>
  );
}
