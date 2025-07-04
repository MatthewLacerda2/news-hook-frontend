/* tslint:disable */
/* eslint-disable */
/**
 * News Hook API
 * API for monitoring and alerting on news and content updates
 *
 * The version of the OpenAPI document: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { mapValues } from '../runtime';
import type { AlertEventItem } from './AlertEventItem';
import {
    AlertEventItemFromJSON,
    AlertEventItemFromJSONTyped,
    AlertEventItemToJSON,
    AlertEventItemToJSONTyped,
} from './AlertEventItem';

/**
 * 
 * @export
 * @interface AlertEventListResponse
 */
export interface AlertEventListResponse {
    /**
     * 
     * @type {Array<AlertEventItem>}
     * @memberof AlertEventListResponse
     */
    events: Array<AlertEventItem>;
    /**
     * 
     * @type {number}
     * @memberof AlertEventListResponse
     */
    totalCount: number;
}

/**
 * Check if a given object implements the AlertEventListResponse interface.
 */
export function instanceOfAlertEventListResponse(value: object): value is AlertEventListResponse {
    if (!('events' in value) || value['events'] === undefined) return false;
    if (!('totalCount' in value) || value['totalCount'] === undefined) return false;
    return true;
}

export function AlertEventListResponseFromJSON(json: any): AlertEventListResponse {
    return AlertEventListResponseFromJSONTyped(json, false);
}

export function AlertEventListResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): AlertEventListResponse {
    if (json == null) {
        return json;
    }
    return {
        
        'events': ((json['events'] as Array<any>).map(AlertEventItemFromJSON)),
        'totalCount': json['total_count'],
    };
}

export function AlertEventListResponseToJSON(json: any): AlertEventListResponse {
    return AlertEventListResponseToJSONTyped(json, false);
}

export function AlertEventListResponseToJSONTyped(value?: AlertEventListResponse | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'events': ((value['events'] as Array<any>).map(AlertEventItemToJSON)),
        'total_count': value['totalCount'],
    };
}

