"use client"

import { useState, useEffect } from "react"
import { AlertsApi } from "@/client-sdk/apis/AlertsApi"
import { Configuration } from "@/client-sdk/runtime"
import { AlertPromptCreateRequestBase, HttpMethod } from "@/client-sdk/models"
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

export default function CreateAlertPage() {
  const [prompt, setPrompt] = useState("")
  const [httpMethod, setHttpMethod] = useState<HttpMethod>(HttpMethod.Post)
  const [httpUrl, setHttpUrl] = useState("")
  const [httpHeaders, setHttpHeaders] = useState("")
  const [maxDatetime, setMaxDatetime] = useState<Date>(new Date())
  const [isRecurring, setIsRecurring] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [successMessage, setSuccessMessage] = useState("")
  const [debugResponse, setDebugResponse] = useState<unknown>(null)
  const [models, setModels] = useState<LLMModelItem[]>([])
  const [selectedModel, setSelectedModel] = useState<string>("")
  const [isLoading, setIsLoading] = useState(false)

  // Add useEffect to fetch models
  useEffect(() => {
    const fetchModels = async () => {
      try {
        const api = new LlmModelsApi(new Configuration({
          basePath: BASE_PATH
        }))
        const response = await api.listLlmModelsApiV1LlmModelsGet()
        setModels(response.items)
        // Set the first model as default if available
        if (response.items.length > 0) {
          setSelectedModel(response.items[0].modelName)
        }
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

    if (Object.keys(newErrors).length === 0) {
      try {
        const agentData = JSON.parse(localStorage.getItem('agentData') || '{}');
        const alertApi = new AlertsApi(new Configuration({ basePath: BASE_PATH, headers: {
          'X-API-Key': agentData.apiKey
        } }))
        const createAlertRequest : AlertPromptCreateRequestBase = {
          prompt,
          httpMethod,
          httpUrl,
          httpHeaders: httpHeaders ? JSON.parse(httpHeaders.replace(/'/g, '"')) : null,
          llmModel: selectedModel,
          maxDatetime,
          isRecurring,
        }
        const response = await alertApi.createAlertApiV1AlertsPost({
          alertPromptCreateRequestBase: createAlertRequest
        })
        
        setSuccessMessage("Alert request created successfully!")
        setDebugResponse(response)
      } catch (error) {
        setErrors({ submit: "Failed to create alert request" })
        setDebugResponse(error)
        console.error(error)
      }
    }
    
    setIsLoading(false)
  }

  const formatModelName = (str: string): string => {
    const withoutHyphens = str.replace(/-/g, ' ');
    return withoutHyphens.charAt(0).toUpperCase() + withoutHyphens.slice(1);
  }

  return (
    <div className="container mx-auto p-4 mt-40 max-w-3xl">
      <Card>
        <CardContent className="pt-6 space-y-4">
          <div>
            <Input
              placeholder="Enter prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className={errors.prompt ? "border-red-500" : ""}
            />
            {errors.prompt && <p className="text-red-500 text-sm mt-1">{errors.prompt}</p>}
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
                Sending...
              </>
            ) : (
              "Send Alert Request"
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