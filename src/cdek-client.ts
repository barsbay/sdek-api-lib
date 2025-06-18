/**
 * CDEK API SDK - Main Client
 * @packageDocumentation
 */

import fetch from 'node-fetch';
import type {
  CdekConfig,
  AuthToken,
} from './types';
import type {
  TariffRequest,
  TariffResponse,
  TariffListRequest,
  CustomsDutyRequest,
  CustomsDutyResponse,
} from './types/calculator';
import type {
  OrderRequest,
  OrderResponse,
  OrderInfo,
  OrderSearchParams,
} from './types/orders';
import type {
  DeliveryPoint,
  DeliveryPointFilter,
  DeliveryPointSearchResult,
} from './types/delivery-points';
import type {
  CourierRequest,
  CourierResponse,
  CourierInfo,
  CourierSearchParams,
} from './types/courier';
import {
  TARIFF_CODES,
  SERVICE_CODES,
  ORDER_STATUSES,
  ERROR_CODES,
} from './constants';

/**
 * Main client for CDEK API v2.0
 */
export class CdekApi {
  private config: Required<CdekConfig>;
  private token: AuthToken | null = null;
  private tokenExpiresAt: number = 0;

  /**
   * Create a new CDEK API client
   * @param config Client configuration
   */
  constructor(config: CdekConfig) {
    this.config = {
      baseUrl: 'https://api.edu.cdek.ru',
      timeout: 30000,
      ...config,
    };
  }

  /**
   * Switch to production environment
   */
  setProductionMode(): void {
    this.config.baseUrl = 'https://api.cdek.ru';
  }

  /**
   * Switch to test environment
   */
  setTestMode(): void {
    this.config.baseUrl = 'https://api.edu.cdek.ru';
  }

