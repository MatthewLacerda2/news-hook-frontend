# EventsApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**listEventsApiV1EventsGet**](#listeventsapiv1eventsget) | **GET** /api/v1/events/ | List Events|

# **listEventsApiV1EventsGet**
> AlertEventListResponse listEventsApiV1EventsGet()

List all events for the authenticated user with filtering and pagination

### Example

```typescript
import {
    EventsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new EventsApi(configuration);

let offset: number; // (optional) (default to 0)
let limit: number; // (optional) (default to 50)
let triggeredBefore: string; // (optional) (default to undefined)
let triggeredAfter: string; // (optional) (default to undefined)

const { status, data } = await apiInstance.listEventsApiV1EventsGet(
    offset,
    limit,
    triggeredBefore,
    triggeredAfter
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **offset** | [**number**] |  | (optional) defaults to 0|
| **limit** | [**number**] |  | (optional) defaults to 50|
| **triggeredBefore** | [**string**] |  | (optional) defaults to undefined|
| **triggeredAfter** | [**string**] |  | (optional) defaults to undefined|


### Return type

**AlertEventListResponse**

### Authorization

[APIKeyHeader](../README.md#APIKeyHeader)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Successful Response |  -  |
|**422** | Validation Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

