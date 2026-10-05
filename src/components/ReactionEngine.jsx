'use client';

import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { soundFX } from '../utils/soundFx';

const initialReactions = [
  { id: 'fire', emoji: '🔥', label: 'Hype', count: 482 },
  { id: 'trophy', emoji: '🏆', label: 'Legend', count: 395 },
  { id: 'zap', emoji: '⚡', label: 'Fast Reflex', count: 284 },
  { id: 'heart', emoji: '💖', label: 'Inspiring', count: 521 },
  { id: 'mindblown', emoji: '🤯', label: 'Tactical Mind', count: 310 }
];

export default function ReactionEngine() {
  const [reactions, setReactions] = useState(initialReactions);
  const [userClicked, setUserClicked] = useState({});

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedCounts = localStorage.getItem('urooj_article_reactions');
      if (savedCounts) {
        try {
          setReactions(JSON.parse(savedCounts));
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
    <div class
}
