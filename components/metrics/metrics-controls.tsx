import { Checkbox } from "@/components/ui/checkbox"

interface Props {
  streamKeys: string[]
}

export default function MetricsControls({ streamKeys }: Props) {
  return (
    <div className="flex gap-3 overflow-x-scroll border-2 border-secondary p-1 rounded">
      <div className="flex items-center gap-1">
        <Checkbox className="rounded" id="grade" disabled={!streamKeys.includes("altitude")} />
        <label
          htmlFor="altitude"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Altitude
        </label>
      </div>
      <div className="flex items-center gap-1">
        <Checkbox className="rounded" id="grade" disabled={!streamKeys.includes("distance")} />
        <label
          htmlFor="distance"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Distance
        </label>
      </div>
      <div className="flex items-center gap-1">
        <Checkbox className="rounded" id="grade" disabled={!streamKeys.includes("velocity_smooth")} />
        <label
          htmlFor="speed"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Speed
        </label>
      </div>
      <div className="flex items-center gap-1">
        <Checkbox className="rounded" id="grade" disabled={!streamKeys.includes("heartrate")} />
        <label
          htmlFor="heartrate"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Heartrate
        </label>
      </div>
      <div className="flex items-center gap-1">
        <Checkbox className="rounded" id="grade" disabled={!streamKeys.includes("cadence")} />
        <label
          htmlFor="cadence"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Cadence
        </label>
      </div>
      <div className="flex items-center gap-1">
        <Checkbox className="rounded" id="grade" disabled={!streamKeys.includes("watts")} />
        <label
          htmlFor="watts"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Watts
        </label>
      </div>
      <div className="flex items-center gap-1">
        <Checkbox className="rounded" id="grade" disabled={!streamKeys.includes("temp")} />
        <label
          htmlFor="temp"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Temp
        </label>
      </div>
      <div className="flex items-center gap-1">
        <Checkbox className="rounded" id="grade" disabled={!streamKeys.includes("grade_smooth")} />
        <label
          htmlFor="grade"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Grade
        </label>
      </div>
    </div>
  )
}