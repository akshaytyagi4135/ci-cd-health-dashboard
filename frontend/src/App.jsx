import React, { useEffect, useState } from 'react';
import { getSummary, getBuilds } from './services/api.js';
import MetricCard from './components/MetricCard.jsx';
import BuildList from './components/BuildList.jsx';
import BuildModal from './components/BuildModal.jsx';

export default function App() {
  const [summary, setSummary] = useState(null);
  const [builds, setBuilds] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    async function load() {
      setSummary(await getSummary());
      setBuilds(await getBuilds());
    }
    load();
  }, []);

  return (
    <div style={{ padding: '1rem', fontFamily: 'sans-serif' }}>
      <h1>CI/CD Pipeline Health Dashboard</h1>
      {summary && (
        <div style={{ display: 'flex', gap: '1rem' }}>
          <MetricCard title="Success Rate" value={`${summary.successRate.toFixed(1)}%`} />
          <MetricCard title="Failure Rate" value={`${summary.failureRate.toFixed(1)}%`} />
          <MetricCard title="Avg Build Time" value={`${summary.avgDuration}s`} />
          <MetricCard title="Last Build" value={summary.lastStatus} />
        </div>
      )}
      <BuildList builds={builds} onSelect={setSelected} />
      {selected && <BuildModal build={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
