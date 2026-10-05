'use client';

import React, { useState } from 'react';
import { Crown, Flame, Sparkles, Zap, Award, CheckCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundFX } from '../utils/soundFx';

const trophyIcons = {
  Crown: Crown,
  Flame: Flame,
  Sparkles: Sparkles,
  Zap: Zap
};

export default function InteractiveTrophyCabinet({ trophies }) {
  const [selectedTrophy, setSelectedTrophy] = useState(null);

  const handleTrophyClick = (trophy) => {
    setSelectedTrophy(trophy.id === selectedTrophy ? null : trophy.id);
    soundFX.playTrophyChime();
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.7 }
    });
  };

  return (
    <div className="trophy-cabinet-section" id="trophies">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: 'var(--snap-yellow)', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.3rem' }}>
            <Award size={14} />
            HALL OF FAME & ACCOLADES
          </div>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', fontWeight: 800 }}>
            Urooj&apos;s Trophy Cabinet
          </h3>
        </div>
        <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
          Click any badge to inspect championship match telemetry
        </div>
      </div>

      <div className="trophies-grid">
        {trophies.map((trophy) => {
          const IconComp = trophyIcons[trophy.icon] || Award;
          const isSelected = selectedTrophy === trophy.id;

          return (
            <div
              key={trophy.id}
              className="trophy-item"
              style={{
                borderColor: isSelected ? 'var(--snap-yellow)' : 'var(--border-subtle)',
                background: isSelected ? 'rgba(255, 252, 0, 0.
}
