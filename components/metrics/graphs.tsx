import { StreamFormattedType, ChartDataType } from '@/lib/types'
import { speedConversion, metersConversion, temperatureConversion } from "@/lib/strava-utils"

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Brush, LineChart, Line } from 'recharts'

interface Props {
  activityStreamData: StreamFormattedType[]
  category: ChartDataType
}

export function NumberGraph({ activityStreamData, category }: Props) {
  return (
    <div className="flex flex-col w-1/3 h-full relative border-2 border-secondary p-2 rounded bg-backgroundVariant">
      <div className="flex text-white font-medium text-xl z-50">
        <p>{category.label}</p>
      </div>
      <div className="flex gap-2 w-full h-full items-center justify-center my-4">
        {category.units === "mi" ? (
          <div>
            <p className="text-white font-medium text-6xl">{metersConversion(activityStreamData.at(-1)?.[category.id as keyof StreamFormattedType] as number || 0).toFixed(2)}</p>
          </div>
        ) : (
          <div>
            <p className="text-white font-medium text-6xl">{Math.round(activityStreamData.at(-1)?.[category.id as keyof StreamFormattedType] as number || 0)}</p>
          </div>
        )}
        <p className="text-muted-foreground">{category.units}</p>
      </div>
    </div >
  )
}

export function LineGraph({ activityStreamData, category }: Props) {
  return (
    <div className="w-full h-full relative border-2 border-secondary p-3 rounded bg-backgroundVariant">
      <div className="flex gap-2 absolute top-0 left-0 m-2 flex items-center justify-center text-white font-medium text-xl z-50">
        <p>{category.label}</p>
      </div>
      <div className="flex w-full h-full">
        <div className="absolute top-0 right-0 m-2 flex items-center justify-center text-white font-medium text-xl">
          <div className="flex flex-col gap-1 z-50 p-1 rounded">
            {category.units === "mph" ? (
              <div>
                <p className="text-6xl">{Math.round(speedConversion(activityStreamData.at(-1)?.[category.id as keyof StreamFormattedType] as number || 0))}</p>
              </div>
            ) : category.units === "deg" ? (
              <div>
                <p className="text-6xl">{Math.round(temperatureConversion(activityStreamData.at(-1)?.[category.id as keyof StreamFormattedType] as number || 0, "fahrenheit"))}</p>
              </div>
            ) : (
              <div>
                <p className="text-6xl">{Math.round(activityStreamData.at(-1)?.[category.id as keyof StreamFormattedType] as number || 0)}</p>
              </div>
            )}
            <p className="text-right text-muted-foreground">{category.units}</p>
          </div>
        </div>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={activityStreamData}
            syncId="sync"
          >
            <Line type="monotone" dataKey={category.id} stroke={category.stroke_color || "blue"} fill="#0066FF" isAnimationActive={false} dot={false} strokeWidth={3} />
          </LineChart >
        </ResponsiveContainer >
      </div>
    </div >
  )
}

export function AreaGraph({ activityStreamData, category }: Props) {
  return (
    <div className="flex w-full h-full relative border-2 border-secondary p-3 rounded bg-backgroundVariant">
      <div className="flex gap-2 absolute top-0 left-0 m-2 flex items-center justify-center text-white font-medium text-xl z-50">
        <p>{category.label}</p>
      </div>
      <div className="flex w-full h-full">
        <div className="absolute top-0 right-0 m-2 flex items-center justify-center text-white font-medium text-xl">
          <div className="flex flex-col gap-1 z-50 p-1 rounded">
            {category.units === "feet" ? (
              <div>
                <p className="text-6xl">{Math.round(metersConversion(activityStreamData.at(-1)?.[category.id as keyof StreamFormattedType] as number || 0, "feet"))}</p>
              </div>
            ) : (
              <div>
                <p className="text-6xl">{Math.round(activityStreamData.at(-1)?.[category.id as keyof StreamFormattedType] as number || 0)}</p>
              </div>
            )}
            <p className="text-right text-muted-foreground">{category.units}</p>
          </div>
        </div>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={activityStreamData}
            syncId="sync"
          >
            <Area type="monotone" dataKey={category.id} stroke={category.stroke_color || "orange"} strokeWidth={2} fill={category.stroke_color || "orange"} isAnimationActive={false} />
          </AreaChart >
        </ResponsiveContainer >
      </div>
    </div >
  )
}