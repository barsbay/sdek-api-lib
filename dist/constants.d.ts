/**
 * CDEK API SDK - Constants
 * @packageDocumentation
 */
/**
 * CDEK tariff codes
 */
export declare const TARIFF_CODES: {
    readonly EXPRESS_LIGHT_DOOR_TO_DOOR: 1;
    readonly EXPRESS_LIGHT_DOOR_TO_WAREHOUSE: 2;
    readonly EXPRESS_LIGHT_WAREHOUSE_TO_DOOR: 3;
    readonly EXPRESS_LIGHT_WAREHOUSE_TO_WAREHOUSE: 4;
    readonly EXPRESS_HEAVY_DOOR_TO_DOOR: 7;
    readonly EXPRESS_HEAVY_DOOR_TO_WAREHOUSE: 8;
    readonly EXPRESS_HEAVY_WAREHOUSE_TO_DOOR: 9;
    readonly EXPRESS_HEAVY_WAREHOUSE_TO_WAREHOUSE: 10;
    readonly SUPER_EXPRESS_18_DOOR_TO_DOOR: 11;
    readonly SUPER_EXPRESS_18_DOOR_TO_WAREHOUSE: 12;
    readonly SUPER_EXPRESS_18_WAREHOUSE_TO_DOOR: 13;
    readonly SUPER_EXPRESS_18_WAREHOUSE_TO_WAREHOUSE: 14;
    readonly ECONOMIC_EXPRESS_WAREHOUSE_TO_WAREHOUSE: 15;
    readonly CDEK_EXPRESS_WAREHOUSE_TO_WAREHOUSE: 62;
    readonly CDEK_EXPRESS_DOOR_TO_DOOR: 63;
    readonly CDEK_EXPRESS_DOOR_TO_WAREHOUSE: 64;
    readonly CDEK_EXPRESS_WAREHOUSE_TO_DOOR: 65;
    readonly PACKAGE_WAREHOUSE_TO_WAREHOUSE: 136;
    readonly PACKAGE_DOOR_TO_DOOR: 137;
    readonly PACKAGE_DOOR_TO_WAREHOUSE: 138;
    readonly PACKAGE_WAREHOUSE_TO_DOOR: 139;
    readonly ECONOMIC_PACKAGE_WAREHOUSE_TO_WAREHOUSE: 233;
    readonly ECONOMIC_PACKAGE_DOOR_TO_DOOR: 234;
    readonly ECONOMIC_PACKAGE_DOOR_TO_WAREHOUSE: 235;
    readonly ECONOMIC_PACKAGE_WAREHOUSE_TO_DOOR: 236;
    readonly POSTAMAT_WAREHOUSE_TO_POSTAMAT: 444;
    readonly POSTAMAT_DOOR_TO_POSTAMAT: 445;
    readonly POSTAMAT_TO_POSTAMAT: 446;
    readonly POSTAMAT_TO_DOOR: 447;
    readonly POSTAMAT_TO_WAREHOUSE: 448;
};
/**
 * CDEK additional service codes
 */
export declare const SERVICE_CODES: {
    readonly INSURANCE: "INSURANCE";
    readonly INVOICE: "INVOICE";
    readonly PART_DELIV: "PART_DELIV";
    readonly RETURN_DOCS: "RETURN_DOCS";
    readonly RETURN_CARGO: "RETURN_CARGO";
    readonly TRY_AT_HOME: "TRY_AT_HOME";
    readonly PERSONAL_DELIVERY: "PERSONAL_DELIVERY";
    readonly DELIVERY_TO_HANDS: "DELIVERY_TO_HANDS";
    readonly DELIVERY_NOTIFICATION: "DELIV_NOTIFICATION";
    readonly SMS_NOTIFICATION: "SMS_NOTIFICATION";
    readonly INSPECTION: "INSPECTION";
    readonly PICKUP_FROM_SENDER: "PICKUP_FROM_SENDER";
    readonly DELIVERY_TO_RECIPIENT: "DELIVERY_TO_RECIPIENT";
    readonly PHOTO_REPORT: "PHOTO_REPORT";
    readonly LONG_STORAGE: "LONG_STORAGE";
    readonly COST_SURCHARGE: "COST_SURCHARGE";
    readonly DELIVERY_TO_ROOM: "DELIVERY_TO_ROOM";
    readonly EVENING_DELIVERY: "EVENING_DELIVERY";
    readonly WEEKEND_DELIVERY: "WEEKEND_DELIVERY";
    readonly EXACT_TIME_DELIVERY: "EXACT_TIME_DELIVERY";
    readonly CALL_BEFORE_DELIVERY: "CALL_BEFORE_DELIVERY";
    readonly CALL_30MIN_BEFORE: "CALL_30MIN_BEFORE";
    readonly CALL_ON_DEPARTURE: "CALL_ON_DEPARTURE";
};
/**
 * CDEK order statuses
 */
