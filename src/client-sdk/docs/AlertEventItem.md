# AlertEventItem


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **string** | The ID of the alert event | [default to undefined]
**alert_prompt_id** | **string** | The ID of the alert prompt | [default to undefined]
**triggered_at** | **string** | The datetime the alert event was sent | [default to undefined]
**structured_data** | **{ [key: string]: any; }** | The json schema requested for the alert | [default to undefined]
**status_code** | **number** | The status code of the response | [default to undefined]
**prompt** | **string** | The alert prompt that this event answered to | [default to undefined]
**http_method** | [**HttpMethod**](HttpMethod.md) | The HTTP method used at the URL | [default to undefined]
**http_url** | **string** | The HTTP URL that the alert event was sent to | [default to undefined]
**is_recurring** | **boolean** | Whether the alert is recurring or not | [default to undefined]

## Example

```typescript
import { AlertEventItem } from './api';

const instance: AlertEventItem = {
    id,
    alert_prompt_id,
    triggered_at,
    structured_data,
    status_code,
    prompt,
    http_method,
    http_url,
    is_recurring,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
