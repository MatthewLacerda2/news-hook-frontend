# AlertChatsApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**handleTelegramWebhookApiV1AlertChatsWebhookTokenPost**](#handletelegramwebhookapiv1alertchatswebhooktokenpost) | **POST** /api/v1/alert-chats/webhook/{token} | Handle Telegram Webhook|

# **handleTelegramWebhookApiV1AlertChatsWebhookTokenPost**
> any handleTelegramWebhookApiV1AlertChatsWebhookTokenPost(requestBody)


### Example

```typescript
import {
    AlertChatsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AlertChatsApi(configuration);

let token: string; // (default to undefined)
let requestBody: { [key: string]: any; }; //

const { status, data } = await apiInstance.handleTelegramWebhookApiV1AlertChatsWebhookTokenPost(
    token,
    requestBody
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **requestBody** | **{ [key: string]: any; }**|  | |
| **token** | [**string**] |  | defaults to undefined|


### Return type

**any**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Successful Response |  -  |
|**422** | Validation Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

