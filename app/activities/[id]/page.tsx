"use client"

import { useEffect, useState, useRef, createContext } from "react"
import { useParams } from "next/navigation"

import ActivityMap from "@/components/map/map"
import ActitivytMapOutline from "@/components/map/map-outline"
import MetricsOutline from "@/components/metrics/metrics"
import MetricsControls from "@/components/metrics/metrics-controls"
import MetricsGraphs from "@/components/metrics/metrics-graphs"

import { ActivityStreamType, ActivityDetailsType, StreamFormattedType, ChartDataType } from "@/lib/types"

import { fetchActivityStream, getActivityDetails } from "@/lib/strava-utils"

import { Button } from "@/components/ui/button"

export type ActivityProviderContent = {
  activitySummary: ActivityDetailsType
  activityStream: ActivityStreamType
  activityStreamData: StreamFormattedType[]
  categories: ChartDataType[]
  isPlaying: boolean
  routeCoordinates: [number, number][]
  selectedCategories: string[]
  setSelectedCategories: React.Dispatch<React.SetStateAction<string[]>>
}

export const ActivityProviderContext = createContext<ActivityProviderContent>({
  activitySummary: {} as ActivityDetailsType,
  activityStream: {} as ActivityStreamType,
  activityStreamData: [],
  categories: [],
  isPlaying: false,
  routeCoordinates: [],
  selectedCategories: [],
  setSelectedCategories: () => { }
})

let timer: NodeJS.Timeout

export default function ActivityPage() {
  const activityId = useParams().id as string
  const accessTokenRef = useRef<string>("")

  useEffect(() => {
    accessTokenRef.current = sessionStorage.getItem("accessToken") || ""
  }, [])

  const [activityStream, setActivityStream] = useState<ActivityStreamType>({} as ActivityStreamType)
  const [activityStreamData, setActivityStreamData] = useState<StreamFormattedType[]>([] as StreamFormattedType[])
  const [activityStreamDataOriginal, setActivityStreamDataOriginal] = useState<StreamFormattedType[]>([] as StreamFormattedType[])
  const [activitySummary, setActivitySummary] = useState<ActivityDetailsType>({} as ActivityDetailsType)
  const [routeCoordinates, setRouteCoordinates] = useState<[number, number][]>([])

  const [isStarting, setIsStarting] = useState<boolean>(false)
  const [isPlaying, setIsPlaying] = useState<boolean>(false)

  const [selectedCategories, setSelectedCategories] = useState<string[]>([])

  const getActivityStream = async () => {
    return await fetchActivityStream(activityId, accessTokenRef.current)
  }

  const getActivitySummary = async () => {
    return await getActivityDetails(activityId, accessTokenRef.current)
  }

  const sampleStream = (stream: ActivityStreamType, rate: number) => {
    const sampledStream = { ...stream };
    Object.keys(sampledStream).forEach(prop => {
      const sampledData = sampledStream[prop].data.filter((_: any, i: number) => {
        return i % rate === 0;
      });
      sampledStream[prop].data = sampledData;
    });
    return sampledStream;
  }

  const reformatStream = (stream: ActivityStreamType) => {
    const keys = Object.keys(stream)
    return stream[keys[0]].data.map((_: any, index: number) => {
      return keys.reduce((obj: { [key: string]: any }, key) => {
        obj[key] = stream[key as keyof ActivityStreamType]?.data[index];
        return obj;
      }, {});
    });
  }

  useEffect(() => {
    const getActivityData = async () => {
      const [stream, summary] = await Promise.all([getActivityStream(), getActivitySummary()])

      setActivitySummary(summary)

      // sample data first for better performance
      const sampledStream = sampleStream(stream, 3)
      setActivityStream(sampledStream)

      // reformat data to fit recharts expectations
      const reformattedStream = reformatStream(sampledStream)
      setActivityStreamData(reformattedStream)
      setActivityStreamDataOriginal(reformattedStream)
    }
    getActivityData()
  }, [])

  const categories: ChartDataType[] = [
    {
      id: "distance",
      label: "Distance",
      units: "mi",
      chart_type: "number"
    },
    {
      id: "altitude",
      label: "Altitude",
      units: "feet",
      chart_type: "area"
    },
    {
      id: "velocity_smooth",
      label: "Speed",
      units: "mph",
      chart_type: "line"
    },
    {
      id: "heartrate",
      label: "Heartrate",
      units: "bpm",
      chart_type: "line"
    },
    {
      id: "cadence",
      label: "Cadence",
      units: "rpm",
      chart_type: "line"
    },
    {
      id: "watts",
      label: "Watts",
      units: "watts",
      chart_type: "line"
    },
    {
      id: "temp",
      label: "Temp",
      units: "deg",
      chart_type: "line"
    },
    {
      id: "grade_smooth",
      label: "Grade",
      units: "deg",
      chart_type: "area"
    },
  ]

  const startAnimation = () => {
    setIsStarting(true)
    // clear the existing streamData
    setActivityStreamData([activityStreamDataOriginal[0]])
    // start looping
    let counter = 1
    // set stream speed (in milliseconds)
    const animationSpeed = 1000
    timer = setInterval(() => {
      if (counter < activityStreamDataOriginal.length) {
        setActivityStreamData((prevData) => [...prevData, activityStreamDataOriginal[counter]])
        const nextCoord = [activityStreamDataOriginal[counter]["latlng"]?.[1], activityStreamDataOriginal[counter]["latlng"]?.[0]] as [number, number]
        setRouteCoordinates((prevCoords) => [...prevCoords, nextCoord])
        counter += 1
      } else {
        clearInterval(timer)
      }
    }, animationSpeed)

    return () => {
      if (timer) {
        clearInterval(timer)
      }
    }
  }

  const playAnimation = () => {
    if (!isStarting) {
      startAnimation()
    }
    setIsPlaying(true)
  }

  const pauseAnimation = () => {
    setIsPlaying(false)
    if (timer) {
      clearInterval(timer)
    }
  }

  return (
    <div className="w-screen h-screen bg-background overflow-scroll p-4">
      <div className="w-full h-full text-foreground overflow-scroll">

        <ActivityProviderContext.Provider value={{ activitySummary, activityStream, activityStreamData, categories, isPlaying, routeCoordinates, setSelectedCategories, selectedCategories }}>
          <div className="grid grid-cols-2 w-full h-full gap-4">
            <div className="h-full w-full">
              <MetricsOutline>
                <MetricsControls />
                <MetricsGraphs />
              </MetricsOutline>
            </div>
            <div className="h-full w-full">
              <ActitivytMapOutline>
                <ActivityMap />
                {isPlaying ? (
                  <Button className="rounded" variant="secondary" onClick={pauseAnimation}>Pause</Button>
                ) : (
                  <Button className="rounded" variant="secondary" onClick={playAnimation}>Play</Button>
                )}
              </ActitivytMapOutline>
            </div>
          </div>
        </ActivityProviderContext.Provider>

      </div>
    </div>
  )
}
