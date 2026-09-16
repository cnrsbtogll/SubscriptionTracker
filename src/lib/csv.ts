import { Subscription } from '../db/schema';

export function generateCSV(subs: Subscription[]): string {
  const header = 'name,price,currency,cycle,nextRenewal';
  const escapeCSV = (s: string) => {
    if (s.includes(',') || s.includes('"') || s.includes('\n')) {
      return '"' + s.replace(/"/g, '""') + '"';
    }
    return s;
  };
  const rows = subs.map(
    (s) =>
      [
        escapeCSV(s.name),
        s.price.toString(),
        s.currency,
        s.cycle,
        s.nextRenewal,
      ].join(',')
  );
  return [header, ...rows].join('\n');
}
