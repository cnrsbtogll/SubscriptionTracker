import { generateCSV } from '../src/lib/csv';
import { FIXTURES } from './fixtures';

describe('csv', () => {
  it('generates correct header', () => {
    const csv = generateCSV([]);
    expect(csv).toBe('name,price,currency,cycle,nextRenewal');
  });

  it('escapes Turkish characters in name', () => {
    const sub = FIXTURES.monthlySub({ name: 'Ücretsiz Dergi, Abone' });
    const csv = generateCSV([sub]);
    const lines = csv.split('\n');
    expect(lines[1]).toContain('"Ücretsiz Dergi, Abone"');
  });

  it('escapes quoted notes', () => {
    const sub = FIXTURES.monthlySub({ name: 'Test "quoted"' });
    const csv = generateCSV([sub]);
    expect(csv).toContain('"Test ""quoted"""');
  });

  it('multiple subs produce multiple rows', () => {
    const csv = generateCSV([FIXTURES.monthlySub(), FIXTURES.yearlySub()]);
    expect(csv.split('\n').length).toBe(3);
  });
});
