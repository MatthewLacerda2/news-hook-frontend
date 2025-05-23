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
  LLMModelListResponse,
} from '../models/index';
import {
    HTTPValidationErrorFromJSON,
    HTTPValidationErrorToJSON,
    LLMModelListResponseFromJSON,
    LLMModelListResponseToJSON,
} from '../models/index';

export interface ListLlmModelsApiV1LlmModelsGetRequest {
    activesOnly?: boolean;
}

/**
 * 
 */
export class LlmModelsApi extends runtime.BaseAPI {

    /**
     * List available LLM models. If actives_only is True (default), only return active models. If actives_only is False, return all models.
     * List Llm Models
     */
    async listLlmModelsApiV1LlmModelsGetRaw(requestParameters: ListLlmModelsApiV1LlmModelsGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<LLMModelListResponse>> {
        const queryParameters: any = {};

        if (requestParameters['activesOnly'] != null) {
            queryParameters['actives_only'] = requestParameters['activesOnly'];
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/api/v1/llm-models/`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => LLMModelListResponseFromJSON(jsonValue));
    }

    /**
     * List available LLM models. If actives_only is True (default), only return active models. If actives_only is False, return all models.
     * List Llm Models
     */
    async listLlmModelsApiV1LlmModelsGet(requestParameters: ListLlmModelsApiV1LlmModelsGetRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<LLMModelListResponse> {
        const response = await this.listLlmModelsApiV1LlmModelsGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
