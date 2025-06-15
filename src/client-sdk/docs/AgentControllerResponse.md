# AgentControllerResponse


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**email** | **string** |  | [default to undefined]
**name** | **string** |  | [optional] [default to undefined]
**google_id** | **string** | Google\&#39;s unique user ID | [default to undefined]
**id** | **string** |  | [default to undefined]
**api_key** | **string** | API key for authentication | [default to undefined]
**credit_balance** | **number** | Credits. In cents of USD | [optional] [default to 10]
**created_at** | **string** |  | [default to undefined]
**last_login** | **string** |  | [optional] [default to undefined]

## Example

```typescript
import { AgentControllerResponse } from './api';

const instance: AgentControllerResponse = {
    email,
    name,
    google_id,
    id,
    api_key,
    credit_balance,
    created_at,
    last_login,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
