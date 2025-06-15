# UserDocumentsApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**getUserDocumentApiV1UserDocumentsDocumentIdGet**](#getuserdocumentapiv1userdocumentsdocumentidget) | **GET** /api/v1/user_documents/{document_id} | Get User Document|
|[**getUserDocumentsApiV1UserDocumentsGet**](#getuserdocumentsapiv1userdocumentsget) | **GET** /api/v1/user_documents/ | Get User Documents|
|[**postUserDocumentApiV1UserDocumentsPost**](#postuserdocumentapiv1userdocumentspost) | **POST** /api/v1/user_documents/ | Post User Document|

# **getUserDocumentApiV1UserDocumentsDocumentIdGet**
> UserDocumentItem getUserDocumentApiV1UserDocumentsDocumentIdGet()

Get a document by ID

### Example

```typescript
import {
    UserDocumentsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new UserDocumentsApi(configuration);

let documentId: string; // (default to undefined)

const { status, data } = await apiInstance.getUserDocumentApiV1UserDocumentsDocumentIdGet(
    documentId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **documentId** | [**string**] |  | defaults to undefined|


### Return type

**UserDocumentItem**

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

# **getUserDocumentsApiV1UserDocumentsGet**
> UserDocumentListResponse getUserDocumentsApiV1UserDocumentsGet()

List all documents for the authenticated user. Can filter by substrings in the name or content.

### Example

```typescript
import {
    UserDocumentsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new UserDocumentsApi(configuration);

let contains: string; // (optional) (default to undefined)
let offset: number; // (optional) (default to 0)
let limit: number; // (optional) (default to 50)

const { status, data } = await apiInstance.getUserDocumentsApiV1UserDocumentsGet(
    contains,
    offset,
    limit
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **contains** | [**string**] |  | (optional) defaults to undefined|
| **offset** | [**number**] |  | (optional) defaults to 0|
| **limit** | [**number**] |  | (optional) defaults to 50|


### Return type

**UserDocumentListResponse**

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

# **postUserDocumentApiV1UserDocumentsPost**
> UserDocumentCreateSuccessResponse postUserDocumentApiV1UserDocumentsPost(userDocumentCreateRequest)

Create a new document

### Example

```typescript
import {
    UserDocumentsApi,
    Configuration,
    UserDocumentCreateRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new UserDocumentsApi(configuration);

let userDocumentCreateRequest: UserDocumentCreateRequest; //

const { status, data } = await apiInstance.postUserDocumentApiV1UserDocumentsPost(
    userDocumentCreateRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **userDocumentCreateRequest** | **UserDocumentCreateRequest**|  | |


### Return type

**UserDocumentCreateSuccessResponse**

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

