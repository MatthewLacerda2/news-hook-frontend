'use client'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { LlmModelsApi } from "@/client-sdk/apis/LlmModelsApi"
import { useEffect, useState } from "react"
import type { LLMModelItem } from "@/client-sdk/models"
import { Configuration } from "@/client-sdk/runtime"
import { BASE_PATH } from "@/client-sdk/runtime"

export default function PricingPage() {
  const [models, setModels] = useState<LLMModelItem[]>([])
  
  useEffect(() => {
    const fetchModels = async () => {
      try {
        const api = new LlmModelsApi(new Configuration({
          basePath: BASE_PATH
        }))
        const response = await api.listLlmModelsApiV1LlmModelsGet()
        setModels(response.items)
      } catch (error) {
        console.error('Failed to fetch LLM models:', error)
      }
    }
    
    fetchModels()
  }, [])

  return (
    <div className="bg-black min-h-screen text-gray-300">
      <div className="container max-w-4xl mx-auto mt-24 px-2 sm:px-4">
        <div className="w-full overflow-x-auto rounded-lg border border-gray-800 bg-gray-950">
          <Table>
            <TableHeader>
              <TableRow className="text-lg">
                <TableHead className="w-1/3 text-gray-300">Model</TableHead>
                <TableHead className="w-1/3 text-gray-300">Input *</TableHead>
                <TableHead className="w-1/3 text-gray-300">Output *</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="text-sm">
              {models.map((model) => (
                <TableRow key={model.modelName}>
                  <TableCell className="text-gray-300">{model.modelName}</TableCell>
                  <TableCell className="text-gray-300">${model.inputTokenPrice.toFixed(3)}</TableCell>
                  <TableCell className="text-gray-300">${model.outputTokenPrice.toFixed(3)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="mt-2 mb-6">
          <p className="text-xs text-gray-400">* Tokens Per Million</p>
        </div>
        <div className="mb-6 flex flex-col sm:flex-row justify-between text-lg font-medium gap-4 text-gray-300">
          <div className="flex justify-between font-bold">
            <p>Price per 1000 alert-requests: USD 5$</p>
          </div>
          <div className="flex justify-between font-bold">
            <p>Price per 1000 alert events: USD 5$</p>
          </div>
        </div>
        <div className="text-base mb-10 text-gray-300">
            <p className="my-1">Only valid alert-requests will be charged.</p>
            <p className="my-1">Every alert triggered will be charged.</p>
            <p className="my-1">Triggers will use their alert-request&apos;s model</p>
            <p className="my-1">Rate Limit: 50 requests per minute (per IP)</p>
        </div>
      </div>
    </div>
  )
}