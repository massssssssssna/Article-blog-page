'use client';

import React, { useState, useEffect } from 'react';
import { BookOpen, Award, Swords, Flame, Sparkles, Zap, Trophy } from 'lucide-react';
import ReflexMiniGame from './ReflexMiniGame';
import InteractiveTrophyCabinet from './InteractiveTrophyCabinet';
import ReactionEngine from './ReactionEngine';
import { soundFX } from '../utils/soundFx';

export default function ArticleLayout({ chapters, pullQuotes, gameplayRecords, trophies, isLargeFont }) {
  const [activeChapter, setActiveChapter] = useState('the-spark');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 180;
      chapters.forEach(ch => {
        const el = document.getElementById(ch.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveChapter(ch.id);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [chapters]);

  return (
    <div className="article-layout">
      {/* Sticky Sidebar with Chapter Navigation */}
      <aside className="sidebar-sticky">
        <div className="toc-card">
          <div className="toc-heading">
            <BookOpen size={14} />
            TABLE OF CONTENTS
          </div>
          <nav className="toc-nav">
            {chapters.map((ch) => (
              <a
                key={ch.id}
                href={`#${ch.id}`}
                className={`toc-link ${activeChapter === ch.id ? 'active' : ''}`}
                onClick={() => soundFX.playPop()}
              >
                <span className="toc-number">{ch.number}</span>
                <span>{ch.title}</span>
              </a>
            ))}
            <a 
              href="#reflex-arena" 
              className="toc-link"
              onClick={() => soundFX.playPop()}
              style={{ color: 'var(--snap-yellow)' }}
            >
              <span className="toc-number" style={{ display: 'inline-flex', alignItems: 'center' }}>
                <Zap size={14} />
              </span>
              <span>Reflex Mini-Game</span>
            </a>
            <a 
              href="#trophies" 
              className="toc-link"
              onClick={() => soundFX.playPop()}
              style={{ color: 'var(--sakura-pink)' }}
            >
              <span className="toc-number" style={{ display: 'inline-flex', alignItems: 'center' }}>
                <Trophy size={14} />
              </span>
              <span>Trophy Cabinet</span>
            </a>
          </nav>
        </div>
      </aside>

      {/* Main Prose Content */}
      <article className="article-body">
        {chapters.map((chapter, index) => (
          <section 
            key={chapter.id} 
            id={chapter.id} 
            className="chapter-section"
          >
            <div className="chapter-header">
              <span className="chapter-number-tag">
                CHAPTER {chapter.number}
              </span>
              <h2 className="chapter-title">
                {chapter.title}
              </h2>
            </div>

            <div 
              className="chapter-prose"
              style={{ fontSize: isLargeFont ? '1.25rem' : '1.08rem' }}
            >
              {chapter.content.split('\n\n').map((paragraph, pIdx) => (
                <p key={pIdx}>{paragraph}</p>
              ))}
            </div>

            {/* Intersperse Pull Quotes */}
            {index === 1 && (
              <div className="editorial-pullquote">
                <p className="pullquote-text">
                  &ldquo;{pullQuotes[0].quote}&rdquo;
                </p>
                <div className="pullquote-cite">
                  — {pullQuotes[0].author} ({pullQuotes[0].context})
                </div>
              </div>
            )}

            {/* Intersperse Gameplay Records Grid in Chapter 3 */}
            {index === 2 && (
              <div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 800, margin: '2rem 0 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Swords size={20} color="var(--snap-yellow)" />
                  Championship Arena Telemetry
                </h3>
                <div className="records-grid">
                  {gameplayRecords.map((rec, rIdx) => (
                    <div 
                      key={rIdx} 
                      className="record-card"
                      onMouseEnter={() => soundFX.playPop()}
                    >
                      <div className="record-game-name">{rec.game}</div>
                      <div className="record-stat-highlight">{rec.record}</div>
                      <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                        {rec.playstyle}
                      </div>
                      <div className="record-badge-row">
                        <span>{rec.category}</span>
                        <span style={{ color: 'var(--emerald-green)', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                          <Flame size={14} /> {rec.winStreak}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Embed the interactive reflex mini-game right in Chapter 3! */}
                <ReflexMiniGame />
              </div>
            )}

            {/* Intersperse Trophy Cabinet in Chapter 4 */}
            {index === 3 && (
              <InteractiveTrophyCabinet trophies={trophies} />
            )}

            {index === 4 && (
              <div className="editorial-pullquote">
                <p className="pullquote-text">
                  &ldquo;{pullQuotes[1].quote}&rdquo;
                </p>
                <div className="pullquote-cite">
                  — {pullQuotes[1].author} ({pullQuotes[1].context})
                </div>
              </div>
            )}
          </section>
        ))}

        {/* Reaction Engine at the bottom of the article */}
        <ReactionEngine />
      </article>
    </div>
  );
}
