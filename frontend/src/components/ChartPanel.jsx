import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const COLORS = ['#22c55e', '#ef4444'];

export default function ChartPanel({ summary, builds }) {
  const pieData = [
    { name: 'Success', value: summary.successRate },
    { name: 'Failure', value: summary.failureRate },
  ];

  const lineData = builds
    .filter(b => b.duration)
    .map(b => ({
      name: new Date(b.createdAt).toLocaleDateString(),
      duration: b.duration,
    }));

  return (
    <div className="chart-panel">
      <div className="chart">
        <h3>Success vs Failure</h3>
        <ResponsiveContainer width="100%" height={150}>
          <PieChart>
            <Pie dataKey="value" data={pieData} innerRadius={30} outerRadius={60} label>
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="chart">
        <h3>Build Duration</h3>
        <ResponsiveContainer width="100%" height={150}>
          <LineChart data={lineData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="duration" stroke="#3b82f6" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
