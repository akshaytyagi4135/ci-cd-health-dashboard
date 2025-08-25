import React from 'react';

export default function BuildModal({ build, onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <h2>{build.workflowName}</h2>
        <p>Branch: {build.headBranch}</p>
        <p>Status: {build.conclusion || build.status}</p>
        <p>Duration: {build.duration || '-'}s</p>
        <a href={build.htmlUrl} target="_blank" rel="noreferrer">View on GitHub</a>
      </div>
    </div>
  );
}
