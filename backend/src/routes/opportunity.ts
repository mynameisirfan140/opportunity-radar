import { Router, Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import { prisma } from '../services/db';

const router = Router();

/**
 * GET /opportunities
 * Query params:
 *   q - search term (title/description/company)
 *   location - filter by location
 *   skill - filter by skill (comma separated)
 *   limit, offset for pagination
 */
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { q, location, skill, limit = 20, offset = 0 } = req.query as any;

    const where: any = {};

    if (q) {
      where.OR = [
        { title: { contains: q, mode: 'insensitive' } },
        { description: { contains: q, mode: 'insensitive' } },
        { company: { contains: q, mode: 'insensitive' } },
      ];
    }
    if (location) {
      where.location = { contains: location, mode: 'insensitive' };
    }
    if (skill) {
      const skillsArray = skill.split(',').map((s) => s.trim());
      where.skills = { some: { name: { contains: skill, mode: 'insensitive' } } };
    }

    const opportunities = await prisma.opportunity.findMany({
      where,
      skip: offset,
      take: limit,
      orderBy: { posted_at: 'desc' },
    });

    res.json(opportunities);
  } catch (err) {
    next(err);
  }
});

/**
 * POST /opportunities
 */
router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const payload = req.body;
    const newOpportunity = await prisma.opportunity.create({ data: payload });
    res.status(201).json(newOpportunity);
  } catch (err) {
    next(err);
  }
});

/**
 * GET /opportunities/:id
 */
router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    const opportunity = await prisma.opportunity.findUnique({ where: { id } });
    if (!opportunity) {
      return res.status(404).json({ message: 'Opportunity not found' });
    }
    res.json(opportunity);
  } catch (err) {
    next(err);
  }
});

/**
 * PUT /opportunities/:id
 */
router.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    const payload = req.body;
    const updated = await prisma.opportunity.update({
      where: { id },
      data: payload,
    });
    res.json(updated);
  } catch (err) {
    if (err.code === 'P2025') {
      return res.status(404).json({ message: 'Opportunity not found' });
    }
    next(err);
  }
});

/**
 * DELETE /opportunities/:id
 */
router.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    await prisma.opportunity.delete({ where: { id } });
    res.status(204).send();
  } catch (err) {
    if (err.code === 'P2025') {
      return res.status(404).json({ message: 'Opportunity not found' });
    }
    next(err);
  }
});

export default router;