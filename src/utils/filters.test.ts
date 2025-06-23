import { describe, expect, it } from 'vitest'
import { filterTournamentsBySport } from './filters'
import type { Sport, Tournament } from '@/types'

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
