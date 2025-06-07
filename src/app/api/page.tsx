import EndpointCard from "@/components/alert-events/endpoint-card"
import HomeHeader from "@/components/home-header"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"

export default function APIPage() {
  return (
    <div>
      <HomeHeader />
      <div className="container max-w-4xl mx-auto mt-18 pb-12">
        <EndpointCard
          url="/api/alerts"
          description="List all alerts"
          method="GET"
          properties={[
            {
              title: "offset",
              description: "The offset of the alerts to return",
              mytype: "number",
              required: true,
              defaultValue: "0",
              availableOptions: "0, 1, 2, 3, 4",
              min: 0,
              max: 100,
            },
            {
              title: "limit",
              description: "The limit of the alerts to return",
              mytype: "number",
              required: true,
              defaultValue: "50",
              availableOptions: "GET, POST, PATCH, PUT",
              min: 1,
            }
          ]}
        />

        {/* List Alerts Endpoint */}
        <Card className="mb-8 bg-zinc-900 border-zinc-800">
          <CardHeader>
            <div className="flex items-center gap-3">
              <span className="px-2 py-1 text-sm rounded bg-blue-900 text-blue-300">GET</span>
              <CardTitle className="text-gray-200">/api/alerts</CardTitle>
            </div>
            <CardDescription className="text-gray-400">List all alerts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-medium text-gray-300 mb-2">Query Parameters</h3>
                <pre className="bg-zinc-800 p-4 rounded-lg text-sm text-gray-300">
{`offset?: number (default: 0)
limit?: number (default: 50, max: 100)
prompt_contains?: string // If provided, only prompts containing this substring will be returned
max_datetime?: string
created_after?: string`}
                </pre>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-300 mb-2">Response (200)</h3>
                <pre className="bg-zinc-800 p-4 rounded-lg text-sm text-gray-300">
{`{
  "alerts": [
    {
      "id": string,
      "prompt": string,
      "http_method": string,
      "http_url": string,
      "max_datetime": string,
      "tags": string[],
      "keywords": string[],
      "status": string,
      "created_at": string
    }
  ],
  "total_count": number
}`}
                </pre>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Cancel Alert Endpoint */}
        <Card className="mb-8 bg-zinc-900 border-zinc-800">
          <CardHeader>
            <div className="flex items-center gap-3">
              <span className="px-2 py-1 text-sm rounded bg-yellow-900 text-yellow-300">PATCH</span>
              <CardTitle className="text-gray-200">/api/alerts/{'{alert_id}'}/cancel</CardTitle>
            </div>
            <CardDescription className="text-gray-400">Alert-requests are cancelled, not deleted (for billing purposes)</CardDescription>
          </CardHeader>
          <CardContent>
            <div>
              <h3 className="text-sm font-medium text-gray-300 mb-2">Path Parameters</h3>
              <pre className="bg-zinc-800 p-4 rounded-lg text-sm text-gray-300">
{`alert_id: UUID // The ID of the alert to cancel`}
              </pre>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 text-sm text-gray-400">
          <p>All endpoints require authentication via API key in the Authorization header.</p>
        </div>
      </div>
    </div>
  )
}
