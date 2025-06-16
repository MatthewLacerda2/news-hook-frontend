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
import { AlertsApi } from "@/client-sdk/apis/AlertsApi"
import { AuthApi } from "@/client-sdk/apis/AuthApi"
import { Configuration } from "@/client-sdk/runtime"
import { AlertPromptItem } from "@/client-sdk/models"
import debounce from "lodash/debounce"
import { BASE_PATH } from "@/client-sdk/runtime"

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
  const [creditBalance, setCreditBalance] = useState<number | null>(null)
  const [alerts, setAlerts] = useState<AlertPromptItem[]>([])

  const apiKey = JSON.parse(localStorage.getItem('agentData') || '{}').apiKey;
  
  const formatPrompt = (prompt: string) => {
    return prompt.length > 64 ? prompt.substring(0, 61) + "..." : prompt
  }

  const formatUrl = (url: string) => {
    try {
      const urlObj = new URL(url)
      return `${urlObj.hostname}/...`
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

  useEffect(() => {
    const fetchCredits = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        const authApi = new AuthApi(new Configuration({ 
          basePath: BASE_PATH,
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        }));
        const response = await authApi.checkCreditsApiV1AuthCreditsGet();
        setCreditBalance(response.credit_balance);
      } catch (error) {
        console.error('Error fetching credit balance:', error);
      }
    };

    fetchCredits();
    debouncedListAlerts(searchTerm);
  }, [debouncedListAlerts, searchTerm]);

  return (
    <div className="container mx-auto p-4 mt-40 max-w-7xl">
      <div className="flex gap-4 mb-4">
        <Card 
          className="bg-green-600/80 backdrop-blur-md border-green-700 cursor-pointer hover:bg-green-700/90 transition-colors h-14 flex items-center justify-center min-w-[160px]"
          onClick={() => window.location.href = '/alert-requests/create-alert'}
        >
          <CardContent className="py-2 px-4 flex items-center justify-center">
            <h3 className="text-lg font-semibold text-white">Create Alert</h3>
          </CardContent>
        </Card>
        <Card 
          className="bg-blue-600/80 backdrop-blur-md border-blue-700 cursor-pointer hover:bg-blue-700/90 transition-colors h-14 flex items-center justify-center min-w-[160px]"
          onClick={() => window.location.href = '/alert-requests/send-document'}
        >
          <CardContent className="py-2 px-4 flex items-center justify-center">
            <h3 className="text-lg font-semibold text-white">Send Document</h3>
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
          
          <div className="flex gap-10 mb-3 mt-5 justify-start items-center text-white text-lg font-bold">
            {creditBalance !== null && (
              <>
                <div>
                  {creditBalance.toFixed(4)} credits
                </div>  
                <div>
                  |
                </div>
                <div>
                  Api key: {apiKey}
                </div>
              </>
            )}
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-gray-200 font-bold">Prompt</TableHead>
                <TableHead className="text-gray-200 font-bold">URL</TableHead>
                <TableHead className="text-gray-200 font-bold">Method</TableHead>
                <TableHead className="text-gray-200 font-bold">Model</TableHead>
                <TableHead className="text-gray-200 font-bold">Recurring</TableHead>
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
                  <TableCell className="text-white" title={item.httpUrl}>
                    {formatUrl(item.httpUrl)}
                  </TableCell>
                  <TableCell className={methodColors[item.httpMethod as keyof typeof methodColors]}>
                    {item.httpMethod}
                  </TableCell>
                  <TableCell className="text-white font-mono text-sm">
                    {item.llmModel.length > 23 ? `${item.llmModel.substring(0, 20)}...` : item.llmModel}
                  </TableCell>
                  <TableCell className="text-white">
                    {item.isRecurring ? "Yes" : "No"}
                  </TableCell>
                  <TableCell className="text-white">{formatDate(item.createdAt)}</TableCell>
                  <TableCell className={`${statusColors[item.status as keyof typeof statusColors]} font-semibold`}>
                    {item.status}
                  </TableCell>
                  <TableCell>
                    {item.status !== "CANCELLED" && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-8 h-8 text-red-500 hover:text-red-600 border border-gray-400/10"
                        title="Cancel"
                        onClick={async () => {
                          if (window.confirm('Cancel alert. Are you sure?')) {
                            try {
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
