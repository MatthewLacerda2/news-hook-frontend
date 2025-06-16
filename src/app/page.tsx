"use client";

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import GoogleLoginComponent from '@/components/google-login';
import Link from 'next/link';
import { AlertPromptCreateRequestBase, AlertPromptCreateSuccessResponse } from '@/client-sdk/models';

export default function Home() {
  const [hasAccessToken, setHasAccessToken] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    setHasAccessToken(!!token);
  }, []);

  const alertPromptCreateRequestExample : AlertPromptCreateRequestBase = {
    prompt: "Inform me on any news about a new Top-Gun movie",
    httpMethod: "POST",
    httpUrl: "https://your-api.com/webhook",
    httpHeaders: {
      "Content-Type": "application/json",
      "X-API-Key": "your-api-key"
    },
    isRecurring: true,
    llmModel: "gemini-2.5-pro-preview-05-06",
    payloadFormat: {
      "properties": {
        "title": {
          "maxLength": 63,
          "title": "Title",
          "type": "string"
        },
        "content": {
          "maxLength": 2047,
          "title": "Content",
          "type": "string"
        },
      },
      "required": [
        "title",
        "content",
      ],
      "title": "NewsAlertCreateRequest",
      "type": "object"
    },
    maxDatetime: new Date("2025-12-31T23:59:59Z")
  }

  const alertPromptCreateResponseExample : AlertPromptCreateSuccessResponse = {
    id: "123e4567-e89b-12d3-a456-426614174000",
    prompt: "Inform me on any updates on a next Top-Gun movie",
    reason: "It's plausible a new Top-Gun movie is in works",
    createdAt: new Date("2025-06-01T12:00:00Z"),
    keywords: ["top-gun", "movie", "announcement"]
  }

  return (
    <div>
      <main className="pt-8 md:pt-12 pb-12 md:pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl sm:text-6xl md:text-8xl font-extrabold tracking-tight mb-6 md:mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
            NEWS-HOOK
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto">
            Natural-Language-Based Alerting
          </p>
          
          <div className="mb-16 text-gray-200 max-w-3xl mx-auto">
            <p className="text-base sm:text-lg mb-4">
              Define alerts just like you would to a friend or assistant.
            </p>
            <p className="text-base sm:text-lg mb-4">
              Alerts are triggered by world news or documents you send.
            </p>
            <p className="text-base sm:text-lg font-bold">
              The platform serves as a webhook, triggered by world events.
            </p>
          </div>

          <div className="w-[180px] mx-auto mt-12 sm:mt-12 space-y-3 sm:space-y-4 sm:text-lg md:text-xl">
            {!hasAccessToken ? (
              <GoogleLoginComponent />
            ) : (
              <Link 
                href="/alert-requests"
                className="inline-flex items-center px-6 sm:px-8 py-2 sm:py-3 border border-transparent text-base sm:text-lg font-medium rounded-lg text-black bg-gradient-to-r from-blue-400 to-emerald-400 hover:from-blue-500 hover:to-emerald-500 transition-all transform hover:scale-105"
              >
                Access Alerts
              </Link>
            )}
          </div>
          
          <div className="mt-16 space-y-3 sm:space-y-4 text-gray-300 italic text-base sm:text-lg md:text-xl">
            <p>&quot;Inform me when [movie-name] gets a release date&quot;</p>
            <p>&quot;Tell me when [rumor] is either confirmed or denied&quot;</p>
            <p>&quot;Alert me on any tariffs news between USA and Brazil&quot;</p>
          </div>

          <div className="mt-12 sm:mt-16 grid md:grid-cols-2 gap-6 sm:gap-8 md:gap-12 max-w-7xl mx-auto">
            <Card className="bg-white/5 border-gray-700 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-gray-100 font-semibold tracking-wide text-2xl sm:text-3xl font-display">REQUEST</CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="text-left text-xs sm:text-sm md:text-sm text-gray-300 font-mono overflow-x-auto">
{JSON.stringify({
  prompt: alertPromptCreateRequestExample.prompt,
  http_method: alertPromptCreateRequestExample.httpMethod,
  http_url: alertPromptCreateRequestExample.httpUrl,
  http_headers: alertPromptCreateRequestExample.httpHeaders,
  is_recurring: alertPromptCreateRequestExample.isRecurring,
  llm_model: alertPromptCreateRequestExample.llmModel,
  payload_format: alertPromptCreateRequestExample.payloadFormat,
  max_datetime: alertPromptCreateRequestExample.maxDatetime
}, null, 2)}
                </pre>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-gray-700 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-gray-100 font-semibold tracking-wide text-2xl sm:text-3xl font-display">RESPONSE</CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="text-left text-xs sm:text-sm md:text-sm text-gray-300 font-mono overflow-x-auto">
{JSON.stringify({
  id: alertPromptCreateResponseExample.id,
  prompt: alertPromptCreateResponseExample.prompt,
  reason: alertPromptCreateResponseExample.reason,
  created_at: alertPromptCreateResponseExample.createdAt,
  keywords: alertPromptCreateResponseExample.keywords
}, null, 2)}
                </pre>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}