"use client"

import { useEffect, useState, useRef } from "react"
import { useParams } from "next/navigation"

import ActivityMap from "@/components/map/map"
import Metrics from "@/components/metrics/metrics"

import { ActivityStreamType, ActivityDetailsType } from "@/lib/types"

import { fetchActivityStream, getActivityDetails } from "@/lib/strava-utils"

export default function ActivityPage() {
  const activityId = useParams().id as string

  const [activityStream, setActivityStream] = useState<ActivityStreamType>()
  const [activityDetails, setActivityDetails] = useState<ActivityDetailsType>()
  const [playing, setPlaying] = useState<boolean>(false)
  const [traceCoordinates, setTraceCoordinates] = useState<number[][]>([])

  const getActivityStream = async (token: string) => {
    const stream = await fetchActivityStream(activityId, token)
    setActivityStream(stream)
  }

  const getActivitySummary = async (token: string) => {
    const details = await getActivityDetails(activityId, token)
    setActivityDetails(details)
  }

  useEffect(() => {
    if (sessionStorage.getItem("accessToken")) {
      const accessToken = sessionStorage.getItem("accessToken") as string
      Promise.all([getActivityStream(accessToken), getActivitySummary(accessToken)])
    }
  }, [])

  const updateCoordinates = (coords: number[][]) => {
    setTraceCoordinates(prevState => [...coords])
  }

  const togglePlay = () => {
    setPlaying(!playing)
  }

  return (
    <div className="w-screen h-screen bg-background">
      <div className="flex w-full h-full text-foreground">
        <div className="grid grid-cols-2 w-full h-full gap-4 p-4 overflow-scroll">
          <div>
            {activityStream && (
              <Metrics activityStream={activityStream} playing={playing} updateCoordinates={updateCoordinates} />
            )}
          </div>
          <div>
            <ActivityMap activityDetails={activityDetails} togglePlay={togglePlay} traceCoordinates={traceCoordinates} />
          </div>
        </div>
      </div>
    </div>
  )
}
