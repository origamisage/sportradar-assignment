import { Chip, Flex } from '@mantine/core'
import type { Sport } from '@/data'

type SportSelectionProps = {
  sports: Array<Sport>
  selectedSports: Array<number>
  onSportToggle: (updatedSports: Array<number>) => void
}
export function SportSelection({
  sports,
  selectedSports,
  onSportToggle,
}: SportSelectionProps) {
  return (
    <Chip.Group
      multiple
      value={selectedSports.map((id) => String(id))}
      onChange={(sportIds) => onSportToggle(sportIds.map((id) => Number(id)))}
    >
      <Flex
        direction={{
          sm: 'column',
          base: 'row',
        }}
        gap="xs"
        wrap={{
          base: 'wrap',
        }}
      >
        {sports.map((sport) => (
          <Chip
            styles={{
              label: {
                width: '100%',
              },
            }}
            size="md"
            key={sport.id}
            value={String(sport.id)}
            variant="filled"
          >
            {sport.name}
          </Chip>
        ))}
      </Flex>
    </Chip.Group>
  )
}
