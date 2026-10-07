/**
 * Utility for calculating live dynamic Snapchat streak and snap score.
 * 
 * Rules:
 * - Current Base Streak: 295
 * - Current Base Snap Score: 204,499
 * - Daily Rollover Cutoff: 5:00 AM local time (Subha 5:00 baje ke baad daily rollover)
 * - Daily Increment: +1 Streak, +400 Snap Score every day after 05:00 AM
 */

export const BASE_STREAK = 295;
export const BASE_SCORE = 204499;
export const DAILY_SCORE_STEP = 400;
export const RESET_HOUR = 5; // 5:00 AM daily reset boundary

/**
 * Returns normalized timestamp for the start of the "streak day" (5:00 AM boundary).
 * Times between 00:00:00 and 04:59:59 belong to the previous streak day.
 * At exactly 05:00:00 AM, the new streak day begins.
 */
export function getEffectiveStreakDay(date = new Date()) {
  const d = new Date(date);
  // Shift back by RESET_HOUR (5 hours): 00:00 - 04:59 shifts to previous calendar day
  const shifted = new Date(d.getTime() - (RESET_HOUR * 60 * 60 * 1000));
  return new Date(shifted.getFullYear(), shifted.getMonth(), shifted.getDate()).getTime();
}

export function getLiveStreakAndScore(customDate = null) {
  // Support optional URL query parameter for instant preview/testing: ?day=1 or ?streakDay=1
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
  const currentStreakDay = getEffectiveStreakDay(now);

  let anchorStreakDay = null;

  // Use persistent anchor in client browser storage with fresh v3 key
  if (typeof window !== 'undefined' && window.localStorage) {
    try {
      const STORAGE_KEY = 'urooj_snap_streak_anchor_295_v3';
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = parseInt(stored, 10);
        if (!isNaN(parsed) && parsed <= currentStreakDay) {
          anchorStreakDay = parsed;
        }
      }
      if (!anchorStreakDay) {
        // Set first visit / today as anchor
        window.localStorage.setItem(STORAGE_KEY, currentStreakDay.toString());
        anchorStreakDay = currentStreakDay;
      }
    } catch {
      // Ignore localStorage errors
    }
  }

  // Fallback for SSR or if localStorage is not set
  if (!anchorStreakDay) {
    const base2026Day = getEffectiveStreakDay(new Date(2026, 9, 7, 12, 0, 0));
    if (currentStreakDay >= base2026Day) {
      anchorStreakDay = base2026Day;
    } else {
      anchorStreakDay = currentStreakDay;
    }
  }

  const msInDay = 24 * 60 * 60 * 1000;
  const daysDiff = Math.max(0, Math.floor((currentStreakDay - anchorStreakDay) / msInDay));

  const streak = BASE_STREAK + daysDiff;
  const score = BASE_SCORE + (daysDiff * DAILY_SCORE_STEP);

  return {
    streak,
    score,
    formattedScore: score.toLocaleString('en-US'),
    daysElapsed: daysDiff
  };
}

/**
 * Calculates the exact next 5:00 AM rollover timestamp.
 */
export function getNextRolloverTimestamp(currentDate = new Date()) {
  const d = new Date(currentDate);
  const nextReset = new Date(d);
  if (d.getHours() >= RESET_HOUR) {
    nextReset.setDate(d.getDate() + 1);
  }
  nextReset.setHours(RESET_HOUR, 0, 0, 0);
  return nextReset.getTime();
}

