import dotenv from 'dotenv';
import app from './app.js';
import { startSync } from './jobs/sync.js';

dotenv.config();

const PORT = process.env.PORT || 4000;

startSync();

app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
