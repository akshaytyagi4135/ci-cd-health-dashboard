import React, { useEffect, useState } from 'react';
import { getSummary, getBuilds } from './services/api.js';
import MetricCard from './components/MetricCard.jsx';
import BuildList from './components/BuildList.jsx';
import BuildModal from './components/BuildModal.jsx';
import ChartPanel from './components/ChartPanel.jsx';
import './App.css';


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
    <div className="app-container">
      <h1>CI/CD Pipeline Health Dashboard</h1>
      {summary && (
        <>
          <div className="metric-grid">
            <MetricCard title="Success Rate" value={`${summary.successRate.toFixed(1)}%`} />
            <MetricCard title="Failure Rate" value={`${summary.failureRate.toFixed(1)}%`} />
            <MetricCard title="Avg Build Time" value={`${summary.avgDuration}s`} />
            <MetricCard title="Last Build" value={summary.lastStatus} />
          </div>
          <ChartPanel summary={summary} builds={builds} />
        </>
      )}
      <BuildList builds={builds} onSelect={setSelected} />
      {selected && <BuildModal build={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
