import {
  Checkbox,
  Chip,
  Container,
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
    <Container size="xl" py="2rem">
      <Flex
        direction={{
          base: 'column',
          sm: 'row',
        }}
        gap="md"
      >
        <SportSelection />
        <Stack gap="md">
          <TextInput variant="filled" placeholder="Search..." />
          <TournamnetSelection />
          <MatchesTable />
        </Stack>
      </Flex>
    </Container>
  )
}

function SportSelection() {
  return (
    <Chip.Group multiple>
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
      <Table.Tr key={match.id} c="dark.3">
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
    // <Table.ScrollContainer minWidth={400}>
    <Table
      verticalSpacing={'md'}
      horizontalSpacing="lg"
      highlightOnHover
      withTableBorder
      fz="sm"
    >
      <Table.Thead>
        <Table.Tr>
          <Table.Th py="xs">Start Time</Table.Th>
          <Table.Th py="xs">Status</Table.Th>
          <Table.Th py="xs">Home Team</Table.Th>
          <Table.Th py="xs">Away Team</Table.Th>
          <Table.Th py="xs">Home Score</Table.Th>
          <Table.Th py="xs">Away Score</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
    // </Table.ScrollContainer>
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
