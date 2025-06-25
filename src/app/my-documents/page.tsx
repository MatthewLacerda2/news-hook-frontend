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
import { UserDocumentsApi } from "@/client-sdk/apis/UserDocumentsApi"
import { Configuration } from "@/client-sdk/runtime"
import { UserDocumentListResponse } from "@/client-sdk/models"
import { debounce } from "lodash"
import { BASE_PATH } from "@/client-sdk/runtime"
import { PageDescription } from "@/components/page-description"

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
        basePath: BASE_PATH,
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
  //TODO: show the alert that the document triggered
  return (
    <div className="container mx-auto p-4 mt-12 md:mt-20 max-w-7xl">
      <PageDescription 
        description="These are documents you've sent. They trigger any matching alerts"
      />
      <div className="flex flex-col sm:flex-row gap-4 mb-4">
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

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-white font-bold text-base">Name</TableHead>
                  <TableHead className="text-white font-bold text-base">Content</TableHead>
                  <TableHead className="text-white font-bold text-base">Uploaded At</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {documents?.documents.map((item) => (
                  <TableRow 
                    key={item.id}
                    className="hover:bg-gray-700/50 transition-colors"
                  >
                    <TableCell className="text-white">
                      {formatName(item.name)}
                    </TableCell>
                    <TableCell className="text-white" title={item.content}>
                      {formatContent(item.content)}
                    </TableCell>
                    <TableCell className="text-white">
                      {formatDate(item.uploadedAt)}
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