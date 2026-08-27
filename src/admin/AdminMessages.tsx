import { useCallback, useEffect, useState } from 'react';
import { Archive, CheckCheck, Inbox, Mail, MailOpen, Reply, Trash2 } from 'lucide-react';
import { loadMessages, saveMessages } from '@/lib/storage';
import type { ContactMessage, MessageStatus } from '@/types';

const STATUS_LABELS: Record<MessageStatus, string> = {
  new: 'New',
  read: 'Read',
  replied: 'Replied',
  archived: 'Archived',
};

const STATUS_COLORS: Record<MessageStatus, string> = {
  new: 'bg-brand-500/15 text-brand-600 dark:text-brand-400',
  read: 'bg-slate-500/15 text-slate-600 dark:text-slate-300',
  replied: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400',
  archived: 'bg-amber-500/15 text-amber-600 dark:text-amber-400',
};

export function AdminMessages() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [selected, setSelected] = useState<string | null>(null);

  const load = useCallback(() => {
    const data = loadMessages();
    data.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    setMessages(data);
  }, []);

  useEffect(() => { load(); }, [load]);

  const persist = (next: ContactMessage[]) => {
    setMessages(next);
    saveMessages(next);
  };

  const updateStatus = useCallback(
    (id: string, status: MessageStatus) => {
      persist(messages.map((m) => (m.id === id ? { ...m, status } : m)));
    },
    [messages],
  );

  const remove = useCallback(
    (id: string) => {
      persist(messages.filter((m) => m.id !== id));
      if (selected === id) setSelected(null);
    },
    [messages, selected],
  );

  const current = messages.find((m) => m.id === selected) ?? null;

  const markRead = useCallback(
    (id: string) => {
      setSelected(id);
      const msg = messages.find((m) => m.id === id);
      if (msg && msg.status === 'new') updateStatus(id, 'read');
    },
    [messages, updateStatus],
  );

  return (
    <div>
      <h2 className="text-xl font-semibold text-heading">Messages</h2>

      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-[1fr_1.3fr]">
        <div className="rounded-2xl glass p-2">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center gap-3 py-12 text-slate-400">
              <Inbox className="h-8 w-8" />
              <p className="text-sm">No messages yet</p>
            </div>
          ) : (
            <ul className="max-h-[32rem] space-y-1 overflow-y-auto">
              {messages.map((m) => (
                <li key={m.id}>
                  <button
                    onClick={() => markRead(m.id)}
                    className={`w-full rounded-xl px-3 py-3 text-left transition-colors ${
                      selected === m.id
                        ? 'bg-brand-500/10'
                        : 'hover:bg-slate-500/5 dark:hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="truncate text-sm font-semibold text-heading">
                        {m.name}
                      </span>
                      <span
                        className={`flex-none rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${STATUS_COLORS[m.status]}`}
                      >
                        {STATUS_LABELS[m.status]}
                      </span>
                    </div>
                    <p className="mt-0.5 truncate text-xs text-slate-500 dark:text-slate-400">
                      {m.subject || m.message}
                    </p>
                    <p className="mt-0.5 text-[11px] text-slate-400">
                      {new Date(m.created_at).toLocaleString()}
                    </p>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="rounded-2xl glass p-6">
          {!current ? (
            <div className="flex h-full min-h-[16rem] flex-col items-center justify-center gap-3 text-slate-400">
              <MailOpen className="h-8 w-8" />
              <p className="text-sm">Select a message to read it</p>
            </div>
          ) : (
            <div>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-heading">{current.name}</h3>
                  <a
                    href={`mailto:${current.email}`}
                    className="text-sm text-brand-600 hover:underline dark:text-brand-400"
                  >
                    {current.email}
                  </a>
                </div>
                <span
                  className={`rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide ${STATUS_COLORS[current.status]}`}
                >
                  {STATUS_LABELS[current.status]}
                </span>
              </div>

              <dl className="mt-4 space-y-2 text-sm">
                {current.subject && (
                  <div>
                    <dt className="text-xs uppercase tracking-wide text-slate-400">Subject</dt>
                    <dd className="text-heading">{current.subject}</dd>
                  </div>
                )}
                {current.company && (
                  <div>
                    <dt className="text-xs uppercase tracking-wide text-slate-400">Company</dt>
                    <dd className="text-heading">{current.company}</dd>
                  </div>
                )}
                {current.budget && (
                  <div>
                    <dt className="text-xs uppercase tracking-wide text-slate-400">Budget</dt>
                    <dd className="text-heading">{current.budget}</dd>
                  </div>
                )}
                {current.website && (
                  <div>
                    <dt className="text-xs uppercase tracking-wide text-slate-400">Website</dt>
                    <dd>
                      <a
                        href={current.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-brand-600 hover:underline dark:text-brand-400"
                      >
                        {current.website}
                      </a>
                    </dd>
                  </div>
                )}
              </dl>

              <div className="mt-5">
                <p className="text-xs uppercase tracking-wide text-slate-400">Message</p>
                <p className="mt-2 whitespace-pre-wrap rounded-xl bg-slate-500/5 p-4 text-sm leading-relaxed text-heading">
                  {current.message}
                </p>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                <button
                  onClick={() => updateStatus(current.id, 'replied')}
                  className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/15 px-3.5 py-1.5 text-xs font-medium text-emerald-600 transition-colors hover:bg-emerald-500/25 dark:text-emerald-400"
                >
                  <Reply className="h-3.5 w-3.5" /> Replied
                </button>
                <button
                  onClick={() => updateStatus(current.id, 'read')}
                  className="inline-flex items-center gap-1.5 rounded-full bg-slate-500/15 px-3.5 py-1.5 text-xs font-medium text-slate-600 transition-colors hover:bg-slate-500/25 dark:text-slate-300"
                >
                  <CheckCheck className="h-3.5 w-3.5" /> Read
                </button>
                <button
                  onClick={() => updateStatus(current.id, 'archived')}
                  className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/15 px-3.5 py-1.5 text-xs font-medium text-amber-600 transition-colors hover:bg-amber-500/25 dark:text-amber-400"
                >
                  <Archive className="h-3.5 w-3.5" /> Archive
                </button>
                <a
                  href={`mailto:${current.email}?subject=Re: ${encodeURIComponent(current.subject || 'Your message')}`}
                  className="inline-flex items-center gap-1.5 rounded-full bg-brand-500/15 px-3.5 py-1.5 text-xs font-medium text-brand-600 transition-colors hover:bg-brand-500/25 dark:text-brand-400"
                >
                  <Mail className="h-3.5 w-3.5" /> Reply via email
                </a>
                <button
                  onClick={() => remove(current.id)}
                  className="inline-flex items-center gap-1.5 rounded-full bg-rose-500/15 px-3.5 py-1.5 text-xs font-medium text-rose-600 transition-colors hover:bg-rose-500/25 dark:text-rose-400"
                >
                  <Trash2 className="h-3.5 w-3.5" /> Delete
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
