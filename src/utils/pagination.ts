export const getPageNumbers = (current: number, total: number, windowSize = 10): number[] => {
  const before = Math.floor((windowSize - 1) / 2);
  const after = windowSize - 1 - before;

  let start = Math.max(1, current - before);
  let end = Math.min(total, current + after);

  while (end - start < windowSize - 1 && (start > 1 || end < total)) {
    if (start > 1) start--;
    if (end < total) end++;
  }

  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
};
