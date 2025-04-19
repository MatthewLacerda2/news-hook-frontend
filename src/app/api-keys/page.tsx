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
import { DeleteButton } from "@/components/api-keys/delete-button"
import apiKeysData from "@/data/mock/fake-api-keys.json"
import { CreateApiKeyModal } from "@/components/api-keys/create-api-key-modal"


const typeColors = {
  dev: "text-blue-400",
  prod: "text-green-400",
}

export default function ApiKeysPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [apiKeys, setApiKeys] = useState(apiKeysData["api-keys"])
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')} ${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`
  }

  const handleDelete = async (name: string) => {
    // Implement your delete logic here
    setApiKeys(prevKeys => prevKeys.filter(item => item.name !== name))
    console.log("Deleting key:", name)
  }

  const handleCreateKey = async (data: { name: string; monthlyLimit: number; type: "dev" | "prod" }) => {
    // Here you would typically make an API call to create the key
    // For now, we'll just log the data
    console.log("Creating new API key:", data)
  }

  const filteredData = apiKeys.filter(item => 
    Object.values(item).some(value => 
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  )

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
            <div className="text-white text-lg font-bold ml-2">
              API Keys
            </div>
            <Button variant="default" onClick={() => setIsCreateModalOpen(true)}>
              Create API Key
            </Button>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-gray-200 text-base font-bold">Name</TableHead>
                <TableHead className="text-gray-200 text-base font-bold">API Key</TableHead>
                <TableHead className="text-gray-200 text-base font-bold">Created At</TableHead>
                <TableHead className="text-gray-200 text-base font-bold">Uses</TableHead>
                <TableHead className="text-gray-200 text-base font-bold">Monthly Limit</TableHead>
                <TableHead className="text-gray-200 text-base font-bold">Type</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((item) => (
                <TableRow 
                  key={item.name}
                  className="hover:bg-gray-700/50 transition-colors"
                >
                  <TableCell className="text-white">
                    {item.name}
                  </TableCell>
                  <TableCell className="font-mono text-white">
                    {item["api-key"].substring(0, 8)}*****
                  </TableCell>
                  <TableCell className="text-white">
                    {formatDate(item.created_at)}
                  </TableCell>
                  <TableCell className="text-white">
                    {item.uses}
                  </TableCell>
                  <TableCell className="text-white">
                    {item.monthly_limit}
                  </TableCell>
                  <TableCell className={`${typeColors[item.type as keyof typeof typeColors]} font-semibold`}>
                    {item.type}
                  </TableCell>
                  <TableCell>
                    <DeleteButton 
                      onDelete={() => handleDelete(item.name)}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <CreateApiKeyModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateKey}
      />
    </div>
  )
}
