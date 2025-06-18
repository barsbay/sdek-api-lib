import { Coordinates } from './index';

/**
 * Pickup point
 */
export interface DeliveryPoint {
  /** Pickup point code */
  code: string;
  /** Pickup point name */
  name: string;
  /** Location */
  location: {
    /** City code */
    city_code: number;
    /** City name */
    city: string;
    /** Address */
    address: string;
    /** Location description */
    address_comment?: string;
    /** Nearest station */
    nearest_station?: string;
    /** Nearest metro station */
    nearest_metro_station?: string;
    /** Coordinates */
    coordinates: Coordinates;
  };
  /** Pickup point description */
  address_comment?: string;
  /** Nearest station */
  nearest_station?: string;
  /** Nearest metro station */
  nearest_metro_station?: string;
  /** Working hours */
  work_time?: string;
  /** Phone numbers list */
  phones?: Array<{
    /** Phone number */
    number: string;
  }>;
  /** Email */
  email?: string;
  /** Office note */
  note?: string;
  /** Pickup point type */
  type?: string;
  /** Office company affiliation */
  owner_code?: string;
  /** Has payment terminal */
  take_only?: boolean;
  /** Can pick up orders */
  is_handout?: boolean;
  /** Can accept orders */
  is_reception?: boolean;
  /** Has fitting room */
  is_dressing_room?: boolean;
  /** Has weight restrictions */
  have_cashless?: boolean;
  /** Has payment terminal */
  have_cash?: boolean;
  /** Cash on delivery allowed */
  allowed_cod?: boolean;
  /** Size restrictions */
  dimensions?: Array<{
    /** Minimum length */
    width?: number;
    /** Minimum width */
    height?: number;
    /** Minimum height */
    length?: number;
  }>;
  /** Pickup point images */
  images?: Array<{
    /** Image URL */
    url: string;
  }>;
  /** Weight restrictions */
  weight_min?: number;
  /** Maximum weight */
  weight_max?: number;
  /** Size restrictions */
  fulfillment?: boolean;
}

/**
 * Pickup point filter parameters
 */
export interface DeliveryPointFilter {
  /** City code */
  city_code?: number;
  /** Postal code */
  postal_code?: string;
  /** Country code */
  country_code?: string;
  /** Region code */
  region_code?: number;
  /** Cashless payment available */
  have_cashless?: boolean;
  /** Cash payment available */
  have_cash?: boolean;
  /** Cash on delivery allowed */
  allowed_cod?: boolean;
  /** Has fitting room */
  is_dressing_room?: boolean;
  /** Maximum weight for accepted shipments */
  weight_max?: number;
  /** Maximum length dimensions */
  length_max?: number;
  /** Maximum width dimensions */
  width_max?: number;
  /** Maximum height dimensions */
  height_max?: number;
  /** Result language */
  lang?: string;
  /** Pickup points only (not acceptance) */
  take_only?: boolean;
  /** Pickup point type */
  type?: string;
  /** Pickup point function */
  func?: 'have_all' | 'have_cash' | 'have_cashless';
  /** Pickup point code */
  code?: string;
  /** Has fulfillment */
  fulfillment?: boolean;
}

/**
 * Extended pickup point information
 */
export interface ExtendedDeliveryPoint extends DeliveryPoint {
  /** Working schedule by day of week */
  work_schedule?: Array<{
    /** Day of week (1-7, where 1 is Monday) */
    day: number;
    /** Opening time */
    time_from?: string;
    /** Closing time */
    time_to?: string;
    /** Lunch break start */
    break_from?: string;
    /** Lunch break end */
    break_to?: string;
    /** Day off */
    is_day_off?: boolean;
  }>;
  /** Additional services */
  services?: Array<{
    /** Service code */
    code: string;
    /** Service name */
    name: string;
    /** Service availability */
    available: boolean;
  }>;
  /** Pickup point rating */
  rating?: number;
  /** Reviews count */
  reviews_count?: number;
}

/**
 * Pickup point search result
 */
export interface DeliveryPointSearchResult {
  /** Found pickup points list */
  points: DeliveryPoint[];
  /** Total found pickup points count */
  total_count?: number;
  /** Pagination parameters */
  pagination?: {
    /** Current page */
    current_page: number;
    /** Page size */
    page_size: number;
    /** Total pages count */
    total_pages: number;
  };
} 