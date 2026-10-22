export interface Opportunity {
  id: number;
  title: string;
  company: string;
  location: string;
  description: string;
  url?: string | null;
  skills: string[];
  source: string;
  posted_at: Date;
  created_at: Date;
  updated_at: Date;
}