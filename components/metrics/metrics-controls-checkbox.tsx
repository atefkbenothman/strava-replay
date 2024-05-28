import { Checkbox } from "@/components/ui/checkbox"

interface Props {
  keys: string[]
  identifier: string
  label: string
}

export default function MetricsControlsCheckbox({ keys, identifier, label }: Props) {
  return (
    <div className="flex items-center gap-1">
      <Checkbox className="rounded" id="grade" disabled={!keys.includes(identifier)} checked={keys.includes(identifier)} />
      <label htmlFor={identifier} className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
        {label}
      </label>
    </div>
  )
}