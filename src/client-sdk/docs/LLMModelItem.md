# LLMModelItem


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**model_name** | **string** | The name of the LLM model. Vertex-AI refers to it as the model ID. | [default to undefined]
**input_token_price** | **number** | Input token price in dollars per million tokens, without cache hit | [default to undefined]
**output_token_price** | **number** | Output token price in dollars per million tokens, without cache hit | [default to undefined]

## Example

```typescript
import { LLMModelItem } from './api';

const instance: LLMModelItem = {
    model_name,
    input_token_price,
    output_token_price,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
