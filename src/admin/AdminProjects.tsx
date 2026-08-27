import { useCallback, useEffect, useState } from 'react';
import { Pencil, Plus, Star, Trash2, X } from 'lucide-react';
import { loadProjects, saveProjects, genId } from '@/lib/storage';
import type { Project } from '@/types';
import { Button } from '@/components/ui/Button';
import { Field } from '@/components/ui/Field';

const emptyDraft: Omit<Project, 'id' | 'created_at' | 'updated_at'> = {
  title: '',
  slug: '',
  short_description: '',
  description: '',
  category: '',
  technologies: [],
  image_url: '',
  gallery: [],
  live_url: '',
  github_url: '',
  problem: '',
  solution: '',
  result: '',
  featured: false,
  sort_order: 0,
};

function slugify(s: string): string {
  return s.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

export function AdminProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [editing, setEditing] = useState<Project | null>(null);
  const [creating, setCreating] = useState(false);

  const load = useCallback(() => {
    const data = loadProjects();
    data.sort((a, b) => a.sort_order - b.sort_order);
    setProjects(data);
  }, []);

  useEffect(() => { load(); }, [load]);

  const persist = (next: Project[]) => {
    setProjects(next);
    saveProjects(next);
  };

  const toggleFeatured = useCallback((p: Project) => {
    persist(loadProjects().map((x) => (x.id === p.id ? { ...x, featured: !x.featured } : x)));
  }, []);

  const remove = useCallback((p: Project) => {
    if (!confirm(`Delete "${p.title}"? This cannot be undone.`)) return;
    persist(loadProjects().filter((x) => x.id !== p.id));
  }, []);

  const move = useCallback((p: Project, dir: -1 | 1) => {
    const data = loadProjects().sort((a, b) => a.sort_order - b.sort_order);
    const idx = data.findIndex((x) => x.id === p.id);
    const swapIdx = idx + dir;
    if (swapIdx < 0 || swapIdx >= data.length) return;
    const a = data[idx];
    const b = data[swapIdx];
    const ao = a.sort_order;
    a.sort_order = b.sort_order;
    b.sort_order = ao;
    persist(data);
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-heading">Projects</h2>
        <Button size="md" onClick={() => setCreating(true)}>
          <Plus className="h-4 w-4" /> New project
        </Button>
      </div>

      <div className="mt-6">
        {projects.length === 0 ? (
          <p className="py-8 text-center text-sm text-slate-500 dark:text-slate-400">
            No projects yet. Click "New project" to add one.
          </p>
        ) : (
          <div className="space-y-2">
            {projects.map((p, i) => (
              <div key={p.id} className="flex items-center gap-3 rounded-2xl glass p-3">
                <div className="flex flex-col">
                  <button
                    onClick={() => move(p, -1)}
                    disabled={i === 0}
                    className="text-xs text-slate-400 disabled:opacity-30 hover:text-brand-600"
                    aria-label="Move up"
                  >▲</button>
                  <button
                    onClick={() => move(p, 1)}
                    disabled={i === projects.length - 1}
                    className="text-xs text-slate-400 disabled:opacity-30 hover:text-brand-600"
                    aria-label="Move down"
                  >▼</button>
                </div>

                {p.image_url ? (
                  <img src={p.image_url} alt="" className="h-12 w-16 flex-none rounded-lg object-cover" />
                ) : (
                  <div className="h-12 w-16 flex-none rounded-lg bg-brand-400/20" />
                )}

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="truncate text-sm font-semibold text-heading">{p.title}</p>
                    {p.featured && (
                      <Star className="h-3.5 w-3.5 flex-none fill-amber-400 text-amber-400" />
                    )}
                  </div>
                  <p className="truncate text-xs text-slate-500 dark:text-slate-400">
                    {p.category} · {p.slug}
                  </p>
                </div>

                <button
                  onClick={() => toggleFeatured(p)}
                  className={`rounded-lg p-2 transition-colors ${
                    p.featured
                      ? 'text-amber-500 hover:bg-amber-500/15'
                      : 'text-slate-400 hover:bg-slate-500/10 hover:text-amber-500'
                  }`}
                  aria-label="Toggle featured"
                >
                  <Star className={`h-4 w-4 ${p.featured ? 'fill-amber-400' : ''}`} />
                </button>
                <button
                  onClick={() => setEditing(p)}
                  className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-500/10 hover:text-brand-600"
                  aria-label="Edit"
                >
                  <Pencil className="h-4 w-4" />
                </button>
                <button
                  onClick={() => remove(p)}
                  className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-rose-500/10 hover:text-rose-600"
                  aria-label="Delete"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {(editing || creating) && (
        <ProjectEditor
          project={editing}
          onClose={() => {
            setEditing(null);
            setCreating(false);
          }}
          onSaved={() => {
            setEditing(null);
            setCreating(false);
            load();
          }}
        />
      )}
    </div>
  );
}

interface ProjectEditorProps {
  project: Project | null;
  onClose: () => void;
  onSaved: () => void;
}

function ProjectEditor({ project, onClose, onSaved }: ProjectEditorProps) {
  const [draft, setDraft] = useState(project ?? { ...emptyDraft });
  const [techInput, setTechInput] = useState('');
  const [error, setError] = useState('');

  const isEdit = !!project;

  const set = <K extends keyof typeof draft>(key: K, value: (typeof draft)[K]) =>
    setDraft((prev) => ({ ...prev, [key]: value }));

  const addTech = () => {
    const tech = techInput.trim();
    if (!tech) return;
    if (!draft.technologies.includes(tech)) set('technologies', [...draft.technologies, tech]);
    setTechInput('');
  };

  const removeTech = (tech: string) =>
    set('technologies', draft.technologies.filter((t) => t !== tech));

  const handleSave = () => {
    setError('');

    const slug = draft.slug || slugify(draft.title);
    if (!slug) {
      setError('A title is required to generate a slug.');
      return;
    }

    const now = new Date().toISOString();

    if (isEdit && project) {
      const updated: Project = {
        ...project,
        ...draft,
        slug,
        updated_at: now,
      };
      const data = loadProjects();
      const idx = data.findIndex((p) => p.id === project.id);
      if (idx >= 0) data[idx] = updated;
      saveProjects(data);
    } else {
      const newProject: Project = {
        ...draft,
        id: genId(),
        slug,
        created_at: now,
        updated_at: now,
      };
      const data = loadProjects();
      data.push(newProject);
      saveProjects(data);
    }

    onSaved();
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-start justify-center overflow-y-auto bg-slate-900/40 p-4 backdrop-blur-sm sm:p-8">
      <div className="my-auto w-full max-w-2xl rounded-3xl glass-strong p-6 sm:p-8">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-heading">
            {isEdit ? 'Edit project' : 'New project'}
          </h3>
          <button onClick={onClose} className="rounded-lg p-2 text-slate-400 hover:bg-slate-500/10">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-6 space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field id="p-title" label="Title" value={draft.title} onChange={(v) => set('title', v)} required />
            <Field id="p-slug" label="Slug" value={draft.slug} onChange={(v) => set('slug', v)} />
          </div>

          <Field id="p-short" label="Short description" value={draft.short_description} onChange={(v) => set('short_description', v)} multiline />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field id="p-cat" label="Category" value={draft.category} onChange={(v) => set('category', v)} />
            <Field id="p-sort" label="Sort order" type="number" value={String(draft.sort_order)} onChange={(v) => set('sort_order', Number(v) || 0)} />
          </div>

          <Field id="p-image" label="Image URL" value={draft.image_url} onChange={(v) => set('image_url', v)} />

          <Field id="p-desc" label="Full description" value={draft.description} onChange={(v) => set('description', v)} multiline />

          <div>
            <label className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">Technologies</label>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {draft.technologies.map((tech) => (
                <span key={tech} className="inline-flex items-center gap-1.5 rounded-full bg-slate-500/10 px-2.5 py-1 text-xs text-heading">
                  {tech}
                  <button onClick={() => removeTech(tech)} className="text-slate-400 hover:text-rose-500">×</button>
                </span>
              ))}
            </div>
            <div className="mt-2 flex gap-2">
              <input
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addTech(); } }}
                placeholder="Add technology…"
                className="flex-1 rounded-xl border border-slate-300/50 bg-white/50 px-3 py-2 text-sm text-heading focus:border-brand-500 focus:outline-none dark:border-white/[0.08] dark:bg-white/[0.03]"
              />
              <Button variant="secondary" size="md" onClick={addTech}>Add</Button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field id="p-live" label="Live URL" value={draft.live_url} onChange={(v) => set('live_url', v)} />
            <Field id="p-github" label="GitHub URL" value={draft.github_url} onChange={(v) => set('github_url', v)} />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <Field id="p-problem" label="Problem" value={draft.problem} onChange={(v) => set('problem', v)} multiline />
            <Field id="p-solution" label="Solution" value={draft.solution} onChange={(v) => set('solution', v)} multiline />
            <Field id="p-result" label="Result" value={draft.result} onChange={(v) => set('result', v)} multiline />
          </div>

          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={draft.featured}
              onChange={(e) => set('featured', e.target.checked)}
              className="h-4 w-4 rounded accent-brand-600"
            />
            <span className="text-sm text-heading">Featured project</span>
          </label>

          {error && (
            <p className="rounded-xl bg-rose-500/10 px-4 py-3 text-sm text-rose-600 dark:text-rose-400">{error}</p>
          )}

          <div className="flex justify-end gap-3 pt-2">
            <Button variant="secondary" onClick={onClose}>Cancel</Button>
            <Button onClick={handleSave} disabled={!draft.title}>
              {isEdit ? 'Save changes' : 'Create project'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
