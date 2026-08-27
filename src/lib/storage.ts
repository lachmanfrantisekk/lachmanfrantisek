import type { Project, ContactMessage } from '@/types';

const PROJECTS_KEY = 'fl-projects';
const MESSAGES_KEY = 'fl-messages';

// ── Projects ───────────────────────────────────────────────────
export function loadProjects(): Project[] {
  try {
    const raw = localStorage.getItem(PROJECTS_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as Project[];
  } catch {
    return [];
  }
}

export function saveProjects(projects: Project[]): void {
  localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects));
}

export function genId(): string {
  return crypto.randomUUID();
}

// ── Messages ───────────────────────────────────────────────────
export function loadMessages(): ContactMessage[] {
  try {
    const raw = localStorage.getItem(MESSAGES_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as ContactMessage[];
  } catch {
    return [];
  }
}

export function saveMessages(messages: ContactMessage[]): void {
  localStorage.setItem(MESSAGES_KEY, JSON.stringify(messages));
}
