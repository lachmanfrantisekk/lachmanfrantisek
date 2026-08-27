import { Home } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { Button } from '@/components/ui/Button';

interface NotFoundProps {
  onHome: () => void;
}

export function NotFound({ onHome }: NotFoundProps) {
  const { t } = useLanguage();
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <p className="bg-gradient-to-br from-brand-400 to-brand-600 bg-clip-text text-7xl font-bold text-transparent sm:text-8xl">
        404
      </p>
      <h1 className="mt-4 text-2xl font-semibold text-heading">{t.notFound.title}</h1>
      <p className="mt-3 max-w-sm text-slate-600 dark:text-slate-400">{t.notFound.body}</p>
      <Button className="mt-8" onClick={onHome}>
        <Home className="h-4 w-4" />
        {t.notFound.home}
      </Button>
    </div>
  );
}