export declare const ORDER_STATUSES: {
    readonly CREATED: "CREATED";
    readonly ACCEPTED_AT_SENDER_WAREHOUSE: "ACCEPTED_AT_SENDER_WAREHOUSE";
    readonly SENT_TO_DESTINATION: "SENT_TO_DESTINATION";
    readonly ACCEPTED_AT_TRANSIT_WAREHOUSE: "ACCEPTED_AT_TRANSIT_WAREHOUSE";
    readonly SENT_TO_TRANSIT: "SENT_TO_TRANSIT";
    readonly ACCEPTED_AT_DESTINATION_WAREHOUSE: "ACCEPTED_AT_DESTINATION_WAREHOUSE";
    readonly GIVEN_TO_COURIER: "GIVEN_TO_COURIER";
    readonly DELIVERED_TO_PICKUP_POINT: "DELIVERED_TO_PICKUP_POINT";
    readonly DELIVERED: "DELIVERED";
    readonly NOT_DELIVERED: "NOT_DELIVERED";
    readonly RETURNED_TO_WAREHOUSE: "RETURNED_TO_WAREHOUSE";
    readonly ORDER_CREATION_CANCELLED: "ORDER_CREATION_CANCELLED";
    readonly DELETED: "DELETED";
    readonly RECIPIENT_UNREACHABLE: "RECIPIENT_UNREACHABLE";
    readonly ADDRESS_ERROR: "ADDRESS_ERROR";
    readonly DELIVERY_REFUSED: "DELIVERY_REFUSED";
    readonly LOST: "LOST";
    readonly PARTIALLY_LOST: "PARTIALLY_LOST";
    readonly RETURNED_TO_SENDER: "RETURNED_TO_SENDER";
};
/**
 * API error codes
 */
export declare const ERROR_CODES: {
    readonly INVALID_CREDENTIALS: "invalid_credentials";
    readonly TOKEN_EXPIRED: "token_expired";
    readonly INSUFFICIENT_PRIVILEGES: "insufficient_privileges";
    readonly ORDER_NOT_FOUND: "order_not_found";
    readonly ORDER_CANNOT_BE_CHANGED: "order_cannot_be_changed";
    readonly INVALID_DATA_FORMAT: "invalid_data_format";
    readonly REQUIRED_FIELD_MISSING: "required_field_missing";
    readonly RATE_LIMIT_EXCEEDED: "rate_limit_exceeded";
    readonly INTERNAL_SERVER_ERROR: "internal_server_error";
    readonly TARIFF_NOT_AVAILABLE: "tariff_not_available";
    readonly INVALID_DIMENSIONS: "invalid_dimensions";
    readonly INVALID_WEIGHT: "invalid_weight";
    readonly CITY_NOT_FOUND: "city_not_found";
    readonly ADDRESS_NOT_FOUND: "address_not_found";
    readonly PICKUP_POINT_NOT_FOUND: "pickup_point_not_found";
    readonly COURIER_NOT_AVAILABLE: "courier_not_available";
};
//# sourceMappingURL=constants.d.ts.map