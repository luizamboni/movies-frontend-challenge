type rangeLimits = {
  limit: number;
  minValue: number | null;
  maxValue: number | null,
}

export function range(start: number, end: number, limits: rangeLimits): number[] {
  const range = [];
  const { limit, minValue, maxValue } = limits;
  for (let i = start; i < end; i++) {
    
    if (minValue && i < minValue) {
      continue;
    }
    
    if (maxValue && i > maxValue) {
      continue;
    }
    
    range.push(i);
    if (range.length === limit) {
      return range;
    }
  }
  return range;
}