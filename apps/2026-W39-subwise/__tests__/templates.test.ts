import { defaultPriceFor, TEMPLATES } from '../src/lib/templates';

describe('templates', () => {
  it('Netflix has a default price of 9.99 USD', () => {
    const tpl = defaultPriceFor('Netflix');
    expect(tpl).not.toBeNull();
    expect(tpl!.price).toBe(9.99);
    expect(tpl!.currency).toBe('USD');
  });

  it('is case-insensitive', () => {
    const tpl = defaultPriceFor('  netflix ');
    expect(tpl).not.toBeNull();
    expect(tpl!.name).toBe('Netflix');
  });

  it('all templates have positive prices', () => {
    for (const tpl of TEMPLATES) {
      expect(tpl.price).toBeGreaterThan(0);
    }
  });

  it('unknown service returns null', () => {
    expect(defaultPriceFor('Not A Service')).toBeNull();
  });
});