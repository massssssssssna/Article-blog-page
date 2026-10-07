'use client';

import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import SakuraParticles from '../components/SakuraParticles';
import { soundFX } from '../utils/soundFx';

const NAV_TABS = [
  { id: 'breaking', label: 'Breaking News', href: '#breaking' },
  { id: 'dossier', label: 'Snap Legends', href: '#dossier' },
  { id: 'hall-of-fame', label: 'Hall of Fame', href: '#hall-of-fame' },
  { id: 'fashion-fits', label: 'Fashion & Fits', href: '#fashion-fits' },
  { id: 'confession-wall', label: 'Confession Wall', href: '#confession-wall' },
];

export default function FatimaChroniclesPage() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeTab, setActiveTab] = useState('dossier');
  const [queenCount, setQueenCount] = useState(1842);
  const [goatCount, setGoatCount] = useState(999);
  const [isAudioActive, setIsAudioActive] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }

      // Dynamic active tab detection on scroll
      const sectionElements = [
        { id: 'breaking', el: document.getElementById('breaking') },
        { id: 'fashion-fits', el: document.getElementById('fashion-fits') },
        { id: 'dossier', el: document.getElementById('dossier') },
        { id: 'confession-wall', el: document.getElementById('confession-wall') },
        { id: 'hall-of-fame', el: document.getElementById('hall-of-fame') },
      ];

      const scrollPos = window.scrollY + 140;
      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const item = sectionElements[i];
        if (item.el && item.el.offsetTop <= scrollPos) {
          setActiveTab(item.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleNavClick = (tabId) => {
    soundFX.playPop();
    setActiveTab(tabId);
  };

  const handleQueenClick = () => {
    soundFX.playPop();
    setQueenCount(prev => prev + 1);
    confetti({
      particleCount: 45,
      spread: 65,
      origin: { y: 0.85 }
    });
  };

  const handleGoatClick = () => {
    soundFX.playPop();
    setGoatCount(prev => prev + 1);
    confetti({
      particleCount: 45,
      spread: 65,
      origin: { y: 0.85 }
    });
  };

  const toggleAudio = () => {
    const next = !isAudioActive;
    setIsAudioActive(next);
    soundFX.toggleAmbient(next);
    if (next) {
      soundFX.playPop();
      triggerToast('Chill gaming ambiance turned ON 🎵');
    } else {
      triggerToast('Ambiance turned OFF');
    }
  };

  const handleShare = () => {
    soundFX.playPop();
    const url = typeof window !== 'undefined' ? window.location.href : 'https://snapchat.com/add/itxhaya.04';
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(url);
      triggerToast('Article link copied to clipboard! 📋');
    }
  };

  return (
    <>
      {/* Background Ambient Glowing Orbs */}
      <div className="ambient-bg-glow" aria-hidden="true">
        <div className="glow-orb glow-orb-yellow" />
        <div className="glow-orb glow-orb-sakura" />
        <div className="glow-orb glow-orb-purple" />
      </div>

      {/* Floating Cherry Blossom Petals */}
      <SakuraParticles />

      {/* Top Reading Progress Bar */}
      <div className="reading-progress-track">
        <div 
          className="reading-progress-bar" 
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Header */}
      <header className="site-header">
        <div className="header-inner">
          <a href="#top" className="header-brand" onClick={() => soundFX.playPop()}>
            <div className="brand-icon-crown">
              <span>👑</span>
            </div>
            <div className="brand-text-col">
              <span className="brand-title-main">The Fatima Chronicles</span>
              <span className="brand-tagline-sub">The Daily Snap &amp; Gossip</span>
            </div>
          </a>

          {/* Navigation Pill with Dynamic Active State */}
          <nav className="header-nav-pill">
            {NAV_TABS.map((tab) => (
              <a
                key={tab.id}
                className={`nav-item-link ${activeTab === tab.id ? 'active' : ''}`}
                href={tab.href}
                onClick={() => handleNavClick(tab.id)}
              >
                {tab.label}
              </a>
            ))}
          </nav>

          <div className="header-actions">
            {/* Ambiance Audio Toggle */}
            <button 
              id="audio-toggle-btn"
              onClick={toggleAudio}
              className={`action-btn-pill ${isAudioActive ? 'active' : ''}`}
              title="Toggle Ambiance"
              type="button"
            >
              <span>{isAudioActive ? '🎵 Music' : '🔈 Ambiance'}</span>
            </button>

            {/* Share Button */}
            <button
              id="share-btn"
              onClick={handleShare}
              className="action-btn-pill"
              title="Share Article"
              type="button"
            >
              <span>Share</span>
            </button>

            {/* Send Snap CTA Button */}
            <a 
              className="snap-cta-btn" 
              href="https://snapchat.com/add/itxhaya.04"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => soundFX.playPop()}
            >
              <span>Send Snap</span>
              <span className="material-symbols-outlined text-[18px]">send</span>
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="main-content" id="top">
        {/* Top Announcement Strip */}
        <div className="announcement-bar">
          <div className="dossier-pill-tag">
            <span className="ping-dot"></span>
            <span>Official Dossier Vol. 77</span>
            <span style={{ color: 'var(--text-muted)' }}>•</span>
            <span style={{ color: 'var(--text-secondary)' }}>EXCLUSIVE TEA ARCHIVE</span>
          </div>
          <div className="streak-score-group">
            <span className="badge-streak-highlight">
              🔥 294 STREAK
            </span>
            <span className="badge-score-highlight">
              👻 204,099 SCORE
            </span>
          </div>
        </div>

        {/* Editorial Header Section (Breaking News) */}
        <header className="editorial-hero-header" id="breaking">
          {/* Eyebrow */}
          <div className="breaking-eyebrow">
            <span className="material-symbols-outlined text-[16px]">local_fire_department</span>
            <span>🚨 BREAKING SPECIAL INVESTIGATION | HISTORIC GAMING MILESTONE</span>
          </div>

          {/* Headline */}
          <h1 className="headline-super">
            <span className="gradient-glow">UROOJ FATIMA:</span> THE UNSTOPPABLE SNAPCHAT GAMING OVERLORD WHO PROVED EVERY DOUBTER WRONG
          </h1>

          {/* Subtitle */}
          <p className="lead-subtitle">
            They openly laughed and presumed she couldn’t even cross Level 1. Instead, she unleashed ruthless perfection, vaporizing high scores across every single Snapchat mini-game with an unholy <span className="winrate-pill">100% win rate</span>.
          </p>

          {/* Byline */}
          <div className="byline-meta-bar">
            <div className="author-chip">
              <div className="author-avatar-badge">
                MI
              </div>
              <div>
                <div className="author-name-text">Massna Ijaz</div>
                <div className="author-sub-text">Chief Skeptic turned Converted Believer &amp; Official Biographer</div>
              </div>
            </div>

            <div className="byline-divider"></div>

            <div className="byline-stat">
              <span className="material-symbols-outlined" style={{ color: 'var(--sakura-pink)' }}>schedule</span>
              <span>4 min read</span>
            </div>

            <div className="byline-divider"></div>

            <div className="byline-stat">
              <span style={{ color: 'var(--snap-yellow)' }}>☕</span>
              <span style={{ color: 'var(--snap-yellow)', fontWeight: 800 }}>VERIFIED TEA</span>
            </div>
          </div>

          {/* Historic Record Seal */}
          <div className="record-seal-box">
            <div className="seal-left">
              <div className="seal-icon-circle">
                🏛️
              </div>
              <div>
                <div className="seal-tags-row">
                  <span className="seal-title-badge">HISTORIC RECORD SEAL</span>
                  <span className="seal-date-text">OCTOBER 8, 2026 • ~11:00 AM</span>
                </div>
                <p className="seal-statement-text">
                  History bears witness: On October 8, 2026, at approximately 11:00 AM, this legendary gaming feat was officially conquered and etched into eternity.
                </p>
              </div>
            </div>

            <div className="seal-right-pill">
              <span className="material-symbols-outlined text-[16px]">verified</span>
              <span>CHRONICLED IN STONE</span>
            </div>
          </div>
        </header>

        {/* Bento Hero: Photo Showcase (Fashion & Fits) + Classified Dossier (Snap Legends) */}
        <section className="bento-hero-grid">
          {/* Photo Frame (Fashion & Fits) */}
          <div className="photo-card-wrapper" id="fashion-fits">
            <div className="photo-sticker-goddess">
              👑 OFFICIAL GAME GODDESS
            </div>

            <div className="photo-glow-frame">
              <div className="polaroid-inner">
                <div className="photo-image-box">
                  <img 
                    src="/urooj-fatima.jpg" 
                    alt="Urooj Fatima Bitmoji Avatar"
                    className="photo-img-actual"
                  />
                  <div className="photo-floating-pill">
                    <div className="pill-user-id">
                      <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--snap-yellow)' }}></span>
                      <span>Haya ❤️ (itxhaya.04)</span>
                    </div>
                    <span className="pill-status-untouchable">LEVEL: UNTOUCHABLE</span>
                  </div>
                </div>

                <div className="polaroid-caption">
                  <div className="polaroid-caption-title">The Final Boss of Snapchat</div>
                  <div className="polaroid-caption-sub">Exhibit A: Unbothered, lethal, and effortlessly fashionable.</div>
                </div>
              </div>
            </div>
          </div>

          {/* Classified Dossier (Snap Legends) */}
          <div className="dossier-card-wrapper" id="dossier">
            <div className="dossier-main-card">
              <div className="dossier-header-row">
                <div className="dossier-badge-rank">
                  <div className="rank-circle-1">#1</div>
                  <div className="dossier-title-text">Player Classified Dossier</div>
                </div>
                <div className="dossier-id-code">
                  ID: SNAP-FATIMA-04
                </div>
              </div>

              {/* Grid */}
              <div className="dossier-fields-grid">
                <div className="field-cell">
                  <span className="field-label">Gamer Alias</span>
                  <span className="field-value-primary">Urooj the Game Slayer</span>
                  <span className="field-value-secondary">a.k.a. The Streak Empress</span>
                </div>

                <div className="field-cell">
                  <span className="field-label">Snapchat Record</span>
                  <span className="field-value-primary">204,099+ Score</span>
                  <span style={{ color: 'var(--snap-yellow)', fontWeight: 800, fontSize: '0.88rem' }}>🔥 294 Unbroken Days</span>
                </div>

                <div className="field-cell">
                  <span className="field-label">Signature Move</span>
                  <span style={{ color: '#fff', fontWeight: 800, fontSize: '0.95rem', lineHeight: 1.4 }}>
                    Winking with one eye while casually annihilating leaderboards
                  </span>
                </div>

                <div className="field-cell">
                  <span className="field-label">Certified Status</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', marginTop: '0.2rem' }}>
                    <span className="material-symbols-outlined" style={{ color: 'var(--sakura-pink)' }}>verified</span>
                    <span style={{ color: 'var(--sakura-pink)', fontWeight: 900, fontSize: '1rem' }}>Undefeated Champion</span>
                  </div>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>Zero losses recorded to date.</span>
                </div>
              </div>

              {/* Quote */}
              <div className="dossier-quote-box">
                <span style={{ fontSize: '1.6rem' }}>⚡</span>
                <p className="dossier-quote-text">
                  &ldquo;Never underestimate a girl wearing cargo pants with a silver hijab who can swipe faster than the speed of 5G Wi-Fi.&rdquo;
                </p>
              </div>

              {/* CTA */}
              <div className="dossier-cta-bar">
                <a 
                  className="dossier-snap-button" 
                  href="https://snapchat.com/add/itxhaya.04"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => soundFX.playPop()}
                >
                  <span style={{ fontSize: '1.4rem' }}>👻</span>
                  <span>Add Urooj on Snapchat</span>
                  <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                </a>
                <span className="dossier-disclaimer">
                  ⚠️ Challenge at your own risk. Loss guaranteed.
                </span>
              </div>
            </div>

            {/* Metric Pulse Cards */}
            <div className="metric-pulse-grid">
              <div className="metric-pulse-card">
                <div cl
</main>
  );
}
