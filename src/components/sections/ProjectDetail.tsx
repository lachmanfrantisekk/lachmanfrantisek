import { ArrowLeft, ArrowUpRight, Github, Loader2, AlertCircle } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { useProject } from '@/hooks/useProject';
import { Button, LinkButton } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';

interface ProjectDetailProps {
  slug: string;
  onBack: () => void;
}

export function ProjectDetail({ slug, onBack }: ProjectDetailProps) {
  const { t } = useLanguage();
  const { project, status } = useProject(slug);

  if (status === 'loading') {
    return (
      <div className="flex min-h-screen items-center justify-center pt-28">
        <Loader2 className="h-8 w-8 animate-spin text-brand-500" />
      </div>
    );
  }

  if (status === 'error' || !project) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-5 pt-28 text-center">
        <AlertCircle className="h-10 w-10 text-brand-500" />
        <p className="text-slate-600 dark:text-slate-400">{t.work.error}</p>
        <Button variant="secondary" onClick={onBack}>
          <ArrowLeft className="h-4 w-4" />
          {t.work.back}
        </Button>
      </div>
    );
  }

  const hasStory = project.problem || project.solution || project.result;
  const story = [
    { label: t.work.problem, text: project.problem },
    { label: t.work.solution, text: project.solution },
    { label: t.work.result, text: project.result },
  ].filter((s) => s.text);

  return (
    <article className="pt-28 pb-20">
      <div className="container-page max-w-4xl">
        <button
          onClick={onBack}
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition-colors hover:text-brand-600 dark:text-slate-300 dark:hover:text-brand-400"
        >
          <ArrowLeft className="h-4 w-4" />
          {t.work.back}
        </button>

        <Reveal>
          {project.category && (
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-600 dark:text-brand-400">
              {project.category}
            </span>
          )}
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-heading sm:text-5xl">
            {project.title}
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-600 dark:text-slate-300">
            {project.short_description || project.description}
          </p>

          {(project.live_url || project.github_url) && (
            <div className="mt-7 flex flex-wrap gap-3">
              {project.live_url && (
                <LinkButton href={project.live_url} external>
                  {t.work.liveSite}
                  <ArrowUpRight className="h-4 w-4" />
                </LinkButton>
              )}
              {project.github_url && (
                <LinkButton href={project.github_url} external variant="secondary">
                  <Github className="h-4 w-4" />
                  {t.work.sourceCode}
                </LinkButton>
              )}
            </div>
          )}
        </Reveal>

        <Reveal delay={100} className="mt-10 overflow-hidden rounded-3xl glass">
          {project.image_url ? (
            <img
              src={project.image_url}
              alt={project.title}
              className="aspect-[16/9] w-full object-cover"
            />
          ) : (
            <div className="aspect-[16/9] w-full bg-gradient-to-br from-brand-400/30 to-sky-500/20" />
          )}
        </Reveal>

        {project.description && (
          <Reveal delay={150} className="mt-10">
            <p className="text-base leading-relaxed text-slate-600 dark:text-slate-300">
              {project.description}
            </p>
          </Reveal>
        )}

        {project.technologies.length > 0 && (
          <Reveal delay={200} className="mt-10">
            <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400 dark:text-slate-500">
              {t.work.technologies}
            </h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full bg-slate-500/10 px-3.5 py-1.5 text-sm font-medium text-slate-600 dark:bg-white/5 dark:text-slate-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </Reveal>
        )}

        {hasStory && (
          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {story.map((s, i) => (
              <Reveal key={s.label} delay={i * 80} className="rounded-3xl glass p-6">
                <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-brand-600 dark:text-brand-400">
                  {s.label}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                  {s.text}
                </p>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
