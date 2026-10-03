import { TEMPLATES } from '../src/lib/templates';
import { useSubscriptions } from '../src/state/useSubscriptions';
import { Currency } from '../src/db/schema';
import { nextRenewalDate } from '../src/lib/renewals';

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn().mockResolvedValue(null),
  setItem: jest.fn().mockResolvedValue(null),
}));

describe('Onboarding subscription creation', () => {
  it('creates subscriptions with the template colors and properties', async () => {
    const netflixTpl = TEMPLATES.find((t) => t.name === 'Netflix')!;
    expect(netflixTpl).toBeDefined();

    const newSub = {
      id: 'sub-test-onboarding',
      name: netflixTpl.name,
      price: netflixTpl.price,
      currency: netflixTpl.currency as Currency,
      cycle: 'monthly' as const,
      nextRenewal: nextRenewalDate(new Date(), 'monthly').toISOString(),
      color: netflixTpl.color,
      icon: netflixTpl.icon,
      notes: '',
    };

    const added = await useSubscriptions.getState().add(newSub);
    expect(added).toBe(true);

    const subs = useSubscriptions.getState().subs;
    const found = subs.find((s) => s.id === 'sub-test-onboarding');
    expect(found).toBeDefined();
    expect(found?.color).toBe(netflixTpl.color);
    expect(found?.name).toBe('Netflix');
  });
});
