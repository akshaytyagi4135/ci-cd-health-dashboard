import React from 'react';

export default function BuildList({ builds, onSelect }) {
  return (
    <table style={{ width: '100%', marginTop: '1rem' }}>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Branch</th>
          <th>Status</th>
          <th>Duration(s)</th>
          <th>Timestamp</th>
        </tr>
      </thead>
      <tbody>
        {builds.map(b => (
          <tr key={b.id} onClick={() => onSelect(b)} style={{ cursor: 'pointer' }}>
            <td>{b.id}</td>
            <td>{b.workflowName}</td>
            <td>{b.headBranch}</td>
            <td style={{ color: b.conclusion === 'success' ? 'green' : b.conclusion === 'failure' ? 'red' : 'gray' }}>{b.conclusion || b.status}</td>
            <td>{b.duration || '-'}</td>
            <td>{new Date(b.createdAt).toLocaleString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
