import { Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { type VariantProps } from "class-variance-authority"

type ButtonProps = React.ComponentProps<"button"> & VariantProps<typeof Button>

interface DeleteButtonProps extends Omit<ButtonProps, 'children'> {
  onDelete?: () => void
}

export function DeleteButton({ onDelete, className, ...props }: DeleteButtonProps) {
  return (
    <Button
      variant="ghost"
      size="sm"
      className={`w-8 h-8 text-red-500 hover:text-red-600 border border-gray-400/10 ${className || ''}`}
      title="Delete"
      onClick={onDelete}
      {...props}
    >
      <Trash2 size={16} />
    </Button>
  )
}
