'use client';
import React from 'react';
import { Flame, ShieldCheck } from 'lucide-react';

export default function HeroSection({ meta, onPlayClick }) {
  return (
    <section className="hero-section">
      <div className="hero-inner">
        <div className="verified-badge">
          <Flame size={16} className="badge-flame" />
          <span>{meta?.verifiedTitle}</span>
          <ShieldCheck size={16} className="badge-check" />
        </div>
        <h1 className="hero-title">{meta?.title}</h1>
      </div>
    </section>
  );
}
