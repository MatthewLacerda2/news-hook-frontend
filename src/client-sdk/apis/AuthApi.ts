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


import * as runtime from '../runtime';
import type {
  HTTPValidationError,
  OAuth2Request,
  TokenResponse,
} from '../models/index';
import {
    HTTPValidationErrorFromJSON,
    HTTPValidationErrorToJSON,
    OAuth2RequestFromJSON,
    OAuth2RequestToJSON,
    TokenResponseFromJSON,
    TokenResponseToJSON,
} from '../models/index';

export interface CheckCreditsApiV1AuthCreditsGetRequest {
    authorization?: string;
}

export interface LoginApiV1AuthLoginPostRequest {
    oAuth2Request: OAuth2Request;
}

export interface SignupApiV1AuthSignupPostRequest {
    oAuth2Request: OAuth2Request;
}

/**
 * 
 */
export class AuthApi extends runtime.BaseAPI {

    /**
     * Get the current user\'s credit balance.
     * Check Credits
     */
    async checkCreditsApiV1AuthCreditsGetRaw(requestParameters: CheckCreditsApiV1AuthCreditsGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<any>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (requestParameters['authorization'] != null) {
            headerParameters['authorization'] = String(requestParameters['authorization']);
        }

        const response = await this.request({
            path: `/api/v1/auth/credits`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        if (this.isJsonMime(response.headers.get('content-type'))) {
            return new runtime.JSONApiResponse<any>(response);
        } else {
            return new runtime.TextApiResponse(response) as any;
        }
    }

    /**
     * Get the current user\'s credit balance.
     * Check Credits
     */
    async checkCreditsApiV1AuthCreditsGet(requestParameters: CheckCreditsApiV1AuthCreditsGetRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<any> {
        const response = await this.checkCreditsApiV1AuthCreditsGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Delete user account and all associated data (alert prompts)
     * Delete Account
     */
    async deleteAccountApiV1AuthAccountDeleteRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<any>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("HTTPBearer", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/api/v1/auth/account`,
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        if (this.isJsonMime(response.headers.get('content-type'))) {
            return new runtime.JSONApiResponse<any>(response);
        } else {
            return new runtime.TextApiResponse(response) as any;
        }
    }

    /**
     * Delete user account and all associated data (alert prompts)
     * Delete Account
     */
    async deleteAccountApiV1AuthAccountDelete(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<any> {
        const response = await this.deleteAccountApiV1AuthAccountDeleteRaw(initOverrides);
        return await response.value();
    }

    /**
     * Login using Google OAuth2 token.
     * Login
     */
    async loginApiV1AuthLoginPostRaw(requestParameters: LoginApiV1AuthLoginPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<TokenResponse>> {
        if (requestParameters['oAuth2Request'] == null) {
            throw new runtime.RequiredError(
                'oAuth2Request',
                'Required parameter "oAuth2Request" was null or undefined when calling loginApiV1AuthLoginPost().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/api/v1/auth/login`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: OAuth2RequestToJSON(requestParameters['oAuth2Request']),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => TokenResponseFromJSON(jsonValue));
    }

    /**
     * Login using Google OAuth2 token.
     * Login
     */
    async loginApiV1AuthLoginPost(requestParameters: LoginApiV1AuthLoginPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<TokenResponse> {
        const response = await this.loginApiV1AuthLoginPostRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Sign up a new user using Google OAuth2 token.
     * Signup
     */
    async signupApiV1AuthSignupPostRaw(requestParameters: SignupApiV1AuthSignupPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<TokenResponse>> {
        if (requestParameters['oAuth2Request'] == null) {
            throw new runtime.RequiredError(
                'oAuth2Request',
                'Required parameter "oAuth2Request" was null or undefined when calling signupApiV1AuthSignupPost().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/api/v1/auth/signup`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: OAuth2RequestToJSON(requestParameters['oAuth2Request']),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => TokenResponseFromJSON(jsonValue));
    }

    /**
     * Sign up a new user using Google OAuth2 token.
     * Signup
     */
    async signupApiV1AuthSignupPost(requestParameters: SignupApiV1AuthSignupPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<TokenResponse> {
        const response = await this.signupApiV1AuthSignupPostRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
