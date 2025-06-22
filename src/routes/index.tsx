import { Container, Flex, Stack, TextInput } from '@mantine/core'
import { createFileRoute } from '@tanstack/react-router'
import { useMemo, useState } from 'react'
import { SportSelection } from './SportSelection'
import { TournamnetSelection } from './TournamnetSelection'
import { MatchesTable } from './MatchesTable'
import type { Match, Tournament } from '@/data'
import {
  matches as matchesData,
  sports as sportsData,
  tournaments as tournamentsData,
} from '@/data'

export const Route = createFileRoute('/')({
  component: App,
})

function filterTournamentsBySport({
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

function filtereMatchesBySportAndTournament({
  allMatches,
  allTournaments,
  selectedTournaments,
  selectedSports,
}: {
  allMatches: Array<Match>
  allTournaments: Array<Tournament>
  selectedTournaments: Array<number>
  selectedSports: Array<number>
}) {
  if (selectedTournaments.length > 0) {
    return allMatches.filter((match) =>
      selectedTournaments.includes(match.tournamentId),
    )
  }
  if (selectedSports.length > 0) {
    return allMatches.filter((match) => {
      const sportId = allTournaments.find(
        (tournament) => tournament.id === match.tournamentId,
      )?.sportId
      if (!sportId) return false
      return selectedSports.includes(sportId)
    })
  }
  return allMatches
}

function filterMatchesBySearchTerm({
  matches,
  searchTerm,
}: {
  matches: Array<Match>
  searchTerm: string
}) {
  const normalizedSearchTerm = searchTerm.trim().toLocaleLowerCase()
  if (normalizedSearchTerm.length === 0) {
    return matches
  }
  return matches.filter(
    (match) =>
      match.home_team.toLowerCase().includes(normalizedSearchTerm) ||
      match.away_team.toLowerCase().includes(normalizedSearchTerm),
  )
}

function App() {
  const [selectedSports, setSelectedSports] = useState<Array<number>>([])
  const [selectedTournaments, setSelectedTournaments] = useState<Array<number>>(
    [],
  )
  const [searchTerm, setSearchTerm] = useState('')

  const handleSportSelectionChange = (updatedSports: Array<number>) => {
    // Reset the search term when sports are selected
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
    // Reset the search term when tournaments are selected
    setSearchTerm('')
    setSelectedTournaments(updatedTournaments)
  }

  // Filter tournaments based on the selected sports or show all tournaments if no sports are selected
  const filteredTournaments = useMemo(
    () =>
      filterTournamentsBySport({
        allTournaments: tournamentsData,
        selectedSports,
      }),
    [selectedSports],
  )

  const filteredMatches = useMemo(
    () =>
      filtereMatchesBySportAndTournament({
        allMatches: matchesData,
        allTournaments: tournamentsData,
        selectedTournaments,
        selectedSports,
      }),
    [selectedTournaments, selectedSports],
  )

  const filteredMatchesBySearchTerm = useMemo(
    () => filterMatchesBySearchTerm({ matches: filteredMatches, searchTerm }),
    [filteredMatches, searchTerm],
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
            tournaments={filteredTournaments}
            selectedTournaments={selectedTournaments}
            onTournamentToggle={handleTournamentSelectionChange}
          />
          <MatchesTable matches={filteredMatchesBySearchTerm} />
        </Stack>
      </Flex>
    </Container>
  )
}
