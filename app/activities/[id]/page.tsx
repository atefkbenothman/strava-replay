"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"

import ActivityMap from "@/components/map/map"
import Metrics from "@/components/metrics/metrics"

import { ActivityStreamType } from "@/lib/types"

import { fetchActivityStream } from "@/lib/strava-utils"

export default function ActivityPage() {
  const activityId = useParams().id as string

  const [activityStream, setActivityStream] = useState<ActivityStreamType>()
  const [playing, setPlaying] = useState<boolean>(false)

  const getActivityStream = async (token: string) => {
    const stream = await fetchActivityStream(activityId, token)
    setActivityStream(stream)
  }

  const getActivitySummary = async (token: string) => {
  }

  useEffect(() => {
    if (sessionStorage.getItem("accessToken")) {
      const accessToken = sessionStorage.getItem("accessToken") as string
      Promise.all([getActivityStream(accessToken), getActivitySummary(accessToken)])
    }
  }, [])

  const togglePlay = () => {
    setPlaying(!playing)
  }

  return (
    <div className="w-screen h-screen bg-background">
      <div className="flex w-full h-full text-foreground">
        <div className="grid grid-cols-2 w-full h-full gap-2 p-2 overflow-scroll">
          <div>
            {activityStream && (
              <Metrics activityStream={activityStream} playing={playing} />
            )}
          </div>
          <div>
            <ActivityMap togglePlay={togglePlay} />
          </div>
        </div>
      </div>
    </div>
  )
}
