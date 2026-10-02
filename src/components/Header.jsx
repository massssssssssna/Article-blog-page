'use client';
import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';

export default function Header() {
  return (
    <header className="site-header">
      <div className="header-inner">
        <div className="brand-group">
          <Sparkles className="brand-icon" size={20} />
          <span className="brand-title">The Fatima Gazette</span>
          <span className="edition-badge">Issue #77</span>
        </div>
      </div>
    </header>
  );
}
