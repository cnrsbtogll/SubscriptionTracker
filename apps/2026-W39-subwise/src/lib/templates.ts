import { Currency } from '../db/schema';

export interface Template {
  name: string;
  icon: string;
  price: number;
  currency: Currency;
}

export const TEMPLATES: Template[] = [
  { name: 'Netflix', icon: '🎬', price: 9.99, currency: 'USD' },
  { name: 'Spotify', icon: '🎵', price: 5.99, currency: 'USD' },
  { name: 'YouTube Premium', icon: '▶️', price: 13.99, currency: 'USD' },
  { name: 'iCloud+', icon: '☁️', price: 0.99, currency: 'USD' },
  { name: 'PlayStation Plus', icon: '🎮', price: 9.99, currency: 'USD' },
  { name: 'Game Pass', icon: '🎯', price: 16.99, currency: 'USD' },
  { name: 'VPN', icon: '🔒', price: 3.99, currency: 'USD' },
];

/** Bilinen bir servis adı için varsayılan fiyat döner (Netflix → 9.99 USD). */
export function defaultPriceFor(name: string): Template | null {
  const n = name.trim().toLowerCase();
  return TEMPLATES.find((t) => t.name.toLowerCase() === n) ?? null;
}