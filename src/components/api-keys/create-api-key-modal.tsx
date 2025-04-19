"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"

interface CreateKeyModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: { name: string; monthlyLimit: number; type: "dev" | "prod" }) => void
}

export function CreateApiKeyModal({ isOpen, onClose, onSubmit }: CreateKeyModalProps) {
  const [name, setName] = useState("")
  const [monthlyLimit, setMonthlyLimit] = useState("")
  const [type, setType] = useState<"dev" | "prod">("prod")
  const [errors, setErrors] = useState<{ name?: string; monthlyLimit?: string }>({})

  const validateForm = () => {
    const newErrors: { name?: string; monthlyLimit?: string } = {}
    
    if (!name.trim()) {
      newErrors.name = "Name is required"
    }

    const limitNumber = parseInt(monthlyLimit)
    if (isNaN(limitNumber) || limitNumber <= 0) {
      newErrors.monthlyLimit = "Monthly limit must be a positive number"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit({
        name: name.trim(),
        monthlyLimit: parseInt(monthlyLimit),
        type
      })
      onClose()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-black/30 backdrop-blur-sm border-gray-300/30 text-white">
        <DialogHeader>
          <DialogTitle className="text-white">Create New API Key</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <label htmlFor="name" className="text-sm font-medium text-white">Name</label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter key name"
              className={`${errors.name ? "border-destructive" : ""} bg-black/20 text-white placeholder:text-gray-400`}
            />
            {errors.name && (
              <span className="text-destructive text-sm">{errors.name}</span>
            )}
          </div>

          <div className="grid gap-2">
            <label htmlFor="monthlyLimit" className="text-sm font-medium text-white">Monthly Limit</label>
            <Input
              id="monthlyLimit"
              type="number"
              value={monthlyLimit}
              onChange={(e) => setMonthlyLimit(e.target.value)}
              placeholder="Enter monthly limit"
              min="1"
              className={`${errors.monthlyLimit ? "border-destructive" : ""} bg-black/20 text-white placeholder:text-gray-400`}
            />
            {errors.monthlyLimit && (
              <span className="text-destructive text-sm">{errors.monthlyLimit}</span>
            )}
          </div>

          <div className="grid gap-2">
            <label className="text-sm font-medium text-white">Type</label>
            <div className="flex gap-2">
              <Button
                type="button"
                variant={type === "dev" ? "default" : "outline"}
                className={type === "dev" ? "bg-blue-800 hover:bg-blue-700 text-white" : "bg-blue-500 hover:bg-blue-600 text-white border-gray-300/30"}
                onClick={() => setType("dev")}
              >
                Development
              </Button>
              <Button
                type="button"
                variant={type === "prod" ? "default" : "outline"}
                className={type === "prod" ? "bg-orange-800 hover:bg-orange-700 text-white" : "bg-orange-500 hover:bg-orange-600 text-white border-gray-300/30"}
                onClick={() => setType("prod")}
              >
                Production
              </Button>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button 
            onClick={handleSubmit}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            Create Key
          </Button>            
          <Button 
            onClick={onClose}
            className="bg-primary hover:bg-primary/90 text-white"
          >
            Cancel
          </Button>          
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
