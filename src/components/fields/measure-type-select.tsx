import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const measureTypes = [
  'gram',
  'pcs',
  'can',
  'dash'
]

interface MeasureTypeSelectProps {
  onChange: (value: string) => void
  value: string
}

export function MeasureTypeSelect({ onChange, value }: MeasureTypeSelectProps) {
  return (
    <Select
      onValueChange={onChange}
      defaultValue={value}
    >
      <SelectTrigger
        className="bg-gray-100 border-l-0"
      >
        <SelectValue placeholder="ex: gram" />
      </SelectTrigger>
      <SelectContent>
        {measureTypes.map(measure => {
          return (
            <SelectItem key={measure} value={measure}>{measure}</SelectItem>
          )
        })}
      </SelectContent>
    </Select>
  )
}
