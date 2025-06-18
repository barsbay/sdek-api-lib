/**
 * CDEK API SDK - Utilities
 * @packageDocumentation
 */

import { TARIFF_CODES, ORDER_STATUSES } from './constants';
import { OrderRequest, Package, Item } from './types';

/**
 * Checks if the code is a valid tariff code
 */
export function isValidTariffCode(code: number): boolean {
  return Object.values(TARIFF_CODES).includes(code as any);
}

/**
 * Returns the tariff name by code
 */
export function getTariffName(code: number): string | undefined {
  const tariffEntry = Object.entries(TARIFF_CODES).find(([, value]) => value === code);
  if (tariffEntry) {
    // Convert SNAKE_CASE to readable format
    return tariffEntry[0]
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }
  return undefined;
}

/**
 * Checks if the order status is final
 */
export function isFinalOrderStatus(status: string): boolean {
  const finalStatuses = [
    ORDER_STATUSES.DELIVERED,
    ORDER_STATUSES.NOT_DELIVERED,
    ORDER_STATUSES.RETURNED_TO_WAREHOUSE,
    ORDER_STATUSES.ORDER_CREATION_CANCELLED,
    ORDER_STATUSES.DELETED,
    ORDER_STATUSES.LOST,
    ORDER_STATUSES.PARTIALLY_LOST,
    ORDER_STATUSES.RETURNED_TO_SENDER,
  ];
  return finalStatuses.includes(status as any);
}

/**
 * Converts weight to grams
 */
export function convertWeightToGrams(weight: number, unit: 'g' | 'kg' = 'kg'): number {
  return unit === 'kg' ? weight * 1000 : weight;
}

/**
 * Converts grams to kilograms
 */
export function convertGramsToKg(grams: number): number {
  return grams / 1000;
}

/**
 * Calculates volume weight (1 m³ = 200 kg)
 */
export function calculateVolumeWeight(length: number, width: number, height: number): number {
  // Dimensions in centimeters, result in grams
  const volumeM3 = (length * width * height) / 1000000; // cm³ to m³
  return volumeM3 * 200 * 1000; // 200 kg/m³ in grams
}

/**
 * Formats phone number for API in format +7 923 123-45-67
 */
export function formatPhoneNumber(phone: string): string {
  // Remove all characters except digits
  let cleaned = phone.replace(/[^\d]/g, '');
  if (cleaned.length === 11 && cleaned.startsWith('8')) {
    cleaned = '7' + cleaned.slice(1);
  }
  if (cleaned.length === 11 && cleaned.startsWith('7')) {
    cleaned = cleaned;
  }
  if (cleaned.length === 10) {
    cleaned = '7' + cleaned;
  }
  // Format: +7 923 123-45-67
  if (cleaned.length === 11) {
    return (
      '+' +
      cleaned[0] +
      ' ' +
      cleaned.slice(1, 4) +
      ' ' +
      cleaned.slice(4, 7) +
      '-' +
      cleaned.slice(7, 9) +
      '-' +
      cleaned.slice(9, 11)
    );
  }
  // Fallback: just add +7
  return '+7 ' + cleaned;
}

/**
 * Validates order structure
 */
export function validateOrder(order: OrderRequest): string[] {
  const errors: string[] = [];
  if (!order.tariff_code) {
    errors.push('Tariff code is not specified');
  } else if (!isValidTariffCode(order.tariff_code)) {
    errors.push('Invalid tariff code');
  }
  if (!order.recipient?.name) {
    errors.push('Recipient name is not specified');
  }
  if (!order.recipient?.phones?.length) {
    errors.push('Recipient phone is not specified');
  }
  if (!order.packages?.length) {
    errors.push('Packages are not specified');
  } else {
    order.packages.forEach((pkg: Package, index: number) => {
      if (!pkg.weight || pkg.weight <= 0) {
        errors.push(`Invalid weight for package ${index + 1}`);
      }
      if (!pkg.items?.length) {
        errors.push(`No items specified in package ${index + 1}`);
      } else {
        pkg.items.forEach((item: Item, itemIndex: number) => {
          if (!item.name) {
            errors.push(`No name for item ${itemIndex + 1} in package ${index + 1}`);
          }
          if (!item.cost || item.cost <= 0) {
            errors.push(`Invalid cost for item ${itemIndex + 1} in package ${index + 1}`);
          }
          if (!item.amount || item.amount <= 0) {
            errors.push(`Invalid amount for item ${itemIndex + 1} in package ${index + 1}`);
          }
        });
      }
    });
  }
  if (!order.from_location?.code && !order.from_location?.postal_code && !order.from_location?.address) {
    errors.push('Sender location is not specified');
  }
  if (!order.to_location?.code && !order.to_location?.postal_code && !order.to_location?.address) {
    errors.push('Recipient location is not specified');
  }
  return errors;
}

/**
 * Formats date for API in ISO 8601 (YYYY-MM-DD)
 */
export function formatDateForApi(date: Date): string {
  return date.toISOString().split('T')[0];
}

/**
 * Formats time for API in HH:MM
 */
export function formatTimeForApi(date: Date): string {
  return date.toTimeString().split(' ')[0].substring(0, 5);
} 