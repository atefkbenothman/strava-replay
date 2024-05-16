import { ActivityType } from "@/lib/types"
import { cn } from "@/lib/utils"

interface Props {
  activity: ActivityType
}

export default function ActivityCard({ activity }: Props) {
  return (
    <div className="flex flex-col items-start gap-2 border-2 border-secondary p-3 text-left text-sm transition-all hover:bg-accent rounded hover:cursor-pointer">
      <div className="flex w-full flex-col gap-1">
        <div className="flex items-center">
          <div className="flex items-center gap-2">
            <div className="font-medium text-lg">{activity.name}</div>
          </div>
          <div className="ml-auto text-xs text-foreground">
            <p>{activity.start_date}</p>
          </div>
        </div>
        <div className="text-xs font-medium">{activity.description}</div>
      </div>
      <div className="line-clamp-2 text-xs text-muted-foreground">
        {activity.type}
      </div>
    </div>
  )
}