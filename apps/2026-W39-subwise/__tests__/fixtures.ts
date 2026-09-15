import { Subscription, Cycle } from '../src/db/schema';
import { nextRenewalDate } from '../src/lib/renewals';

export const FIXTURES = {
  monthlySub: (overrides?: Partial<Subscription>): Subscription => ({
    id: 'test-1',
    name: 'Netflix',
    price: 9.99,
    currency: 'USD',
    cycle: 'monthly',
    nextRenewal: nextRenewalDate(new Date(), 'monthly').toISOString(),
    color: '#E50914',
    icon: '🎬',
    notes: '',
    ...overrides,
  }),

  yearlySub: (overrides?: Partial<Subscription>): Subscription => ({
    id: 'test-2',
    name: 'iCloud+',
    price: 29.99,
    currency: 'USD',
    cycle: 'yearly',
    nextRenewal: nextRenewalDate(new Date(), 'yearly').toISOString(),
    color: '#007AFF',
    icon: '☁️',
    notes: '',
    ...overrides,
  }),

  pastSub: (): Subscription => ({
    id: 'test-3',
    name: 'Spotify',
    price: 4.99,
    currency: 'EUR',
    cycle: 'monthly',
    nextRenewal: '2025-01-01T00:00:00.000Z', // geçmiş tarih
    color: '#1DB954',
    icon: '🎵',
    notes: '',
  }),
};
