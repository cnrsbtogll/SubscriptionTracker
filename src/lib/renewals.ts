import { Cycle } from '../db/schema';

const CYCLE_DAYS: Record<Exclude<Cycle, 'custom'>, number> = {
  weekly: 7,
  monthly: 30,
  quarterly: 91,
  semiannual: 182,
  yearly: 365,
};

const CYCLE_MONTHS: Record<Exclude<Cycle, 'custom'>, number> = {
  weekly: 7 / 30,
  monthly: 1,
  quarterly: 3,
  semiannual: 6,
  yearly: 12,
};

export function nextRenewalDate(from: Date, cycle: Cycle, customDays?: number): Date {
  const d = new Date(from);
  const days = cycle === 'custom' ? (customDays ?? 30) : CYCLE_DAYS[cycle];
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

export function monthlyEquivalent(price: number, cycle: Cycle, customDays?: number): number {
  if (cycle === 'custom') return price / ((customDays ?? 30) / 30);
  return price / CYCLE_MONTHS[cycle];
}

export function reminderDaysBefore(cycle: Cycle): number[] {
  if (cycle === 'weekly' || cycle === 'monthly' || cycle === 'custom') return [1];
  return [7, 1];
}

export function formatCycleLabel(cycle: Cycle, t: (key: string) => string, customDays?: number): string {
  if (cycle === 'custom') return `${customDays ?? '?'} ${t('cycle.days')}`;
  return t(`cycle.${cycle}`);
}
