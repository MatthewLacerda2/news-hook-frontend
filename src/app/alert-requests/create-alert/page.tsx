"use client"

import { useState } from "react"
import { AlertsApi, Configuration, HttpMethod } from "@/client-sdk"
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

export default function CreateAlertPage() {
  const [prompt, setPrompt] = useState("")
  const [httpMethod, setHttpMethod] = useState<HttpMethod>(HttpMethod.Post)
  const [httpUrl, setHttpUrl] = useState("")
  const [httpHeaders, setHttpHeaders] = useState("")
  const [llmModel, setLlmModel] = useState("")
  const [payloadFormat, setPayloadFormat] = useState("")
  const [maxDatetime, setMaxDatetime] = useState<Date>(new Date())
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [successMessage, setSuccessMessage] = useState("")
  const [debugResponse, setDebugResponse] = useState<unknown>(null)

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
  const validateLlmModel = (value: string) => value.length >= 5
  const validateMaxDatetime = (value: Date) => value >= new Date()

  const handleSubmit = async () => {
    const newErrors: Record<string, string> = {}
    setDebugResponse(null)
    setSuccessMessage("")
    setErrors({})
    
    if (!validatePrompt(prompt)) {
      newErrors.prompt = "Prompt must be at least 3 characters long"
    }
    if (!validateUrl(httpUrl)) {
      newErrors.httpUrl = "Please enter a valid URL"
    }
    if (!validateLlmModel(llmModel)) {
      newErrors.llmModel = "LLM Model must be at least 5 characters long"
    }
    if (!validateMaxDatetime(maxDatetime)) {
      newErrors.maxDatetime = "Max datetime cannot be in the past"
    }

    setErrors(newErrors)

    if (Object.keys(newErrors).length === 0) {
      try {
        const agentData = JSON.parse(localStorage.getItem('agentData') || '{}');
        const alertApi = new AlertsApi(new Configuration({ basePath: "http://127.0.0.1:8000", headers: {
          'X-API-Key': agentData.apiKey
        } }))
        const response = await alertApi.createAlertApiV1AlertsPost({
          alertPromptCreateRequestBase: {
            prompt,
            httpMethod,
            httpUrl,
            httpHeaders: httpHeaders ? JSON.parse(httpHeaders) : {},
            llmModel,
            payloadFormat: payloadFormat ? JSON.parse(payloadFormat) : {},
            maxDatetime,
          }
        })
        
        setSuccessMessage("Alert request created successfully!")
        setDebugResponse(response)
      } catch (error) {
        setErrors({ submit: "Failed to create alert request" })
        setDebugResponse(error)
      }
    }
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
            <Input
              placeholder="LLM Model"
              value={llmModel}
              onChange={(e) => setLlmModel(e.target.value)}
              className={errors.llmModel ? "border-red-500" : ""}
            />
            {errors.llmModel && <p className="text-red-500 text-sm mt-1">{errors.llmModel}</p>}
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

          <Button 
            onClick={handleSubmit}
            className="w-full"
          >
            Send Alert Request
          </Button>

          {errors.submit && (
            <p className="text-red-500 text-sm text-center">{errors.submit}</p>
          )}
          
          {successMessage && (
            <p className="text-green-500 text-sm text-center">{successMessage}</p>
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