'use client';
import React, { useState } from 'react';

export default function InteractiveTrophyCabinet({ trophies = [] }) {
  return (
    <div className="trophy-cabinet">
      <h3>The Streak Vault</h3>
      <div className="trophy-grid">
        {trophies.map((t, i) => (
          <div key={i} className="trophy-card">
            <h4>{t.title}</h4>
            <p>{t.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
