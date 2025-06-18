/**
 * CDEK API SDK - Main Client
 * @packageDocumentation
 */
import type { CdekConfig } from './types';
import type { TariffRequest, TariffResponse, TariffListRequest, CustomsDutyRequest, CustomsDutyResponse } from './types/calculator';
import type { OrderRequest, OrderResponse, OrderInfo, OrderSearchParams } from './types/orders';
import type { DeliveryPoint, DeliveryPointFilter, DeliveryPointSearchResult } from './types/delivery-points';
import type { CourierRequest, CourierResponse, CourierInfo, CourierSearchParams } from './types/courier';
/**
 * Main client for CDEK API v2.0
 */
export declare class CdekApi {
    private config;
    private token;
    private tokenExpiresAt;
    /**
     * Create a new CDEK API client
     * @param config Client configuration
     */
    constructor(config: CdekConfig);
    /**
     * Switch to production environment
     */
    setProductionMode(): void;
    /**
     * Switch to test environment
     */
    setTestMode(): void;
    /**
     * Get authentication token
     * @private
     */
    private getAuthToken;
    /**
     * Make HTTP request to CDEK API
     * @private
     */
    private makeRequest;
    /**
     * Calculate delivery cost and time by tariff code
     */
    calculateTariff(request: TariffRequest): Promise<TariffResponse>;
    /**
     * Calculate delivery cost and time for all available tariffs
     */
    calculateTariffList(request: TariffListRequest): Promise<TariffResponse[]>;
    /**
     * Calculate customs duty for delivery to Russia
     */
    calculateCustomsDuty(request: CustomsDutyRequest): Promise<CustomsDutyResponse>;
    /**
     * Create a new order
     */
    createOrder(order: OrderRequest): Promise<OrderResponse>;
    /**
     * Get order info by UUID
     */
    getOrder(uuid: string): Promise<OrderInfo>;
    /**
     * Get order info by CDEK number
     */
    getOrderByCdekNumber(cdekNumber: string): Promise<OrderInfo[]>;
    /**
     * Get orders list by search params
     */
    getOrders(params?: OrderSearchParams): Promise<OrderInfo[]>;
    /**
     * Update order by UUID
     */
    updateOrder(uuid: string, order: Partial<OrderRequest>): Promise<OrderResponse>;
    /**
     * Delete order by UUID
     */
    deleteOrder(uuid: string): Promise<OrderResponse>;
    /**
     * Get regions list
     */
    getRegions(countryCodes?: string, size?: number, page?: number): Promise<any[]>;
    /**
     * Get cities list
     */
    getCities(options?: {
        country_codes?: string;
        region_code?: number;
        city?: string;
        size?: number;
        page?: number;
        postal_code?: string;
        fias_guid?: string;
        kladr_code?: string;
        payment_limit?: number;
    }): Promise<any[]>;
    /**
     * Get delivery points (pickup points)
     */
    getDeliveryPoints(filter?: DeliveryPointFilter): Promise<DeliveryPoint[]>;
    /**
     * Search delivery points with extended result
     */
    searchDeliveryPoints(filter?: DeliveryPointFilter): Promise<DeliveryPointSearchResult>;
    /**
     * Create courier request
     */
    createCourierRequest(request: CourierRequest): Promise<CourierResponse>;
    /**
     * Get courier request info by UUID
     */
    getCourierRequest(uuid: string): Promise<CourierInfo>;
    /**
     * Get courier requests list
     */
    getCourierRequests(params?: CourierSearchParams): Promise<CourierInfo[]>;
    /**
     * Delete courier request by UUID
     */
    deleteCourierRequest(uuid: string): Promise<CourierResponse>;
    /**
     * Get order print form (A4, A5, A6)
     */
    getOrderPrintForm(orderUuids: string[], format?: 'A4' | 'A5' | 'A6'): Promise<{
        url?: string;
        file?: string;
    }>;
    /**
     * Get order barcode print form (A4, A5, A6)
     */
    getOrderBarcode(orderUuids: string[], format?: 'A4' | 'A5' | 'A6'): Promise<{
        url?: string;
        file?: string;
    }>;
    /**
     * Subscribe to webhook
     */
    subscribeWebhook(url: string, type?: string): Promise<any>;
    /**
     * Get webhooks list
     */
    getWebhooks(): Promise<any[]>;
    /**
     * Delete webhook by UUID
     */
    deleteWebhook(uuid: string): Promise<any>;
}
export * from './types';
export * from './types/calculator';
export * from './types/orders';
export * from './types/delivery-points';
export * from './types/courier';
export * from './constants';
export * from './utils';
//# sourceMappingURL=cdek-client.d.ts.map