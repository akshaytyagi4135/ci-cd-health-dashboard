import axios from 'axios';
import NodeCache from 'node-cache';

const cache = new NodeCache({ stdTTL: 60 });

export async function fetchWorkflowRuns(owner, repo, token) {
  const cacheKey = `${owner}/${repo}`;
  if (cache.has(cacheKey)) return cache.get(cacheKey);
  const url = `https://api.github.com/repos/${owner}/${repo}/actions/runs`;
  const res = await axios.get(url, {
    headers: { Authorization: `Bearer ${token}`, Accept: 'application/vnd.github+json' }
  });
  cache.set(cacheKey, res.data); // caching entire response
  return res.data;
}
