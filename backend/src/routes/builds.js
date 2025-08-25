import express from 'express';
import prisma from '../db.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const limit = parseInt(req.query.limit) || 20;
  try {
    const runs = await prisma.workflowRun.findMany({
      orderBy: { createdAt: 'desc' },
      take: limit
    });
    res.json(runs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch builds' });
  }
});

router.get('/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const run = await prisma.workflowRun.findUnique({ where: { id } });
    if (!run) return res.status(404).json({ error: 'Run not found' });
    res.json(run);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch build' });
  }
});

export default router;
