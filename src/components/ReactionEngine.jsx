'use client';

import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Flame, Trophy, Zap, Heart, Sparkles } from 'lucide-react';
import { soundFX } from '../utils/soundFx';

const REACTION_ICONS = {
  fire: Flame,
  trophy: Trophy,
  zap: Zap,
  heart: Heart,
  mindblown: Sparkles
};

const initialReactions = [
  { id: 'fire', label: 'Hype', count: 482 },
  { id: 'trophy', label: 'Legend', count: 395 },
  { id: 'zap', label: 'Fast Reflex', count: 284 },
  { id: 'heart', label: 'Inspiring', count: 521 },
  { id: 'mindblown', label: 'Tactical Mind', count: 310 }
];

export default function ReactionEngine() {
  const [reactions, setReactions] = useState(initialReactions);
  const [userClicked, setUserClicked] = useState({});

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedCounts = localStorage.getItem('urooj_article_reactions');
      if (savedCounts) {
        try {
          const parsed = JSON.parse(savedCounts);
          if (Array.isArray(parsed)) {
            setReactions(parsed);
          }
        } catch (e) {}
      }
      const savedUser = localStorage.getItem('urooj_user_reactions');
      if (savedUser) {
        try {
          setUserClicked(JSON.parse(savedUser));
        } catch (e) {}
      }
    }
  }, []);

  const handleReact = (id) => {
    soundFX.playPop();

    const updated = reactions.map(r => {
      if (r.id === id) {
        return { ...r, count: r.count + 1 };
      }
      return r;
    });

    const updatedUser = { ...userClicked, [id]: true };

    setReactions(updated);
    setUserClicked(updatedUser);

    if (typeof window !== 'undefined') {
      localStorage.setItem('urooj_article_reactions', JSON.stringify(updated));
      localStorage.setItem('urooj_user_reactions', JSON.stringify(updatedUser));
    }

    // Micro particle burst
    confetti({
      particleCount: 20,
      spread: 45,
      origin: { y: 0.85 }
    });
  };

  return (
    <div className="reactions-panel" id="reactions">
      <h4 className="reactions-title">What did you think of the Legend&apos;s story?</h4>
      <p className="reactions-sub">
        Leave your instant reaction to celebrate Urooj Fatima&apos;s achievements!
      </p>

      <div className="reactions-btn-row">
        {reactions.map((item) => {
          const hasVoted = !!userClicked[item.id];
          const IconComponent = REACTION_ICONS[item.id] || Sparkles;
          return (
            <button
              key={item.id}
              className={`reaction-btn ${hasVoted ? 'active' : ''}`}
              onClick={() => handleReact(item.id)}
              title={`React with ${item.label}`}
              type="button"
            >
              <IconComponent size={18} className="reaction-svg-icon" />
              <span>{item.label}</span>
              <span className="reaction-count">{item.count}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
