"use client"

import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"

interface SliderSettingProps {
  label: string
  description?: string
  defaultValue?: number
  min?: number
  max?: number
  step?: number
  value?: number
  onChange?: (value: number) => void
}

export default function SliderSetting({
  label,
  description,
  defaultValue = 50,
  min = 0,
  max = 100,
  step = 1,
  value: controlledValue,
  onChange,
}: SliderSettingProps) {
  const [internalValue, setInternalValue] = useState(defaultValue)
  const value = controlledValue !== undefined ? controlledValue : internalValue

  const handleChange = (newValue: number[]) => {
    const val = newValue[0]
    if (onChange) {
      onChange(val)
    } else {
      setInternalValue(val)
    }
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <Label className="text-sm font-medium">{label}</Label>
          {description && <p className="text-xs text-muted-foreground mt-1">{description}</p>}
        </div>
        <span className="text-sm font-semibold min-w-[3rem] text-right">{value}</span>
      </div>
      <Slider min={min} max={max} step={step} value={[value]} onValueChange={handleChange} className="w-full" />
    </div>
  )
}
