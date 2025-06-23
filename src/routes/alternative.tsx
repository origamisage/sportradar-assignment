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
import { z } from 'zod'
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

const matchesSearchSchema = z.object({
  sports: z.array(z.number()).catch([]),
  tournaments: z.array(z.number()).catch([]),
  searchTerm: z.string().catch(''),
})

export const Route = createFileRoute('/alternative')({
  component: App,
  validateSearch: matchesSearchSchema,
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
  const navigate = Route.useNavigate()
  const {
    sports: sportsData,
    tournaments: tournamentsData,
    matches: matchesData,
  } = Route.useLoaderData()
  const search = Route.useSearch()

  const handleSportSelectionChange = (updatedSports: Array<number>) => {
    // Remove all the tournaments that are not related to the selected sports
    const updatedTournaments = (search.tournaments || []).filter(
      (tournament: number) => {
        // Find the sportId that the tournament is related to
        const relatedSportId = tournamentsData.find(
          (t) => t.id === tournament,
        )?.sportId
        if (!relatedSportId) {
          return false
        }
        return updatedSports.includes(relatedSportId)
      },
    )
    navigate({
      search: {
        sports: updatedSports,
        tournaments: updatedTournaments,
        searchTerm: '', // Reset search term
      },
      replace: true,
    })
  }

  const handleTournamentSelectionChange = (
    updatedTournaments: Array<number>,
  ) => {
    navigate({
      search: (prev) => ({
        sports: prev.sports,
        tournaments: updatedTournaments,
        searchTerm: '', // Reset search term
      }),
      replace: true,
    })
  }

  const handleSearchTermChange = (searchTerm: string) => {
    navigate({
      search: (prev) => ({
        ...prev,
        searchTerm,
      }),
      replace: true,
    })
  }

  const tournamentsFilteredBySport = useMemo(
    () =>
      filterTournamentsBySport({
        allTournaments: tournamentsData,
        selectedSports: search.sports || [],
      }),
    [search.sports, tournamentsData],
  )

  const matchesFilteredBySportAndTournament = useMemo(
    () =>
      filterMatchesBySportAndTournament({
        allMatches: matchesData,
        allTournaments: tournamentsData,
        selectedTournaments: search.tournaments || [],
        selectedSports: search.sports || [],
      }),
    [search.tournaments, search.sports, matchesData, tournamentsData],
  )

  // Final filtering phase
  const matchesFilteredBySearchTerm = useMemo(
    () =>
      filterMatchesBySearchTerm({
        matches: matchesFilteredBySportAndTournament,
        searchTerm: search.searchTerm || '',
      }),
    [matchesFilteredBySportAndTournament, search.searchTerm],
  )

  return (
    <Container size="lg" py="2rem">
      <div className={classes.root}>
        <SportSelection
          sports={sportsData}
          selectedSports={search.sports || []}
          onSportToggle={handleSportSelectionChange}
        />
        <Stack gap="lg" w="100%">
          <TextInput
            value={search.searchTerm || ''}
            onChange={(e) => handleSearchTermChange(e.target.value)}
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
            selectedTournaments={search.tournaments || []}
            onTournamentToggle={handleTournamentSelectionChange}
          />
          <MatchesTable matches={matchesFilteredBySearchTerm} />
        </Stack>
      </div>
    </Container>
  )
}
