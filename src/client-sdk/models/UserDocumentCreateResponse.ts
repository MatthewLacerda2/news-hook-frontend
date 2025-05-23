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
/**
 * 
 * @export
 * @interface UserDocumentCreateResponse
 */
export interface UserDocumentCreateResponse {
    /**
     * The id of the document
     * @type {string}
     * @memberof UserDocumentCreateResponse
     */
    id: string;
    /**
     * The name of the document
     * @type {string}
     * @memberof UserDocumentCreateResponse
     */
    name: string;
    /**
     * The date and time the document was created
     * @type {Date}
     * @memberof UserDocumentCreateResponse
     */
    createdAt: Date;
}

/**
 * Check if a given object implements the UserDocumentCreateResponse interface.
 */
export function instanceOfUserDocumentCreateResponse(value: object): value is UserDocumentCreateResponse {
    if (!('id' in value) || value['id'] === undefined) return false;
    if (!('name' in value) || value['name'] === undefined) return false;
    if (!('createdAt' in value) || value['createdAt'] === undefined) return false;
    return true;
}

export function UserDocumentCreateResponseFromJSON(json: any): UserDocumentCreateResponse {
    return UserDocumentCreateResponseFromJSONTyped(json, false);
}

export function UserDocumentCreateResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): UserDocumentCreateResponse {
    if (json == null) {
        return json;
    }
    return {
        
        'id': json['id'],
        'name': json['name'],
        'createdAt': (new Date(json['created_at'])),
    };
}

export function UserDocumentCreateResponseToJSON(json: any): UserDocumentCreateResponse {
    return UserDocumentCreateResponseToJSONTyped(json, false);
}

export function UserDocumentCreateResponseToJSONTyped(value?: UserDocumentCreateResponse | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'id': value['id'],
        'name': value['name'],
        'created_at': ((value['createdAt']).toISOString()),
    };
}

