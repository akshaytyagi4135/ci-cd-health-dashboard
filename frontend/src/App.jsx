import React, { useEffect, useState } from 'react';
import { getSummary, getBuilds } from './services/api.js';
import MetricCard from './components/MetricCard.jsx';
import BuildList from './components/BuildList.jsx';
import BuildModal from './components/BuildModal.jsx';
import ChartPanel from './components/ChartPanel.jsx';
import { AnimatePresence } from 'framer-motion';
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
    <div className="max-w-6xl mx-auto p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-8">CI/CD Pipeline Health Dashboard</h1>
      {summary && (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <MetricCard title="Success Rate" value={`${summary.successRate.toFixed(1)}%`} />
            <MetricCard title="Failure Rate" value={`${summary.failureRate.toFixed(1)}%`} />
            <MetricCard title="Avg Build Time" value={`${summary.avgDuration}s`} />
            <MetricCard title="Last Build" value={summary.lastStatus} />
          </div>
          <ChartPanel summary={summary} builds={builds} />
        </>
      )}
      <BuildList builds={builds} onSelect={setSelected} />
      <AnimatePresence>
        {selected && <BuildModal build={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </div>
  );
}
