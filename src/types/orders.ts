import type { Contact, Location, Package, Item, Service, Money, OrderStatus } from './index';

// export type Package = BasePackage;
// export type Item = BaseItem;

/**
 * Order data for creation
 */
export interface OrderRequest {
  /** Order type */
  type?: 1 | 2; // 1 - regular delivery, 2 - delivery to postamat
  /** Order number in client system */
  number?: string;
  /** Tariff code */
  tariff_code: number;
  /** Order comment */
  comment?: string;
  /** Developer key */
  developer_key?: string;
  /** CDEK shipment number */
  shipment_point?: string;
  /** Delivery cost charged to recipient by online store */
  delivery_recipient_cost?: Money;
  /** Additional delivery cost charged to recipient by online store */
  delivery_recipient_cost_adv?: Array<{
    /** Item cost threshold */
    threshold?: number;
    /** Additional payment amount */
    sum?: number;
    /** VAT rate */
    vat_rate?: string;
    /** VAT amount */
    vat_sum?: number;
  }>;
  /** Sender */
  sender?: Contact;
  /** Recipient */
  recipient: Contact;
  /** Origin address */
  from_location: Location;
  /** Destination address */
  to_location: Location;
  /** Additional services */
  services?: Service[];
  /** Shipment packages list */
  packages: Package[];
}

/**
 * Order creation response
 */
export interface OrderResponse {
  /** Order entity */
  entity: {
    /** Order identifier in CDEK system */
    uuid: string;
  };
  /** Information messages list */
  requests?: Array<{
    /** Request state */
    request_uuid?: string;
    /** Request type */
    type?: string;
    /** Request date and time */
    date_time?: string;
    /** Request state */
    state?: string;
    /** Errors */
    errors?: Array<{
      /** Error code */
      code: string;
      /** Error description */
      message: string;
    }>;
    /** Warnings */
    warnings?: Array<{
      /** Warning code */
      code: string;
      /** Warning description */
      message: string;
    }>;
  }>;
}

/**
 * Order information
 */
export interface OrderInfo {
  /** Order identifier in CDEK system */
  uuid: string;
  /** CDEK order number */
  cdek_number?: string;
  /** Order number in client system */
  number: string;
  /** Tariff code */
  tariff_code: number;
  /** Order statuses */
  statuses: OrderStatus[];
  /** Sender */
  sender: Contact;
  /** Recipient */
  recipient: Contact;
  /** Origin address */
  from_location: Location;
  /** Destination address */
  to_location: Location;
  /** Additional services */
  services: Service[];
  /** Shipment packages list */
  packages: Package[];
  /** Total shipment weight */
  weight?: number;
  /** Volume weight */
  weight_volume?: number;
  /** Calculated weight */
  weight_calc?: number;
  /** Delivery cost */
  delivery_sum?: number;
  /** Delivery cost currency */
  currency?: string;
}

/**
 * Detailed order information
 */
export interface DetailedOrderInfo extends OrderInfo {
  /** Order creation date */
  date_create?: string;
  /** Planned delivery date */
  date_planned?: string;
  /** Actual delivery date */
  date_delivery?: string;
  /** Delay reason code */
  delay_reason_code?: string;
  /** Non-delivery reason */
  delivery_problem?: string;
  /** Delivery attempts */
  delivery_attempts?: Array<{
    /** Attempt date */
    date: string;
    /** Failure reason */
    reason?: string;
  }>;
  /** Return shipments */
  returns?: Array<{
    /** Return shipment UUID */
    uuid: string;
    /** CDEK number */
    cdek_number?: string;
  }>;
  /** Related orders */
  related_orders?: Array<{
    /** Related order UUID */
    uuid: string;
    /** Relation type */
    type: string;
  }>;
}

/**
 * Order search parameters
 */
export interface OrderSearchParams {
  /** Order UUID */
  uuid?: string;
  /** CDEK order number */
  cdek_number?: string;
  /** Order number in client system */
  number?: string;
  /** Order creation date (period start) */
  date_from?: string;
  /** Order creation date (period end) */
  date_to?: string;
  /** Page size */
  size?: number;
  /** Page number */
  page?: number;
} 