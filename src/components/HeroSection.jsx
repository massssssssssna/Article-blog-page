'use client';
import React from 'react';

export default function HeroSection({ meta }) {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <h1 className="hero-title">{meta?.title || 'Urooj Fatima'}</h1>
      </div>
    </section>
  );
}
