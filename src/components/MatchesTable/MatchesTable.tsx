import { DataTable } from 'mantine-datatable'
import type { Match } from '@/data'
import {
  formatISODate,
  formatMatchScore,
  formatMatchStatus,
} from '@/utils/formattingHelpers'

type MatchesTableProps = {
  matches: Array<Match>
}
export function MatchesTable({ matches }: MatchesTableProps) {
  return (
    <DataTable
      withTableBorder
      borderRadius="md"
      horizontalSpacing="md"
      verticalSpacing="sm"
      c="brand.6"
      minHeight={210}
      rowColor={() => 'brand.4'}
      noRecordsText="No matches found"
      records={matches}
      columns={[
        {
          title: 'Start Time',
          accessor: 'start_time',
          render: ({ start_time }) => formatISODate(start_time),
        },
        {
          title: 'Status',
          accessor: 'status',
          render: ({ status }) => formatMatchStatus(status),
        },
        {
          title: 'Home Team',
          accessor: 'home_team',
        },
        {
          title: 'Away Team',
          accessor: 'away_team',
        },
        {
          title: 'Home Score',
          accessor: 'home_score',
          render: ({ home_score }) => formatMatchScore(home_score),
        },
        {
          title: 'Away Score',
          accessor: 'away_score',
          render: ({ away_score }) => formatMatchScore(away_score),
        },
      ]}
    />
  )
}
