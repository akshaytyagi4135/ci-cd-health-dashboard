import React from 'react';

export default function BuildList({ builds, onSelect }) {
  return (
    <table className="build-table">
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
        {builds.map(b => {
          const statusClass = b.conclusion === 'success'
            ? 'status-success'
            : b.conclusion === 'failure'
            ? 'status-failure'
            : 'status-other';
          return (
            <tr key={b.id} onClick={() => onSelect(b)} className="build-row">
              <td>{b.id}</td>
              <td>{b.workflowName}</td>
              <td>{b.headBranch}</td>
              <td className={statusClass}>{b.conclusion || b.status}</td>
              <td>{b.duration || '-'}</td>
              <td>{new Date(b.createdAt).toLocaleString()}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
