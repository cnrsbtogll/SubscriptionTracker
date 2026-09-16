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

export function autoAdvanceOverdue(nextRenewalStr: string, cycle: Cycle, customDays?: number): string {
  if (!nextRenewalStr) return new Date().toISOString();
  const target = new Date(nextRenewalStr);
  if (isNaN(target.getTime())) return new Date().toISOString();

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // If target date is strictly in the past (before today 00:00:00)
  while (target < today) {
    if (cycle === 'weekly') {
      target.setDate(target.getDate() + 7);
    } else if (cycle === 'monthly') {
      const day = target.getDate();
      target.setMonth(target.getMonth() + 1);
      const maxDay = new Date(target.getFullYear(), target.getMonth() + 1, 0).getDate();
      target.setDate(Math.min(day, maxDay));
    } else if (cycle === 'quarterly') {
      const day = target.getDate();
      target.setMonth(target.getMonth() + 3);
      const maxDay = new Date(target.getFullYear(), target.getMonth() + 1, 0).getDate();
      target.setDate(Math.min(day, maxDay));
    } else if (cycle === 'semiannual') {
      const day = target.getDate();
      target.setMonth(target.getMonth() + 6);
      const maxDay = new Date(target.getFullYear(), target.getMonth() + 1, 0).getDate();
      target.setDate(Math.min(day, maxDay));
    } else if (cycle === 'yearly') {
      const day = target.getDate();
      target.setFullYear(target.getFullYear() + 1);
      const maxDay = new Date(target.getFullYear(), target.getMonth() + 1, 0).getDate();
      target.setDate(Math.min(day, maxDay));
    } else if (cycle === 'custom') {
      const days = customDays ?? 30;
      target.setDate(target.getDate() + (days > 0 ? days : 30));
    } else {
      break;
    }
  }
  return target.toISOString();
}

export function formatCycleLabel(cycle: Cycle, t: (key: string) => string, customDays?: number): string {
  if (cycle === 'custom') return `${customDays ?? '?'} ${t('cycle.days')}`;
  return t(`cycle.${cycle}`);
}
