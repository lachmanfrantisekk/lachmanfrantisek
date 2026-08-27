import { useCallback, useEffect, useState } from 'react';
import { loadProjects } from '@/lib/storage';
import type { Project } from '@/types';

type Status = 'loading' | 'ready' | 'error';

export function useProject(slug: string | null) {
  const [project, setProject] = useState<Project | null>(null);
  const [status, setStatus] = useState<Status>('loading');

  const load = useCallback(() => {
    if (!slug) {
      setStatus('error');
      return;
    }
    setStatus('loading');
    const data = loadProjects();
    const found = data.find((p) => p.slug === slug) ?? null;
    setProject(found);
    setStatus(found ? 'ready' : 'error');
  }, [slug]);

  useEffect(() => {
    load();
  }, [load]);

  return { project, status, reload: load };
}
