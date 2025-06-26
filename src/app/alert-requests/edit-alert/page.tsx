"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { AlertsApi } from "@/client-sdk/apis/AlertsApi"
import { Configuration } from "@/client-sdk/runtime"
import { HttpMethod } from "@/client-sdk/models"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { BASE_PATH } from "@/client-sdk/runtime"
import { LlmModelsApi } from "@/client-sdk/apis/LlmModelsApi"
import { LLMModelItem } from "@/client-sdk/models"
import { AlertPatchRequest } from "@/client-sdk/models"

export default function EditAlertPage() {
  const searchParams = useSearchParams()
  const alertId = searchParams.get('id')
  
  const [prompt, setPrompt] = useState("")
  const [httpMethod, setHttpMethod] = useState<HttpMethod>(HttpMethod.Post)
  const [httpUrl, setHttpUrl] = useState("")
  const [httpHeaders, setHttpHeaders] = useState("")
  const [payloadFormat, setPayloadFormat] = useState("")
  const [maxDatetime, setMaxDatetime] = useState<Date>(new Date())
  const [isRecurring, setIsRecurring] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [successMessage, setSuccessMessage] = useState("")
  const [debugResponse, setDebugResponse] = useState<unknown>(null)
  const [models, setModels] = useState<LLMModelItem[]>([])
  const [selectedModel, setSelectedModel] = useState<string>("")
  const [isLoading, setIsLoading] = useState(false)
  const [isFetching, setIsFetching] = useState(true)

  // Fetch alert data when component mounts
  useEffect(() => {
    const fetchAlertData = async () => {
      if (!alertId) {
        setErrors({ general: "No alert ID provided" })
        setIsFetching(false)
        return
      }

      try {
        const agentData = JSON.parse(localStorage.getItem('agentData') || '{}')
        const alertApi = new AlertsApi(new Configuration({ 
          basePath: BASE_PATH, 
          headers: {
            'X-API-Key': agentData.apiKey
          }
        }))
        
        const response = await alertApi.getAlertApiV1AlertsAlertIdGet({alertId: alertId})
        
        // Pre-fill form with fetched data
        setPrompt(response.prompt)
        setHttpMethod(response.httpMethod)
        setHttpUrl(response.httpUrl)
        setHttpHeaders(response.httpHeaders ? JSON.stringify(response.httpHeaders, null, 2) : "")
        setPayloadFormat(response.payloadFormat ? JSON.stringify(response.payloadFormat, null, 2) : "")
        setMaxDatetime(new Date(response.expiresAt))
        setIsRecurring(response.isRecurring)
        setSelectedModel(response.llmModel)
        
      } catch (error) {
        console.error('Failed to fetch alert data:', error)
        setErrors({ general: "Failed to fetch alert data" })
      } finally {
        setIsFetching(false)
      }
    }

    fetchAlertData()
  }, [alertId])

  // Add useEffect to fetch models
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

  // Validation functions
  const validatePrompt = (value: string) => value.length >= 3
  const validateUrl = (value: string) => {
    try {
      new URL(value)
      return true
    } catch {
      return false
    }
  }
  const validateMaxDatetime = (value: Date) => value >= new Date()

  const handleSubmit = async () => {
    const newErrors: Record<string, string> = {}
    setDebugResponse(null)
    setSuccessMessage("")
    setErrors({})
    setIsLoading(true)
    
    if (!validatePrompt(prompt)) {
      newErrors.prompt = "Prompt must be at least 3 characters long"
    }
    if (!validateUrl(httpUrl)) {
      newErrors.httpUrl = "Please enter a valid URL"
    }
    if (!validateMaxDatetime(maxDatetime)) {
      newErrors.maxDatetime = "Max datetime cannot be in the past"
    }
    if (!selectedModel) {
      newErrors.llmModel = "Please select an LLM model"
    }

    setErrors(newErrors)

    if (Object.keys(newErrors).length === 0 && alertId) {
      try {
        const agentData = JSON.parse(localStorage.getItem('agentData') || '{}')
        const alertApi = new AlertsApi(new Configuration({ 
          basePath: BASE_PATH, 
          headers: {
            'X-API-Key': agentData.apiKey
          }
        }))
        
        const patchRequest: AlertPatchRequest = {
          http_url: httpUrl,
          http_headers: httpHeaders ? JSON.parse(httpHeaders.replace(/'/g, '"')) : null,
          is_recurring: isRecurring,
          http_method: httpMethod,
          llm_model: selectedModel,
          payload_format: payloadFormat ? JSON.parse(payloadFormat.replace(/'/g, '"')) : null,
          max_datetime: maxDatetime.toISOString(),
        }
        
        const response = await alertApi.patchAlertApiV1AlertsAlertIdPatch({alertId: alertId, alertPatchRequest: patchRequest})
        
        setSuccessMessage("Alert updated successfully!")
        setDebugResponse(response)
      } catch (error) {
        setErrors({ submit: "Failed to update alert" })
        setDebugResponse(error)
        console.error(error)
      }
    }
    
    setIsLoading(false)
  }

  const formatModelName = (str: string): string => {
    const withoutHyphens = str.replace(/-/g, ' ')
    return withoutHyphens.charAt(0).toUpperCase() + withoutHyphens.slice(1)
  }

  if (isFetching) {
    return (
      <div className="container mx-auto p-4 mt-40 max-w-3xl">
        <Card>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-center py-8">
              <svg className="animate-spin h-8 w-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span className="ml-2">Loading alert data...</span>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (errors.general) {
    return (
      <div className="container mx-auto p-4 mt-40 max-w-3xl">
        <Card>
          <CardContent className="space-y-4">
            <div className="text-center py-8">
              <p className="text-red-500 text-lg">{errors.general}</p>
              <Button 
                onClick={() => window.location.href = '/alert-requests'}
                className="mt-4"
              >
                Back to Alerts
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4 mt-12 md:mt-20 max-w-3xl">
      <Card>
        <CardContent className="space-y-4">
          <div>
            <p className="text-gray-500 text-xs mb-2 italic">Past events can not trigger alerts</p>
            <div className="p-2 text-sm font-semibold bg-gray-100 border rounded-md">
              <p className="text-gray-900">{prompt}</p>
            </div>
          </div>

          <div>
            <Select value={httpMethod} onValueChange={(value: HttpMethod) => setHttpMethod(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select HTTP Method" />
              </SelectTrigger>
              <SelectContent>
                {Object.values(HttpMethod).map((method) => (
                  <SelectItem key={method} value={method}>
                    {method}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Input
              placeholder="Enter URL"
              value={httpUrl}
              onChange={(e) => setHttpUrl(e.target.value)}
              className={errors.httpUrl ? "border-red-500" : ""}
            />
            {errors.httpUrl && <p className="text-red-500 text-sm mt-1">{errors.httpUrl}</p>}
          </div>

          <div>
            <Input
              placeholder="HTTP Headers (JSON format)"
              value={httpHeaders}
              onChange={(e) => setHttpHeaders(e.target.value)}
            />
          </div>

          <div>
            <Select 
              value={selectedModel} 
              onValueChange={(value) => setSelectedModel(value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select LLM Model" />
              </SelectTrigger>
              <SelectContent>
                {models.map((model) => (
                  <SelectItem key={model.modelName} value={model.modelName}>
                    <span className="font-semibold">{formatModelName(model.modelName)}</span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Input
              placeholder="Payload Format (JSON format)"
              value={payloadFormat}
              onChange={(e) => setPayloadFormat(e.target.value)}
            />
          </div>

          <div>
            <Calendar
              mode="single"
              selected={maxDatetime}
              onSelect={(date) => date && setMaxDatetime(new Date(date.setHours(new Date().getHours(), new Date().getMinutes())))}
              className={errors.maxDatetime ? "border-red-500" : ""}
            />
            {errors.maxDatetime && <p className="text-red-500 text-sm mt-1">{errors.maxDatetime}</p>}
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="isRecurring"
              checked={isRecurring}
              onChange={(e) => setIsRecurring(e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
            />
            <label htmlFor="isRecurring" className="text-sm font-medium">
              Recurring Alert
            </label>
          </div>

          <Button 
            onClick={handleSubmit}
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Updating...
              </>
            ) : (
              "Update Alert"
            )}
          </Button>

          {errors.submit && (
            <p className="text-red-500 text-sm text-center">{errors.submit}</p>
          )}
          
          {successMessage && (
            <p className="text-green-600 text-sm text-center">{successMessage}</p>
          )}

          {typeof debugResponse !== 'undefined' && debugResponse !== null && (
            <div className="mt-4 p-4 bg-gray-100 rounded-md overflow-auto">
              <pre className="text-xs">
                {JSON.stringify(debugResponse, null, 2)}
              </pre>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
