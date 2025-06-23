export function formatISODate(isoDateString: string) {
  let formatted = isoDateString.replace('T', ' ')

  if (formatted.endsWith('Z')) {
    formatted = formatted.slice(0, -1)
  }
  return formatted
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
