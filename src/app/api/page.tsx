import EndpointCard from "@/components/alert-events/endpoint-card"
import { BASE_PATH } from "@/client-sdk/runtime"

export default function APIPage() {
  return (
    <div>
      <div className="container max-w-3xl mx-auto mt-18 pb-12">
        <div className="mb-8 text-sm text-gray-200 font-bold">
          <p>URL: {BASE_PATH}</p>
          <p>X-API-Key header is required for all endpoints, except for the /llm-models endpoint</p>
        </div>
        <EndpointCard
          url="/alerts"
          description="Create alert request"
          method="POST"
          properties={[
            {
              title: "Prompt",
              description: "Description of the event or condition to be monitored.\nThe alert request is sent via HTTP request",
              mytype: "string",
              required: true,
            },
            {
              title: "http_method",
              description: "HTTP method to be used when sending the alert request",
              mytype: "enum",
              required: true,
              availableOptions: "POST, PATCH, PUT",
            },
            {
              title: "http_url",
              description: "URL to be used when sending the alert request",
              mytype: "string",
              required: true,
            },
            {
              title: "http_headers",
              description: "HTTP headers to be used when sending the alert request",
              mytype: "object",
              required: false,
            },
            {
              title: "is_recurring",
              description: "Should we send the alert every time the condition is met?",
              mytype: "boolean",
              required: true,
            },
            {
              title: "llm_model",
              description: "The model to be used for validating the alert request and generating the alerts' payload",
              mytype: "string",
              required: false,
              defaultValue: "gemini-2.5-pro-preview-05-06",
              availableOptions: "gemini-2.5-pro-preview-05-06, gemini-2.5-flash-preview-05-20, gemini-2.0-flash-lite-001, gemini-2.0-flash-001",
            },
            {
              title: "payload_format",
              description: "The body of the request. Must be in OpenAPI 3.0 Specification format",
              mytype: "object",
              required: false,
              defaultValue: "An OpenAPI 3.0 Specification of an object with title and description",
            },
            {
              title: "max_datetime",
              description: "The expiration date of the alert request",
              mytype: "datetime",
              required: false,
              defaultValue: "+300 days",
            },
          ]}
        />
        <EndpointCard
          url="/alerts"
          description="List all alerts within the filters"
          method="GET"
          properties={[
            {
              title: "offset",
              description: "The offset of the alert requests to return",
              mytype: "number",
              required: false,
              defaultValue: "0",
              min: 0,
            },
            {
              title: "limit",
              description: "The limit number of alert requests to return",
              mytype: "number",
              required: false,
              defaultValue: "50",
              min: 1,
              max: 100,
            },
            {
              title: "prompt_contains",
              description: "Substring that must be contained in the alert request's prompt",
              mytype: "string",
              required: false,
            },
            {
              title: "created_after",
              description: "The earliest datetime the alert was created at",
              mytype: "datetime",
              required: false,
            },
            {
              title: "max_datetime",
              description: "The latest datetime the alert was created at",
              mytype: "datetime",
              required: false,
              defaultValue: "now",
            }
          ]}
        />
        <EndpointCard
          url="/alerts/{alert_id}/cancel"
          description="Marks the alert request with the given 'id' as 'cancelled'. Does not delete it (for billing purposes)"
          method="PATCH"
          properties={[
            {
              title: "alert_id",
              description: "The ID of the alert request to cancel",
              mytype: "string",
              required: true,
            },
          ]}
        />
        <EndpointCard
          url="/llm-models"
          description="List all LLM models available for the alert requests"
          method="GET"
          properties={[]}
        />
        <EndpointCard
          url="/user_documents"
          description="Send a text to trigger any matching alert requests.\nIt's like sending a .txt file"
          method="POST"
          properties={[
            {
              title: "name",
              description: "The name of the text",
              mytype: "string",
              required: true,
              min: 3
            },
            {
              title: "content",
              description: "The content of the text",
              mytype: "string",
              required: true,
              min: 10
            }
          ]}
        />
        <EndpointCard
          url="/user_documents/{document_id}"
          description="Get user document with the given ID"
          method="GET"
          properties={[
            {
              title: "document_id",
              description: "The ID of the user document to get",
              mytype: "string",
              required: true,
            },
          ]}
        />
        <EndpointCard
          url="/events"
          description="List all alert events ever triggered"
          method="GET"
          properties={[
            {
              title: "offset",
              description: "The offset of the alert events to return",
              mytype: "number",
              required: false,
              defaultValue: "0",
              min: 0,
            },
            {
              title: "limit",
              description: "The limit of the alert events to return",
              mytype: "number",
              required: false,
              defaultValue: "50",
              min: 1,
              max: 100,
            },
            {
              title: "triggered_before",
              description: "The earliest datetime the alert events were triggered at",
              mytype: "datetime",
              required: false,
            },
            {
              title: "triggered_after",
              description: "The latest datetime the alert events were triggered at",
              mytype: "datetime",
              required: false,
              defaultValue: "now",
            }
          ]}
        />
        <EndpointCard
          url="/alerts/{alert_id}"
          description="Get alert request with the given ID"
          method="GET"
          properties={[
            {
              title: "alert_id",
              description: "The ID of the alert request to get",
              mytype: "string",
              required: true,
            },
          ]}
        />
        <EndpointCard
          url="/credits"
          description="Check how many credits you have"
          method="GET"
          properties={[]}
        />
      </div>
    </div>
  )
}
