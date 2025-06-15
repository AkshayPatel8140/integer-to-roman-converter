import { toRoman } from '../src/converter';

describe('toRoman', () => {
  it('converts 1 to I', () => {
    expect(toRoman(1)).toBe('I');
  });

  it('converts 9 to IX', () => {
    expect(toRoman(9)).toBe('IX');
  });

  it('converts 58 to LVIII', () => {
    expect(toRoman(58)).toBe('LVIII');
  });

  it('converts 1994 to MCMXCIV', () => {
    expect(toRoman(1994)).toBe('MCMXCIV');
  });

  it('converts 3999 to MMMCMXCIX', () => {
    expect(toRoman(3999)).toBe('MMMCMXCIX');
  });
});
