import { describe, expect, it } from 'vitest'
import {
  filterMatchesBySportAndTournament,
  filterTournamentsBySport,
} from './filters'
import type { Match, Sport, Tournament } from '@/types'

const sports: Array<Sport> = [
  { id: 1, name: 'Football' },
  { id: 2, name: 'Basketball' },
  { id: 3, name: 'Ice Hockey' },
  { id: 4, name: 'Baseball' },
  { id: 5, name: 'American Football' },
]

const tournaments: Array<Tournament> = [
  { id: 1, sportId: 1, name: 'UEFA Champions league' },
  { id: 2, sportId: 2, name: 'NBA' },
  { id: 3, sportId: 2, name: 'Eurobasket' },
  { id: 4, sportId: 1, name: 'UEFA Europe league' },
  { id: 5, sportId: 3, name: 'NHL' },
  { id: 6, sportId: 4, name: 'MLB' },
  { id: 7, sportId: 5, name: 'NFL' },
]

const matches: Array<Match> = [
  {
    id: 1,
    tournamentId: 2,
    start_time: '2022-02-06T03:10:38Z',
    status: 'COMPLETED',
    home_team: 'Sacramento Kings',
    away_team: 'Oklahoma City Thunder',
    home_score: '113',
    away_score: '103',
  },
  {
    id: 2,
    tournamentId: 2,
    start_time: '2022-02-06T03:11:26Z',
    status: 'COMPLETED',
    home_team: 'Portland Trail Blazers',
    away_team: 'Milwaukee Bucks',
    home_score: '108',
    away_score: '137',
  },
  {
    id: 3,
    tournamentId: 2,
    start_time: '2023-04-06T20:41:04Z',
    status: 'SCHEDULED',
    home_team: 'Denver Nuggets',
    away_team: 'Brooklyn Nets',
  },
  {
    id: 4,
    tournamentId: 5,
    start_time: '2023-02-06T20:41:47Z',
    status: 'Live',
    home_team: 'Detroit Redwings',
    away_team: 'Los Angeles Kings',
    home_score: '1',
    away_score: '1',
  },
  {
    id: 5,
    tournamentId: 5,
    start_time: '2022-02-06T20:42:13Z',
    status: 'COMPLETED',
    home_team: 'Chicago Blackhawks',
    away_team: 'Philadelphia Flyers',
    home_score: '3',
    away_score: '5',
  },
  {
    id: 6,
    tournamentId: 6,
    start_time: '2022-02-08T20:42:13Z',
    status: 'COMPLETED',
    home_team: 'Los Angeles Kings',
    away_team: 'Chicago Blackhawks',
    home_score: '2',
    away_score: '3',
  },
]

describe('filterTournamentsBySport', () => {
  it('returns all tournaments if no sports are selected', () => {
    expect(
      filterTournamentsBySport({
        allTournaments: tournaments,
        selectedSports: [],
      }),
    ).toEqual(tournaments)
  })

  it('filters tournaments by selected sports', () => {
    // Basketball (id: 2) tournaments
    const basketballTournaments = tournaments.filter((t) => t.sportId === 2)
    expect(
      filterTournamentsBySport({
        allTournaments: tournaments,
        selectedSports: [2],
      }),
    ).toEqual(basketballTournaments)
  })

  it('filters tournaments by multiple selected sports', () => {
    // Basketball (id: 2) and Football (id: 1) tournaments
    const basketballAndFootballTournaments = tournaments.filter(
      (t) => t.sportId === 1 || t.sportId === 2,
    )
    expect(
      filterTournamentsBySport({
        allTournaments: tournaments,
        selectedSports: [1, 2],
      }),
    ).toEqual(basketballAndFootballTournaments)
  })

  it('returns empty if no tournaments match selected sports', () => {
    expect(
      filterTournamentsBySport({
        allTournaments: tournaments,
        selectedSports: [999],
      }),
    ).toEqual([])
  })

  it('returns empty if allTournaments is empty', () => {
    expect(
      filterTournamentsBySport({
        allTournaments: [],
        selectedSports: [1],
      }),
    ).toEqual([])
  })
})