  /**
   * Get authentication token
   * @private
   */
  private async getAuthToken(): Promise<string> {
    if (this.token && Date.now() < this.tokenExpiresAt) {
      return this.token.access_token;
    }
    
    const body = `grant_type=client_credentials&client_id=${this.config.clientId}&client_secret=${this.config.clientSecret}`;
    
    const response = await fetch(`${this.config.baseUrl}/v2/oauth/token`, {
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
    
    this.token = (await response.json()) as AuthToken;
    this.tokenExpiresAt = Date.now() + (this.token.expires_in - 60) * 1000;
    return this.token.access_token;
  }

  /**
   * Make HTTP request to CDEK API
   * @private
   */
  private async makeRequest<T>(
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    endpoint: string,
    data?: any,
    params?: Record<string, string | number | boolean>
  ): Promise<T> {
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
    const headers: Record<string, string> = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      'User-Agent': 'CDEK-TypeScript-SDK/1.0.0',
    };
    const config: any = {
      method,
      headers,
      // @ts-ignore
      timeout: this.config.timeout,
    };
    if (data && (method === 'POST' || method === 'PUT')) {
      config.body = JSON.stringify(data);
    }
    const response = await fetch(url, config);
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP ${response.status}: ${errorText}`);
    }
    return response.json() as T;
  }

  // =================== CALCULATOR ===================

  /**
   * Calculate delivery cost and time by tariff code
   */
  async calculateTariff(request: TariffRequest): Promise<TariffResponse> {
    return this.makeRequest<TariffResponse>('POST', '/v2/calculator/tariff', request);
  }

  /**
   * Calculate delivery cost and time for all available tariffs
   */
  async calculateTariffList(request: TariffListRequest): Promise<TariffResponse[]> {
    const response = await this.makeRequest<{ tariff_codes: TariffResponse[] }>('POST', '/v2/calculator/tarifflist', request);
    return response.tariff_codes || [];
  }

  /**
   * Calculate customs duty for delivery to Russia
   */
  async calculateCustomsDuty(request: CustomsDutyRequest): Promise<CustomsDutyResponse> {
    return this.makeRequest<CustomsDutyResponse>('POST', '/v2/calculator/customs-duty', request);
  }

  // =================== ORDERS ===================

  /**
   * Create a new order
   */
  async createOrder(order: OrderRequest): Promise<OrderResponse> {
    return this.makeRequest<OrderResponse>('POST', '/v2/orders', order);
  }

  /**
   * Get order info by UUID
   */
  async getOrder(uuid: string): Promise<OrderInfo> {
    return this.makeRequest<OrderInfo>('GET', `/v2/orders/${uuid}`);
  }

  /**
   * Get order info by CDEK number
   */
  async getOrderByCdekNumber(cdekNumber: string): Promise<OrderInfo[]> {
    return this.makeRequest<OrderInfo[]>('GET', '/v2/orders', undefined, { cdek_number: cdekNumber });
  }

  /**
   * Get orders list by search params
   */
  async getOrders(params: OrderSearchParams = {}): Promise<OrderInfo[]> {
    return this.makeRequest<OrderInfo[]>('GET', '/v2/orders', undefined, params as Record<string, string | number | boolean>);
  }

  /**
   * Update order by UUID
   */
  async updateOrder(uuid: string, order: Partial<OrderRequest>): Promise<OrderResponse> {
    return this.makeRequest<OrderResponse>('PUT', `/v2/orders/${uuid}`, order);
  }

  /**
   * Delete order by UUID
   */
  async deleteOrder(uuid: string): Promise<OrderResponse> {
    return this.makeRequest<OrderResponse>('DELETE', `/v2/orders/${uuid}`);
  }

  // =================== LOCATIONS ===================

  /**
   * Get regions list
   */
  async getRegions(countryCodes?: string, size: number = 1000, page: number = 0): Promise<any[]> {
    let url = `/v2/location/regions?size=${size}&page=${page}`;
    if (countryCodes) {
      url += `&country_codes=${countryCodes}`;
    }
    return this.makeRequest<any[]>('GET', url);
  }

  /**
   * Get cities list
   */
  async getCities(options: {
    country_codes?: string;
    region_code?: number;
    city?: string;
    size?: number;
    page?: number;
    postal_code?: string;
    fias_guid?: string;
    kladr_code?: string;
    payment_limit?: number;
  } = {}): Promise<any[]> {
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
    return this.makeRequest<any[]>('GET', `/v2/location/cities?${params.toString()}`);
  }

  // =================== DELIVERY POINTS ===================

  /**
   * Get delivery points (pickup points)
   */
  async getDeliveryPoints(filter: DeliveryPointFilter = {}): Promise<DeliveryPoint[]> {
    const params = new URLSearchParams();
    Object.entries(filter).forEach(([key, value]) => {
      if (value !== undefined) {
        params.append(key, value.toString());
      }
    });
    return this.makeRequest<DeliveryPoint[]>('GET', `/v2/deliverypoints?${params.toString()}`);
  }

  /**
   * Search delivery points with extended result
   */
  async searchDeliveryPoints(filter: DeliveryPointFilter = {}): Promise<DeliveryPointSearchResult> {
    return this.makeRequest<DeliveryPointSearchResult>('GET', '/v2/deliverypoints', undefined, filter as Record<string, string | number | boolean>);
  }

  // =================== COURIER ===================

  /**
   * Create courier request
   */
  async createCourierRequest(request: CourierRequest): Promise<CourierResponse> {
    return this.makeRequest<CourierResponse>('POST', '/v2/intakes', request);
  }

  /**
   * Get courier request info by UUID
   */
  async getCourierRequest(uuid: string): Promise<CourierInfo> {
    return this.makeRequest<CourierInfo>('GET', `/v2/intakes/${uuid}`);
  }

  /**
   * Get courier requests list
   */
  async getCourierRequests(params: CourierSearchParams = {}): Promise<CourierInfo[]> {
    return this.makeRequest<CourierInfo[]>('GET', '/v2/intakes', undefined, params as Record<string, string | number | boolean>);
  }

  /**
   * Delete courier request by UUID
   */
  async deleteCourierRequest(uuid: string): Promise<CourierResponse> {
    return this.makeRequest<CourierResponse>('DELETE', `/v2/intakes/${uuid}`);
  }

  // =================== PRINTING ===================

  /**
   * Get order print form (A4, A5, A6)
   */
  async getOrderPrintForm(orderUuids: string[], format: 'A4' | 'A5' | 'A6' = 'A4'): Promise<{ url?: string; file?: string }> {
    return this.makeRequest<{ url?: string; file?: string }>('GET', '/v2/print/orders', undefined, {
      orders: orderUuids.join(','),
      format,
    });
  }

  /**
   * Get order barcode print form (A4, A5, A6)
   */
  async getOrderBarcode(orderUuids: string[], format: 'A4' | 'A5' | 'A6' = 'A4'): Promise<{ url?: string; file?: string }> {
    return this.makeRequest<{ url?: string; file?: string }>('GET', '/v2/print/barcodes', undefined, {
      orders: orderUuids.join(','),
      format,
    });
  }

  // =================== WEBHOOKS ===================

  /**
   * Subscribe to webhook
   */
  async subscribeWebhook(url: string, type: string = 'ORDER_STATUS'): Promise<any> {
    return this.makeRequest<any>('POST', '/v2/webhooks', { url, type });
  }

  /**
   * Get webhooks list
   */
  async getWebhooks(): Promise<any[]> {
    return this.makeRequest<any[]>('GET', '/v2/webhooks');
  }

  /**
   * Delete webhook by UUID
   */
  async deleteWebhook(uuid: string): Promise<any> {
    return this.makeRequest<any>('DELETE', `/v2/webhooks/${uuid}`);
  }
}

// Export all types and constants for convenience
export * from './types';
export * from './types/calculator';
export * from './types/orders';
export * from './types/delivery-points';
export * from './types/courier';
export * from './constants';
export * from './utils'; 