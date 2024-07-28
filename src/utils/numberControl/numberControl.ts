type Range = {
  min?: number;
  max?: number;
};
export const clip = (value: number, { min, max }: Range) => {
  return Math.min(Math.max(min || value, value), max || value);
};
