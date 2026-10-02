'use client';

import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Moon, Sun, Type, Share2, Sparkles } from 'lucide-react';
import { soundFX } from '../utils/soundFx';

export default function Header({ onShareClick, onFontSizeToggle, isLargeFont }) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isDark, setIsDark] = useState(true);
  const [isAudioActive, setIsAudioActive] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    soundFX.playPop();
    const newTheme = !isDark;
    setIsDark(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme ? 'dark' : 'light');
  };

  const toggleAudio = () => {
    const nextState = !isAudioActive;
    setIsAudioActive(nextState);
    soundFX.toggleAmbient(nextState);
    if (nextState) {
      soundFX.playPop();
    }
  };

  return (
    <>
      <div className="reading-progress-track">
        <div 
          className="reading-progress-bar" 
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <header className="site-header" id="site-header">
        <div className="header-inner">
          <a href="#top" className="brand-badge" onClick={() => soundFX.playPop()}>
            <span className="snap-icon-pill">
              <Sparkles size={14} />
              SNAP GAMING
            </span>
            <span className="brand-title">Urooj Fatima: The Legend</span>
          </a>

          <div className="header-controls">
            <button 
              id="audio-toggle-btn"
              onClick={toggleAudio} 
              className={`control-btn ${isAudioActive ? 'active' : ''}`}
              title={isAudioActive ? "Mute Ambient Vibe" : "Play Ambient Vibe"}
            >
              {isAudioActive ? <Volume2 size={16} /> : <VolumeX size={16} />}
              <span>{isAudioActive ? 'Audio ON' : 'Ambiance'}</span>
            </button>

            <button 
              id="font-size-bt
}
