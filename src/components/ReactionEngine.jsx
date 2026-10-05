'use client';
import React, { useState } from 'react';

export default function ReactionEngine() {
  const [reactions, setReactions] = useState({ fire: 142, crown: 89, skull: 47, heart: 120 });
  return (
    <div className="reaction-engine">
      <div className="reaction-pills">
        {Object.entries(reactions).map(([key, count]) => (
          <button key={key} className="reaction-pill">{key}: {count}</button>
        ))}
      </div>
    </div>
  );
}
