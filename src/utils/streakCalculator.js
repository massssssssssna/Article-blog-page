/**
 * Utility for calculating live dynamic Snapchat streak and snap score.
 * 
 * Base Reference:
 * - Base Streak: 294
 * - Base Snap Score: 204,099
 * - Daily Streak Increment: +1 every calendar day
 * - Daily Score Increment: +400 every calendar day
 */

export const BASE_STREAK = 294;
export const BASE_SCORE = 204099;
export const DAILY_SCORE_STEP = 400;

export function getLiveStreakAndScore(customDate = null) {
  // Support optional URL query parameter for instant preview/testing: ?day=1 or ?streakDays=1
  if (typeof window !== 'undefined' && window.location && window.location.search) {
    try {
      const params = new URLSearchParams(window.location.search);
      const testDay = params.get('day') || params.get('streakDay');
      if (testDay !== null && !isNaN(parseInt(testDay, 10))) {
        const offset = parseInt(testDay, 10);
        const simStreak = BASE_STREAK + offset;
        const simScore = BASE_SCORE + (offset * DAILY_SCORE_STEP);
        return {
          streak: simStreak,
          score: simScore,
          formattedScore: simScore.toLocaleString('en-US'),
          daysElapsed: offset
        };
      }
    } catch {
      // Ignore URL parsing errors
    }
  }

  const now = customDate ? new Date(customDate) : new Date();
  const currentMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();

  let anchorMidnight = null;

  // Use persistent anchor in client browser storage
  if (typeof window !== 'undefined' && window.localStorage) {
    try {
      const stored = window.localStorage.getItem('urooj_snap_streak_anchor_v2');
      if (stored) {
        const parsed = parseInt(stored, 10);
        if (!isNaN(parsed) && parsed <= currentMidnight) {
          anchorMidnight = parsed;
        }
      }
      if (!anchorMidnight) {
        // Set first visit / today as anchor
        window.localStorage.setItem('urooj_snap_streak_anchor_v2', currentMidnight.toString());
        anchorMidnight = currentMidnight;
      }
    } catch {
      // Ignore localStorage errors
    }
  }

  // Fallback for SSR or if localStorage is not set
  if (!anchorMidnight) {
    const base2026 = new Date(2026, 9, 7).getTime();
    if (currentMidnight >= base2026) {
      anchorMidnight = base2026;
    } else {
      anchorMidnight = currentMidnight;
    }
  }

  const msInDay = 24 * 60 * 60 * 1000;
  const daysDiff = Math.max(0, Math.floor((currentMidnight - anchorMidnight) / msInDay));

  const streak = BASE_STREAK + daysDiff;
  const score = BASE_SCORE + (daysDiff * DAILY_SCORE_STEP);

  return {
    streak,
    score,
    formattedScore: score.toLocaleString('en-US'),
    daysElapsed: daysDiff
  };
}
