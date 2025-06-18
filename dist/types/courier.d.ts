import { Contact, Location } from './index';
/**
 * Courier request data
 */
export interface CourierRequest {
    /** Expected courier date */
    intake_date: string;
    /** Courier waiting start time */
    intake_time_from: string;
    /** Courier waiting end time */
    intake_time_to: string;
    /** Lunch break start */
    lunch_time_from?: string;
    /** Lunch break end */
    lunch_time_to?: string;
    /** Company name */
    name?: string;
    /** Shipment weight */
    weight: number;
    /** Shipment length */
    length?: number;
    /** Shipment width */
    width?: number;
    /** Shipment height */
    height?: number;
    /** Comment */
    comment?: string;
    /** Sender */
    sender: Contact;
    /** Sender address */
    from_location: Location;
    /** Paper waybill delivery required */
    need_call?: boolean;
}
/**
 * Courier request response
 */
export interface CourierResponse {
    /** Request entity */
    entity: {
        /** Request identifier */
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
 * Courier request information
 */
export interface CourierInfo {
    /** Request identifier */
    uuid: string;
    /** Request number */
    number?: string;
    /** Request status */
    status: string;
    /** Expected courier date */
    intake_date: string;
    /** Courier waiting start time */
    intake_time_from: string;
    /** Courier waiting end time */
    intake_time_to: string;
    /** Lunch break start */
    lunch_time_from?: string;
    /** Lunch break end */
    lunch_time_to?: string;
    /** Company name */
    name?: string;
    /** Shipment weight */
    weight: number;
    /** Shipment length */
    length?: number;
    /** Shipment width */
    width?: number;
    /** Shipment height */
    height?: number;
    /** Comment */
    comment?: string;
    /** Sender */
    sender: Contact;
    /** Sender address */
    from_location: Location;
    /** Paper waybill delivery required */
    need_call?: boolean;
    /** Request creation date */
    date_create?: string;
    /** Request completion date */
    date_complete?: string;
    /** Courier information */
    courier?: {
        /** Courier name */
        name?: string;
        /** Courier phone */
        phone?: string;
        /** Courier arrival time */
        arrival_time?: string;
    };
    /** Request cancellation reason */
    cancel_reason?: string;
}
/**
 * Courier request search parameters
 */
export interface CourierSearchParams {
    /** Request UUID */
    uuid?: string;
    /** Request number */
    number?: string;
    /** Request status */
    status?: string;
    /** Expected courier date (period start) */
    intake_date_from?: string;
    /** Expected courier date (period end) */
    intake_date_to?: string;
    /** Request creation date (period start) */
    date_create_from?: string;
    /** Request creation date (period end) */
    date_create_to?: string;
    /** Page size */
    size?: number;
    /** Page number */
    page?: number;
}
/**
 * Courier status
 */
export interface CourierStatus {
    /** Status code */
    code: string;
    /** Status name */
    name: string;
    /** Status setting date and time */
    date_time: string;
    /** Status description */
    description?: string;
}
//# sourceMappingURL=courier.d.ts.map