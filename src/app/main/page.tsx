"use client"

import { useState } from "react"
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
import tableData from "@/data/fake-tabledata.json"
import { PopoverDateFilter } from "@/components/popover-date-filter"

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

  const formatId = (id: string) => {
    return id.substring(0, 9) + "..."
  }

  const formatPrompt = (prompt: string) => {
    return prompt.length > 56 ? prompt.substring(0, 40) + "..." : prompt
  }

  const formatUrl = (url: string) => {
    const [baseUrl] = url.split("/")
    return `${baseUrl}/...`
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')} ${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`
  }

  const filteredData = tableData.filter(item => {
    const matchesSearch = Object.values(item).some(value => 
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )

    const createdAt = new Date(item.created_at)
    const maxDatetime = new Date(item.max_datetime)

    const matchesCreationRange = (!minCreation || createdAt >= minCreation) &&
      (!maxCreation || createdAt <= maxCreation)

    const matchesExpireRange = (!minExpire || maxDatetime >= minExpire) &&
      (!maxExpire || maxDatetime <= maxExpire)

    return matchesSearch && matchesCreationRange && matchesExpireRange
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
          
          <div className="flex gap-2 mb-4 justify-end">
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

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-gray-200 font-bold">ID</TableHead>
                <TableHead className="text-gray-200 font-bold">Prompt</TableHead>
                <TableHead className="text-gray-200 font-bold">Method</TableHead>
                <TableHead className="text-gray-200 font-bold">URL</TableHead>
                <TableHead className="text-gray-200 font-bold">Created At</TableHead>
                <TableHead className="text-gray-200 font-bold">Max Datetime</TableHead>
                <TableHead className="text-gray-200 font-bold">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((item) => (
                <TableRow 
                  key={item.id}
                  className="hover:bg-gray-700/50 transition-colors"
                >
                  <TableCell className="font-mono text-white" title={item.id}>
                    {formatId(item.id)}
                  </TableCell>
                  <TableCell className="text-white" title={item.prompt}>
                    {formatPrompt(item.prompt)}
                  </TableCell>
                  <TableCell className={methodColors[item.method as keyof typeof methodColors]}>
                    {item.method}
                  </TableCell>
                  <TableCell className="text-white" title={item.url}>
                    {formatUrl(item.url)}
                  </TableCell>
                  <TableCell className="text-white">{formatDate(item.created_at)}</TableCell>
                  <TableCell className="text-white">{formatDate(item.max_datetime)}</TableCell>
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
