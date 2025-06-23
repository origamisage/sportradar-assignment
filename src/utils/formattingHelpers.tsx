export function formatISODate(isoDateString: string) {
  const fromatter = new Intl.DateTimeFormat('SI', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  })
  return fromatter
    .format(new Date(isoDateString))
    .replace(',', ' ')
    .replace('.', ':')
}
export function formatMatchStatus(status: string) {
  switch (status.toLocaleLowerCase()) {
    case 'scheduled':
      return 'Scheduled'
    case 'live':
      return 'Live'
    case 'completed':
      return 'Completed'
    default:
      return 'Unknown'
  }
}
export function formatMatchScore(score: string | undefined) {
  if (score === undefined) {
    return '-'
  }
  return score
}
