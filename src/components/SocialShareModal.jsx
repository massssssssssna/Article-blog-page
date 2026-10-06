'use client';

import React, { useState } from 'react';
import { X, Copy, Check, Send, MessageCircle } from 'lucide-react';
import { soundFX } from '../utils/soundFx';

export default function SocialShareModal({ isOpen, onClose, showToast }) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://article.local';

  const handleCopy = () => {
    soundFX.playPop();
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      showToast('Article link copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const shareTwitter = () => {
    soundFX.playPop();
    const text = encodeURIComponent("Read 'The Rise of Urooj Fatima: The Snapchat Gaming Legend' - Unbeaten Streak & Global #1!");
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(currentUrl)}`, '_blank');
  };

  const shareWhatsApp = () => {
    soundFX.playPop();
    const text = encodeURIComponent(`Check out this incredible feature on Urooj Fatima - The Snapchat Gaming Legend: ${currentUrl}`);
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  return (
    <div 
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        backdropFilter: 'blur(8px)',
        zIndex: 1100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem'
      }}
      onClick={onClose}
    >
      <div 
        style={{
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border-accent)',
          borderRadius: 'var(--radius-lg)',
          padding: '2rem',
          maxWidth: '440px',
          width: '100%',
          boxShadow: 'var(--shadow-lg), var(--glow-yellow)',
          position: 'relative'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            background: 'none',
            border: 'none',
            color: 'var(--text-muted)',
            cursor: 'pointer',
            padding: '4px'
          }}
        >
          <X size={20} />
        </button>

        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 800, marginBottom: '0.4rem', color: 'var(--text-primary)' }}>
          Share This Story
        </h3>
        <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
          Spread the word about Urooj Fatima&apos;s record-breaking Snapchat gaming journey!
        </p>

        <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem' }}>
          <button
            onClick={shareTwitter}
            className="control-btn"
            style={{ flex: 1, justifyContent: 'center', padding: '0.7rem' }}
          >
            <Send size={15} />
            Twitter / X
          </button>
          <button
            onClick={shareWhatsApp}
            className="control-btn"
            style={{ flex: 1, justifyContent: 'center', padding: '0.7rem' }}
          >
            <MessageCircle size={15} />
            WhatsApp
          </button>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', background: 'rgba(0, 0, 0, 0.3)', padding: '0.5rem 0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
          <input 
            type="text" 
            readOnly 
            value={currentUrl} 
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-muted)',
              fontSize: '0.85rem',
              width: '100%',
              outline: 'none',
              fontFamily: 'var(--font-mono)'
            }}
          />
          <button
            onClick={handleCopy}
            className="control-btn active"
            style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}
            {copied ? 'Copied' : 'Copy'}
          </button>
        </div>
      </div>
    </div>
  );
}
