export type fontSizes = 'x-small' | 'small' | 'medium' | 'large' | 'x-large' | 'xx-large';

export const fontSize = new Map<fontSizes, string>([
  ['x-small', '8px'],
  ['small', '12px'],
  ['medium', '14px'],
  ['large', '18px'],
  ['x-large', '22px'],
  ['xx-large', '26px']
]);