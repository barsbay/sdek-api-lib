"use strict";
/**
 * CDEK API SDK - Main Client
 * @packageDocumentation
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CdekApi = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
/**
 * Main client for CDEK API v2.0
 */
class CdekApi {
    /**
     * Create a new CDEK API client
     * @param config Client configuration
     */
    constructor(config) {
        this.token = null;
        this.tokenExpiresAt = 0;
        this.config = {
            baseUrl: 'https://api.edu.cdek.ru',
            timeout: 30000,
            ...config,
        };
    }
    /**
     * Switch to production environment
     */
    setProductionMode() {
        this.config.baseUrl = 'https://api.cdek.ru';
    }
    /**
     * Switch to test environment
     */
    setTestMode() {
        this.config.baseUrl = 'https://api.edu.cdek.ru';
    }
    /**
     * Get authentication token
     * @private
     */
    async getAuthToken() {
        if (this.token && Date.now() < this.tokenExpiresAt) {
            return this.token.access_token;
        }
        const body = `grant_type=client_credentials&client_id=${this.config.clientId}&client_secret=${this.config.clientSecret}`;
        const response = await (0, node_fetch_1.default)(`${this.config.baseUrl}/v2/oauth/token`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: body,
            // @ts-ignore
            timeout: this.config.timeout,
        });
        if (!response.ok) {
            throw new Error(`Auth error: ${response.status} ${response.statusText}`);
        }
        this.token = (await response.json());
        this.tokenExpiresAt = Date.now() + (this.token.expires_in - 60) * 1000;
        return this.token.access_token;
    }
    /**
     * Make HTTP request to CDEK API
     * @private
     */
    async makeRequest(method, endpoint, data, params) {
        const token = await this.getAuthToken();
        let url = `${this.config.baseUrl}${endpoint}`;
        if (params) {
            const searchParams = new URLSearchParams();
            Object.entries(params).forEach(([key, value]) => {
                if (value !== undefined && value !== null) {
                    searchParams.append(key, value.toString());
                }
            });
            if (searchParams.toString()) {
                url += (url.includes('?') ? '&' : '?') + searchParams.toString();
            }
        }
        const headers = {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            'User-Agent': 'CDEK-TypeScript-SDK/1.0.0',
        };
        const config = {
            method,
            headers,
            // @ts-ignore
            timeout: this.config.timeout,
        };
        if (data && (method === 'POST' || method === 'PUT')) {
            config.body = JSON.stringify(data);
        }
        const response = await (0, node_fetch_1.default)(url, config);
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`HTTP ${response.status}: ${errorText}`);
        }
        return response.json();
    }
    // =================== CALCULATOR ===================
    /**
     * Calculate delivery cost and time by tariff code
     */
    async calculateTariff(request) {
        return this.makeRequest('POST', '/v2/calculator/tariff', request);
    }
    /**
     * Calculate delivery cost and time for all available tariffs
     */
    async calculateTariffList(request) {
        const response = await this.makeRequest('POST', '/v2/calculator/tarifflist', request);
        return response.tariff_codes || [];
    }
    /**
     * Calculate customs duty for delivery to Russia
     */
    async calculateCustomsDuty(request) {
        return this.makeRequest('POST', '/v2/calculator/customs-duty', request);
    }
    // =================== ORDERS ===================
    /**
     * Create a new order
     */
    async createOrder(order) {
        return this.makeRequest('POST', '/v2/orders', order);
    }
    /**
     * Get order info by UUID
     */
    async getOrder(uuid) {
        return this.makeRequest('GET', `/v2/orders/${uuid}`);
    }
    /**
     * Get order info by CDEK number
     */
    async getOrderByCdekNumber(cdekNumber) {
        return this.makeRequest('GET', '/v2/orders', undefined, { cdek_number: cdekNumber });
    }
    /**
     * Get orders list by search params
     */
    async getOrders(params = {}) {
        return this.makeRequest('GET', '/v2/orders', undefined, params);
    }
    /**
     * Update order by UUID
     */
    async updateOrder(uuid, order) {
        return this.makeRequest('PUT', `/v2/orders/${uuid}`, order);
    }
    /**
     * Delete order by UUID
     */
    async deleteOrder(uuid) {
        return this.makeRequest('DELETE', `/v2/orders/${uuid}`);
    }
    // =================== LOCATIONS ===================
    /**
     * Get regions list
     */
    async getRegions(countryCodes, size = 1000, page = 0) {
        let url = `/v2/location/regions?size=${size}&page=${page}`;
        if (countryCodes) {
            url += `&country_codes=${countryCodes}`;
        }
        return this.makeRequest('GET', url);
    }
    /**
     * Get cities list
     */
    async getCities(options = {}) {
        const params = new URLSearchParams();
        Object.entries(options).forEach(([key, value]) => {
            if (value !== undefined) {
                params.append(key, value.toString());
            }
        });
        if (!params.has('size')) {
            params.append('size', '1000');
        }
        if (!params.has('page')) {
            params.append('page', '0');
        }
        return this.makeRequest('GET', `/v2/location/cities?${params.toString()}`);
    }
    // =================== DELIVERY POINTS ===================
    /**
     * Get delivery points (pickup points)
     */
    async getDeliveryPoints(filter = {}) {
        const params = new URLSearchParams();
        Object.entries(filter).forEach(([key, value]) => {
            if (value !== undefined) {
                params.append(key, value.toString());
            }
        });
        return this.makeRequest('GET', `/v2/deliverypoints?${params.toString()}`);
    }
    /**
     * Search delivery points with extended result
     */
    async searchDeliveryPoints(filter = {}) {
        return this.makeRequest('GET', '/v2/deliverypoints', undefined, filter);
    }
    // =================== COURIER ===================
    /**
     * Create courier request
     */
    async createCourierRequest(request) {
        return this.makeRequest('POST', '/v2/intakes', request);
    }
    /**
     * Get courier request info by UUID
     */
    async getCourierRequest(uuid) {
        return this.makeRequest('GET', `/v2/intakes/${uuid}`);
    }
    /**
     * Get courier requests list
     */
    async getCourierRequests(params = {}) {
        return this.makeRequest('GET', '/v2/intakes', undefined, params);
    }
    /**
     * Delete courier request by UUID
     */
    async deleteCourierRequest(uuid) {
        return this.makeRequest('DELETE', `/v2/intakes/${uuid}`);
    }
    // =================== PRINTING ===================
    /**
     * Get order print form (A4, A5, A6)
     */
    async getOrderPrintForm(orderUuids, format = 'A4') {
        return this.makeRequest('GET', '/v2/print/orders', undefined, {
            orders: orderUuids.join(','),
            format,
        });
    }
    /**
     * Get order barcode print form (A4, A5, A6)
     */
    async getOrderBarcode(orderUuids, format = 'A4') {
        return this.makeRequest('GET', '/v2/print/barcodes', undefined, {
            orders: orderUuids.join(','),
            format,
        });
    }
    // =================== WEBHOOKS ===================
    /**
     * Subscribe to webhook
     */
    async subscribeWebhook(url, type = 'ORDER_STATUS') {
        return this.makeRequest('POST', '/v2/webhooks', { url, type });
    }
    /**
     * Get webhooks list
     */
    async getWebhooks() {
        return this.makeRequest('GET', '/v2/webhooks');
    }
    /**
     * Delete webhook by UUID
     */
    async deleteWebhook(uuid) {
        return this.makeRequest('DELETE', `/v2/webhooks/${uuid}`);
    }
}
exports.CdekApi = CdekApi;
// Export all types and constants for convenience
__exportStar(require("./types"), exports);
__exportStar(require("./types/calculator"), exports);
__exportStar(require("./types/orders"), exports);
__exportStar(require("./types/delivery-points"), exports);
__exportStar(require("./types/courier"), exports);
__exportStar(require("./constants"), exports);
__exportStar(require("./utils"), exports);
//# sourceMappingURL=cdek-client.js.map