"use client"

import { useEffect, useState } from "react"

import MetricsControls from "@/components/metrics/metrics-controls"
import MetricsGraphs from "@/components/metrics/metrics-graphs"
import { ActivityStreamType } from "@/lib/types"

interface Props {
  activityStream: ActivityStreamType
  playing: boolean
  updateCoordinates: (coords: number[][]) => void
}

export default function MetricsOutline({ activityStream, playing, updateCoordinates }: Props) {
  const [streamKeys, setStreamKeys] = useState<string[]>([])

  useEffect(() => {
    setStreamKeys(Object.keys(activityStream))
  }, [activityStream])

  return (
    <div className="flex flex-col w-full h-full gap-4">
      <MetricsControls streamKeys={streamKeys} />
      <MetricsGraphs activityStream={activityStream} playing={playing} updateCoordinates={updateCoordinates} />
    </div>
  )
}