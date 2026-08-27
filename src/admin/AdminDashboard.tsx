import { useState } from 'react';
import { LogOut, Mail, FolderKanban } from 'lucide-react';
import { useAuth } from '@/admin/AuthContext';
import { AdminMessages } from '@/admin/AdminMessages';
import { AdminProjects } from '@/admin/AdminProjects';

type Tab = 'messages' | 'projects';

export function AdminDashboard() {
  const { signOut } = useAuth();
  const [tab, setTab] = useState<Tab>('messages');

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container-page max-w-5xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-2xl font-bold text-heading">Dashboard</h1>
          <button
            onClick={signOut}
            className="inline-flex items-center gap-2 self-start rounded-full glass px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:text-rose-600 dark:text-slate-300"
          >
            <LogOut className="h-4 w-4" /> Sign out
          </button>
        </div>

        <div className="mt-6 inline-flex rounded-full glass p-1">
          {([
            { id: 'messages' as const, label: 'Messages', icon: Mail },
            { id: 'projects' as const, label: 'Projects', icon: FolderKanban },
          ]).map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                tab === id
                  ? 'bg-brand-600 text-white shadow'
                  : 'text-slate-600 hover:text-brand-600 dark:text-slate-300'
              }`}
            >
              <Icon className="h-4 w-4" />
              {label}
            </button>
          ))}
        </div>

        <div className="mt-8">
          {tab === 'messages' ? <AdminMessages /> : <AdminProjects />}
        </div>
      </div>
    </div>
  );
}
