import React from 'react';
import { motion } from 'framer-motion';

export default function BuildModal({ build, onClose }) {
  return (
    <motion.div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        onClick={e => e.stopPropagation()}
        className="bg-white p-6 rounded-lg w-11/12 max-w-md"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
      >
        <h2 className="text-xl font-semibold mb-2">{build.workflowName}</h2>
        <p className="mb-1">Branch: {build.headBranch}</p>
        <p className="mb-1">Status: {build.conclusion || build.status}</p>
        <p className="mb-4">Duration: {build.duration || '-'}s</p>
        <a
          href={build.htmlUrl}
          target="_blank"
          rel="noreferrer"
          className="text-blue-600 hover:underline"
        >
          View on GitHub
        </a>
      </motion.div>
    </motion.div>
  );
}
