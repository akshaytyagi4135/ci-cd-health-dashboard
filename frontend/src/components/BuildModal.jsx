import React from 'react';

export default function BuildModal({ build, onClose }) {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)' }} onClick={onClose}>
      <div style={{ background: 'white', margin: '10% auto', padding: '1rem', width: '50%' }} onClick={e => e.stopPropagation()}>
        <h2>{build.workflowName}</h2>
        <p>Branch: {build.headBranch}</p>
        <p>Status: {build.conclusion || build.status}</p>
        <p>Duration: {build.duration || '-'}s</p>
        <a href={build.htmlUrl} target="_blank" rel="noreferrer">View on GitHub</a>
      </div>
    </div>
  );
}
