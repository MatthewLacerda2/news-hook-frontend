import { AlertsApi, Configuration, HttpMethod } from "@/client-sdk";


const alertApi = new AlertsApi(new Configuration({ basePath: "http://127.0.0.1:8000" }));


//prompt, httpMethod, httpUrl, httpHeaders, llmModel, payloadFormat, maxDatetime
const createAlertResponse = await alertApi.createAlertApiV1AlertsPost({
    alertPromptCreateRequestBase: {
        prompt: "test",
        httpMethod: HttpMethod.Post,
        httpUrl: "https://127.0.0.1:3000/api/v1/alerts",
        httpHeaders: {},
        llmModel: "llama3",
        payloadFormat: {},
        maxDatetime: new Date(),
    }
});