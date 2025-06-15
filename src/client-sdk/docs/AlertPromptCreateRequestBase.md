# AlertPromptCreateRequestBase


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**prompt** | **string** | The description of what to monitor. Try to be specific, clear and succinct. | [default to undefined]
**http_url** | **string** | The URL to alert at | [default to undefined]
**http_headers** | **{ [key: string]: any; }** |  | [optional] [default to undefined]
**is_recurring** | **boolean** | Should we send the alert every time the condition is met? | [default to undefined]
**http_method** | [**HttpMethod**](HttpMethod.md) |  | [optional] [default to undefined]
**llm_model** | **string** |  | [optional] [default to undefined]
**payload_format** | **{ [key: string]: any; }** |  | [optional] [default to undefined]
**max_datetime** | **string** |  | [optional] [default to undefined]

## Example

```typescript
import { AlertPromptCreateRequestBase } from './api';

const instance: AlertPromptCreateRequestBase = {
    prompt,
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
