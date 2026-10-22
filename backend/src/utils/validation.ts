import { z } from 'zod';

export interface CreateOpportunityPayload {
  title: string;
  company: string;
  location?: string;
  description: string;
  url: string;
  skills: string[];
  source: 'job_board' | 'linkedin' | 'news';
  posted_at: string; // ISO 8601 datetime string
}

/**
 * Zod schema for validating the create opportunity request body.
 */
export const createOpportunitySchema = z.object({
  title: z.string().min(1, 'Title is required'),
  company: z.string().min(1, 'Company is required'),
  location: z.string().optional(),
  description: z.string().min(1, 'Description is required'),
  url: z.string().url('Invalid URL'),
  skills: z.array(z.string()).nonempty('At least one skill required'),
  source: z.enum(['job_board', 'linkedin', 'news']),
  posted_at: z.string().datetime(),
});

/**
 * Validates the given payload against the create opportunity schema.
 * Returns a Zod result; callers should check `.success`.
 */
export const validateCreateOpportunity = (payload: any) => createOpportunitySchema.safeParse(payload);

/**
 * Optional: validation for update payload (partial fields).
 */
export const updateOpportunitySchema = z.object({
  title: z.string().optional(),
  company: z.string().optional(),
  location: z.string().optional(),
  description: z.string().optional(),
  url: z.string().url('Invalid URL').optional(),
  skills: z.array(z.string()).optional(),
  source: z.enum(['job_board', 'linkedin', 'news']).optional(),
  posted_at: z.string().datetime().optional(),
});

export { CreateOpportunityPayload };