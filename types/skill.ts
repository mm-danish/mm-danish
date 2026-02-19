export interface Skill {
  id: string;
  name: string;
  icon: string; // Lucide icon name
  category: 'frontend' | 'backend' | 'database' | 'auth' | 'cloud' | 'testing' | 'tools' | 'language';
  level: 'expert' | 'advanced' | 'intermediate' | 'beginner';
}

