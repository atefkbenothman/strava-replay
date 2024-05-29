"use client"

import { useContext, useEffect } from "react"
import { ActivityProviderContext } from "@/app/activities/[id]/page"

import { Checkbox } from "@/components/ui/checkbox"

interface Props {
  keys: string[]
  identifier: string
  label: string
  checked: boolean
}

export default function MetricsControlsCheckbox({ keys, identifier, label, checked }: Props) {
  const { setSelectedCategories } = useContext(ActivityProviderContext)

  useEffect(() => {
    if (checked) {
      setSelectedCategories((prev) => [...prev, identifier])
    }
  }, [])

  const updateCheckbox = (status: any, id: string) => {
    if (status) {
      setSelectedCategories((prev) => [...prev, id])
    } else {
      setSelectedCategories((prev) => (
        prev.filter((cat) => cat !== id)
      ))
    }
  }

  return (
    <div className="flex items-center gap-1">
      <Checkbox className="rounded" id={identifier} disabled={!keys.includes(identifier)} defaultChecked={checked} onCheckedChange={(status) => updateCheckbox(status, identifier)} />
      <label htmlFor={identifier} className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">{label}</label>
    </div>
  )
}