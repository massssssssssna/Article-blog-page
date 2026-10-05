'use client';

import React, { useEffect, useState } from 'react';

export default function SakuraParticles() {
  const [petals, setPetals] = useState([]);

  useEffect(() => {
    // Generate 24 floating cherry blossom petals
    const generated = Array.from({ length: 24 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 98}%`,
      width: `${Math.random() * 12 + 10}px`,
      height: `${Math.random() * 9 + 8}px`,
      animationDuration: `${Math.random() * 7 + 8}s`,
      animationDelay: `${Math.random() * 6}s`,
      opacity: Math.random() * 0.45 + 0.35
    }));
    setPetals(generated);
  }, []);

  return (
    <div className="sakura-container" aria-hidden="true">
      {petals.map((p) => (
        <div
          key={p.id}
          className="sakura-petal"
          style={{
            left: p.left,
            width: p.width,
            height: p.height,
            animationDuration: p.animationDuration,
            animationDelay: p.animationDelay,
            opacity: p.opacity
          }}
        />
      ))}
    </div>
  );
}
