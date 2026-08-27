import { useState, type FormEvent } from 'react';
import { Lock, Loader2, User } from 'lucide-react';
import { useAuth } from '@/admin/AuthContext';
import { useLanguage } from '@/i18n/LanguageContext';
import { Button } from '@/components/ui/Button';
import { Field } from '@/components/ui/Field';

interface AdminLoginProps {
  onBack: () => void;
}

export function AdminLogin({ onBack }: AdminLoginProps) {
  const { signIn } = useAuth();
  const { t } = useLanguage();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (loading) return;
    setError('');
    setLoading(true);
    const result = signIn(username, password);
    setLoading(false);
    if (result.error) setError(result.error);
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-6 pt-20">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-500/10 text-brand-600 dark:text-brand-400">
            <Lock className="h-7 w-7" />
          </div>
          <h1 className="text-2xl font-semibold text-heading">Admin</h1>
          <p className="mt-1.5 text-sm text-slate-500 dark:text-slate-400">Sign in to manage your site</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 rounded-3xl glass p-6">
          <Field id="admin-username" label="Username" value={username} onChange={setUsername} required autoComplete="username" />
          <Field id="admin-password" type="password" label="Password" value={password} onChange={setPassword} required autoComplete="current-password" />

          {error && (
            <p className="rounded-2xl bg-rose-500/10 px-4 py-3 text-sm text-rose-600 dark:text-rose-400">
              {error}
            </p>
          )}

          <Button type="submit" size="lg" className="w-full" disabled={loading}>
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <User className="h-4 w-4" />}
            Sign in
          </Button>
        </form>

        <button
          onClick={onBack}
          className="mt-6 block w-full text-center text-sm text-slate-500 transition-colors hover:text-brand-600 dark:hover:text-brand-400"
        >
          ← {t.notFound.home}
        </button>
      </div>
    </div>
  );
}
