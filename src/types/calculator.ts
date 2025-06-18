import { Location, Service } from './index';

/**
 * Tariff calculation request
 */
export interface TariffRequest {
  /** Tariff code */
  tariff_code?: number;
  /** Origin location */
  from_location: Location;
  /** Destination location */
  to_location: Location;
  /** Packages list */
  packages: Array<{
    /** Total weight (in grams) */
    weight: number;
    /** Length (in centimeters) */
    length?: number;
    /** Width (in centimeters) */
    width?: number;
    /** Height (in centimeters) */
    height?: number;
  }>;
  /** Additional services */
  services?: Service[];
  /** Planned shipment date */
  date?: string;
  /** Currency for calculation */
  currency?: string;
  /** Language for tariff information output */
  lang?: string;
}

/**
 * Tariff calculation result
 */
export interface TariffResponse {
  /** Tariff code */
  tariff_code: number;
  /** Tariff name */
  tariff_name: string;
  /** Tariff description */
  tariff_description: string;
  /** Tariff mode */
  delivery_mode: string;
  /** Delivery cost */
  delivery_sum: number;
  /** Minimum delivery time */
  period_min: number;
  /** Maximum delivery time */
  period_max: number;
  /** Calculated weight */
  weight_calc: number;
  /** Total cost */
  total_sum: number;
  /** Currency */
  currency: string;
  /** Services */
  services?: Array<{
    /** Service code */
    code: string;
    /** Service name */
    name: string;
    /** Service cost */
    sum: number;
  }>;
  /** Errors */
  errors?: Array<{
    /** Error code */
    code: string;
    /** Error description */
    message: string;
  }>;
}

/**
 * Tariff list calculation request
 */
export interface TariffListRequest extends Omit<TariffRequest, 'tariff_code'> {
  /** Array of tariff codes for filtering */
  tariff_codes?: number[];
}

/**
 * Package parameters for calculation
 */
export interface CalculatorPackage {
  /** Total weight (in grams) */
  weight: number;
  /** Length (in centimeters) */
  length?: number;
  /** Width (in centimeters) */
  width?: number;
  /** Height (in centimeters) */
  height?: number;
  /** Volume weight (automatically calculated if not specified) */
  volume_weight?: number;
}

/**
 * Customs duty calculation result
 */
export interface CustomsDutyResponse {
  /** Customs duty amount */
  duty_sum: number;
  /** VAT amount */
  vat_sum: number;
  /** Total customs payments */
  total_sum: number;
  /** Currency */
  currency: string;
  /** Exchange rate */
  exchange_rate?: number;
  /** Calculation details */
  calculation_details?: Array<{
    /** Item name */
    item_name: string;
    /** Item cost */
    item_cost: number;
    /** Duty rate */
    duty_rate: number;
    /** Duty amount */
    duty_amount: number;
    /** VAT rate */
    vat_rate: number;
    /** VAT amount */
    vat_amount: number;
  }>;
}

/**
 * Customs duty calculation request
 */
export interface CustomsDutyRequest {
  /** Origin country */
  from_country_code: string;
  /** Destination country */
  to_country_code: string;
  /** Items list */
  items: Array<{
    /** Item name */
    name: string;
    /** Item unit cost */
    cost: number;
    /** Quantity */
    amount: number;
    /** Item unit weight (in grams) */
    weight: number;
    /** HS code for item */
    hs_code?: string;
  }>;
  /** Currency for item costs */
  currency?: string;
} 