'use client';
import React from 'react';

export default function ArticleLayout({ children }) {
  return (
    <div className="article-container">
      <div className="article-body">{children}</div>
    </div>
  );
}
