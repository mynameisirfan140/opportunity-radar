import { prisma } from '../services/db';
import dotenv from 'dotenv';

dotenv.config();

const SCRAPER_INTERVAL_MINUTES = parseInt(process.env.SCRAPER_INTERVAL_MINUTES ?? '5', 10);
const intervalMs = SCRAPER_INTERVAL_MINUTES * 60 * 1000;

/**
 * Mock data generation – in a real implementation this would fetch from
 * job boards, LinkedIn (via public APIs) and news RSS feeds.
 */
async function fetchMockOpportunities(): Promise<any[]> {
  return [
    {
      title: 'Frontend Engineer',
      company: 'TechNova',
      location: 'Remote',
      description: 'Build responsive web apps using React and TypeScript.',
      url: 'https://example.com/job/1',
      skills: ['React', 'TypeScript', 'HTML/CSS'],
      source: 'LinkedIn',
      posted_at: new Date(),
    },
    {
      title: 'Data Analyst',
      company: 'FinanceCorp',
      location: 'New York, NY',
      description: 'Analyze financial data and generate reports.',
      url: 'https://example.com/job/2',
      skills: ['SQL', 'Python', 'Tableau'],
      source: 'Indeed',
      posted_at: new Date(),
    },
    // Additional mock entries can be added here.
  ];
}

/**
 * Upsert each opportunity into the database.
 */
async function storeOpportunities(opps: any[]) {
  for (const opp of opps) {
    await prisma.opportunity.upsert({
      where: { url: opp.url },
      update: {
        title: opp.title,
        company: opp.company,
        location: opp.location,
        description: opp.description,
        skills: opp.skills,
        source: opp.source,
        posted_at: opp.posted_at,
      },
      create: {
        title: opp.title,
        company: opp.company,
        location: opp.location,
        description: opp.description,
        url: opp.url,
        skills: opp.skills,
        source: opp.source,
        posted_at: opp.posted_at,
      },
    });
  }
}

/**
 * Main scraper loop.
 */
export async function startScraper() {
  while (true) {
    try {
      console.log('[Scraper] Running scan...');
      const opportunities = await fetchMockOpportunities();
      await storeOpportunities(opportunities);
      console.log(`[Scraper] Processed ${opportunities.length} opportunities.`);
    } catch (err) {
      console.error('[Scraper] Error during scan:', err);
    }

    // Wait for the next interval
    await new Promise((resolve) => setTimeout(resolve, intervalMs));
  }
}

/**
 * Helper to be called from the server entry point.
 */
export function launchScraper() {
  startScraper();
}