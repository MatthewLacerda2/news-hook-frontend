//popover-date-filter component
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface PopoverDateFilterProps {
  value: Date | undefined
  onChange: (date: Date | undefined) => void
  buttonLabel: string
  buttonColor: "green" | "orange"
}

const formatDateForButton = (dateStr: string) => {
  const date = new Date(dateStr)
  return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`
}

export function PopoverDateFilter({ value, onChange, buttonLabel, buttonColor }: PopoverDateFilterProps) {
  const colorClasses = {
    green: "bg-green-700 hover:bg-green-800",
    orange: "bg-orange-700 hover:bg-orange-800"
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button 
          variant="outline"
          className={`${colorClasses[buttonColor]} text-black hover:text-black`}
        >
          {value ? formatDateForButton(value.toISOString()) : buttonLabel}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={value}
          onSelect={onChange}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}