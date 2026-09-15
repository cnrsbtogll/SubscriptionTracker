export type Currency = 'TRY' | 'USD' | 'EUR' | 'GBP';
export type Cycle = 'weekly' | 'monthly' | 'quarterly' | 'semiannual' | 'yearly';

export interface Subscription {
  id: string;
  name: string;
  price: number;
  currency: Currency;
  cycle: Cycle;
  nextRenewal: string; // ISO date string
  color: string;
  icon: string;
  notes: string;
}

export interface StoragePayload {
  version: number;
  subscriptions: Subscription[];
}
