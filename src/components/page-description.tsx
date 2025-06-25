import { Card, CardContent, CardTitle, CardDescription } from "@/components/ui/card"

interface PageDescriptionProps {
  title?: string
  description?: string
}

export function PageDescription({ title, description }: PageDescriptionProps) {
  // Don't render anything if both title and description are empty
  if (!title && !description) {
    return null
  }

  return (
    <Card className="w-full bg-transparent border-gray-300 shadow-none mb-4">
      <CardContent>
        {title && (
          <CardTitle className="text-xl md:text-2xl font-bold mb-2 text-white">
            {title}
          </CardTitle>
        )}
        {description && (
          <CardDescription className="text-base md:text-lg font-semibold text-white">
            {description}
          </CardDescription>
        )}
      </CardContent>
    </Card>
  )
}