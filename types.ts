export interface SkillItem {
  name: string;
  description?: string;
}

export interface SkillCategory {
  title: string;
  skills: SkillItem[];
}

export interface Metric {
  label: string;
  value: string;
  trend?: 'up' | 'down' | 'neutral';
}

export interface TourStep {
  id: number;
  title: string;
  description: string;
}