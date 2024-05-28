"use client"

import { useContext } from "react"
import { ActivityProviderContext } from "@/app/activities/[id]/page"

import { AreaGraph, LineGraph, NumberGraph } from "@/components/metrics/graphs"

export default function MetricsGraphs() {
  const { activityStreamData, categories } = useContext(ActivityProviderContext)
  if (activityStreamData.length > 0) {
    const categoryKeys = Object.keys(activityStreamData[0])
    return (
      <div className={`h-full w-full grid grid-cols-1 grid-cols-${categories.length} gap-4`}>
        {activityStreamData && categories && categories.filter((cat) => categoryKeys.includes(cat.id)).map((category, idx) => {
          return (
            <div key={idx} className="h-full w-full">
              {category.chart_type === "area" && <AreaGraph activityStreamData={activityStreamData} category={category} />}
              {category.chart_type === "line" && <LineGraph activityStreamData={activityStreamData} category={category} />}
              {category.chart_type === "number" && <NumberGraph activityStreamData={activityStreamData} category={category} />}
            </div>
          )
        })}
      </div>
    )
  }
}