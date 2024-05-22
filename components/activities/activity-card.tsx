import { useRouter } from "next/navigation"

import { ActivityType } from "@/lib/types"
import { metersConversion, speedConversion } from "@/lib/strava-utils"

interface Props {
  activity: ActivityType
}

export default function ActivityCard({ activity }: Props) {
  const router = useRouter()
  const activityDate = new Date(activity.start_date_local)
  const options: Intl.DateTimeFormatOptions = { month: "long", day: "numeric", year: "numeric" }
  const formattedActivityDate = activityDate.toLocaleDateString("en-US", options)

  return (
    <div className="flex flex-col items-start bg-backgroundVariant gap-2 border-2 border-secondary p-3 text-left text-sm transition-all hover:bg-accent rounded hover:cursor-pointer" onClick={() => router.push(`/activities/${activity.id}`)}>
      <div className="flex w-full flex-col gap-1">
        <div className="flex items-center">
          <div className="flex items-center gap-2">
            <div className="font-medium text-lg">{activity.name}</div>
          </div>
          <div className="ml-auto text-xs text-foreground">
            <p>{formattedActivityDate}</p>
          </div>
        </div>
        <div className="flex gap-4 overflow-x-scroll">
          <div className="text-sm font-medium bg-gray-800 p-1 rounded h-fit w-fit">
            <p className="text-xs font-light">Distance</p>
            <p>{Math.round(metersConversion(activity.distance, "mile"))} mi</p>
          </div>
          <div className="text-sm font-medium bg-gray-800 p-1 rounded h-fit w-fit">
            <p className="text-xs font-light">Elevation</p>
            <p>{Math.round(metersConversion(activity.total_elevation_gain, "feet"))} ft</p>
          </div>
          <div className="text-sm font-medium bg-gray-800 p-1 rounded h-fit w-fit">
            <p className="text-xs font-light">Avg Speed</p>
            <p>{Math.round(speedConversion(activity.average_speed))} mph</p>
          </div>
          <div className="ml-auto text-xs text-foreground flex gap-1 items-center mr-1">
            {activity.has_heartrate && (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
              </svg>
            )}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
            </svg>
          </div>
        </div>
      </div>
      <div className="line-clamp-2 text-xs text-muted-foreground">
        {activity.type}
      </div>
    </div>
  )
}