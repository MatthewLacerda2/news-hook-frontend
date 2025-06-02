import HomeHeader from "@/components/home-header"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default function PricingPage() {
  return (
    <div>
      <HomeHeader />
      <div className="container max-w-4xl mx-auto mt-18">
        <Table>
          <TableHeader>
            <TableRow className="text-lg">
              <TableHead className="w-1/3 text-gray-200">Model</TableHead>
              <TableHead className="w-1/3 text-gray-200">Input Tokens *</TableHead>
              <TableHead className="w-1/3 text-gray-200">Output Tokens * **</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="text-gray-200 text-sm">
            <TableRow>
              <TableCell>Gemini 2.5 Pro</TableCell>
              <TableCell>$1.25</TableCell>
              <TableCell>$3.50</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Gemini 2.5 Flash</TableCell>
              <TableCell>$0.15</TableCell>
              <TableCell>$3.50</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Gemini 2.0 Flash</TableCell>
              <TableCell>$0.15</TableCell>
              <TableCell>$0.60</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Gemini 2.0 Flash Lite</TableCell>
              <TableCell>$0.075</TableCell>
              <TableCell>$0.030</TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <div className="mt-2 mb-8">
          <p className="text-xs text-muted-foreground">* Per Million</p>
        </div>
        <div className="mb-16 flex justify-between text-lg font-medium text-gray-400">
          <div className="flex justify-between">
            <p>Price per 1000 requests: USD 5$</p>
          </div>
          <div className="flex justify-between">
            <p>Price per 1000 alerts: USD 5$</p>
          </div>
        </div>
        <div className="text-base text-gray-400 mb-10">
            <p className="my-1">Alert-request: the request to be alerted/informed of something (e.g event, information, news, updates, etc.)</p>
            <p className="my-1">Alert-trigger: the webhook when and if the news/event does happen</p>
        </div>
        <div className="text-base text-gray-400">
          <p className="my-1">We charge for the tokens of the alert-request prompt, as well as the tokens on the alert-trigger generation</p>
          <p className="my-1">The model used for the alert-request will also be used for the alert-trigger</p>
          <p className="my-1">Rate Limit: 50 requests per minute</p>
        </div>
      </div>
    </div>
  )
}