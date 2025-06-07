"use client"

import { useState, useEffect, useCallback } from "react"
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
import { Configuration, UserDocumentsApi, UserDocumentListResponse } from "@/client-sdk"
import { debounce } from "lodash"

export default function MyDocumentsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [documents, setDocuments] = useState<UserDocumentListResponse>()
  
  const formatName = (name: string) => {
    return name.length > 51 ? name.substring(0, 48) + "..." : name
  }

  const formatContent = (content: string) => {
    return content.length > 99 ? content.substring(0, 96) + "..." : content
  }
  
  const formatDate = (date: Date) => {
    return date.toLocaleString().substring(0, 16)
  }

  const debouncedListDocuments = useCallback((term: string) => {
    const handler = debounce(async (searchTerm: string) => {
      const agentData = JSON.parse(localStorage.getItem('agentData') || '{}');
      const userDocumentsApi = new UserDocumentsApi(new Configuration({
        basePath: "http://127.0.0.1:8000",
        headers: {
          'X-API-Key': agentData.apiKey
        }
      }));
      const response = await userDocumentsApi.getUserDocumentsApiV1UserDocumentsGet({offset:0, limit:50, contains:searchTerm});
      setDocuments(response);
    }, 500);
    handler(term);
    return () => handler.cancel();
  }, []);

  useEffect(() => {
    debouncedListDocuments(searchTerm);
  }, [searchTerm, debouncedListDocuments]);

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

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-white font-bold text-base w-40">Name</TableHead>
                <TableHead className="text-white font-bold text-base w-36">Content</TableHead>
                <TableHead className="text-white font-bold text-base w-24">Uploaded At</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {documents?.documents.map((item) => (
                <TableRow 
                  key={item.id}
                  className="hover:bg-gray-700/50 transition-colors"
                >
                  <TableCell className="text-white w-40">
                    {formatName(item.name)}
                  </TableCell>
                  <TableCell className="text-white w-36" title={item.content}>
                    {formatContent(item.content)}
                  </TableCell>
                  <TableCell className="text-white w-24">
                    {formatDate(item.uploadedAt)}
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