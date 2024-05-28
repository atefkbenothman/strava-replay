import Link from "next/link"

import { Separator } from "@/components/ui/separator"
import { BoltIcon, HeartIcon } from "@/components/svgs/icons"

import { ActivityType } from "@/lib/types"
import { metersConversion, speedConversion, timeConversion } from "@/lib/strava-utils"

const Stats = ({ activity }: { activity: ActivityType }) => {
  // convert and round activity units
  const distance = Math.round(metersConversion(activity.distance, "mile"))
  const total_elevation_gain = Math.round(metersConversion(activity.total_elevation_gain, "feet"))
  const average_speed = Math.round(speedConversion(activity.average_speed))
  const moving_time = timeConversion(activity.moving_time as number)

  const stats = [
    {
      key: "distance",
      label: "Distance",
      units: "mi",
      value: distance
    },
    {
      key: "total_elevation_gain",
      label: "Climb",
      units: "ft",
      value: total_elevation_gain
    },
    {
      key: "average_speed",
      label: "Speed",
      units: "mph",
      value: average_speed
    },
    {
      key: "moving_time",
      label: "Time",
      units: "hrs",
      value: moving_time
    },
  ]

  return (
    <div className="flex">
      {stats.map((stat, idx) => {
        return (
          <div key={idx} className="flex">
            <div className="text-sm font-medium h-fit w-fit">
              <p className="text-xs font-light text-muted-foreground">{stat.label}</p>
              <p>{stat.value} {stat.units}</p>
            </div>
            {idx !== stats.length - 1 && (
              <Separator orientation="vertical" className="mx-2" />
            )}
          </div>
        )
      })}
    </div>
  )
}

const CardTitle = ({ title }: { title: string }) => {
  return (
    <div className="flex items-center">
      <p className="font-medium text-lg">{title}</p>
    </div>
  )
}

const CardMetaData = ({ sportType, date }: { sportType: string, date: string }) => {
  // format activity date
  const activityDate = new Date(date)
  const options: Intl.DateTimeFormatOptions = { month: "long", day: "numeric", year: "numeric" }
  const formattedActivityDate = activityDate.toLocaleDateString("en-US", options)

  return (
    <div className="flex gap-4 ml-auto text-xs text-foreground items-center">
      <p className="text-muted-foreground font-semibold bg-secondary p-1 rounded">{sportType}</p>
      <p>{formattedActivityDate}</p>
    </div>
  )
}

const CardIcons = ({ activity }: { activity: ActivityType }) => {
  return (
    <div className="ml-auto text-xs text-foreground flex gap-2 items-center">
      {activity.has_heartrate && (
        <HeartIcon />
      )}
      <BoltIcon />
    </div>
  )
}

interface Props {
  activity: ActivityType
}

export default function ActivityCard({ activity }: Props) {
  return (
    <Link href={`activities/${activity.id}`}>
      <div className="flex flex-col items-start bg-backgroundVariant gap-2 border-2 border-secondary p-3 text-left text-sm transition-all hover:bg-accent rounded hover:cursor-pointer">
        <div className="flex w-full flex-col gap-1">
          {/* Top Row */}
          <div className="flex items-center mb-1">
            <CardTitle title={activity.name} />
            <CardMetaData sportType={activity.sport_type} date={activity.start_date_local} />
          </div>
          {/* Main Content */}
          <div className="flex">
            <Stats activity={activity} />
            <CardIcons activity={activity} />
          </div>
        </div>
      </div>
    </Link>
  )
}