describe('filterMatchesBySportAndTournament', () => {
  it('returns matches for selected tournaments (takes precedence)', () => {
    // Tournament 2 is NBA, should return all matches with tournamentId 2
    const nbaMatches = matches.filter((m) => m.tournamentId === 2)
    expect(
      filterMatchesBySportAndTournament({
        allMatches: matches,
        allTournaments: tournaments,
        selectedTournaments: [2],
        selectedSports: [2],
      }),
    ).toEqual(nbaMatches)
  })

  it('returns matches for multiple selected tournaments (takes precedence)', () => {
    // Tournaments 2 (NBA) and 5 (NHL)
    const nbaAndNhlMatches = matches.filter(
      (m) => m.tournamentId === 2 || m.tournamentId === 5,
    )
    expect(
      filterMatchesBySportAndTournament({
        allMatches: matches,
        allTournaments: tournaments,
        selectedTournaments: [2, 5],
        selectedSports: [2, 3], // These sports should be ignored due to tournament selection
      }),
    ).toEqual(nbaAndNhlMatches)
  })

  it('returns matches for selected sports if no tournaments selected', () => {
    // Basketball (id: 2) tournaments: id 2
    // Should return matches with tournamentId 2
    const basketballMatches = matches.filter((m) => m.tournamentId === 2)
    expect(
      filterMatchesBySportAndTournament({
        allMatches: matches,
        allTournaments: tournaments,
        selectedTournaments: [],
        selectedSports: [2],
      }),
    ).toEqual(basketballMatches)
  })

  it('returns matches for multiple selected sports if no tournaments selected', () => {
    // Basketball (id: 2) tournaments: id 2
    // Ice Hockey (id: 3) tournaments: id 5
    const basketballAndHockeyMatches = matches.filter(
      (m) => m.tournamentId === 2 || m.tournamentId === 5,
    )
    expect(
      filterMatchesBySportAndTournament({
        allMatches: matches,
        allTournaments: tournaments,
        selectedTournaments: [],
        selectedSports: [2, 3],
      }),
    ).toEqual(basketballAndHockeyMatches)
  })

  it('returns all matches if nothing is selected', () => {
    expect(
      filterMatchesBySportAndTournament({
        allMatches: matches,
        allTournaments: tournaments,
        selectedTournaments: [],
        selectedSports: [],
      }),
    ).toEqual(matches)
  })

  it('returns empty if selected tournaments do not exist', () => {
    expect(
      filterMatchesBySportAndTournament({
        allMatches: matches,
        allTournaments: tournaments,
        selectedTournaments: [999, 998],
        selectedSports: [],
      }),
    ).toEqual([])
  })

  it('returns empty if selected sports do not exist', () => {
    expect(
      filterMatchesBySportAndTournament({
        allMatches: matches,
        allTournaments: tournaments,
        selectedTournaments: [],
        selectedSports: [999, 998],
      }),
    ).toEqual([])
  })

  it('returns empty if allMatches is empty', () => {
    expect(
      filterMatchesBySportAndTournament({
        allMatches: [],
        allTournaments: tournaments,
        selectedTournaments: [2],
        selectedSports: [],
      }),
    ).toEqual([])
  })

  it('handles matches with tournamentId not found in allTournaments', () => {
    const malformedMatches: Array<Match> = [
      {
        id: 7,
        tournamentId: 9999, // This tournamentId does not exist in 'tournaments'
        start_time: '2023-04-06T20:41:04Z',
        status: 'SCHEDULED',
        home_team: 'Test Team A',
        away_team: 'Test Team B',
      },
    ]
    expect(
      filterMatchesBySportAndTournament({
        allMatches: malformedMatches,
        allTournaments: tournaments,
        selectedTournaments: [],
        selectedSports: [1], // Select a sport to trigger the sport filtering logic
      }),
    ).toEqual([]) // Should return empty as the match's sportId cannot be determined
  })
})
