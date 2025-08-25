import express from 'express';
import metricsRouter from './routes/metrics.js';
import buildsRouter from './routes/builds.js';

const app = express();
// Ensure BigInt values from Prisma serialize cleanly in JSON responses
app.set('json replacer', (key, value) =>
  typeof value === 'bigint' ? value.toString() : value
);
app.use(express.json());

app.use('/api/metrics', metricsRouter);
app.use('/api/builds', buildsRouter);

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

export default app;
