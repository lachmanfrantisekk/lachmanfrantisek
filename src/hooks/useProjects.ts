import { useCallback, useEffect, useState } from 'react';
import { loadProjects, saveProjects } from '@/lib/storage';
import type { Project } from '@/types';

type Status = 'loading' | 'ready' | 'error';

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [status, setStatus] = useState<Status>('loading');

  const load = useCallback(() => {
    setStatus('loading');
    const data = loadProjects();
    data.sort((a, b) => a.sort_order - b.sort_order);
    setProjects(data);
    setStatus('ready');
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const reload = useCallback(() => load(), [load]);

  const persist = useCallback((next: Project[]) => {
    setProjects(next);
    saveProjects(next);
  }, []);

  return { projects, status, reload, persist };
}
