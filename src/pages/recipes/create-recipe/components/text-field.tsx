import * as React from 'react'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { FieldError } from 'react-hook-form'
import clsx from 'clsx'
import { InputWithUnit } from '@/components/input-with-unit'

interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  unit?: string
  error: FieldError | undefined
}

const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
  ({ id, unit, label, error, ...rest }, ref) => {
  return (
      <div className="flex flex-col gap-2">
        <Label
          htmlFor={id}
          className={clsx(error && 'text-destructive')}
        >
          {label}
        </Label>
        {unit !== undefined ? (
          <InputWithUnit id={id} unit={unit} {...rest} ref={ref} />
        ) : (
          <Input id={id} type='text' {...rest} ref={ref}/>
        )}
        {error !== undefined && (
          <p
            className="text-sm font-medium text-destructive"
          >
            {error.message as string}
          </p>
        )}
      </div>
    )
  }
)

TextField.displayName = "TextField"

export { TextField }
