import { z } from 'zod'
import { API_ENDPOINTS } from '@/constants'
import { matchSchema, sportSchema, tournamentSchema } from '@/types'

export async function fetchSports() {
  const response = await fetch('/api/' + API_ENDPOINTS.SPORTS)
  const data = await response.json()
  return z.array(sportSchema).parse(data)
}

export async function fetchTournaments() {
  const response = await fetch('/api/' + API_ENDPOINTS.TOURNAMENTS)
  const data = await response.json()
  return z.array(tournamentSchema).parse(data)
}

export async function fetchMatches() {
  const response = await fetch('/api/' + API_ENDPOINTS.MATCHES)
  const data = await response.json()
  return z.array(matchSchema).parse(data)
}
