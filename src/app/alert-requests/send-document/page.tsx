"use client"

import { useState } from "react"
import { UserDocumentsApi } from "@/client-sdk/apis/UserDocumentsApi"
import { Configuration } from "@/client-sdk/runtime"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { BASE_PATH } from "@/client-sdk/runtime"
import { useRouter } from "next/navigation"

export default function SendDocumentPage() {
  const [name, setName] = useState("")
  const [content, setContent] = useState("")
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [debugResponse, setDebugResponse] = useState<unknown>(null)
  
  const router = useRouter();
  if (localStorage.getItem('accessToken') === null) {
    router.push('/');
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (!name.trim()) {
      newErrors.name = "Name is required"
    }
    if (!content.trim()) {
      newErrors.content = "Content is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async () => {
    setDebugResponse(null)
    setErrors({})
    
    if (validateForm()) {
      try {
        const agentData = JSON.parse(localStorage.getItem('agentData') || '{}');
        const documentApi = new UserDocumentsApi(new Configuration({ 
          basePath: BASE_PATH,
          headers: {
            'X-API-Key': agentData.apiKey
          } 
        }))

        const response = await documentApi.postUserDocumentApiV1UserDocumentsPost({
          userDocumentCreateRequest: {
            name: name.trim(),
            content: content.trim(),
          },
        })

        setDebugResponse(response)
      } catch (error) {
        setErrors({ submit: "Failed to send document" })
        console.error(error)
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
              placeholder="Document name (for organization)"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={errors.name ? "border-red-500" : ""}
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          <div>
            <Textarea
              placeholder="Document content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className={`min-h-[200px] ${errors.content ? "border-red-500" : ""}`}
            />
            {errors.content && <p className="text-red-500 text-sm mt-1">{errors.content}</p>}
          </div>

          <Button 
            onClick={handleSubmit}
            className="w-full"
          >
            Send Document
          </Button>

          {errors.submit && (
            <p className="text-red-500 text-sm text-center">{errors.submit}</p>
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