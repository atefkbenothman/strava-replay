"use client"

import { useContext } from "react"
import { ActivityProviderContext } from "@/app/activities/[id]/page"

import { AreaGraph, LineGraph, NumberGraph } from "@/components/metrics/graphs"

export default function MetricsGraphs() {
  const { activityStreamData, categories, selectedCategories } = useContext(ActivityProviderContext)
  if (activityStreamData.length > 0) {
    const categoriesToInclude = categories.filter((cat) => selectedCategories.includes(cat.id))
    const originalCategoriesLength = categories.filter((cat) => Object.keys(activityStreamData[0]).includes(cat.id)).length
    return (
      <div className={`flex w-full h-full grid grid-cols-1 grid-rows-${originalCategoriesLength} gap-4`}>
        {activityStreamData && categories && categoriesToInclude.map((category, idx) => {
          return (
            <div key={idx}>
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