'use client';
import React, { useState } from 'react';
import { Sparkles, Volume2, VolumeX } from 'lucide-react';
import { toggleSound, isSoundEnabled, playPop } from '../utils/soundFx';

export default function Header({ onShareClick }) {
  const [soundOn, setSoundOn] = useState(true);

  const handleSoundToggle = () => {
    const nextState = toggleSound();
    setSoundOn(nextState);
    if (nextState) playPop();
  };

  return (
    <header className="site-header">
      <div className="reading-progress-track">
        <div className="reading-progress-fill" style={{ width: '0%' }}></div>
      </div>
      <div className="header-inner">
        <div className="brand-group">
          <Sparkles className="brand-icon" size={20} />
          <span className="brand-title">The Fatima Gazette</span>
          <span className="edition-badge">Issue #77</span>
        </div>
        <div className="actions">
          <button className="sound-toggle-btn" onClick={handleSoundToggle}>
            {soundOn ? <Volume2 size={18} /> : <VolumeX size={18} />}
          </button>
        </div>
      </div>
    </header>
  );
}
