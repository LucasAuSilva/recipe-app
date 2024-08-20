import * as React from "react"

import clsx from "clsx";
import { Input } from "./ui/input";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

interface InputWithUnitProps extends InputProps {
  unit: string
}

const InputWithUnit = React.forwardRef<HTMLInputElement, InputWithUnitProps>(
  ({ type, unit, ...rest }, ref) => {
    return (
      <div className="relative">
        <Input type={type} ref={ref} {...rest} />
        <p
          className={clsx(
            'absolute top-2 text-gray-600 right-3',
            type === 'number' && 'right-9')}
        >
          {unit}
        </p>
      </div>
    )
  }
)
InputWithUnit.displayName = "InputWithUnit"

export { InputWithUnit }
