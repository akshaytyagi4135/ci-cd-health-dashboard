import React from 'react';
import { motion } from 'framer-motion';

export default function BuildList({ builds, onSelect }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 bg-white shadow rounded-lg">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Branch</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration(s)</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timestamp</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {builds.map(b => {
            const statusClass = b.conclusion === 'success'
              ? 'text-green-600'
              : b.conclusion === 'failure'
              ? 'text-red-600'
              : 'text-gray-500';
            return (
              <motion.tr
                key={b.id}
                onClick={() => onSelect(b)}
                className="cursor-pointer"
                whileHover={{ scale: 1.01, backgroundColor: '#f9fafb' }}
              >
                <td className="px-4 py-2 whitespace-nowrap">{b.id}</td>
                <td className="px-4 py-2 whitespace-nowrap">{b.workflowName}</td>
                <td className="px-4 py-2 whitespace-nowrap">{b.headBranch}</td>
                <td className={`px-4 py-2 whitespace-nowrap ${statusClass}`}>{b.conclusion || b.status}</td>
                <td className="px-4 py-2 whitespace-nowrap">{b.duration || '-'}</td>
                <td className="px-4 py-2 whitespace-nowrap">{new Date(b.createdAt).toLocaleString()}</td>
              </motion.tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
