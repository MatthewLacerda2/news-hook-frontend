"use client"

import { useState } from "react"
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
import { PopoverDateFilter } from "@/components/alert-requests.tsx/popover-date-filter"
import tableData from "@/data/mock/fake-alert-events.json"

const methodColors = {
  GET: "text-green-400",
  POST: "text-blue-400",
  PUT: "text-yellow-400",
  PATCH: "text-purple-400",
  DELETE: "text-red-400",
}

export default function AlertEventsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [minDate, setMinDate] = useState<Date>()
  const [maxDate, setMaxDate] = useState<Date>()

  const formatId = (id: string) => {
    return id.substring(0, 9) + "..."
  }

  const formatPrompt = (prompt: string) => {
    return prompt.length > 50 ? prompt.substring(0, 47) + "..." : prompt
  }

  const formatUrl = (url: string) => {
    return url.length > 60 ? url.substring(0, 57) + "..." : url
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')} ${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`
  }

  const filteredData = tableData.filter(item => {
    const matchesSearch = Object.values(item).some(value => 
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )

    const eventDate = new Date(item.datetime)
    const matchesDateRange = (!minDate || eventDate >= minDate) &&
      (!maxDate || eventDate <= maxDate)

    return matchesSearch && matchesDateRange
  })

  return (
    <div className="container mx-auto p-4 mt-40 max-w-7xl">
      <Card className="bg-gray/70 backdrop-blur-md border-gray-800">
        <CardContent>
          <Input
            placeholder="Search..."
            className="mb-4 text-white placeholder:text-gray-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          
          <div className="flex gap-2 mb-4 justify-between items-center">
            <div className="flex gap-2">
              <PopoverDateFilter
                value={minDate}
                onChange={setMinDate}
                buttonLabel="Min Date"
                buttonColor="green"
              />
              <PopoverDateFilter
                value={maxDate}
                onChange={setMaxDate}
                buttonLabel="Max Date"
                buttonColor="green"
              />
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-white font-bold text-base w-32">ID</TableHead>
                <TableHead className="text-white font-bold text-base w-40">Datetime</TableHead>
                <TableHead className="text-white font-bold text-base w-36">Prompt</TableHead>
                <TableHead className="text-white font-bold text-base w-24">Method</TableHead>
                <TableHead className="text-white font-bold text-base w-64">URL</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((item) => (
                <TableRow 
                  key={item.id}
                  className="hover:bg-gray-700/50 transition-colors"
                >
                  <TableCell className="font-mono text-white w-32" title={item.id}>
                    {formatId(item.id)}
                  </TableCell>
                  <TableCell className="text-white w-40">
                    {formatDate(item.datetime)}
                  </TableCell>
                  <TableCell className="text-white w-36" title={item.prompt}>
                    {formatPrompt(item.prompt)}
                  </TableCell>
                  <TableCell className={`${methodColors[item.method as keyof typeof methodColors]} font-semibold w-24`}>
                    {item.method}
                  </TableCell>
                  <TableCell className="text-white w-64" title={item.url}>
                    {formatUrl(item.url)}
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
