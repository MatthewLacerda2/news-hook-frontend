# TokenResponse


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**access_token** | **string** | JWT access token | [default to undefined]
**token_type** | **string** | Type of token | [optional] [default to 'bearer']
**expires_in** | **string** | Token expiration time | [default to undefined]
**agent_controller** | [**AgentControllerResponse**](AgentControllerResponse.md) |  | [default to undefined]

## Example

```typescript
import { TokenResponse } from './api';

const instance: TokenResponse = {
    access_token,
    token_type,
    expires_in,
    agent_controller,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
