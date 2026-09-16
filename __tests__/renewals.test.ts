import { nextRenewalDate, daysUntil, monthlyEquivalent, reminderDaysBefore } from '../src/lib/renewals';
import { FIXTURES } from './fixtures';

describe('renewals', () => {
  describe('nextRenewalDate', () => {
    it('monthly subscription: next renewal = +30 days', () => {
      const from = new Date('2026-09-15');
      const result = nextRenewalDate(from, 'monthly');
      expect(result.getDate()).toBe(15);
      expect(result.getMonth()).toBe(9); // Ekim (0-indexed)
      expect(result.getFullYear()).toBe(2026);
    });

    it('yearly subscription: next renewal = +365 days', () => {
      const from = new Date('2026-09-15');
      const result = nextRenewalDate(from, 'yearly');
      expect(result.getFullYear()).toBe(2027);
      expect(result.getMonth()).toBe(8); // Eylül (0-indexed)
    });

    it('weekly subscription: next renewal = +7 days', () => {
      const from = new Date('2026-09-15');
      const result = nextRenewalDate(from, 'weekly');
      expect(result.getDate()).toBe(22);
      expect(result.getMonth()).toBe(8);
    });
  });

  describe('daysUntil', () => {
    it('past date returns negative', () => {
      const days = daysUntil('2025-01-01T00:00:00.000Z');
      expect(days).toBeLessThan(0);
    });

    it('future date returns positive', () => {
      const future = new Date();
      future.setDate(future.getDate() + 10);
      const days = daysUntil(future.toISOString());
      expect(days).toBeGreaterThanOrEqual(9);
      expect(days).toBeLessThanOrEqual(11);
    });
  });

  describe('monthlyEquivalent', () => {
    it('monthly price equals itself /30 * 30', () => {
      const eq = monthlyEquivalent(30, 'monthly');
      expect(eq).toBeCloseTo(30, 1);
    });

    it('yearly / 12 roughly monthly', () => {
      const eq = monthlyEquivalent(360, 'yearly');
      expect(eq).toBeCloseTo(30, 1);
    });
  });

  describe('reminderDaysBefore', () => {
    it('monthly returns [1]', () => {
      expect(reminderDaysBefore('monthly')).toEqual([1]);
    });

    it('yearly returns [7, 1]', () => {
      expect(reminderDaysBefore('yearly')).toEqual([7, 1]);
    });

    it('quarterly returns [7, 1]', () => {
      expect(reminderDaysBefore('quarterly')).toEqual([7, 1]);
    });

    it('semiannual returns [7, 1]', () => {
      expect(reminderDaysBefore('semiannual')).toEqual([7, 1]);
    });

    it('weekly returns [1]', () => {
      expect(reminderDaysBefore('weekly')).toEqual([1]);
    });
  });
});
