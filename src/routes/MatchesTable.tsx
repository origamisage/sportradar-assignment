import { Table } from '@mantine/core'

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
  const rows = matches.map((match) => {
    return (
      <Table.Tr key={match.id} c="dark.3">
        <Table.Td>{formatISODate(match.start_time)}</Table.Td>
        <Table.Td>{formatMatchStatus(match.status)}</Table.Td>
        <Table.Td>{match.home_team}</Table.Td>
        <Table.Td>{match.away_team}</Table.Td>
        <Table.Td>{formatMatchScore(match.home_score)}</Table.Td>
        <Table.Td>{formatMatchScore(match.away_score)}</Table.Td>
      </Table.Tr>
    )
  })

  return (
    <Table.ScrollContainer minWidth={600}>
      <Table
        verticalSpacing={'lg'}
        horizontalSpacing="md"
        highlightOnHover
        withTableBorder
        fz="sm"
      >
        <Table.Thead>
          <Table.Tr>
            <Table.Th py="xs">Start Time</Table.Th>
            <Table.Th py="xs">Status</Table.Th>
            <Table.Th py="xs">Home Team</Table.Th>
            <Table.Th py="xs">Away Team</Table.Th>
            <Table.Th py="xs">Home Score</Table.Th>
            <Table.Th py="xs">Away Score</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  )
}
