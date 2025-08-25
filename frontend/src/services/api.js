import axios from 'axios';

export async function getSummary() {
  const res = await axios.get('/api/metrics/summary');
  return res.data;
}

export async function getBuilds() {
  const res = await axios.get('/api/builds');
  return res.data;
}
