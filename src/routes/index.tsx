import { Container, Flex, Stack, TextInput } from '@mantine/core'
import { createFileRoute } from '@tanstack/react-router'
import { useMemo, useState } from 'react'
import { MatchesTable } from './MatchesTable'
import { SportSelection } from './SportSelection'
import { TournamnetSelection } from './TournamnetSelection'
import {
  filterMatchesBySearchTerm,
  filterMatchesBySportAndTournament,
  filterTournamentsBySport,
} from '@/utils/filters'
import { fetchMatches, fetchSports, fetchTournaments } from '@/api'

export const Route = createFileRoute('/')({
  component: App,
  loader: async () => {
    const [sports, tournaments, matches] = await Promise.all([
      fetchSports(),
      fetchTournaments(),
      fetchMatches(),
    ])
    return { sports, tournaments, matches }
  },
})

function App() {
  const {
    sports: sportsData,
    tournaments: tournamentsData,
    matches: matchesData,
  } = Route.useLoaderData()

  const [selectedSports, setSelectedSports] = useState<Array<number>>([])
  const [selectedTournaments, setSelectedTournaments] = useState<Array<number>>(
    [],
  )
  const [searchTerm, setSearchTerm] = useState('')

  const handleSportSelectionChange = (updatedSports: Array<number>) => {
    // Reset the search term whenever sport selection changes
    setSearchTerm('')

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
    // Reset the search term whenever tournament selection changes
    setSearchTerm('')
    setSelectedTournaments(updatedTournaments)
  }

  const tournamentsFilteredBySport = useMemo(
    () =>
      filterTournamentsBySport({
        allTournaments: tournamentsData,
        selectedSports,
      }),
    [selectedSports],
  )

  const matchesFilteredBySportAndTournament = useMemo(
    () =>
      filterMatchesBySportAndTournament({
        allMatches: matchesData,
        allTournaments: tournamentsData,
        selectedTournaments,
        selectedSports,
      }),
    [selectedTournaments, selectedSports],
  )

  // Final filtering phase
  const matchesFilteredBySearchTerm = useMemo(
    () =>
      filterMatchesBySearchTerm({
        matches: matchesFilteredBySportAndTournament,
        searchTerm,
      }),
    [matchesFilteredBySportAndTournament, searchTerm],
  )

  return (
    <Container size="xl" py="2rem">
      <pre>
        {JSON.stringify(
          {
            selectedSports,
            selectedTournaments,
            searchTerm,
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
          <TextInput
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <TournamnetSelection
            tournaments={tournamentsFilteredBySport}
            selectedTournaments={selectedTournaments}
            onTournamentToggle={handleTournamentSelectionChange}
          />
          <MatchesTable matches={matchesFilteredBySearchTerm} />
        </Stack>
      </Flex>
    </Container>
  )
}
