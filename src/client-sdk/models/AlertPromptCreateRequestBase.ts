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
import type { HttpMethod } from './HttpMethod';
import {
    HttpMethodFromJSON,
    HttpMethodFromJSONTyped,
    HttpMethodToJSON,
    HttpMethodToJSONTyped,
} from './HttpMethod';

/**
 * 
 * @export
 * @interface AlertPromptCreateRequestBase
 */
export interface AlertPromptCreateRequestBase {
    /**
     * The natural language prompt describing what to monitor
     * @type {string}
     * @memberof AlertPromptCreateRequestBase
     */
    prompt: string;
    /**
     * HTTP method to alert at
     * @type {HttpMethod}
     * @memberof AlertPromptCreateRequestBase
     */
    httpMethod: HttpMethod;
    /**
     * The URL to alert at
     * @type {string}
     * @memberof AlertPromptCreateRequestBase
     */
    httpUrl: string;
    /**
     * 
     * @type {{ [key: string]: any; }}
     * @memberof AlertPromptCreateRequestBase
     */
    httpHeaders?: { [key: string]: any; } | null;
    /**
     * The LLM model to use for the alert
     * @type {string}
     * @memberof AlertPromptCreateRequestBase
     */
    llmModel?: string;
    /**
     * 
     * @type {{ [key: string]: any; }}
     * @memberof AlertPromptCreateRequestBase
     */
    payloadFormat?: { [key: string]: any; } | null;
    /**
     * 
     * @type {Date}
     * @memberof AlertPromptCreateRequestBase
     */
    maxDatetime?: Date | null;
}



/**
 * Check if a given object implements the AlertPromptCreateRequestBase interface.
 */
export function instanceOfAlertPromptCreateRequestBase(value: object): value is AlertPromptCreateRequestBase {
    if (!('prompt' in value) || value['prompt'] === undefined) return false;
    if (!('httpMethod' in value) || value['httpMethod'] === undefined) return false;
    if (!('httpUrl' in value) || value['httpUrl'] === undefined) return false;
    return true;
}

export function AlertPromptCreateRequestBaseFromJSON(json: any): AlertPromptCreateRequestBase {
    return AlertPromptCreateRequestBaseFromJSONTyped(json, false);
}

export function AlertPromptCreateRequestBaseFromJSONTyped(json: any, ignoreDiscriminator: boolean): AlertPromptCreateRequestBase {
    if (json == null) {
        return json;
    }
    return {
        
        'prompt': json['prompt'],
        'httpMethod': HttpMethodFromJSON(json['http_method']),
        'httpUrl': json['http_url'],
        'httpHeaders': json['http_headers'] == null ? undefined : json['http_headers'],
        'llmModel': json['llm_model'] == null ? undefined : json['llm_model'],
        'payloadFormat': json['payload_format'] == null ? undefined : json['payload_format'],
        'maxDatetime': json['max_datetime'] == null ? undefined : (new Date(json['max_datetime'])),
    };
}

export function AlertPromptCreateRequestBaseToJSON(json: any): AlertPromptCreateRequestBase {
    return AlertPromptCreateRequestBaseToJSONTyped(json, false);
}

export function AlertPromptCreateRequestBaseToJSONTyped(value?: AlertPromptCreateRequestBase | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'prompt': value['prompt'],
        'http_method': HttpMethodToJSON(value['httpMethod']),
        'http_url': value['httpUrl'],
        'http_headers': value['httpHeaders'],
        'llm_model': value['llmModel'],
        'payload_format': value['payloadFormat'],
        'max_datetime': value['maxDatetime'] == null ? undefined : ((value['maxDatetime'] as any).toISOString()),
    };
}

