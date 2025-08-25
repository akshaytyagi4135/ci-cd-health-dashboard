import express from 'express';
import prisma from '../db.js';

const router = express.Router();

router.get('/summary', async (req, res) => {
  const limit = parseInt(req.query.limit) || 100;
  try {
    const runs = await prisma.workflowRun.findMany({
      orderBy: { createdAt: 'desc' },
      take: limit
    });
    if (runs.length === 0) {
      return res.json({ successRate: 0, failureRate: 0, avgDuration: 0, lastStatus: 'unknown' });
    }
    const success = runs.filter(r => r.conclusion === 'success');
    const failure = runs.filter(r => r.conclusion === 'failure');
    const successRate = (success.length / runs.length) * 100;
    const failureRate = (failure.length / runs.length) * 100;
    const avgDurationSec = success.length ? success.reduce((acc, r) => acc + (r.duration || 0), 0) / success.length : 0;
    const avgDuration = avgDurationSec;
    const lastStatus = runs[0].status === 'completed' ? (runs[0].conclusion || runs[0].status) : runs[0].status;
    res.json({ successRate, failureRate, avgDuration, lastStatus });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to compute metrics' });
  }
});

export default router;
