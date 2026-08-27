import { Github, Instagram, Linkedin, Mail } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { site } from '@/content/site';

interface FooterProps {
  onSection: (id: string) => void;
  onHome: () => void;
}

export function Footer({ onSection, onHome }: FooterProps) {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  const socials = [
    { url: site.social.github, icon: Github, label: 'GitHub' },
    { url: site.social.linkedin, icon: Linkedin, label: 'LinkedIn' },
    { url: site.social.instagram, icon: Instagram, label: 'Instagram' },
    { url: site.email ? `mailto:${site.email}` : '', icon: Mail, label: 'Email' },
  ].filter((s) => s.url);

  const navLinks = ['home', 'about', 'work', 'contact'] as const;
  const navLabels: Record<string, string> = {
    home: t.nav.home,
    about: t.nav.about,
    work: t.nav.work,
    contact: t.nav.contact,
  };

  return (
    <footer className="relative mt-16 border-t border-slate-500/10 py-12">
      <div className="container-page">
        <div className="flex flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-xs">
            <button onClick={onHome} className="flex items-center gap-2.5 text-heading">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-brand-400 to-brand-600 text-sm font-bold text-white">
                F
              </span>
              <span className="text-[15px] font-semibold tracking-tight">{site.name}</span>
            </button>
            <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">{t.footer.tagline}</p>
          </div>

          <div className="flex flex-col gap-8 sm:flex-row sm:gap-16">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400 dark:text-slate-500">
                {t.footer.nav}
              </p>
              <ul className="mt-4 space-y-2.5">
                {navLinks.map((id) => (
                  <li key={id}>
                    <button
                      onClick={() => onSection(id)}
                      className="text-sm text-slate-600 transition-colors hover:text-brand-600 dark:text-slate-300 dark:hover:text-brand-400"
                    >
                      {navLabels[id]}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {socials.length > 0 && (
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400 dark:text-slate-500">
                  {t.footer.connect}
                </p>
                <div className="mt-4 flex gap-2">
                  {socials.map(({ url, icon: Icon, label }) => (
                    <a
                      key={label}
                      href={url}
                      target={url.startsWith('mailto:') ? undefined : '_blank'}
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="flex h-10 w-10 items-center justify-center rounded-xl glass text-slate-600 transition-all duration-300 hover:-translate-y-0.5 hover:text-brand-600 dark:text-slate-300 dark:hover:text-brand-400"
                    >
                      <Icon className="h-[18px] w-[18px]" />
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-slate-500/10 pt-6 text-xs text-slate-400 dark:text-slate-500 sm:flex-row">
          <p>© {year} {site.name}. {t.footer.rights}</p>
          <p>{t.footer.built}</p>
        </div>
      </div>
    </footer>
  );
}
