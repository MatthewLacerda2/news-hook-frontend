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
import { PopoverDateFilter } from "@/components/alert-requests.tsx/popover-date-filter"
import { AlertsApi, AuthApi, Configuration, AlertPromptItem } from "@/client-sdk"
import debounce from "lodash/debounce"

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
  const [minCreation, setMinCreation] = useState<Date>()
  const [maxCreation, setMaxCreation] = useState<Date>()
  const [minExpire, setMinExpire] = useState<Date>()
  const [maxExpire, setMaxExpire] = useState<Date>()
  const [creditBalance, setCreditBalance] = useState<number | null>(null)
  const [alerts, setAlerts] = useState<AlertPromptItem[]>([])

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

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')} ${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`
  }

  const debouncedListAlerts = useCallback(async (term: string) => {
    const agentData = JSON.parse(localStorage.getItem('agentData') || '{}');
    const alertApi = new AlertsApi(new Configuration({ 
      basePath: "http://127.0.0.1:8000",
      headers: {
        'X-API-Key': agentData.apiKey
      }
    }));
    const response = await alertApi.listAlertsApiV1AlertsGet({
      offset: 0,
      limit: 10,
      promptContains: term,
      maxDatetime: maxExpire,
      createdAfter: minCreation
    });
    setAlerts(response.alerts);
  }, [maxExpire, minCreation]);

  useEffect(() => {
    const debouncedSearch = debounce(debouncedListAlerts, 300);
    debouncedSearch(searchTerm);
    return () => {
      debouncedSearch.cancel();
    };
  }, [searchTerm, debouncedListAlerts]);

  useEffect(() => {
    const fetchCredits = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        const authApi = new AuthApi(new Configuration({ 
          basePath: "http://127.0.0.1:8000",
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
  });

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
          onClick={() => window.location.href = '/send-document'}
        >
          <CardContent className="py-2 px-4 flex items-center justify-center">
            <h3 className="text-lg font-semibold text-white">Upload Document</h3>
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
          
          <div className="flex gap-2 mb-4 justify-between items-center">
            {creditBalance !== null && (
              <div className="text-white text-lg font-bold ml-2">
                {creditBalance} credits
              </div>
            )}
            <div className="flex gap-2">
              <PopoverDateFilter
                value={minCreation}
                onChange={setMinCreation}
                buttonLabel="Min Creation"
                buttonColor="green"
              />
              <PopoverDateFilter
                value={maxCreation}
                onChange={setMaxCreation}
                buttonLabel="Max Creation"
                buttonColor="green"
              />
              <PopoverDateFilter
                value={minExpire}
                onChange={setMinExpire}
                buttonLabel="Min Expire"
                buttonColor="orange"
              />
              <PopoverDateFilter
                value={maxExpire}
                onChange={setMaxExpire}
                buttonLabel="Max Expire"
                buttonColor="orange"
              />
            </div>
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
                <TableHead className="text-gray-200 font-bold">Expires At</TableHead>
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
                    {item.llmModel}
                  </TableCell>
                  <TableCell className="text-white">
                    {item.isRecurring ? "Yes" : "No"}
                  </TableCell>
                  <TableCell className="text-white">{formatDate(item.createdAt.toString())}</TableCell>
                  <TableCell className="text-white">{formatDate(item.expiresAt.toString())}</TableCell>
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
                                basePath: "http://127.0.0.1:8000",
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
