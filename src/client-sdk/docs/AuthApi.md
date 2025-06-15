# AuthApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**checkCreditsApiV1AuthCreditsGet**](#checkcreditsapiv1authcreditsget) | **GET** /api/v1/auth/credits | Check Credits|
|[**deleteAccountApiV1AuthAccountDelete**](#deleteaccountapiv1authaccountdelete) | **DELETE** /api/v1/auth/account | Delete Account|
|[**loginApiV1AuthLoginPost**](#loginapiv1authloginpost) | **POST** /api/v1/auth/login | Login|
|[**signupApiV1AuthSignupPost**](#signupapiv1authsignuppost) | **POST** /api/v1/auth/signup | Signup|

# **checkCreditsApiV1AuthCreditsGet**
> any checkCreditsApiV1AuthCreditsGet()

Get the current user\'s credit balance.

### Example

```typescript
import {
    AuthApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AuthApi(configuration);

let authorization: string; // (optional) (default to undefined)

const { status, data } = await apiInstance.checkCreditsApiV1AuthCreditsGet(
    authorization
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **authorization** | [**string**] |  | (optional) defaults to undefined|


### Return type

**any**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Successful Response |  -  |
|**422** | Validation Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **deleteAccountApiV1AuthAccountDelete**
> any deleteAccountApiV1AuthAccountDelete()

Delete user account and all associated data (alert prompts)

### Example

```typescript
import {
    AuthApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AuthApi(configuration);

const { status, data } = await apiInstance.deleteAccountApiV1AuthAccountDelete();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**any**

### Authorization

[HTTPBearer](../README.md#HTTPBearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Successful Response |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **loginApiV1AuthLoginPost**
> TokenResponse loginApiV1AuthLoginPost(oAuth2Request)

Login using Google OAuth2 token.

### Example

```typescript
import {
    AuthApi,
    Configuration,
    OAuth2Request
} from './api';

const configuration = new Configuration();
const apiInstance = new AuthApi(configuration);

let oAuth2Request: OAuth2Request; //

const { status, data } = await apiInstance.loginApiV1AuthLoginPost(
    oAuth2Request
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **oAuth2Request** | **OAuth2Request**|  | |


### Return type

**TokenResponse**

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

# **signupApiV1AuthSignupPost**
> TokenResponse signupApiV1AuthSignupPost(oAuth2Request)

Sign up a new user using Google OAuth2 token.

### Example

```typescript
import {
    AuthApi,
    Configuration,
    OAuth2Request
} from './api';

const configuration = new Configuration();
const apiInstance = new AuthApi(configuration);

let oAuth2Request: OAuth2Request; //

const { status, data } = await apiInstance.signupApiV1AuthSignupPost(
    oAuth2Request
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **oAuth2Request** | **OAuth2Request**|  | |


### Return type

**TokenResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**201** | Successful Response |  -  |
|**422** | Validation Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

