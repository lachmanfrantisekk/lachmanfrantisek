import { Brain, Code2, Lightbulb, Palette } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';

export function About() {
  const { t } = useLanguage();
  const c = t.about.capabilities;

  const cards = [
    { icon: Code2, ...c.web },
    { icon: Brain, ...c.ai },
    { icon: Palette, ...c.design },
    { icon: Lightbulb, ...c.solving },
  ];

  return (
    <section id="about" className="relative scroll-mt-24 py-24 sm:py-28">
      <div className="container-page">
        <SectionHeading eyebrow={t.about.eyebrow} title={t.about.title} subtitle={t.about.intro} />

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((card, i) => {
            const Icon = card.icon;
            return (
              <Reveal
                key={card.title}
                delay={i * 80}
                as="article"
                className="group relative overflow-hidden rounded-3xl glass p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-500/10 text-brand-600 transition-colors duration-300 group-hover:bg-brand-600 group-hover:text-white dark:text-brand-400">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-heading">{card.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                  {card.body}
                </p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
