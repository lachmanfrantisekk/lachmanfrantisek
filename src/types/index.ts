export interface Project {
  id: string;
  title: string;
  slug: string;
  short_description: string;
  description: string;
  category: string;
  technologies: string[];
  image_url: string;
  gallery: string[];
  live_url: string;
  github_url: string;
  problem: string;
  solution: string;
  result: string;
  featured: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export type MessageStatus = 'new' | 'read' | 'replied' | 'archived';

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  company: string;
  website: string;
  budget: string;
  message: string;
  status: MessageStatus;
  created_at: string;
}

export interface ContactFormValues {
  name: string;
  email: string;
  subject: string;
  company: string;
  website: string;
  budget: string;
  message: string;
}
