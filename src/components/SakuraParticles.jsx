'use client';
import React, { useEffect, useRef } from 'react';

export default function SakuraParticles() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      animId = requestAnimationFrame(render);
    };
    render();

    return () => cancelAnimationFrame(animId);
  }, []);

  return <canvas ref={canvasRef} className="sakura-canvas" />;
}
