import { formatPhoneNumber, validateOrder, calculateVolumeWeight, isValidTariffCode, TARIFF_CODES } from '../src';

describe('Utils', () => {
  describe('formatPhoneNumber', () => {
    it('should format Russian phone numbers correctly', () => {
      expect(formatPhoneNumber('8 923 123-45-67')).toBe('+7 923 123-45-67');
      expect(formatPhoneNumber('7 923 123-45-67')).toBe('+7 923 123-45-67');
      expect(formatPhoneNumber('+7 923 123-45-67')).toBe('+7 923 123-45-67');
      expect(formatPhoneNumber('923 123-45-67')).toBe('+7 923 123-45-67');
    });
  });

  describe('calculateVolumeWeight', () => {
    it('should calculate volume weight correctly', () => {
      // 30x20x10 cm = 6000 cm³ = 0.006 m³ = 1.2 kg = 1200 g
      expect(calculateVolumeWeight(30, 20, 10)).toBe(1200);
    });
  });

  describe('isValidTariffCode', () => {
    it('should validate tariff codes', () => {
      expect(isValidTariffCode(TARIFF_CODES.PACKAGE_WAREHOUSE_TO_WAREHOUSE)).toBe(true);
      expect(isValidTariffCode(999)).toBe(false);
    });
  });

  describe('validateOrder', () => {
    it('should validate complete order', () => {
      const validOrder = {
        tariff_code: TARIFF_CODES.PACKAGE_WAREHOUSE_TO_WAREHOUSE,
        recipient: { name: 'Test', phones: [{ number: '+7 123 123-45-67' }] },
        from_location: { code: 1 },
        to_location: { code: 2 },
        packages: [{
          number: '1',
          weight: 1000,
          items: [{ name: 'Test', ware_key: '1', cost: 100, amount: 1 }],
        }],
      };
      expect(validateOrder(validOrder)).toEqual([]);
    });

    it('should return errors for invalid order', () => {
      const invalidOrder = {
        tariff_code: 999, // Invalid tariff
        recipient: { name: '', phones: [] }, // Missing name and phone
        packages: [], // No packages
        from_location: {},
        to_location: {},
      };
      const errors = validateOrder(invalidOrder);
      expect(errors.length).toBeGreaterThan(0);
      expect(errors.some(e => e.includes('Invalid tariff code'))).toBe(true);
      expect(errors.some(e => e.includes('Recipient name'))).toBe(true);
    });
  });
}); 