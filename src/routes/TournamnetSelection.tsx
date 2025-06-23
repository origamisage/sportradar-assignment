import { Group } from '@mantine/core'
import type { Tournament } from '@/data'
import { CustomChip } from '@/components/CustomChip/CustomChip'

type TournamentSelectionProps = {
  tournaments: Array<Tournament>
  selectedTournaments: Array<number>
  onTournamentToggle: (updatedTournaments: Array<number>) => void
}
export function TournamnetSelection({
  tournaments,
  selectedTournaments,
  onTournamentToggle,
}: TournamentSelectionProps) {
  return (
    <CustomChip.Group
      value={selectedTournaments.map((id) => String(id))}
      onChange={(tournamentIds) =>
        onTournamentToggle(tournamentIds.map((id) => Number(id)))
      }
    >
      <Group gap={'xs'} wrap={'wrap'}>
        {tournaments.map((tournament) => (
          <CustomChip
            key={tournament.id}
            value={String(tournament.id)}
            size="sm"
            variant="filled"
          >
            {tournament.name}
          </CustomChip>
        ))}
      </Group>
    </CustomChip.Group>
  )
}
