import {
  Alert,
  Button,
  Center,
  Container,
  Stack,
  TextInput,
} from '@mantine/core'
import { createFileRoute, useRouter } from '@tanstack/react-router'
import { useMemo, useState } from 'react'
import { Search01Icon as SearchIcon } from 'hugeicons-react'
import classes from './Index.module.css'
import {
  filterMatchesBySearchTerm,
  filterMatchesBySportAndTournament,
  filterTournamentsBySport,
} from '@/utils/filters'
import { fetchMatches, fetchSports, fetchTournaments } from '@/api'
import { SportSelection } from '@/components/SportSelection/SportSelection'
import { TournamnetSelection } from '@/components/TournamentSelection/TournamnetSelection'
import { MatchesTable } from '@/components/MatchesTable/MatchesTable'

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
  errorComponent: () => {
    const router = useRouter()
    return (
      <Center mt="lg">
        <Alert radius="lg" title="Error" color="red">
          <Stack align="start">
            Something went wrong. Please try again later.
            <Button color="red" radius="md" onClick={() => router.invalidate()}>
              Try again
            </Button>
          </Stack>
        </Alert>
      </Center>
    )
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
    <Container size="lg" py="2rem">
      <div className={classes.root}>
        <SportSelection
          sports={sportsData}
          selectedSports={selectedSports}
          onSportToggle={handleSportSelectionChange}
        />
        <Stack gap="lg" w="100%">
          <TextInput
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            variant="filled"
            placeholder="Search for a team"
            classNames={{
              input: classes.searchInput,
            }}
            w="full"
            size="md"
            radius="md"
            leftSection={<SearchIcon size={18} />}
          />
          <TournamnetSelection
            tournaments={tournamentsFilteredBySport}
            selectedTournaments={selectedTournaments}
            onTournamentToggle={handleTournamentSelectionChange}
          />
          <MatchesTable matches={matchesFilteredBySearchTerm} />
        </Stack>
      </div>
    </Container>
  )
}
