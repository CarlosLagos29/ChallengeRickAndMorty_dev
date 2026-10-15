import { describe, expect, it } from 'vitest';
import { getPageNumbers } from './pagination';

describe('getPageNumbers', () => {
  it('returns every page when there are fewer pages than the window', () => {
    expect(getPageNumbers(1, 4)).toEqual([1, 2, 3, 4]);
  });

  it('returns a single page when there is only one', () => {
    expect(getPageNumbers(1, 1)).toEqual([1]);
  });

  it('starts at page 1 when the current page is near the beginning', () => {
    expect(getPageNumbers(2, 42)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  });

  it('centers the window around the current page', () => {
    expect(getPageNumbers(20, 42)).toEqual([16, 17, 18, 19, 20, 21, 22, 23, 24, 25]);
  });

  it('ends at the last page when the current page is near the end', () => {
    expect(getPageNumbers(41, 42)).toEqual([33, 34, 35, 36, 37, 38, 39, 40, 41, 42]);
  });

  it('supports a custom window size', () => {
    expect(getPageNumbers(10, 42, 5)).toEqual([8, 9, 10, 11, 12]);
  });
});
