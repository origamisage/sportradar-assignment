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
import { useState } from 'react'
import type { Sport, Tournament } from '@/data'
import {
  matches as matchesData,
  sports as sportsData,
  tournaments as tournamentsData,
} from '@/data'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  const [selectedSports, setSelectedSports] = useState<Array<number>>([])
  const [selectedTournaments, setSelectedTournaments] = useState<Array<number>>(
    [],
  )

  const handleSportSelectionChange = (updatedSports: Array<number>) => {
    setSelectedSports(updatedSports)
    // Remove all the tournaments that are not related to the selected sports
    const updatedTournaments = selectedTournaments.filter((tournament) => {
      // Find the sportId that the tournament is related to
      const relatedSportId = tournamentsData.find(
        (t) => t.id === tournament,
      )?.sportId
      if (!relatedSportId) {
        return false
      }
      return updatedSports.includes(relatedSportId)
    })
    setSelectedTournaments(updatedTournaments)
  }

  const handleTournamentSelectionChange = (
    updatedTournaments: Array<number>,
  ) => {
    setSelectedTournaments(updatedTournaments)
  }

  // Filter tournaments based on the selected sports or show all tournaments if no sports are selected
  const filteredTournaments =
    selectedSports.length > 0
      ? tournamentsData.filter((tournament) =>
          selectedSports.includes(tournament.sportId),
        )
      : tournamentsData

  return (
    <Container size="xl" py="2rem">
      <pre>
        {JSON.stringify(
          {
            selectedSports,
            selectedTournaments,
          },
          null,
          2,
        )}
      </pre>
      <Flex
        direction={{
          base: 'column',
          sm: 'row',
        }}
        gap="md"
      >
        <SportSelection
          sports={sportsData}
          selectedSports={selectedSports}
          onSportToggle={handleSportSelectionChange}
        />
        <Stack gap="md">
          <TextInput variant="filled" placeholder="Search..." />
          <TournamnetSelection
            tournaments={filteredTournaments}
            selectedTournaments={selectedTournaments}
            onTournamentToggle={handleTournamentSelectionChange}
          />
          <MatchesTable />
        </Stack>
      </Flex>
    </Container>
  )
}

type SportSelectionProps = {
  sports: Array<Sport>
  selectedSports: Array<number>
  onSportToggle: (updatedSports: Array<number>) => void
}
function SportSelection({
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

type TournamentSelectionProps = {
  tournaments: Array<Tournament>
  selectedTournaments: Array<number>
  onTournamentToggle: (updatedTournaments: Array<number>) => void
}
function TournamnetSelection({
  tournaments,
  selectedTournaments,
  onTournamentToggle,
}: TournamentSelectionProps) {
  return (
    <Chip.Group
      multiple
      value={selectedTournaments.map((id) => String(id))}
      onChange={(tournamentIds) =>
        onTournamentToggle(tournamentIds.map((id) => Number(id)))
      }
    >
      <Group gap={'xs'}>
        {tournaments.map((tournament) => (
          <Chip key={tournament.id} value={String(tournament.id)}>
            {tournament.name}
          </Chip>
        ))}
      </Group>
    </Chip.Group>
  )
}

function MatchesTable() {
  const rows = matchesData.map((match) => {
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
