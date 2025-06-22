import type { Match, Tournament } from '@/data'

export function filterTournamentsBySport({
  allTournaments,
  selectedSports,
}: {
  allTournaments: Array<Tournament>
  selectedSports: Array<number>
}) {
  // If no sports are selected, show all tournaments
  if (selectedSports.length === 0) {
    return allTournaments
  }

  // Filter tournaments by the selected sports
  return allTournaments.filter((tournament) =>
    selectedSports.includes(tournament.sportId),
  )
}

export function filterMatchesBySportAndTournament({
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
  // If tournaments are selected, filter matches by the selected tournaments
  // This takes precedence over the sport selection as tournaments are more granular
  if (selectedTournaments.length > 0) {
    return allMatches.filter((match) =>
      selectedTournaments.includes(match.tournamentId),
    )
  }
  // If sports are selected, filter matches by the selected sports
  if (selectedSports.length > 0) {
    return allMatches.filter((match) => {
      // Find the sportId that the match is related to
      const sportId = allTournaments.find(
        (tournament) => tournament.id === match.tournamentId,
      )?.sportId
      if (!sportId) return false
      return selectedSports.includes(sportId)
    })
  }
  return allMatches
}

export function filterMatchesBySearchTerm({
  matches,
  searchTerm,
}: {
  matches: Array<Match>
  searchTerm: string
}) {
  // Normalize the search term to lowercase and trim whitespace
  const normalizedSearchTerm = searchTerm.trim().toLocaleLowerCase()
  if (normalizedSearchTerm.length === 0) {
    return matches
  }
  // Filter matches by home or away teams
  return matches.filter(
    (match) =>
      match.home_team.toLowerCase().includes(normalizedSearchTerm) ||
      match.away_team.toLowerCase().includes(normalizedSearchTerm),
  )
}
