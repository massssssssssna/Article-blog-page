import assert from 'node:assert';
import { 
  BASE_STREAK, 
  BASE_SCORE, 
  DAILY_SCORE_STEP, 
  RESET_HOUR,
  getEffectiveStreakDay,
  getNextRolloverTimestamp
} from '../src/utils/streakCalculator.js';

console.log('🧪 Running Streak Calculator & 5 AM Rollover Test Suite...\n');

// Test 1: Verify baseline constants
assert.strictEqual(BASE_STREAK, 295, 'Base streak must start at 295');
assert.strictEqual(BASE_SCORE, 204499, 'Base score must start at 204,499');
assert.strictEqual(DAILY_SCORE_STEP, 400, 'Daily score step must be 400');
assert.strictEqual(RESET_HOUR, 5, 'Reset hour must be 5:00 AM');
console.log('✓ Test 1 Passed: Constants verified (295 streak, 204,499 score, 5 AM cutoff)');

// Test 2: Verify 5:00 AM daily rollover cycle
const baseMidnight = getEffectiveStreakDay('2026-10-07T20:49:00');
const msInDay = 24 * 60 * 60 * 1000;

function calcForDate(dateStr) {
  const cur = getEffectiveStreakDay(dateStr);
  const diff = Math.max(0, Math.floor((cur - baseMidnight) / msInDay));
  return {
    streak: BASE_STREAK + diff,
    score: BASE_SCORE + (diff * DAILY_SCORE_STEP),
    diff
  };
}

// 2a. Today evening (8:49 PM) -> Streak 295
const todayEvening = calcForDate('2026-10-07T20:49:00');
assert.strictEqual(todayEvening.streak, 295, 'Today evening must have 295 streak');
assert.strictEqual(todayEvening.score, 204499, 'Today evening must have 204,499 score');
console.log('✓ Test 2a Passed: Today evening stays at 295 streak & 204,499 score');

// 2b. Tonight 2:00 AM (before 5 AM) -> Must still be 295
const lateNight = calcForDate('2026-10-08T02:00:00');
assert.strictEqual(lateNight.streak, 295, 'Late night before 5 AM must still be 295 streak');
console.log('✓ Test 2b Passed: Late night (02:00 AM) before 5 AM stays at 295 streak');

// 2c. Early morning 4:59 AM (before 5 AM) -> Must still be 295
const preDawn = calcForDate('2026-10-08T04:59:59');
assert.strictEqual(preDawn.streak, 295, '4:59 AM before 5 AM must still be 295 streak');
console.log('✓ Test 2c Passed: 04:59:59 AM stays at 295 streak');

// 2d. Exact 5:00 AM morning rollover -> Must increment to 296 & 204,899 (+400)
const post5AM = calcForDate('2026-10-08T05:00:00');
assert.strictEqual(post5AM.streak, 296, '5:00 AM must increment streak to 296');
assert.strictEqual(post5AM.score, 204899, '5:00 AM must increment score to 204,899 (+400)');
console.log('✓ Test 2d Passed: 05:00:00 AM rolls over to 296 streak & 204,899 score (+400)');

// 2e. Day 2 after 5:00 AM -> Must increment to 297 & 205,299 (+800)
const dayTwo = calcForDate('2026-10-09T05:01:00');
assert.strictEqual(dayTwo.streak, 297, 'Day 2 must increment streak to 297');
assert.strictEqual(dayTwo.score, 205299, 'Day 2 must increment score to 205,299');
console.log('✓ Test 2e Passed: Day 2 rolls over to 297 streak & 205,299 score');

// Test 3: Next rollover countdown calculation
const nextRollover = getNextRolloverTimestamp('2026-10-07T20:00:00');
const nextDate = new Date(nextRollover);
assert.strictEqual(nextDate.getHours(), 5, 'Next rollover hour must be 5:00 AM');
assert.strictEqual(nextDate.getDate(), 8, 'Next rollover must be on the next calendar morning');
console.log('✓ Test 3 Passed: Next rollover correctly targets tomorrow at 5:00 AM');

console.log('\n🎉 ALL 6 SUITE TESTS PASSED 100% CLEANLY!\n');
