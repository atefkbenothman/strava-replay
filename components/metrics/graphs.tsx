import { StreamFormattedType, ChartDataType } from '@/lib/types'

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
        <p className="text-white font-medium text-6xl">{Math.round(activityStreamData.at(-1)?.[category.id as keyof StreamFormattedType] as number || 0)}</p>
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
            <p className="text-6xl">{Math.round(activityStreamData.at(-1)?.[category.id as keyof StreamFormattedType] as number || 0)}</p>
            <p className="text-right text-muted-foreground">{category.units}</p>
          </div>
        </div>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={activityStreamData}
            syncId="sync"
          >
            <Line type="monotone" dataKey={category.id} stroke="#0066FF" fill="#0066FF" isAnimationActive={false} dot={false} strokeWidth={3} />
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
            <p className="text-6xl">{Math.round(activityStreamData.at(-1)?.[category.id as keyof StreamFormattedType] as number || 0)}</p>
            <p className="text-right text-muted-foreground">{category.units}</p>
          </div>
        </div>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={activityStreamData}
            syncId="sync"
          >
            <Area type="monotone" dataKey={category.id} stroke="#fbff0a" strokeWidth={2} fill="#fdf712" isAnimationActive={false} />
          </AreaChart >
        </ResponsiveContainer >
      </div>
    </div >
  )
}