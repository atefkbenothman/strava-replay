import { ActivityType } from "@/lib/types"

import ActivityCard from "@/components/activities/activity-card"

interface Props {
  activities: ActivityType[]
}

export default function ActivityList({ activities }: Props) {
  return (
    <div className="flex flex-col gap-6 mx-2 overflow-x-scroll">
      {activities.map((act: ActivityType) => {
        return (
          <ActivityCard key={act.id} activity={act} />
        )
      })}
    </div>
  )
}