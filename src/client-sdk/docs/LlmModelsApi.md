# LlmModelsApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**listLlmModelsApiV1LlmModelsGet**](#listllmmodelsapiv1llmmodelsget) | **GET** /api/v1/llm-models/ | List Llm Models|

# **listLlmModelsApiV1LlmModelsGet**
> LLMModelListResponse listLlmModelsApiV1LlmModelsGet()

List all active LLM models.

### Example

```typescript
import {
    LlmModelsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new LlmModelsApi(configuration);

const { status, data } = await apiInstance.listLlmModelsApiV1LlmModelsGet();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**LLMModelListResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Successful Response |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

