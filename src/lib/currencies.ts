import { Currency } from '../db/schema';

export const CURRENCY_SYMBOLS: Record<Currency, string> = {
  TRY: '₺',
  USD: '$',
  EUR: '€',
  GBP: '£',
};

export function currencySymbol(currency: Currency): string {
  return CURRENCY_SYMBOLS[currency] ?? currency;
}

export function formatPrice(price: number | string, currency: Currency): string {
  const sym = currencySymbol(currency);
  return `${sym}${price}`;
}
