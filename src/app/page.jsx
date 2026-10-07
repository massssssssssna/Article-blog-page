'use client';

import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import SakuraParticles from '../components/SakuraParticles';
import { soundFX } from '../utils/soundFx';
import { getLiveStreakAndScore } from '../utils/streakCalculator';
import {
  Flame,
  Ghost,
  Crown,
  Music,
  Volume2,
  VolumeX,
  ClipboardCheck,
  Send,
  Heart,
  Zap,
  AlertCircle,
  Coffee,
  Landmark,
  ScrollText,
  Sparkles,
  Lightbulb,
  Gamepad2,
  Activity,
  PartyPopper,
  Crosshair,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  Clock
} from 'lucide-react';

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
  const [liveStats, setLiveStats] = useState(() => getLiveStreakAndScore());

  useEffect(() => {
    // Dynamic real-time streak and snap score calculation
    const updateStats = () => setLiveStats(getLiveStreakAndScore());
    updateStats();

    const timer = setInterval(updateStats, 30000); // Check every 30s for rollover
    window.addEventListener('focus', updateStats);
    document.addEventListener('visibilitychange', updateStats);

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
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('focus', updateStats);
      document.removeEventListener('visibilitychange', updateStats);
      clearInterval(timer);
    };
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
      triggerToast('Chill gaming ambiance turned ON');
    } else {
      triggerToast('Ambiance turned OFF');
    }
  };

  const handleShare = () => {
    soundFX.playPop();
    const url = typeof window !== 'undefined' ? window.location.href : 'https://snapchat.com/add/itxhaya.04';
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(url);
      triggerToast('Article link copied to clipboard!');
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
              <Crown size={18} style={{ color: 'var(--snap-yellow)' }} />
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
              {isAudioActive ? (
                <>
                  <Music size={14} />
                  <span>Music</span>
                </>
              ) : (
                <>
                  <VolumeX size={14} />
                  <span>Mute</span>
                </>
              )}
            </button>

            {/* Share Button */}
            <button
              id="share-btn"
              onClick={handleShare}
              className="action-btn-pill"
              title="Share Article"
              type="button"
            >
              <ClipboardCheck size={14} />
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
              <Send size={15} />
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
              <Flame size={14} style={{ display: 'inline-flex', verticalAlign: '-1px', marginRight: '4px' }} />
              {liveStats.streak} STREAK
            </span>
            <span className="badge-score-highlight">
              <Ghost size={14} style={{ display: 'inline-flex', verticalAlign: '-1px', marginRight: '4px' }} />
              {liveStats.formattedScore} SCORE
            </span>
          </div>
        </div>

        {/* Editorial Header Section (Breaking News) */}
        <header className="editorial-hero-header" id="breaking">
          {/* Eyebrow */}
          <div className="breaking-eyebrow">
            <AlertCircle size={15} />
            <span>BREAKING SPECIAL INVESTIGATION | HISTORIC GAMING MILESTONE</span>
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
              <Clock size={16} style={{ color: 'var(--sakura-pink)' }} />
              <span>4 min read</span>
            </div>

            <div className="byline-divider"></div>

            <div className="byline-stat">
              <Coffee size={16} style={{ color: 'var(--snap-yellow)' }} />
              <span style={{ color: 'var(--snap-yellow)', fontWeight: 800 }}>VERIFIED TEA</span>
            </div>
          </div>

          {/* Historic Record Seal */}
          <div className="record-seal-box">
            <div className="seal-left">
              <div className="seal-icon-circle">
                <Landmark size={22} />
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
              <ShieldCheck size={16} />
              <span>CHRONICLED IN STONE</span>
            </div>
          </div>
        </header>

        {/* Bento Hero: Photo Showcase (Fashion & Fits) + Classified Dossier (Snap Legends) */}
        <section className="bento-hero-grid">
          {/* Photo Frame (Fashion & Fits) */}
          <div className="photo-card-wrapper" id="fashion-fits">
            <div className="photo-sticker-goddess">
              <Crown size={15} style={{ display: 'inline', verticalAlign: '-2px', marginRight: '5px' }} />
              OFFICIAL GAME GODDESS
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
                      <span>Haya <Heart size={12} fill="#ff4d6d" style={{ display: 'inline', verticalAlign: '-1px', color: '#ff4d6d' }} /> (itxhaya.04)</span>
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
                  ID: itx haya
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
                  <span className="field-value-primary">{liveStats.formattedScore}+ Score</span>
                  <span style={{ color: 'var(--snap-yellow)', fontWeight: 800, fontSize: '0.88rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Flame size={14} /> {liveStats.streak} Unbroken Days
                  </span>
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
                    <ShieldCheck size={18} style={{ color: 'var(--sakura-pink)' }} />
                    <span style={{ color: 'var(--sakura-pink)', fontWeight: 900, fontSize: '1rem' }}>Undefeated Champion</span>
                  </div>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>Zero losses recorded to date.</span>
                </div>
              </div>

              {/* Quote */}
              <div className="dossier-quote-box">
                <Zap size={22} style={{ color: 'var(--cyber-blue)', flexShrink: 0 }} />
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
                  <span style={{ fontSize: '1.65rem', lineHeight: 1, display: 'inline-flex', alignItems: 'center', filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.15))' }}>👻</span>
                  <span>Add Urooj on Snapchat</span>
                  <ArrowRight size={20} strokeWidth={2.5} />
                </a>
                <span className="dossier-disclaimer">
                  <AlertTriangle size={14} style={{ display: 'inline', verticalAlign: '-2px', marginRight: '4px' }} />
                  Challenge at your own risk. Loss guaranteed.
                </span>
              </div>
            </div>

            {/* Metric Pulse Cards */}
            <div className="metric-pulse-grid">
              <div className="metric-pulse-card">
                <div className="metric-huge-stat" style={{ color: 'var(--sakura-pink)' }}>100%</div>
                <div className="metric-sub-label">Win Rate</div>
              </div>

              <div className="metric-pulse-card">
                <div className="metric-huge-stat" style={{ color: 'var(--electric-purple)' }}>0.0s</div>
                <div className="metric-sub-label">Hesitation</div>
              </div>

              <div className="metric-pulse-card">
                <div className="metric-huge-stat" style={{ color: 'var(--snap-yellow)' }}>0</div>
                <div className="metric-sub-label">Doubters Left</div>
              </div>
            </div>
          </div>
        </section>

        {/* Acts Section */}
        <section className="acts-wrapper">
          {/* Confession Wall (Act I & Act III) */}
          <article id="confession-wall">
            <div className="act-heading-row">
              <span className="act-tag-badge">ACT I</span>
              <h2 className="act-title-text">The Great Miscalculation: &ldquo;Isse Nahi Hona Bhai&rdquo;</h2>
            </div>

            <div className="act-1-bento">
              <div className="act-prose-col">
                <p style={{ fontSize: '1.1rem', color: 'var(--text-primary)', lineHeight: 1.75 }}>
                  Every heroic epic begins with a tragedy of doubt. In our story, that tragic figure was none other than <strong style={{ color: 'var(--sakura-pink)' }}>Massna Ijaz</strong>, who committed the cardinal sin of underestimating raw, unadulterated girl-boss energy.
                </p>

                <div className="act-quote-box-massna">
                  <p className="quote-speech-text">
                    &ldquo;I honestly looked at her and said, ‘Isse nahi hona bhai’ (there is no way she’s clearing this). It felt like handing a PlayStation controller to a bewildered cat. I expected chaos. I expected failure. I prepared comforting words.&rdquo;
                  </p>
                  <span className="quote-author-sig">
                    — Massna Ijaz, in an exclusive candid confession
                  </span>
                </div>

                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                  What followed was not gentle failure. It was the digital equivalent of a meteor crashing into earth while sporting a pristine grey monochrome outfit and perfectly styled kicks.
                </p>
              </div>

              {/* Skepticism Meter */}
              <div className="meter-card-box">
                <div className="meter-heading">The Skepticism Meter</div>

                <div className="bar-row-block">
                  <div className="bar-label-line">
                    <span style={{ color: 'var(--text-secondary)' }}>Massna&apos;s Initial Confidence:</span>
                    <span style={{ color: 'var(--ruby-red)', fontWeight: 800 }}>99.9% Doubt</span>
                  </div>
                  <div className="progress-track-h">
                    <div className="bar-fill-error"></div>
                  </div>
                </div>

                <div className="bar-row-block">
                  <div className="bar-label-line">
                    <span style={{ color: 'var(--text-secondary)' }}>Urooj&apos;s Mercy Level:</span>
                    <span style={{ color: 'var(--sakura-pink)', fontWeight: 800 }}>0.0% Mercy</span>
                  </div>
                  <div className="progress-track-h">
                    <div className="bar-fill-mercy"></div>
                  </div>
                </div>

                <div className="bar-row-block">
                  <div className="bar-label-line">
                    <span style={{ color: 'var(--text-secondary)' }}>Actual Destruction Inflicted:</span>
                    <span style={{ color: 'var(--snap-yellow)', fontWeight: 800 }}>10,000% Catastrophic</span>
                  </div>
                  <div className="progress-track-h">
                    <div className="bar-fill-destructive"></div>
                  </div>
                </div>
              </div>
            </div>
          </article>

          {/* Hall of Fame (Act II) */}
          <article id="hall-of-fame">
            <div className="act-heading-row">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span className="act-tag-badge" style={{ background: 'var(--electric-purple)', color: '#fff' }}>ACT II</span>
                <h2 className="act-title-text">The Blitzkrieg of 100% Scores</h2>
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--snap-yellow)', fontWeight: 800 }}>
                Snapchat Mini-Games Conquered: 5/5 PERFECT
              </div>
            </div>

            {/* 4 Games Bento Grid */}
            <div className="games-bento-grid">
              {/* Game 1 */}
              <div className="game-bento-card" onMouseEnter={() => soundFX.playPop()}>
                <div>
                  <div className="game-header-top">
                    <span className="game-emoji-icon">
                      <Gamepad2 size={24} style={{ color: 'var(--cyber-blue)' }} />
                    </span>
                    <span className="game-score-tag">100% CLEAN</span>
                  </div>
                  <h3 className="game-card-title">Bitmoji Tennis</h3>
                  <p className="game-card-desc">
                    Volleyed balls with surgical precision while looking completely indifferent to opponent tears.
                  </p>
                </div>
                <div className="game-card-footer">
                  <span style={{ color: 'var(--sakura-pink)', fontWeight: 700 }}>Status:</span>
                  <span style={{ fontWeight: 800, color: '#fff' }}>Grand Slam Demolished</span>
                </div>
              </div>

              {/* Game 2 */}
              <div className="game-bento-card" onMouseEnter={() => soundFX.playPop()}>
                <div>
                  <div className="game-header-top">
                    <span className="game-emoji-icon">
                      <Activity size={24} style={{ color: 'var(--sakura-pink)' }} />
                    </span>
                    <span className="game-score-tag">100% SUPREME</span>
                  </div>
                  <h3 className="game-card-title">Aqua Park Rampage</h3>
                  <p className="game-card-desc">
                    Slid down high-speed water chutes bumping every player off into digital oblivion. Unapologetic.
                  </p>
                </div>
                <div className="game-card-footer">
                  <span style={{ color: 'var(--sakura-pink)', fontWeight: 700 }}>Status:</span>
                  <span style={{ fontWeight: 800, color: '#fff' }}>Tsunami Queen</span>
                </div>
              </div>

              {/* Game 3 */}
              <div className="game-bento-card" onMouseEnter={() => soundFX.playPop()}>
                <div>
                  <div className="game-header-top">
                    <span className="game-emoji-icon">
                      <PartyPopper size={24} style={{ color: 'var(--snap-yellow)' }} />
                    </span>
                    <span className="game-score-tag">100% PERFECT</span>
                  </div>
                  <h3 className="game-card-title">Ready Chef Go!</h3>
                  <p className="game-card-desc">
                    Served 80 virtual dishes simultaneously. Gordon Ramsay himself sent a congratulatory sticker.
                  </p>
                </div>
                <div className="game-card-footer">
                  <span style={{ color: 'var(--sakura-pink)', fontWeight: 700 }}>Status:</span>
                  <span style={{ fontWeight: 800, color: '#fff' }}>3 Michelin Stars</span>
                </div>
              </div>

              {/* Game 4 */}
              <div className="game-bento-card" onMouseEnter={() => soundFX.playPop()}>
                <div>
                  <div className="game-header-top">
                    <span className="game-emoji-icon">
                      <Crosshair size={24} style={{ color: 'var(--electric-purple)' }} />
                    </span>
                    <span className="game-score-tag">100% GALAXY</span>
                  </div>
                  <h3 className="game-card-title">Snapchat Trivia</h3>
                  <p className="game-card-desc">
                    Answered pop-culture questions before they finished rendering on screen. Pure telepathy.
                  </p>
                </div>
                <div className="game-card-footer">
                  <span style={{ color: 'var(--sakura-pink)', fontWeight: 700 }}>Status:</span>
                  <span style={{ fontWeight: 800, color: '#fff' }}>Harvard Called</span>
                </div>
              </div>
            </div>

            {/* The Scientific Proof Data Visualization */}
            <div className="analytics-card-section" style={{ marginTop: '2rem' }}>
              <div className="analytics-header-row">
                <div>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--sakura-pink)', fontWeight: 800, letterSpacing: '1.2px', textTransform: 'uppercase' }}>
                    Empirical Evidence &amp; Analytics
                  </span>
                  <h3 className="analytics-title-main">
                    Comparative Performance Analysis
                  </h3>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.8rem', fontWeight: 700, flexWrap: 'wrap' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'var(--text-muted)' }}></span> Expected by Men
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'var(--sakura-pink)' }}></span> Urooj&apos;s Actual Reality
                  </span>
                </div>
              </div>

              {/* SVG Chart */}
              <div className="svg-chart-container">
                <svg className="w-full" style={{ width: '100%', height: 'auto', minWidth: '520px', display: 'block' }} fill="none" viewBox="0 0 720 150" xmlns="http://www.w3.org/2000/svg">
                  {/* Subtle percentage headers */}
                  <text fill="rgba(255, 255, 255, 0.3)" fontFamily="var(--font-mono)" fontSize="9" fontWeight="700" textAnchor="middle" x="215" y="18">0%</text>
                  <text fill="rgba(255, 255, 255, 0.3)" fontFamily="var(--font-mono)" fontSize="9" fontWeight="700" textAnchor="middle" x="335" y="18">25%</text>
                  <text fill="rgba(255, 255, 255, 0.3)" fontFamily="var(--font-mono)" fontSize="9" fontWeight="700" textAnchor="middle" x="455" y="18">50%</text>
                  <text fill="rgba(255, 255, 255, 0.3)" fontFamily="var(--font-mono)" fontSize="9" fontWeight="700" textAnchor="middle" x="575" y="18">75%</text>
                  <text fill="rgba(255, 255, 255, 0.3)" fontFamily="var(--font-mono)" fontSize="9" fontWeight="700" textAnchor="middle" x="695" y="18">100%</text>

                  {/* Grid lines */}
                  <line stroke="rgba(255, 255, 255, 0.08)" strokeDasharray="4 4" x1="215" x2="215" y1="24" y2="135"></line>
                  <line stroke="rgba(255, 255, 255, 0.08)" strokeDasharray="4 4" x1="335" x2="335" y1="24" y2="135"></line>
                  <line stroke="rgba(255, 255, 255, 0.08)" strokeDasharray="4 4" x1="455" x2="455" y1="24" y2="135"></line>
                  <line stroke="rgba(255, 255, 255, 0.08)" strokeDasharray="4 4" x1="575" x2="575" y1="24" y2="135"></line>
                  <line stroke="rgba(255, 255, 255, 0.08)" strokeDasharray="4 4" x1="695" x2="695" y1="24" y2="135"></line>

                  {/* Row 1: Expected */}
                  <text fill="#94A3B8" fontFamily="var(--font-mono)" fontSize="11" fontWeight="700" x="15" y="49">Expected by Skeptic</text>
                  <rect fill="#475569" height="24" rx="12" width="16" x="215" y="35"></rect>
                  <text fill="#94A3B8" fontFamily="var(--font-mono)" fontSize="11" fontWeight="700" x="242" y="51">0.2% (Failed Level 1)</text>

                  {/* Row 2: Actual Urooj Reality (Ample spacing from x=15 to x=215) */}
                  <text fill="#FF758F" fontFamily="var(--font-mono)" fontSize="12" fontWeight="800" x="15" y="105">Actual Urooj Reality</text>
                  <rect fill="url(#sakuraGrad)" height="32" rx="16" width="480" x="215" y="86"></rect>
                  
                  {/* High-contrast embedded badge pill inside the bar */}
                  <rect fill="rgba(12, 10, 24, 0.92)" height="24" rx="12" stroke="#FFFC00" strokeWidth="1.2" width="180" x="502" y="90"></rect>
                  <text fill="#FFFC00" fontFamily="var(--font-headline)" fontSize="11.5" fontWeight="900" letterSpacing="0.8px" textAnchor="middle" x="592" y="106">
                    100.0% GOD LEVEL
                  </text>

                  <defs>
                    <linearGradient id="sakuraGrad" gradientUnits="userSpaceOnUse" x1="215" x2="695" y1="86" y2="86">
                      <stop offset="0%" stopColor="#C2185B" />
                      <stop offset="35%" stopColor="#E91E63" />
                      <stop offset="70%" stopColor="#FF5722" />
                      <stop offset="90%" stopColor="#FFB300" />
                      <stop offset="100%" stopColor="#FFFC00" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', textAlign: 'center', fontStyle: 'italic', marginTop: '0.5rem' }}>
                Data verified by the International Bureau of Snapchat Weights, Measures &amp; Clowns.
              </p>
            </div>
          </article>

          {/* Act III: The Sacred Witness Statement */}
          <article>
            <div className="act-heading-row">
              <span className="act-tag-badge" style={{ background: 'var(--snap-yellow)', color: '#000' }}>ACT III</span>
              <h2 className="act-title-text">The Sacred Witness Statement by Massna Ijaz</h2>
            </div>

            <div className="witness-statement-card">
              <p className="witness-prose-text">
                &ldquo;I hereby publicly, permanently, and without mental reservation retract all prior slander, smirks, and unprompted advice given to Urooj Fatima regarding video game mechanics,&rdquo; states Massna Ijaz in an emotionally charged formal declaration.
              </p>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.75 }}>
                &ldquo;She didn&apos;t merely finish the stages. She played with one hand, readjusted her outfit with the other, periodically winked at the screen, and still scored quadruple what anyone in the group chat could muster. She has earned supreme immunity from any future gaming critiques until the end of the century.&rdquo;
              </p>
              <div className="affidavit-signed-bar">
                <ScrollText size={32} style={{ color: 'var(--snap-yellow)', flexShrink: 0 }} />
                <div>
                  <div style={{ fontWeight: 800, color: '#fff', fontSize: '1rem' }}>Witness Affidavits Signed &amp; Sealed</div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--sakura-pink)', fontWeight: 600 }}>
                    Witnessed by {liveStats.streak} Snapchat Streak recipients and verified by the stars.
                  </div>
                </div>
              </div>
            </div>
          </article>

          {/* The Grand Moral of the Story: Highlight Callout Box */}
          <section className="grand-moral-banner" id="moral">
            <Sparkles size={24} className="moral-floating-sticker-1 select-none" style={{ color: 'var(--sakura-pink)' }} />
            <Crown size={24} className="moral-floating-sticker-2 select-none" style={{ color: 'var(--snap-yellow)' }} />

            <div className="moral-content-max">
              <div className="moral-pill-tag">
                <Lightbulb size={16} />
                <span>THE SACRED TAKEAWAY</span>
              </div>

              <h2 className="moral-headline-quote">
                The Grand Moral of the Story:
              </h2>

              <p className="moral-quote-highlight">
                &ldquo;Larkiyan bhi kuch kar sakti hain! In fact, larkiyan can destroy your ego, your Snapchat leaderboards, and your doubts in under 3 minutes flat without even ruining their outfit.&rdquo;
              </p>

              <p style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '1rem', lineHeight: 1.7 }}>
                Let this historic editorial serve as an enduring reminder across every social feed: never challenge Urooj Fatima unless you are mentally prepared to witness divine gaming greatness in real time.
              </p>

              {/* Interactive Reaction Counters */}
              <div className="moral-reaction-buttons-row">
                <button 
                  className="reaction-btn-moral reaction-btn-queen"
                  id="queen-btn" 
                  type="button"
                  onClick={handleQueenClick}
                >
                  <Crown size={18} />
                  <span>Long Live Queen Urooj</span>
                  <span className="reaction-count-chip" style={{ background: '#b7004f', color: '#fff' }}>
                    {queenCount.toLocaleString()}
                  </span>
                </button>

                <button 
                  className="reaction-btn-moral reaction-btn-goat"
                  id="goat-btn" 
                  type="button"
                  onClick={handleGoatClick}
                >
                  <Flame size={18} />
                  <span>100% Goat Status</span>
                  <span className="reaction-count-chip" style={{ background: '#000', color: '#fff' }}>
                    {goatCount.toLocaleString()}
                  </span>
                </button>

                <a 
                  className="reaction-btn-moral reaction-btn-snap"
                  href="https://snapchat.com/add/itxhaya.04" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  onClick={() => soundFX.playPop()}
                >
                  <span style={{ fontSize: '1.25rem', lineHeight: 1, display: 'inline-flex', alignItems: 'center' }}>👻</span>
                  <span>Add The Legend</span>
                </a>
              </div>
            </div>
          </section>
        </section>
      </main>

      {/* Footer */}
      <footer className="site-footer">
        <div className="footer-inner-container">
          <div className="footer-grid-top">
            <div>
              <div className="footer-brand-title">The Fatima Gazette</div>
              <p className="footer-brand-sub">
                Your number one daily dossier of unapologetic high-glam gossip, viral outfit checks, legendary streak chronicles, and pure tea from Fatima&apos;s inner circle.
              </p>
              <div style={{ display: 'flex', gap: '0.6rem', marginTop: '1rem', flexWrap: 'wrap' }}>
                <span className="badge-streak-highlight" style={{ fontSize: '0.72rem' }}>
                  <Flame size={13} style={{ display: 'inline', verticalAlign: '-1px', marginRight: '3px' }} />
                  {liveStats.streak}-Day Streak Active
                </span>
                <span className="badge-score-highlight" style={{ fontSize: '0.72rem' }}>
                  <Sparkles size={13} style={{ display: 'inline', verticalAlign: '-1px', marginRight: '3px' }} />
                  Certified Royal Tea
                </span>
              </div>
            </div>

            <div>
              <div className="footer-heading-col">Zine Beats</div>
              <div className="footer-links-list">
                <a className="footer-link-item" href="#breaking">Editorial Headlines</a>
                <a className="footer-link-item" href="#dossier">The Daily Streak Log</a>
                <a className="footer-link-item" href="#hall-of-fame">Snapchat Hall of Fame</a>
                <a className="footer-link-item" href="#fashion-fits">OOTD Outfit Vault</a>
                <a className="footer-link-item" href="#confession-wall">Massna Confession Box</a>
              </div>
            </div>

            <div>
              <div className="footer-heading-col">Send Gossip</div>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1rem' }}>
                Did someone challenge Fatima&apos;s high score? Report it immediately to the high council of tea spillers.
              </p>
              <a 
                className="snap-cta-btn" 
                href="https://snapchat.com/add/itxhaya.04"
                target="_blank"
                rel="noopener noreferrer"
                style={{ width: '100%', justifyContent: 'center' }}
                onClick={() => soundFX.playPop()}
              >
                <span>Add itxhaya.04</span>
                <Send size={15} />
              </a>
            </div>
          </div>

          <div className="footer-bottom-bar">
            <div>
              &copy; 2026 The Fatima Gazette &amp; Chronicles. All glam rights reserved. Stay humble, keep streaking.
            </div>
            <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap' }}>
              <span style={{ color: 'var(--text-muted)' }}>Issue #77</span>
              <span style={{ color: 'var(--text-muted)' }}>•</span>
              <span style={{ color: 'var(--text-muted)' }}>Verified Clean Sweep</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Toast Notification Pop-up */}
      <div 
        className={`toast-notice ${showToast ? 'show' : ''}`}
        role="alert"
      >
        <span>{toastMessage}</span>
      </div>
    </>
  );
}
