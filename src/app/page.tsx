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
      <main className="pt-20 md:pt-20 pb-12 md:pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          <div className="mb-8 text-gray-200 mx-auto">
            <div className="bg-white/5 border border-gray-700 rounded-lg p-4 backdrop-blur-sm">
              <a 
                  href="https://t.me/bob_reynolds_bot" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-2 border border-transparent text-base font-medium rounded-lg text-black bg-gradient-to-r from-blue-400 to-emerald-400 hover:from-blue-500 hover:to-emerald-500 transition-all transform hover:scale-105"
                >
                  <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                  </svg>
                  Try our Telegram Bot!
                </a>
                <p className="text-lg text-gray-300 mt-2 font-semibold">
                  Create and receive alerts directly on Telegram.
                </p>
              </div>
            </div>

          <h1 className="text-5xl sm:text-6xl lg:text-8xl font-extrabold tracking-tight mb-12 md:mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
            NEWS-HOOK
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto">
            A Webhook on the Real-World
          </p>
          
          <div className="mb-16 text-gray-200 max-w-4xl mx-auto">
            <p className="text-base sm:text-lg mb-12">
              News-Hook is a <span className="font-semibold text-blue-400">prompt-based alert system</span> that lets you set up alerts using just natural language
            </p>
            <p className="text-base sm:text-lg">
              You define what you&apos;re looking for in plain English
            </p>
            <p className="text-base sm:text-lg">
              We monitor the world for when it happens
            </p>
            <p className="text-base sm:text-lg mb-12">
              Then send the alert via HTTP requests
            </p>
            <p className="text-base sm:text-lg mb-6">
              Our API is well-documented and can be seamlessly integrated into your platforms, workflows, or applications. 
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
            <p>&quot;Alert me on any change on tariffs between USA and Brazil&quot;</p>
            <p>&quot;Inform me when [movie-name] gets a release date&quot;</p>
            <p>&quot;Tell me if [rumor] is either confirmed or denied&quot;</p>
          </div>

          <div className="mt-12 sm:mt-16 grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 max-w-7xl mx-auto">
            <Card className="bg-white/5 border-gray-700 backdrop-blur-sm">
              <CardHeader className="pb-3 sm:pb-4">
                <CardTitle className="text-gray-100 font-semibold tracking-wide text-xl sm:text-2xl lg:text-3xl font-display">REQUEST</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <pre className="text-left text-xs sm:text-sm lg:text-base text-gray-300 font-mono overflow-x-auto whitespace-pre-wrap break-words">
{JSON.stringify({
  prompt: alertPromptCreateRequestExample.prompt,
  http_method: alertPromptCreateRequestExample.httpMethod,
  http_url: alertPromptCreateRequestExample.httpUrl,
  http_headers: alertPromptCreateRequestExample.httpHeaders,
  is_recurring: alertPromptCreateRequestExample.isRecurring,
  llm_model: alertPromptCreateRequestExample.llmModel,
  max_datetime: alertPromptCreateRequestExample.maxDatetime
}, null, 2)}
                </pre>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-gray-700 backdrop-blur-sm">
              <CardHeader className="pb-3 sm:pb-4">
                <CardTitle className="text-gray-100 font-semibold tracking-wide text-xl sm:text-2xl lg:text-3xl font-display">RESPONSE</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <pre className="text-left text-xs sm:text-sm lg:text-base text-gray-300 font-mono overflow-x-auto whitespace-pre-wrap break-words">
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