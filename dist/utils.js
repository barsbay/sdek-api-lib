"use strict";
/**
 * CDEK API SDK - Utilities
 * @packageDocumentation
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatTimeForApi = exports.formatDateForApi = exports.validateOrder = exports.formatPhoneNumber = exports.calculateVolumeWeight = exports.convertGramsToKg = exports.convertWeightToGrams = exports.isFinalOrderStatus = exports.getTariffName = exports.isValidTariffCode = void 0;
const constants_1 = require("./constants");
/**
 * Checks if the code is a valid tariff code
 */
function isValidTariffCode(code) {
    return Object.values(constants_1.TARIFF_CODES).includes(code);
}
exports.isValidTariffCode = isValidTariffCode;
/**
 * Returns the tariff name by code
 */
function getTariffName(code) {
    const tariffEntry = Object.entries(constants_1.TARIFF_CODES).find(([, value]) => value === code);
    if (tariffEntry) {
        // Convert SNAKE_CASE to readable format
        return tariffEntry[0]
            .split('_')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(' ');
    }
    return undefined;
}
exports.getTariffName = getTariffName;
/**
 * Checks if the order status is final
 */
function isFinalOrderStatus(status) {
    const finalStatuses = [
        constants_1.ORDER_STATUSES.DELIVERED,
        constants_1.ORDER_STATUSES.NOT_DELIVERED,
        constants_1.ORDER_STATUSES.RETURNED_TO_WAREHOUSE,
        constants_1.ORDER_STATUSES.ORDER_CREATION_CANCELLED,
        constants_1.ORDER_STATUSES.DELETED,
        constants_1.ORDER_STATUSES.LOST,
        constants_1.ORDER_STATUSES.PARTIALLY_LOST,
        constants_1.ORDER_STATUSES.RETURNED_TO_SENDER,
    ];
    return finalStatuses.includes(status);
}
exports.isFinalOrderStatus = isFinalOrderStatus;
/**
 * Converts weight to grams
 */
function convertWeightToGrams(weight, unit = 'kg') {
    return unit === 'kg' ? weight * 1000 : weight;
}
exports.convertWeightToGrams = convertWeightToGrams;
/**
 * Converts grams to kilograms
 */
function convertGramsToKg(grams) {
    return grams / 1000;
}
exports.convertGramsToKg = convertGramsToKg;
/**
 * Calculates volume weight (1 m³ = 200 kg)
 */
function calculateVolumeWeight(length, width, height) {
    // Dimensions in centimeters, result in grams
    const volumeM3 = (length * width * height) / 1000000; // cm³ to m³
    return volumeM3 * 200 * 1000; // 200 kg/m³ in grams
}
exports.calculateVolumeWeight = calculateVolumeWeight;
/**
 * Formats phone number for API in format +7 923 123-45-67
 */
function formatPhoneNumber(phone) {
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
        return ('+' +
            cleaned[0] +
            ' ' +
            cleaned.slice(1, 4) +
            ' ' +
            cleaned.slice(4, 7) +
            '-' +
            cleaned.slice(7, 9) +
            '-' +
            cleaned.slice(9, 11));
    }
    // Fallback: just add +7
    return '+7 ' + cleaned;
}
exports.formatPhoneNumber = formatPhoneNumber;
/**
 * Validates order structure
 */
function validateOrder(order) {
    const errors = [];
    if (!order.tariff_code) {
        errors.push('Tariff code is not specified');
    }
    else if (!isValidTariffCode(order.tariff_code)) {
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
    }
    else {
        order.packages.forEach((pkg, index) => {
            if (!pkg.weight || pkg.weight <= 0) {
                errors.push(`Invalid weight for package ${index + 1}`);
            }
            if (!pkg.items?.length) {
                errors.push(`No items specified in package ${index + 1}`);
            }
            else {
                pkg.items.forEach((item, itemIndex) => {
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
exports.validateOrder = validateOrder;
/**
 * Formats date for API in ISO 8601 (YYYY-MM-DD)
 */
function formatDateForApi(date) {
    return date.toISOString().split('T')[0];
}
exports.formatDateForApi = formatDateForApi;
/**
 * Formats time for API in HH:MM
 */
function formatTimeForApi(date) {
    return date.toTimeString().split(' ')[0].substring(0, 5);
}
exports.formatTimeForApi = formatTimeForApi;
//# sourceMappingURL=utils.js.map