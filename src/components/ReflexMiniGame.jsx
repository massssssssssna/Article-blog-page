'use client';
import React, { useState } from 'react';

export default function ReflexMiniGame() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);

  return (
    <div className="arcade-cabinet">
      <h3>Snap Reflex Arcade</h3>
      <button onClick={() => setIsPlaying(!isPlaying)}>
        {isPlaying ? 'Pause' : 'Start Challenge'}
      </button>
    </div>
  );
}
