import {
  Checkbox,
  Chip,
  Flex,
  Group,
  Stack,
  Table,
  TextInput,
} from '@mantine/core'
import { createFileRoute } from '@tanstack/react-router'
import { matches, sports, tournaments } from '@/data'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  return (
    <Flex direction={'row'}>
      <SportSelection />
      <Stack w="100%">
        <TextInput variant="filled" placeholder="Search..." />
        <TournamnetSelection />
        <MatchesTable />
      </Stack>
    </Flex>
  )
}

function SportSelection() {
  return (
    <Chip.Group multiple>
      <Stack>
        {sports.map((sport) => (
          <Chip
            size="md"
            key={sport.id}
            value={String(sport.id)}
            variant="filled"
          >
            {sport.name}
          </Chip>
        ))}
      </Stack>
    </Chip.Group>
  )
}

function TournamnetSelection() {
  return (
    <Checkbox.Group>
      <Group gap={'xs'}>
        {tournaments.map((tournament) => (
          <Chip key={tournament.id} value={String(tournament.id)}>
            {tournament.name}
          </Chip>
        ))}
      </Group>
    </Checkbox.Group>
  )
}

function MatchesTable() {
  const rows = matches.map((match) => {
    return (
      <Table.Tr key={match.id}>
        <Table.Td>{formatISODate(match.start_time)}</Table.Td>
        <Table.Td>{formatMatch(match.status)}</Table.Td>
        <Table.Td>{match.home_team}</Table.Td>
        <Table.Td>{match.away_team}</Table.Td>
        <Table.Td>{formatScore(match.home_score)}</Table.Td>
        <Table.Td>{formatScore(match.away_score)}</Table.Td>
      </Table.Tr>
    )
  })

  return (
    <Table withTableBorder verticalSpacing={'lg'} fz="sm">
      <Table.Thead>
        <Table.Tr>
          <Table.Th py="sm">Start Time</Table.Th>
          <Table.Th py="sm">Status</Table.Th>
          <Table.Th py="sm">Home Team</Table.Th>
          <Table.Th py="sm">Away Team</Table.Th>
          <Table.Th py="sm">Home Score</Table.Th>
          <Table.Th py="sm">Away Score</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  )
}

function formatISODate(isoDateString: string) {
  const fromatter = new Intl.DateTimeFormat('SI', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  })
  return fromatter
    .format(new Date(isoDateString))
    .replace(',', ' ')
    .replace('.', ':')
}

function formatMatch(status: string) {
  switch (status.toLocaleLowerCase()) {
    case 'scheduled':
      return 'Scheduled'
    case 'live':
      return 'Live'
    case 'completed':
      return 'Completed'
    default:
      return 'Unknown'
  }
}

function formatScore(score: string | undefined) {
  if (score === undefined) {
    return '-'
  }
  return score
}
