'use client';
import React from 'react';

export default function SocialShareModal({ isOpen, onClose }) {
  if (!isOpen) return null;
  return (
    <div className="share-modal-overlay">
      <div className="share-modal-content">
        <h3>Share this Story</h3>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}
