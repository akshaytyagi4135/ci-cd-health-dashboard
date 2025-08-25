import React from 'react';
import { motion } from 'framer-motion';

export default function MetricCard({ title, value }) {
  return (
    <motion.div
      className="flex-1 bg-white rounded-lg shadow p-4 min-w-[120px]"
      whileHover={{ scale: 1.03 }}
    >
      <h3 className="text-sm font-medium text-gray-500">{title}</h3>
      <p className="mt-1 text-2xl font-semibold" data-testid="metric-value">{value}</p>
    </motion.div>
  );
}
