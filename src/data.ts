export type Match = {
  id: number
  tournamentId: number
  start_time: string
  status: string
  home_team: string
  away_team: string
  home_score?: string
  away_score?: string
}
export const matches: Array<Match> = [
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

export type Sport = {
  id: number
  name: string
}
export const sports: Array<Sport> = [
  {
    id: 1,

    name: 'Football',
  },

  {
    id: 2,

    name: 'Basketball',
  },

  {
    id: 3,

    name: 'IceHockey',
  },

  {
    id: 4,

    name: 'Baseball',
  },

  {
    id: 5,

    name: 'American football',
  },
]

export type Tournament = {
  id: number
  sportId: number
  name: string
}
export const tournaments: Array<Tournament> = [
  {
    id: 1,

    sportId: 1,

    name: 'UEFA Champions league',
  },

  {
    id: 2,

    sportId: 2,

    name: 'NBA',
  },

  {
    id: 3,

    sportId: 2,

    name: 'Eurobasket',
  },

  {
    id: 4,

    sportId: 1,

    name: 'UEFA Europe league',
  },

  {
    id: 5,

    sportId: 3,

    name: 'NHL',
  },

  {
    id: 6,

    sportId: 4,

    name: 'MLB',
  },

  {
    id: 7,

    sportId: 5,

    name: 'NFL',
  },
]
