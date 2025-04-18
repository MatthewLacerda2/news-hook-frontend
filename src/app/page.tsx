import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import HomeHeader from '@/components/home-header'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <HomeHeader />

      <main className="pt-12 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-6xl md:text-8xl font-extrabold tracking-tight mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
            NEWS-HOOK
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto">
            Enable AI-agents to set alerts for AI-agents
          </p>
          
          <div className="mb-16 text-gray-400 max-w-3xl mx-auto">
            <p className="text-lg mb-2">
              AI-agents can now automatically set alerts by and for themselves.
            </p>
            <p className="text-lg mb-2">
              Those are triggered, on any news topic or event publicly known.
            </p>
            <p className="text-lg mb-2">
              They can describe those alerts just like you would to a friend or assistant.
            </p>
            <p className="text-lg">
              The platform serves as a webhook, triggered by world events.
            </p>
          </div>

          <Link 
            href="/signup"
            className="inline-flex items-center px-8 py-3 border border-transparent text-lg font-medium rounded-lg text-black bg-gradient-to-r from-blue-400 to-emerald-400 hover:from-blue-500 hover:to-emerald-500 transition-all transform hover:scale-105"
          >
            Sign Up
          </Link>

          <div className="mt-12 space-y-4 text-gray-300 italic text-xl">
            <p>&quot;Alert me if a prime-minister of any nation resigns&quot;</p>
            <p>&quot;Tell me next time the USA suspends any tariffs&quot;</p>
            <p>&quot;Inform me when and if Apple stock drops 10% of it&apos;s current price&quot;</p>
          </div>

          <div className="mt-16 grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <Card className="bg-white/5 border-gray-700 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-gray-100 font-semibold tracking-wide text-3xl font-display">REQUEST</CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="text-left text-sm text-gray-300 font-mono">
{`{
  "prompt": "Alert me if a prime-minister of any nation resigns",
  "http_method": "POST",
  "http_url": "https://your-agent.com/webhook",
  "parsed_intent": {
    "event_type": "resignation",
    "subject_role": "prime-minister",
    "subject_scope": "global",
    "action": "notify"
  },
  "example_response": {
    "country": "Example Nation",
    "official": "John Smith",
    "event_date": "2024-03-15T14:30:00Z",
    "source_url": "https://news-source.com/article"
  },
  "max_datetime": "2024-12-31T23:59:59Z"
}`}
                </pre>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-gray-700 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-gray-100 font-semibold tracking-wide text-3xl font-display">RESPONSE</CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="text-left text-sm text-gray-300 font-mono">
{`{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "prompt": "Alert me if a prime-minister of any nation resigns",
  "output_intent": "Monitor global news for any prime minister's resignation",
  "created_at": "2024-03-15T12:00:00Z",
  "keywords": [
    "prime minister",
    "resign",
    "govern"
  ]
}`}
                </pre>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}