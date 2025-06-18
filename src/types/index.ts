/**
 * CDEK API SDK - Core Types
 * @packageDocumentation
 */

/**
 * Configuration for CDEK API client
 */
export interface CdekConfig {
  /** Client identifier */
  clientId: string;
  /** Client secret key */
  clientSecret: string;
  /** Base URL for API (defaults to test environment) */
  baseUrl?: string;
  /** Request timeout in milliseconds */
  timeout?: number;
}

/**
 * Authentication token
 */
export interface AuthToken {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
  jti: string;
}

/**
 * Geographic coordinates
 */
export interface Coordinates {
  /** Latitude */
  latitude: number;
  /** Longitude */
  longitude: number;
}

/**
 * Location information
 */
export interface Location {
  /** City code from CDEK database */
  code?: number;
  /** Postal code */
  postal_code?: string;
  /** Country code in ISO_3166-1_alpha-2 format */
  country_code?: string;
  /** Region name */
  region?: string;
  /** City name */
  city?: string;
  /** FIAS region code */
  fias_region_guid?: string;
  /** FIAS city code */
  fias_guid?: string;
  /** Address string */
  address?: string;
  /** Geographic coordinates */
  coordinates?: Coordinates;
}

/**
 * Contact information
 */
export interface Contact {
  /** Company name */
  company?: string;
  /** Full name of contact person */
  name: string;
  /** Phone numbers list */
  phones: Array<{
    /** Phone number */
    number: string;
    /** Additional number */
    additional?: string;
  }>;
  /** Email address */
  email?: string;
  /** Passport series */
  passport_series?: string;
  /** Passport number */
  passport_number?: string;
  /** Date of birth in YYYY-MM-DD format */
  passport_date_of_birth?: string;
  /** Passport issuing authority */
  passport_organization?: string;
  /** Passport issue date */
  passport_date_of_issue?: string;
  /** Tax identification number */
  tin?: string;
  /** Alternative date of birth for document */
  passport_date_of_birth_alt?: string;
}

/**
 * Item in package
 */
export interface Item {
  /** Item name */
  name: string;
  /** Item identifier/sku */
  ware_key: string;
  /** Declared item value (per unit) */
  cost: number;
  /** Payment amount for item upon receipt (per unit) */
  payment?: number;
  /** Weight (per item unit, in grams) */
  weight?: number;
  /** Gross weight */
  weight_gross?: number;
  /** Number of item units */
  amount: number;
  /** Item name in foreign language */
  name_i18n?: string;
  /** Brand in foreign language */
  brand?: string;
  /** Country of origin code in ISO_3166-1_alpha-2 format */
  country_code?: string;
  /** Item number in declaration */
  material?: string;
  /** Link to online store website with item description */
  url?: string;
}

/**
 * Package/box for shipment
 */
export interface Package {
  /** Package number */
  number: string;
  /** Total weight (in grams) */
  weight: number;
  /** Length (in centimeters) */
  length?: number;
  /** Width (in centimeters) */
  width?: number;
  /** Height (in centimeters) */
  height?: number;
  /** Package comment */
  comment?: string;
  /** Items list in package */
  items: Item[];
}

/**
 * Additional service
 */
export interface Service {
  /** Additional service type */
  code: string;
  /** Additional service parameter */
  parameter?: number;
}

/**
 * Monetary amounts
 */
export interface Money {
  /** Cash on delivery amount */
  value?: number;
  /** VAT rate for cash on delivery service */
  vat_rate?: string;
  /** VAT amount for cash on delivery service */
  vat_sum?: number;
}

/**
 * Order status
 */
export interface OrderStatus {
  /** Status code */
  code: string;
  /** Status name */
  name: string;
  /** Status setting date and time */
  date_time: string;
  /** City where event occurred */
  city?: string;
}

/**
 * Region information
 */
export interface Region {
  /** Region name */
  region: string;
  /** Region code */
  region_code?: number;
  /** FIAS region code */
  fias_region_guid?: string;
  /** KLADR region code */
  kladr_region_code?: string;
  /** Country code */
  country_code: string;
  /** Country name */
  country: string;
}

/**
 * City information
 */
export interface City {
  /** City code */
  code: number;
  /** City name */
  city: string;
  /** Postal code */
  postal_code?: string;
  /** FIAS city code */
  fias_guid?: string;
  /** KLADR code */
  kladr_code?: string;
  /** Country code */
  country_code: string;
  /** Country name */
  country: string;
  /** Region name */
  region: string;
  /** Region code */
  region_code?: number;
  /** FIAS region code */
  fias_region_guid?: string;
  /** KLADR region code */
  kladr_region_code?: string;
  /** Time zone */
  time_zone?: string;
  /** Latitude */
  latitude?: number;
  /** Longitude */
  longitude?: number;
  /** Cash on delivery limit */
  payment_limit?: number;
}

export type { OrderRequest } from './orders'; 