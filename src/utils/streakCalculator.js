/**
 * Utility for calculating live dynamic Snapchat streak and snap score.
 * 
 * Base Reference:
 * - Date: October 7, 2026
 * - Base Streak: 294
 * - Base Snap Score: 204,099
 * - Daily Streak Increment: +1 per day
 * - Daily Score Increment: +400 per day
 */

const BASE_YEAR = 2026;
const BASE_MONTH = 9; // October (0-indexed: 0=Jan, 9=Oct)
const BASE_DAY = 7;

export const BASE_STREAK = 294;
export const BASE_SCORE = 204099;
export const DAILY_SCORE_STEP = 400;

export function getLiveStreakAndScore(currentDate = new Date()) {
  const baseDate = new Date(BASE_YEAR, BASE_MONTH, BASE_DAY);
  
  // Normalize both dates to midnight local time for precise calendar day calculation
  const startOfBase = new Date(baseDate.getFullYear(), baseDate.getMonth(), baseDate.getDate()).getTime();
  const startOfNow = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()).getTime();
  
  const msInDay = 24 * 60 * 60 * 1000;
  // Calculate full calendar days passed since baseline
  const daysDiff = Math.max(0, Math.floor((startOfNow - startOfBase) / msInDay));
  
  const streak = BASE_STREAK + daysDiff;
  const score = BASE_SCORE + (daysDiff * DAILY_SCORE_STEP);
  
  return {
    streak,
    score,
    formattedScore: score.toLocaleString('en-US'),
    daysElapsed: daysDiff
  };
}
