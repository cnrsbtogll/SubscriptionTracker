export type Currency = 'TRY' | 'USD' | 'EUR' | 'GBP';
export type Cycle = 'weekly' | 'monthly' | 'quarterly' | 'semiannual' | 'yearly' | 'custom';

export interface Subscription {
  id: string;
  name: string;
  price: number;
  currency: Currency;
  cycle: Cycle;
  customDays?: number; // only used when cycle === 'custom'
  nextRenewal: string; // ISO date string
  color: string;
  icon: string;
  notes: string;
}

export interface StoragePayload {
  version: number;
  subscriptions: Subscription[];
}
