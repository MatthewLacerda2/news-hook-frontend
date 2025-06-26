# AlertPatchRequest


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**http_url** | **string** | The URL to alert at | [optional] [default to undefined]
**http_headers** | **{ [key: string]: any; }** |  | [optional] [default to undefined]
**is_recurring** | **boolean** |  | [optional] [default to undefined]
**http_method** | [**HttpMethod**](HttpMethod.md) |  | [optional] [default to undefined]
**llm_model** | **string** |  | [optional] [default to undefined]
**payload_format** | **{ [key: string]: any; }** |  | [optional] [default to undefined]
**max_datetime** | **string** |  | [optional] [default to undefined]

## Example

```typescript
import { AlertPatchRequest } from './api';

const instance: AlertPatchRequest = {
    http_url,
    http_headers,
    is_recurring,
    http_method,
    llm_model,
    payload_format,
    max_datetime,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
