"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import tableData from "@/data/fake-tabledata.json"

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

  const filteredData = tableData.filter(item => 
    Object.values(item).some(value => 
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  )

  return (
    <div className="container mx-auto p-4 mt-40 max-w-7xl">
      <Input
        placeholder="Search..."
        className="mb-4 text-white placeholder:text-gray-400"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      
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
            <TableRow key={item.id}>
              <TableCell className="font-mono text-white">{formatId(item.id)}</TableCell>
              <TableCell className="text-white">{formatPrompt(item.prompt)}</TableCell>
              <TableCell className={methodColors[item.method as keyof typeof methodColors]}>
                {item.method}
              </TableCell>
              <TableCell className="text-white">{formatUrl(item.url)}</TableCell>
              <TableCell className="text-white">{formatDate(item.created_at)}</TableCell>
              <TableCell className="text-white">{formatDate(item.max_datetime)}</TableCell>
              <TableCell className={statusColors[item.status as keyof typeof statusColors]}>
                {item.status}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
