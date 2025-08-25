import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { motion } from 'framer-motion';

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
    <div className="flex flex-wrap gap-6 mb-8">
      <motion.div
        className="flex-1 min-w-[280px] bg-white p-4 rounded-lg shadow h-56"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h3 className="mb-2 font-medium">Success vs Failure</h3>
        <ResponsiveContainer width="100%" height={150}>
          <PieChart>
            <Pie dataKey="value" data={pieData} innerRadius={30} outerRadius={60} label>
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </motion.div>
      <motion.div
        className="flex-1 min-w-[280px] bg-white p-4 rounded-lg shadow h-56"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <h3 className="mb-2 font-medium">Build Duration</h3>
        <ResponsiveContainer width="100%" height={150}>
          <LineChart data={lineData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="duration" stroke="#3b82f6" />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
}
