# AlertPromptItem


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **string** | The ID of the alert | [default to undefined]
**prompt** | **string** | The description of what to monitor. Try to be specific, clear and succinct. | [default to undefined]
**http_method** | [**HttpMethod**](HttpMethod.md) |  | [default to undefined]
**http_url** | **string** |  | [default to undefined]
**http_headers** | **{ [key: string]: any; }** |  | [optional] [default to undefined]
**is_recurring** | **boolean** | Whether the alert is recurring | [default to undefined]
**tags** | **Array&lt;string&gt;** | Tags for hinting | [optional] [default to undefined]
**status** | [**AlertStatus**](AlertStatus.md) |  | [default to undefined]
**created_at** | **string** | The date and time the alert was created | [default to undefined]
**expires_at** | **string** | The date and time the alert will expire | [default to undefined]
**llm_model** | **string** | The LLM model used to create the alert | [default to undefined]

## Example

```typescript
import { AlertPromptItem } from './api';

const instance: AlertPromptItem = {
    id,
    prompt,
    http_method,
    http_url,
    http_headers,
    is_recurring,
    tags,
    status,
    created_at,
    expires_at,
    llm_model,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
