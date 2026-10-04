'use client';
import React, { useState, useEffect } from 'react';
import { Play, RotateCcw } from 'lucide-react';
import { playPop, playClick } from '../utils/soundFx';

export default function ReflexMiniGame() {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!isPlaying || timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
    return () => clearInterval(timer);
  }, [isPlaying, timeLeft]);

  return (
    <div className="arcade-cabinet">
      <div className="arcade-header">
        <span>Score: {score}</span>
        <span>Time: {timeLeft}s</span>
      </div>
    </div>
  );
}
