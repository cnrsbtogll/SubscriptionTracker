import { Currency, Cycle } from '../db/schema';

export interface Template {
  name: string;
  icon: string;
  price: number;
  currency: Currency;
  cycle: Cycle;
  color: string;
}

export const TEMPLATES: Template[] = [
  { name: 'Netflix', icon: '🎬', price: 9.99, currency: 'USD', cycle: 'monthly', color: '#EF4444' },
  { name: 'Spotify', icon: '🎵', price: 5.99, currency: 'USD', cycle: 'monthly', color: '#10B981' },
  { name: 'YouTube Premium', icon: '▶️', price: 13.99, currency: 'USD', cycle: 'monthly', color: '#EF4444' },
  { name: 'Disney+', icon: '✨', price: 7.99, currency: 'USD', cycle: 'monthly', color: '#3B82F6' },
  { name: 'Amazon Prime', icon: '📦', price: 8.99, currency: 'USD', cycle: 'monthly', color: '#F59E0B' },
  { name: 'Apple TV+', icon: '🍎', price: 9.99, currency: 'USD', cycle: 'monthly', color: '#0F172A' },
  { name: 'iCloud+', icon: '☁️', price: 0.99, currency: 'USD', cycle: 'monthly', color: '#3B82F6' },
  { name: 'PlayStation Plus', icon: '🎮', price: 9.99, currency: 'USD', cycle: 'monthly', color: '#3B82F6' },
  { name: 'Game Pass', icon: '🎯', price: 16.99, currency: 'USD', cycle: 'monthly', color: '#10B981' },
  { name: 'ChatGPT Plus', icon: '🤖', price: 20, currency: 'USD', cycle: 'monthly', color: '#10B981' },
  { name: 'BluTV', icon: '📺', price: 149.99, currency: 'TRY', cycle: 'monthly', color: '#3B82F6' },
  { name: 'Exxen', icon: '🎭', price: 119.99, currency: 'TRY', cycle: 'monthly', color: '#EF4444' },
  { name: 'Gain', icon: '🏆', price: 99.99, currency: 'TRY', cycle: 'monthly', color: '#F59E0B' },
  { name: 'Tabii', icon: '🌙', price: 99.99, currency: 'TRY', cycle: 'monthly', color: '#8B5CF6' },
  { name: 'Dropbox', icon: '📂', price: 9.99, currency: 'USD', cycle: 'monthly', color: '#3B82F6' },
  { name: 'VPN', icon: '🔒', price: 3.99, currency: 'USD', cycle: 'monthly', color: '#6366F1' },
];

/** Bilinen bir servis adı için varsayılan template döner (Netflix → 9.99 USD). */
export function defaultPriceFor(name: string): Template | null {
  const n = name.trim().toLowerCase();
  return TEMPLATES.find((t) => t.name.toLowerCase() === n) ?? null;
}