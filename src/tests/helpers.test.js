import { formatDistanceInKms } from '../helpers';

test('formatDistanceInKms - properly formats a number', () => {
  expect(formatDistanceInKms(1523)).toBe('1.52');
});

test('formatDistanceInKms - returns NaN if param is anything other than number/string', () => {
  expect(formatDistanceInKms('1620')).toBe(NaN);
  expect(formatDistanceInKms(NaN)).toBe(NaN);
  expect(formatDistanceInKms(undefined)).toBe(NaN);
  expect(formatDistanceInKms(null)).toBe(NaN);
  expect(formatDistanceInKms([1, 2, 3])).toBe(NaN);
  expect(formatDistanceInKms({ prop: 1, otherProp: 'some string' })).toBe(NaN);
  expect(formatDistanceInKms(() => console.log('Hello'))).toBe(NaN);
});
