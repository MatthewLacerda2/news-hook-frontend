"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { EventsApi } from "@/client-sdk/apis/EventsApi"
import { AlertEventListResponse } from "@/client-sdk/models"
import { Configuration } from "@/client-sdk/runtime"
import { BASE_PATH } from "@/client-sdk/runtime"

const methodColors = {
  GET: "text-green-400",
  POST: "text-blue-400",
  PUT: "text-yellow-400",
  PATCH: "text-purple-400",
  DELETE: "text-red-400",
}

export default function AlertEventsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [events, setEvents] = useState<AlertEventListResponse>()

  const formatPrompt = (prompt: string) => {
    return prompt.length > 50 ? prompt.substring(0, 47) + "..." : prompt
  }

  const formatUrl = (url: string) => {
    return url.length > 60 ? url.substring(0, 57) + "..." : url
  }

  const formatJson = (data: Record<string, unknown>) => {
    const str = JSON.stringify(data)
    return str.length > 38 ? str.substring(0, 35) + "..." : str
  }

  const formatDate = (date: Date) => {
    const time = `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`
    let dateStr = `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`
    
    // Total length would be: time (5) + space (1) + dateStr
    if (time.length + 1 + dateStr.length > 23) {
      dateStr = dateStr.substring(0, 17) + '...'
    }
    
    return <><span className="font-bold">{time}</span> {dateStr}</>
  }

  const filteredData = events?.events.filter(item => {
    const matchesSearch = (
      item.prompt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.httpUrl.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.httpMethod.toLowerCase().includes(searchTerm.toLowerCase())
    )
    return matchesSearch
  }) || []

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const agentData = JSON.parse(localStorage.getItem('agentData') || '{}');
        const eventsApi = new EventsApi(new Configuration({ 
          basePath: BASE_PATH,
          headers: {
            'X-API-Key': agentData.apiKey
          }
        }));
        const response = await eventsApi.listEventsApiV1EventsGet({offset:0, limit:50});
        setEvents(response);
      } catch (error) {
        console.error('Error fetching alert events:', error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="container mx-auto p-4 pt-24 max-w-7xl">
      <Card className="bg-gray/70 backdrop-blur-md border-gray-800">
        <CardContent>
          <Input
            placeholder="Search..."
            className="mb-4 text-white placeholder:text-gray-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-white font-bold text-base">Datetime</TableHead>
                  <TableHead className="text-white font-bold text-base">Prompt</TableHead>
                  <TableHead className="text-white font-bold text-base">Method</TableHead>
                  <TableHead className="text-white font-bold text-base">URL</TableHead>
                  <TableHead className="text-white font-bold text-base">Recurring</TableHead>
                  <TableHead className="text-white font-bold text-base">Payload</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((item) => (
                  <TableRow 
                    key={item.id}
                    className="hover:bg-gray-700/50 transition-colors"
                  >
                    <TableCell className="text-white">
                      {formatDate(new Date(item.triggeredAt))}
                    </TableCell>
                    <TableCell className="text-white" title={item.prompt}>
                      {formatPrompt(item.prompt)}
                    </TableCell>
                    <TableCell className={`${methodColors[item.httpMethod as keyof typeof methodColors]} font-semibold`}>
                      {item.httpMethod}
                    </TableCell>
                    <TableCell className="text-white" title={item.httpUrl}>
                      {formatUrl(item.httpUrl)}
                    </TableCell>
                    <TableCell className="text-white">
                      <span className={`font-bold ${item.isRecurring ? 'text-green-500' : 'text-blue-500'}`}>
                        {item.isRecurring ? "Yes" : "No"}
                      </span>
                    </TableCell>
                    <TableCell className="text-white font-mono text-sm" title={JSON.stringify(item.structuredData, null, 2)}>
                      {formatJson(item.structuredData)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}