"use client"

import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

interface ToggleSettingProps {
  label: string
  description?: string
  defaultChecked?: boolean
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
}

export default function ToggleSetting({
  label,
  description,
  defaultChecked = false,
  checked: controlledChecked,
  onCheckedChange,
}: ToggleSettingProps) {
  const [internalChecked, setInternalChecked] = useState(defaultChecked)
  const checked = controlledChecked !== undefined ? controlledChecked : internalChecked

  const handleChange = (newChecked: boolean) => {
    if (onCheckedChange) {
      onCheckedChange(newChecked)
    } else {
      setInternalChecked(newChecked)
    }
  }

  return (
    <div className="flex items-center justify-between space-x-4 py-2">
      <div className="flex-1 space-y-1">
        <Label htmlFor={label} className="text-sm font-medium cursor-pointer">
          {label}
        </Label>
        {description && <p className="text-xs text-muted-foreground">{description}</p>}
      </div>
      <Switch id={label} checked={checked} onCheckedChange={handleChange} />
    </div>
  )
}
