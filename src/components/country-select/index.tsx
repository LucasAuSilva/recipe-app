import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// import countries from './countries.txt'

interface CountrySelectProps {
  onChange: (value: string) => void
  defaultValue: string
}

export function CountrySelect({ defaultValue, onChange }: CountrySelectProps) {
  function listCountries() {
    return ['Brazil', 'United States', 'Canada', 'United Kingdom']
  }

  return (
    <Select onValueChange={onChange} defaultValue={defaultValue}>
      <SelectTrigger>
        <SelectValue placeholder="Select a verified email to display" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={'default'}>Select an country</SelectItem>
        {listCountries().map(country => {
          return (
            <SelectItem key={country} value={country}>{country}</SelectItem>
          )
        })}
      </SelectContent>
    </Select>
  )
}
