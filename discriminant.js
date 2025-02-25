'use strict';

module.exports = (a, b, c) => {
  const discriminant = b * b - 4 * a * c;
  if (discriminant < 0) return [];
  const first = (-b + Math.sqrt(discriminant)) / (2 * a);
  if (discriminant === 0) return [first];
  const second = (-b - Math.sqrt(discriminant)) / (2 * a);
  return [first, second];
};
