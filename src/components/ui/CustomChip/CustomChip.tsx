import { Checkbox } from '@mantine/core'
import classes from './CustomChip.module.css'
import type { CheckboxCardProps } from '@mantine/core'

interface CustomChipProps extends CheckboxCardProps {
  children: React.ReactNode
  leftSide?: React.ReactNode
  size?: 'sm' | 'md'
  variant?: 'filled'
}
function CustomChip({ leftSide, size, children, ...rest }: CustomChipProps) {
  return (
    <Checkbox.Card
      unstyled
      mod={{
        size,
      }}
      classNames={{
        card: classes.card,
      }}
      {...rest}
    >
      {leftSide}
      {children}
    </Checkbox.Card>
  )
}

CustomChip.Group = Checkbox.Group

export { CustomChip }
