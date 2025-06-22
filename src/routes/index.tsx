import { Container, Flex, Stack, TextInput } from '@mantine/core'
import { createFileRoute } from '@tanstack/react-router'
import { useMemo, useState } from 'react'
import { SportSelection } from './SportSelection'
import { TournamnetSelection } from './TournamnetSelection'
import { MatchesTable } from './MatchesTable'
import type { Tournament } from '@/data'
import { sports as sportsData, tournaments as tournamentsData } from '@/data'

export const Route = createFileRoute('/')({
  component: App,
})

function filterTournaments({
  allTournaments,
  selectedSports,
}: {
  allTournaments: Array<Tournament>
  selectedSports: Array<number>
}) {
  if (selectedSports.length === 0) {
    return allTournaments
  }
  return allTournaments.filter((tournament) =>
    selectedSports.includes(tournament.sportId),
  )
}

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
  const filteredTournaments = useMemo(
    () =>
      filterTournaments({ allTournaments: tournamentsData, selectedSports }),
    [selectedSports],
  )

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
