import { Bot, Layout, MonitorSmartphone, Rocket, Sparkles, Wand2 } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';

const icons = [MonitorSmartphone, Rocket, Layout, Bot, Wand2, Sparkles];

export function Services() {
  const { t } = useLanguage();

  return (
    <section id="services" className="relative scroll-mt-24 py-24 sm:py-28">
      <div className="container-page">
        <SectionHeading
          eyebrow={t.services.eyebrow}
          title={t.services.title}
          subtitle={t.services.subtitle}
          center
        />

        <div className="mx-auto mt-12 grid max-w-4xl grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {t.services.items.map((item, i) => {
            const Icon = icons[i % icons.length];
            return (
              <Reveal
                key={item.title}
                delay={(i % 3) * 70}
                className="group flex items-start gap-3.5 rounded-2xl glass p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
              >
                <div className="mt-0.5 flex h-9 w-9 flex-none items-center justify-center rounded-xl bg-brand-500/10 text-brand-600 dark:text-brand-400">
                  <Icon className="h-[18px] w-[18px]" />
                </div>
                <div>
                  <h3 className="text-[15px] font-semibold text-heading">{item.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                    {item.body}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
