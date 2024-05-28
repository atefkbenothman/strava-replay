import { useContext } from "react"
import { ActivityProviderContext } from "@/app/activities/[id]/page"

import MetricsControlsCheckbox from "@/components/metrics/metrics-controls-checkbox"

export default function MetricsControls() {
  const { activityStream, categories } = useContext(ActivityProviderContext)
  const keys = Object.keys(activityStream)
  return (
    <div className="flex gap-3 overflow-x-scroll border-2 border-secondary p-2 rounded text-muted-foreground bg-backgroundVariant">
      {categories.map((category) => {
        return (
          <MetricsControlsCheckbox key={category.id} keys={keys} identifier={category.id} label={category.label}  />
        )
      })}
    </div>
  )
}