# AlertsApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**cancelAlertApiV1AlertsAlertIdCancelPatch**](#cancelalertapiv1alertsalertidcancelpatch) | **PATCH** /api/v1/alerts/{alert_id}/cancel | Cancel Alert|
|[**createAlertApiV1AlertsPost**](#createalertapiv1alertspost) | **POST** /api/v1/alerts/ | Create Alert|
|[**getAlertApiV1AlertsAlertIdGet**](#getalertapiv1alertsalertidget) | **GET** /api/v1/alerts/{alert_id} | Get Alert|
|[**listAlertsApiV1AlertsGet**](#listalertsapiv1alertsget) | **GET** /api/v1/alerts/ | List Alerts|
|[**patchAlertApiV1AlertsAlertIdPatch**](#patchalertapiv1alertsalertidpatch) | **PATCH** /api/v1/alerts/{alert_id} | Patch Alert|

# **cancelAlertApiV1AlertsAlertIdCancelPatch**
> any cancelAlertApiV1AlertsAlertIdCancelPatch()

Mark an alert as CANCELLED. We do not \'delete\' the alert, for billing purposes

### Example

```typescript
import {
    AlertsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AlertsApi(configuration);

let alertId: string; // (default to undefined)

const { status, data } = await apiInstance.cancelAlertApiV1AlertsAlertIdCancelPatch(
    alertId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **alertId** | [**string**] |  | defaults to undefined|


### Return type

**any**

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

# **createAlertApiV1AlertsPost**
> AlertPromptCreateSuccessResponse createAlertApiV1AlertsPost(alertPromptCreateRequestBase)

Create a new alert for monitoring

### Example

```typescript
import {
    AlertsApi,
    Configuration,
    AlertPromptCreateRequestBase
} from './api';

const configuration = new Configuration();
const apiInstance = new AlertsApi(configuration);

let alertPromptCreateRequestBase: AlertPromptCreateRequestBase; //

const { status, data } = await apiInstance.createAlertApiV1AlertsPost(
    alertPromptCreateRequestBase
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **alertPromptCreateRequestBase** | **AlertPromptCreateRequestBase**|  | |


### Return type

**AlertPromptCreateSuccessResponse**

### Authorization

[APIKeyHeader](../README.md#APIKeyHeader)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**201** | Successful Response |  -  |
|**422** | Validation Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getAlertApiV1AlertsAlertIdGet**
> AlertPromptItem getAlertApiV1AlertsAlertIdGet()

Get a specific alert by ID

### Example

```typescript
import {
    AlertsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AlertsApi(configuration);

let alertId: string; // (default to undefined)

const { status, data } = await apiInstance.getAlertApiV1AlertsAlertIdGet(
    alertId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **alertId** | [**string**] |  | defaults to undefined|


### Return type

**AlertPromptItem**

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

# **listAlertsApiV1AlertsGet**
> AlertPromptListResponse listAlertsApiV1AlertsGet()

List all alerts for the authenticated user with filtering and pagination

### Example

```typescript
import {
    AlertsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AlertsApi(configuration);

let offset: number; // (optional) (default to 0)
let limit: number; // (optional) (default to 50)
let promptContains: string; // (optional) (default to undefined)
let maxDatetime: string; // (optional) (default to undefined)
let createdAfter: string; // (optional) (default to undefined)

const { status, data } = await apiInstance.listAlertsApiV1AlertsGet(
    offset,
    limit,
    promptContains,
    maxDatetime,
    createdAfter
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **offset** | [**number**] |  | (optional) defaults to 0|
| **limit** | [**number**] |  | (optional) defaults to 50|
| **promptContains** | [**string**] |  | (optional) defaults to undefined|
| **maxDatetime** | [**string**] |  | (optional) defaults to undefined|
| **createdAfter** | [**string**] |  | (optional) defaults to undefined|


### Return type

**AlertPromptListResponse**

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

# **patchAlertApiV1AlertsAlertIdPatch**
> AlertPromptItem patchAlertApiV1AlertsAlertIdPatch(alertPatchRequest)

Patch an alert

### Example

```typescript
import {
    AlertsApi,
    Configuration,
    AlertPatchRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new AlertsApi(configuration);

let alertId: string; // (default to undefined)
let alertPatchRequest: AlertPatchRequest; //

const { status, data } = await apiInstance.patchAlertApiV1AlertsAlertIdPatch(
    alertId,
    alertPatchRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **alertPatchRequest** | **AlertPatchRequest**|  | |
| **alertId** | [**string**] |  | defaults to undefined|


### Return type

**AlertPromptItem**

### Authorization

[APIKeyHeader](../README.md#APIKeyHeader)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Successful Response |  -  |
|**422** | Validation Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

