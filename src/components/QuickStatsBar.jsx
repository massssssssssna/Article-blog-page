'use client';
import React from 'react';

export default function QuickStatsBar({ stats = [] }) {
  return (
    <div className="stats-bar-wrapper">
      <div className="stats-grid">
        {stats.map((s, i) => (
          <div key={i} className="stat-card">
            <span className="stat-value">{s.value}</span>
            <span className="stat-label">{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
