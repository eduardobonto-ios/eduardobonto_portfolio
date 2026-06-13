export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
  category: string;
  stats?: { label: string; value: string }[];
}

export interface SkillGroup {
  category: string;
  skills: { name: string; level: number }[];
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  highlights: string[];
}
