import { test, expect } from '@playwright/test';
import { calculateTotal } from '../pages/shopping';


test.describe('Basket total calculation - Positive cases', () => {
  test('Empty basket returns £0.00', () => {
    expect(calculateTotal([])).toBe('£0.00');
  });

  test('Single Apple returns £0.35', () => {
    expect(calculateTotal(['Apple'])).toBe('£0.35');
  });

  test('Two Apples and one Banana returns £0.90', () => {
    expect(calculateTotal(['Apple', 'Apple', 'Banana'])).toBe('£0.90');
  });

  test('Two Melons (BOGOF) returns £0.50', () => {
    expect(calculateTotal(['Melon', 'Melon'])).toBe('£0.50');
  });

  test('Three Limes (3-for-2) returns £0.30', () => {
    expect(calculateTotal(['Lime', 'Lime', 'Lime'])).toBe('£0.30');
  });

  test('Mixed basket with offers applied', () => {
    const basket = ['Apple', 'Apple', 'Melon', 'Melon', 'Melon', 'Lime', 'Lime', 'Lime', 'Banana'];
    expect(calculateTotal(basket)).toBe('£2.20');
  });
});


test.describe('Basket total calculation - Negative cases', () => {
  test('Throws error for invalid item', () => {
    expect(() => calculateTotal(['Apple', 'Orange'])).toThrow('Invalid item: Orange');
  });

  test('Throws error for non-string item', () => {
    expect(() => calculateTotal(['Apple', '123'])).toThrow();
  });

  test('Handles case sensitivity (should fail for "apple")', () => {
    expect(() => calculateTotal(['apple'])).toThrow('Invalid item: apple');
  });
});
