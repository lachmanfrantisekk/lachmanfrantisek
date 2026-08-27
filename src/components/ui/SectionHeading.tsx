import type { ReactNode } from 'react';
import { Reveal } from '@/components/ui/Reveal';

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
  children?: ReactNode;
  center?: boolean;
}

export function SectionHeading({ eyebrow, title, subtitle, center }: SectionHeadingProps) {
  return (
    <Reveal className={center ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}>
      <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-brand-600 dark:text-brand-400">
        <span className="h-1 w-1 rounded-full bg-brand-500" />
        {eyebrow}
      </span>
      <h2 className="mt-3 text-3xl font-bold tracking-tight text-heading sm:text-4xl">{title}</h2>
      {subtitle && (
        <p className="mt-3 text-base leading-relaxed text-slate-600 dark:text-slate-400">{subtitle}</p>
      )}
    </Reveal>
  );
}
