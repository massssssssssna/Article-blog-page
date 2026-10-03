'use client';

import React from 'react';
import Image from 'next/image';
import { Calendar, Clock, Trophy, Flame, Zap, ShieldCheck } from 'lucide-react';
import { soundFX } from '../utils/soundFx';

export default function HeroSection({ meta, playerProfile }) {
  return (
    <section className="hero-editorial" id="top">
      <div className="editorial-tag">
        <ShieldCheck size={14} />
        {meta.badge}
      </div>

      <h1 className="hero-headline">
        The Rise of <span className="highlight-gradient">Urooj Fatima</span>: The Snapchat Gaming Legend
      </h1>

      <p className="hero-subtitle">
        {meta.subtitle}
      </p>

      {/* Meta Bar */}
      <div className="hero-meta-bar">
        <div className="author-pill">
          {/* Fallback to standard img tag for zero config issues */}
          <img 
            src={meta.author.avatar} 
            alt={meta.author.name}
            className="author-avatar"
          />
          <div>
            <div className="author-name">{meta.author.name}</div>
            <div className="author-meta">{meta.author.role}</div>
          </div>
        </div>

        <div className="article-stats-inline">
          <div className="stat-item">
            <Calendar size={15} color="var(--snap-yellow)" />
            <span>{meta.publishedDate}</span>
          </div>
          <div className="stat-item">
            <Clock size={15} color="var(--sakura-pink)" />
            <span>{meta.readTime}</span>
          </div>
          <div className="stat-item">
            <Trophy size={15} color="var(--cyber-blue)" />
            <span>Verified Legend Record</span>
          </div>
        </div>
      </div>

      {/* Spotlight Card with the User's Image */}
      <div className="spotlight-card">
        <div className="spotlight-image-container">
          <div 
            className="spotlight-frame"
            onMouseEnter={() => soundFX.playPop()}
          >
            <img 
              src={playerProfile.avatarImage} 
              alt="Urooj Fatima - The Snapchat Gaming Legend Avatar"
              className="spotlight-img"
              id="urooj-avatar-spotlight"
            />
            <div className="status-badge-floating">
              <span className="status-dot-pulse"></span>
              {playerProfile.status}
            </div>
          </div>
        </div>

        <div className="spotlight-content">
          <div className="player-title-badge">
            <Zap size={14} />
            {playerProfile.role}
          </div>

          <h2 className="player-name-heading">
            {playerProfile.name}
          </h2>

          <p className="player-bio-text">
            Recognized across global leaderboards as the undisputed architect of competitive Bitmoji mini-games. With a signature Sakura-park serenity and an unmistakable winking glance, she has redefined what casual mobile platforms are capable of.
          </p>

          <div className="signature-quote-box">
            &ldquo;{playerProfile.signatureQuote}&rdquo;
          </div>

          <div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.5rem', fontFamily: 'var(--font-mono)' }}>
              CORE ARENA DISCIPLINES:
            </div>
            <div className="fav-games-row">
              {playerProfile.favoriteGames.map((game, i) => (
                <span key={i} className="game-chip">
                  <Flame size={13} color="var(--snap-yellow)" />
                  {game}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
