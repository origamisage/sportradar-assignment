import { Chip, Group } from '@mantine/core'
import type { Tournament } from '@/data'

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
    <Chip.Group
      multiple
      value={selectedTournaments.map((id) => String(id))}
      onChange={(tournamentIds) =>
        onTournamentToggle(tournamentIds.map((id) => Number(id)))
      }
    >
      <Group gap={'xs'}>
        {tournaments.map((tournament) => (
          <Chip key={tournament.id} value={String(tournament.id)}>
            {tournament.name}
          </Chip>
        ))}
      </Group>
    </Chip.Group>
  )
}
