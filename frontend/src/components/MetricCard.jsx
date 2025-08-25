import React from 'react';

export default function MetricCard({ title, value }) {
  return (
    <div style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: '4px', minWidth: '120px' }}>
      <h3>{title}</h3>
      <p style={{ fontSize: '1.5rem' }}>{value}</p>
    </div>
  );
}
