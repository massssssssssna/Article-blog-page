'use client';

import React, { useState, useRef, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Zap, RotateCcw, Award, Play } from 'lucide-react';
import { soundFX } from '../utils/soundFx';

export default function ReflexMiniGame() {
  const [gameState, setGameState] = useState('idle'); // idle | waiting | ready | result
  const [reactionTime, setReactionTime] = useState(null);
  const [bestScore, setBestScore] = useState(null);
  const [targetPos, setTargetPos] = useState({ top: '50%', left: '50%' });
  const [ratingMessage, setRatingMessage] = useState('');

  const startTimeRef = useRef(0);
  const timerTimeoutRef = useRef(null);

  useEffect(() => {
    // Load best score from local storage
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('urooj_reflex_best');
      if (saved) setBestScore(parseInt(saved, 10));
    }
    return () => {
      if (timerTimeoutRef.current) clearTimeout(timerTimeoutRef.current);
    };
  }, []);

  const startGame = () => {
    soundFX.playPop();
    setGameState('waiting');
    setReactionTime(null);
    setRatingMessage('');

    const randomDelay = Math.floor(Math.random() * 2000) + 1500;

    timerTimeoutRef.current = setTimeout(() => {
      // Spawn target in random bounding area
      const randomTop = Math.floor(Math.random() * 60) + 20; // 20% to 80%
      const randomLeft = Math.floor(Math.random() * 70) + 15; // 15% to 85%
      setTargetPos({ top: `${randomTop}%`, left: `${randomLeft}%` });

      startTimeRef.current = Date.now();
      setGameState('ready');
    }, randomDelay);
  };

  const handleTargetClick = (e) => {
    e.stopPropagation();
    if (gameState !== 'ready') return;

    const elapsed = Date.now() - startTimeRef.current;
    setReactionTime(elapsed);
    setGameState('result');

    // Update best score
    if (!bestScore || elapsed < bestScore) {
      setBestScore(elapsed);
      if (typeof window !== 'undefined') {
        localStorage.setItem('urooj_reflex_best', elapsed.toString());
      }
    }

    // Evaluate score against Urooj's 218ms benchmark
    if (elapsed <= 220) {
      soundFX.playTargetHit(true);
      soundFX.playTrophyChime();
      setRatingMessage('🔥 UROOJ-TIER GODLIKE REFLEXES! You matched the Snapchat Legend!');
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } else if (elapsed <= 280) {
      soundFX.playTargetHit(false);
      setRatingMessage('⚡ Pro Mobile Reflexes! You can hold your own in top lobbies.');
    } else if (elapsed <= 360) {
      soundFX.playTargetHit(false);
      setRatingMessage('👍 Solid reflexes! But Urooj would have cut your perimeter already.');
    } else {
      soundFX.playPop();
      setRatingMessage('🐢 Too slow! Color Galaxy territory lost to the Sakura Queen.');
    }
  };

  const handleEarlyClick = () => {
    if (gameState === 'waiting') {
      clearTimeout(timerTimeoutRef.current);
      setGameState('idle');
      soundFX.playPop();
      setRatingMessage('⚠️ Too early! Wait for the snap target to appear before striking.');
    }
  };

  return (
    <div className="reflex-game-card" id="reflex-arena">
      <div className="reflex-header">
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: 'var(--sakura-pink)', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.4rem' }}>
          <Zap size={14} />
          INTERACTIVE ARENA CHALLENGE
        </div>
        <h3 className="reflex-title">Beat Urooj&apos;s 218ms Reflex Benchmark</h3>
        <p className="reflex-desc">
          Test your touchscreen reaction speed against Urooj Fatima&apos;s certified tournament benchmark. Click the target the millisecond it flashes!
        </p>
      </div>

      <div 
        className="reflex-target-arena"
        onClick={handleEarlyClick}
      >
        {gameState === 'idle' && (
          <button 
            id="start-reflex-btn"
            className="control-btn active"
            style={{ fontSize: '1rem', padding: '0.8rem 1.8rem' }}
            onClick={startGame}
          >
            <Play size={18} />
            Start Reflex Challenge
          </button>
        )}

        {gameState === 'waiting' && (
          <div style={{ textAlign: 'center', color: 'var(--snap-yellow)', fontFamily: 'var(--font-mono)' }}>
            <div style={{ fontSize: '1.2rem', fontWeight: 800, animation: 'pulseTarget 0.5s infinite alternate' }}>
              WAIT FOR THE TARGET...
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.4rem' }}>
              (Do not click until it snaps onto the arena!)
            </div>
          </div>
        )}

        {gameState === 'ready' && (
          <div 
            id="reflex-active-target"
            className="target-orb"
            style={{ top: targetPos.top, left: targetPos.left }}
            onClick={handleTargetClick}
          >
            🎯
          </div>
        )}

        {gameState === 'result' && (
          <div style={{ textAlign: 'center', zIndex: 10 }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '2.5rem', fontWeight: 900, color: reactionTime <= 220 ? 'var(--snap-yellow)' : 'var(--text-primary)' }}>
              {reactionTime} ms
            </div>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginTop: '0.4rem', fontWeight: 600 }}>
              {ratingMessage}
            </div>
            <button 
              id="retry-reflex-btn"
              className="control-btn"
              style={{ marginTop: '1.25rem', borderColor: 'var(--border-accent)' }}
              onClick={startGame}
            >
              <RotateCcw size={15} />
              Try Again
            </button>
          </div>
        )}
      </div>

      {ratingMessage && gameState === 'idle' && (
        <div style={{ textAlign: 'center', marginTop: '1rem', color: 'var(--sakura-pink)', fontSize: '0.9rem', fontWeight: 600 }}>
          {ratingMessage}
        </div>
      )}

      <div className="game-score-display">
        <div className="score-box">
          <div className="score-num" style={{ color: 'var(--snap-yellow)' }}>218 ms</div>
          <div className="score-lbl">Urooj Fatima&apos;s Record</div>
        </div>
        <div className="score-box">
          <div className="score-num">
            {reactionTime ? `${reactionTime} ms` : '--'}
          </div>
          <div className="score-lbl">Your Latest Attempt</div>
        </div>
        <div className="score-box">
          <div className="score-num" style={{ color: 'var(--sakura-pink)' }}>
            {bestScore ? `${bestScore} ms` : '--'}
          </div>
          <div className="score-lbl">Your Personal Best</div>
        </div>
      </div>
    </div>
  );
}
