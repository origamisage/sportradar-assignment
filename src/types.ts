import { z } from 'zod'

export const matchSchema = z.object({
  id: z.number(),
  tournamentId: z.number(),
  start_time: z.string(),
  status: z.string(),
  home_team: z.string(),
  away_team: z.string(),
  home_score: z.string().optional(),
  away_score: z.string().optional(),
})

export const sportSchema = z.object({
  id: z.number(),
  name: z.string(),
})

export const tournamentSchema = z.object({
  id: z.number(),
  sportId: z.number(),
  name: z.string(),
})

export type Match = z.infer<typeof matchSchema>
export type Sport = z.infer<typeof sportSchema>
export type Tournament = z.infer<typeof tournamentSchema>
