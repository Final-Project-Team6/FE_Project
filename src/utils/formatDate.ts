export function formatDate(input: string): string {
  const [datePart] = input.split(' ')

  const date = new Date(datePart)

  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}
