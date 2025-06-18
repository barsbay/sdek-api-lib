/**
 * CDEK API SDK - Utilities
 * @packageDocumentation
 */
import { OrderRequest } from './types';
/**
 * Checks if the code is a valid tariff code
 */
export declare function isValidTariffCode(code: number): boolean;
/**
 * Returns the tariff name by code
 */
export declare function getTariffName(code: number): string | undefined;
/**
 * Checks if the order status is final
 */
export declare function isFinalOrderStatus(status: string): boolean;
/**
 * Converts weight to grams
 */
export declare function convertWeightToGrams(weight: number, unit?: 'g' | 'kg'): number;
/**
 * Converts grams to kilograms
 */
export declare function convertGramsToKg(grams: number): number;
/**
 * Calculates volume weight (1 m³ = 200 kg)
 */
export declare function calculateVolumeWeight(length: number, width: number, height: number): number;
/**
 * Formats phone number for API in format +7 923 123-45-67
 */
export declare function formatPhoneNumber(phone: string): string;
/**
 * Validates order structure
 */
export declare function validateOrder(order: OrderRequest): string[];
/**
 * Formats date for API in ISO 8601 (YYYY-MM-DD)
 */
export declare function formatDateForApi(date: Date): string;
/**
 * Formats time for API in HH:MM
 */
export declare function formatTimeForApi(date: Date): string;
//# sourceMappingURL=utils.d.ts.map