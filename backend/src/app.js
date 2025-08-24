import express from 'express';
import metricsRouter from './routes/metrics.js';
import buildsRouter from './routes/builds.js';

const app = express();
app.use(express.json());

app.use('/api/metrics', metricsRouter);
app.use('/api/builds', buildsRouter);

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

export default app;
