"use client"

import { useState, useEffect, useCallback } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card, CardContent } from "@/components/ui/card"
import { PageDescription } from "@/components/page-description"
import { AlertsApi } from "@/client-sdk/apis/AlertsApi"
import { Configuration } from "@/client-sdk/runtime"
import { AlertPromptItem } from "@/client-sdk/models"
import debounce from "lodash/debounce"
import { BASE_PATH } from "@/client-sdk/runtime"
import { useRouter } from "next/navigation"

const methodColors = {
  GET: "text-green-400",
  POST: "text-blue-400",
  PUT: "text-yellow-400",
  PATCH: "text-purple-400",
  DELETE: "text-red-400",
}

const statusColors = {
  ACTIVE: "text-green-400",
  TRIGGERED: "text-blue-400",
  CANCELLED: "text-red-400",
  EXPIRED: "text-orange-400",
}

export default function MainPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [alerts, setAlerts] = useState<AlertPromptItem[]>([])
  const [showApiKey, setShowApiKey] = useState(false)
  const [apiKey, setApiKey] = useState<string>("")

  const router = useRouter();

  useEffect(() => {
    // Check if we're in the browser environment
    if (typeof window !== 'undefined') {
      if (localStorage.getItem('accessToken') === null) {
        router.push('/');
      }
      
      // Set API key from localStorage
      const agentData = JSON.parse(localStorage.getItem('agentData') || '{}');
      setApiKey(agentData.apiKey || "");
    }
  }, [router])

  const formatPrompt = (prompt: string) => {
    return prompt.length > 48 ? prompt.substring(0, 45) + "..." : prompt
  }

  const formatUrl = (url: string) => {
    try {
      const urlObj = new URL(url)
      const rootUrl = urlObj.hostname
      return `${rootUrl.length > 32 ? rootUrl.substring(0, 29) + "..." : rootUrl}/...`
    } catch {
      return url;
    }
  }

  const formatDate = (date: Date) => {
    const time = `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`
    const dateStr = `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`
    return <><span className="font-bold">{time}</span> {dateStr}</>
  }

  const debouncedListAlerts = useCallback((term: string) => {
    const handler = debounce(async (searchTerm: string) => {
      if (typeof window === 'undefined') return;
      
      const agentData = JSON.parse(localStorage.getItem('agentData') || '{}');
      const alertApi = new AlertsApi(new Configuration({ 
        basePath: BASE_PATH,
        headers: {
          'X-API-Key': agentData.apiKey
        }
      }));
      const response = await alertApi.listAlertsApiV1AlertsGet({
        offset: 0,
        limit: 10,
        promptContains: searchTerm,
      });
      setAlerts(response.alerts);
    }, 500);
    
    handler(term);
    return () => handler.cancel();
  }, []);

  useEffect(() => {
    debouncedListAlerts(searchTerm);
  }, [searchTerm, debouncedListAlerts]);

  return (
    <div className="container mx-auto p-4 mt-12 max-w-7xl">
      <PageDescription 
        description="These are the alerts you've set up. They will be triggered when their events occurs."
      />
      
      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <Card 
          className="bg-green-600/80 backdrop-blur-md border-green-700 cursor-pointer hover:bg-green-700/90 transition-colors h-14 flex items-center justify-center min-w-[160px]"
          onClick={() => window.location.href = '/alert-requests/create-alert'}
        >
          <CardContent className="py-2 px-4 flex items-center justify-center">
            <h3 className="text-lg font-semibold text-white">Create Alert</h3>
          </CardContent>
        </Card>
      </div>
      <Card className="bg-gray/70 backdrop-blur-md border-gray-800">
        
        <CardContent>
          <Input
            placeholder="Search..."
            className="mb-4 text-white placeholder:text-gray-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          
          <div className="flex items-center gap-2 mb-3 mt-5 text-white text-lg font-bold">
            <span>Api key: </span>
            <button
              onClick={() => setShowApiKey(!showApiKey)}
              className="p-1 hover:bg-gray-700/50 rounded transition-colors"
              title={showApiKey ? "Hide API key" : "Show API key"}
            >
              {showApiKey ? "👁️" : "👁️‍🗨️"}
            </button>
            <span className="font-mono">{showApiKey ? apiKey : '************'}</span>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-gray-200 font-bold">Prompt</TableHead>
                <TableHead className="text-gray-200 font-bold hidden sm:table-cell">URL</TableHead>
                <TableHead className="text-gray-200 font-bold">Method</TableHead>
                <TableHead className="text-gray-200 font-bold hidden sm:table-cell">Model</TableHead>
                <TableHead className="text-gray-200 font-bold hidden sm:table-cell">Recurring</TableHead>
                <TableHead className="text-gray-200 font-bold">Created At</TableHead>
                <TableHead className="text-gray-200 font-bold">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {alerts.map((item) => (
                <TableRow 
                  key={item.id}
                  className="hover:bg-gray-700/50 transition-colors"
                >
                  <TableCell className="text-white" title={item.prompt}>
                    {formatPrompt(item.prompt)}
                  </TableCell>
                  <TableCell className="text-white hidden sm:table-cell" title={item.httpUrl}>
                    {formatUrl(item.httpUrl)}
                  </TableCell>
                  <TableCell className={methodColors[item.httpMethod as keyof typeof methodColors]}>
                    {item.httpMethod}
                  </TableCell>
                  <TableCell className="text-white font-mono text-sm hidden sm:table-cell">
                    {item.llmModel.length > 21 ? `${item.llmModel.substring(0, 18)}...` : item.llmModel}
                  </TableCell>
                  <TableCell className="text-white hidden sm:table-cell">
                    {item.isRecurring ? "Yes" : "No"}
                  </TableCell>
                  <TableCell className="text-white">{formatDate(item.createdAt)}</TableCell>
                  <TableCell className={`${statusColors[item.status as keyof typeof statusColors]} font-semibold px-2`}>
                    {item.status}
                  </TableCell>
                  <TableCell className="px-0">
                    {item.status !== "CANCELLED" && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-8 h-8 text-red-500 hover:text-red-600 border border-gray-400/10"
                        title="Cancel"
                        onClick={async () => {
                          if (window.confirm('Cancel alert. Are you sure?')) {
                            try {
                              if (typeof window === 'undefined') return;
                              const agentData = JSON.parse(localStorage.getItem('agentData') || '{}');
                              const alertApi = new AlertsApi(new Configuration({ 
                                basePath: BASE_PATH,
                                headers: {
                                  'X-API-Key': agentData.apiKey
                                }
                              }));
                              await alertApi.cancelAlertApiV1AlertsAlertIdCancelPatch({
                                alertId: item.id
                              });
                              await debouncedListAlerts(searchTerm);
                            } catch (error) {
                              console.error('Error cancelling alert:', error);
                              alert('Failed to cancel alert. Please try again.');
                            }
                          }
                        }}
                      >
                        ✕
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
