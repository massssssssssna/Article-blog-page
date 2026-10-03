'use client';

import React from 'react';
import { Trophy, Flame, Target, Zap, Users } from 'lucide-react';
import { soundFX } from '../utils/soundFx';

const iconMap = {
  Trophy: Trophy,
  Flame: Flame,
  Target: Target,
  Zap: Zap,
  Users: Users
};

export default function QuickStatsBar({ stats }) {
  return (
    <div className="metrics-grid" id="metrics-grid">
      {stats.map((stat, idx) => {
        const IconComponent = iconMap[stat.icon] || Trophy;
        return (
          <div 
            key={idx} 
            className="metric-card"
            onMouseEnter={() => soundFX.playPop()}
          >
            <div className="metric-icon-wrap">
              <IconComponent size={22} />
            </div>
            <div className="metric-val">{stat.value}</div>
            <div className="metric-label">{stat.label}</div>
            <div className="metric-sub">{stat.subtext}</div>
          </div>
        );
      })}
    </div>
  );
}
