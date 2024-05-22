"use client"

import { useEffect, useState } from "react"

import { ActivityStreamType, StreamFormattedType } from '@/lib/types';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Brush, LineChart, Line } from 'recharts';

interface Props {
  activityStream: ActivityStreamType
  playing: boolean
  updateCoordinates: (coords: number[][]) => void
}

let timer: NodeJS.Timeout;

export default function MetricsGraphs({ activityStream, playing, updateCoordinates }: Props) {
  const [streamDataOriginal, setStreamDataOriginal] = useState<StreamFormattedType[]>([])
  const [streamData, setStreamData] = useState<StreamFormattedType[]>([])
  const [streamSpeed, setStreamSpeed] = useState<number>(100)

  const sampleData = (activityStream: ActivityStreamType, rate: number) => {
    const sampledStream = { ...activityStream };
    Object.keys(sampledStream).forEach(prop => {
      const sampledData = sampledStream[prop].data.filter((_: any, i: number) => {
        return i % rate === 0;
      });
      sampledStream[prop].data = sampledData;
    });
    return sampledStream;
  }

  const reshapeData = (stream: ActivityStreamType) => {
    const keys = Object.keys(stream)
    return stream[keys[0]].data.map((_: any, index: number) => {
      return keys.reduce((obj: { [key: string]: any }, key) => {
        obj[key] = stream[key as keyof ActivityStreamType]?.data[index];
        return obj;
      }, {});
    });
  }

  useEffect(() => {
    const streamSampled = sampleData(activityStream, 3)
    const streamFormatted = reshapeData(streamSampled)
    setStreamDataOriginal(streamFormatted)
    setStreamData(streamFormatted)
  }, [activityStream])

  useEffect(() => {
    if (playing) {
      setStreamData([])
      const newCoords: number[][] = []
      let counter = 0
      timer = setInterval(() => {
        if (counter < streamDataOriginal.length) {
          setStreamData((prevData) => [...prevData, streamDataOriginal[counter]])
          const nextCoord = [streamDataOriginal[counter]["latlng"]?.[1], streamDataOriginal[counter]["latlng"]?.[0]] as [number, number]
          newCoords.push(nextCoord)
          updateCoordinates(newCoords)
          counter += 1
        } else {
          clearInterval(timer);
          setStreamData(streamDataOriginal)
        }
      }, streamSpeed)
    } else {
      if (timer) {
        clearInterval(timer)
      }
    }
    return () => {
      if (timer) {
        clearInterval(timer)
      }
    }
  }, [playing])

  return (
    <div className="h-full w-full grid grid-cols-1 grid-rows-4 gap-4 overflow-scroll">
      <div>
        <div className="w-full h-full relative border-2 border-secondary p-3 rounded bg-backgroundVariant">
          <div className="flex gap-2 absolute top-0 left-0 m-2 flex items-center justify-center text-white font-medium text-xl z-50">
            <p>Speed</p>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
            </svg>
          </div>
          <div className="absolute top-0 right-0 m-2 flex items-center justify-center text-white font-medium text-xl">
            {streamData && streamData.length > 0 && (
              <div className="flex flex-col gap-1 z-50 bg-gray-800/50 p-1 rounded">
                <p className="text-6xl">{Math.round(streamData.at(-1)?.["velocity_smooth"] as number * 2.23694 || 0)}</p>
                <p className="text-right text-muted-foreground">mph</p>
              </div>
            )}
          </div>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={streamData}
              syncId="sync"
            >
              <XAxis padding={{ left: 15, right: 15 }} hide={true} />
              <Line type="monotone" dataKey="velocity_smooth" stroke="#0066FF" fill="#0066FF" isAnimationActive={false} dot={false} strokeWidth={3} />
            </LineChart >
          </ResponsiveContainer >
        </div >
      </div>
      <div>
        <div className="w-full h-full relative border-2 border-secondary p-3 rounded bg-backgroundVariant">
          <div className="flex gap-2 absolute top-0 left-0 m-2 flex items-center justify-center text-white font-medium text-xl z-50">
            <p>Heartrate</p>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
            </svg>
          </div>
          <div className="absolute top-0 right-0 m-2 flex items-center justify-center text-white font-medium text-xl">
            {streamData.length > 0 && (
              <div className="flex flex-col gap-1 z-50 bg-gray-800/50 p-1 rounded">
                <p className="text-6xl">{Math.round(streamData.at(-1)?.["heartrate"] as number || 0)}</p>
                <p className="text-right text-muted-foreground">bpm</p>
              </div>
            )}
          </div>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={streamData}
              syncId="sync"
            >
              <YAxis type="number" hide={true} domain={[0, 210]}/>
              <XAxis padding={{ left: 15, right: 15 }} hide={true} />
              <Line type="monotone" dataKey="heartrate" stroke="#ed1515" fill="#ed1515" isAnimationActive={false} dot={false} strokeWidth={3} />
            </LineChart >
          </ResponsiveContainer >
        </div >
      </div>
      <div>
        <div className="w-full h-full relative border-2 border-secondary p-3 rounded bg-backgroundVariant">
          <div className="flex gap-2 absolute top-0 left-0 m-2 flex items-center justify-center text-white font-medium text-xl z-50">
            <p>Grade</p>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5 7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5" />
            </svg>
          </div>
          <div className="absolute top-0 right-0 m-2 flex items-center justify-center text-white font-medium text-xl">
            {streamData.length > 0 && (
              <div className="flex flex-col gap-1 z-50 bg-gray-800/50 p-1 rounded">
                <p className="text-6xl">{Math.round(streamData.at(-1)?.["grade_smooth"] as number || 0)}</p>
                <p className="text-right text-muted-foreground">deg</p>
              </div>
            )}
          </div>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={streamData}
              syncId="sync"
            >
              <XAxis padding={{ left: 15, right: 15 }} hide={true} />
              <Area type="monotone" dataKey="grade_smooth" stroke="#fbff0a" strokeWidth={2} fill="#fdf712" isAnimationActive={false} />
            </AreaChart >
          </ResponsiveContainer >
        </div >
      </div>
      <div>
        <div className="w-full h-full relative border-2 border-secondary p-3 rounded bg-backgroundVariant">
          <div className="absolute top-0 left-0 m-2 flex gap-2 items-center justify-center text-white font-medium text-xl z-50">
            <p>Elevation</p>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
            </svg>
          </div>
          <div className="absolute top-0 right-0 m-2 flex items-center justify-center text-white font-medium text-xl">
            {streamData.length > 0 && (
              <div className="flex flex-col gap-1 z-50 bg-gray-800/50 p-1 rounded">
                <p className="text-6xl">{Math.round(streamData.at(-1)?.["altitude"] as number || 0 * 3.28084)}</p>
                <p className="text-right text-muted-foreground">feet</p>
              </div>
            )}
          </div>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={streamData}
              syncId="sync"
            >
              <XAxis padding={{ left: 15, right: 15 }} hide={true} />
              <Area type="monotone" dataKey="altitude" stroke="#6bff84" strokeWidth={4} fill="#00e945" isAnimationActive={false} />
            </AreaChart >
          </ResponsiveContainer >
        </div >
      </div>
    </div>
  )
}