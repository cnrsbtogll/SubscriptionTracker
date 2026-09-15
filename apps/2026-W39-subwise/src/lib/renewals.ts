import { Cycle } from '../db/schema';

const CYCLE_DAYS: Record<Cycle, number> = {
  weekly: 7,
  monthly: 30,
  quarterly: 91,
  semiannual: 182,
  yearly: 365,
};

const CYCLE_MONTHS: Record<Cycle, number> = {
  weekly: 7 / 30,
  monthly: 1,
  quarterly: 3,
  semiannual: 6,
  yearly: 12,
};

export function nextRenewalDate(from: Date, cycle: Cycle): Date {
  const d = new Date(from);
  const days = CYCLE_DAYS[cycle];
  d.setDate(d.getDate() + days);
  return d;
}

export function daysUntil(dateStr: string): number {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const target = new Date(dateStr);
  target.setHours(0, 0, 0, 0);
  return Math.ceil((target.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
}

export function monthlyEquivalent(price: number, cycle: Cycle): number {
  return price / CYCLE_MONTHS[cycle];
}

export function reminderDaysBefore(cycle: Cycle): number[] {
  if (cycle === 'weekly' || cycle === 'monthly') return [1];
  return [7, 1];
}

export function formatCycleLabel(cycle: Cycle, t: (key: string) => string): string {
  return t(`cycle.${cycle}`);
}
