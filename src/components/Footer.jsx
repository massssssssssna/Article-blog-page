'use client';

import React, { useState, useEffect } from 'react';
import { ArrowUp, Sparkles, Terminal, Code2 } from 'lucide-react';
import { soundFX } from '../utils/soundFx';

export default function Footer({ meta }) {
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    const checkScroll = () => {
      setShowTopBtn(window.scrollY > 400);
    };
    window.addEventListener('scroll', checkScroll, { passive: true });
    return () => window.removeEventListener('scroll', checkScroll);
  }, []);

  const scrollToTop = () => {
    soundFX.playPop();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <footer className="site-footer">
        <div className="footer-inner">
          <div className="footer-top">
            <div className="footer-brand">
              <h3>Urooj Fatima: The Snapchat Gaming Legend</h3>
              <p>
                An interactive high-fidelity editorial chronicle covering the competitive dominance, cultural impact, and tactical genius of mobile gaming&apos;s reigning champion.
              </p>
            </div>

            {/* Stitch Project & Screen Metadata Attribution */}
            <div className="stitch-meta-box">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.4rem', color: 'var(--text-primary)', fontWeight: 700 }}>
                <Terminal size={14} color="var(--snap-yellow)" />
                STITCH INTEGRATION TELEMETRY
              </div>
              <div>Project: <span>Project Creation Hub</span></div>
              <div>Project ID: <span>{meta.projectHubId}</span></div>
              <div>Screen ID: <span>{meta.screenId}</span></div>
              <div>Screen Name: <span>{meta.screenTitle}</span></div>
      
}
