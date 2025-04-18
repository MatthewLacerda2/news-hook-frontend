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
      <div className="container max-w-3xl mx-auto mt-18">
        <div className="text-lg text-gray-200 mb-10">
            <p className="my-1">Alert-request: the request to be alerted when a news/event happens</p>
            <p className="my-1">Alert-response: the response to the alert-request</p>
            <p className="my-1">Alert-trigger: the webhook when and if the news/event does happens</p>
        </div>
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
              <TableCell >GPT-3.5-turbo</TableCell>
              <TableCell >$0.50</TableCell>
              <TableCell >$1.50</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>GPT-4</TableCell>
              <TableCell>$15.00</TableCell>
              <TableCell>$30.00</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>o1-mini</TableCell>
              <TableCell>$0.20</TableCell>
              <TableCell>$0.60</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>o1</TableCell>
              <TableCell>$1.00</TableCell>
              <TableCell>$2.00</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>claude-sonnet-3.5</TableCell>
              <TableCell>$3.00</TableCell>
              <TableCell>$6.00</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>claude-sonnet-3.7</TableCell>
              <TableCell>$4.00</TableCell>
              <TableCell>$8.00</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>deepseek-r1</TableCell>
              <TableCell>$0.80</TableCell>
              <TableCell>$1.60</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>gemini-2.5-pro</TableCell>
              <TableCell>$1.00</TableCell>
              <TableCell>$2.00</TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <div className="mt-2 mb-12">
          <p className="text-sm text-muted-foreground">* Per Million</p>
        </div>
        <div className="text-lg text-gray-200">
          <p className="my-1">If your trigger does happen, we charge the same prices</p>
          <p className="my-1">You can define the models for requests and triggers separately</p>
          <p className="my-1">These models are defined at the alert-request</p>
        </div>
        <div className="mt-16 flex justify-between text-xl font-medium text-gray-200">
          <div className="flex justify-between">
            <p>Price per 1000 requests: USD 5$</p>
          </div>
          <div className="flex justify-between">
            <p>Price per 1000 alerts: USD 5$</p>
          </div>
        </div>
      </div>
    </div>
  )
}