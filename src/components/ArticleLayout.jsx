'use client';

import React, { useState, useEffect } from 'react';
import { BookOpen, Award, Swords, Flame, Sparkles } from 'lucide-react';
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
              <span className="toc-number">⚡</span>
              <span>Reflex Mini-Game</span>
            </a>
            <a 
              href="#trophies" 
              className="toc-link"
              onClick={() => soundFX.playPop()}
              style={{ color: 'var(--sakura-pink)' }}
            >
              <span className="toc-number">🏆</span>
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
                {chapt
}
