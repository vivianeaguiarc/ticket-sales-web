const dateFormatter = new Intl.DateTimeFormat('pt-BR', {
  day: '2-digit',
  month: 'short',
  year: 'numeric'
})

const dateTimeFormatter = new Intl.DateTimeFormat('pt-BR', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit'
})

const currencyFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL'
})

export function formatEventDate(date: string): string {
  const parsed = new Date(date)

  if (Number.isNaN(parsed.getTime())) {
    return 'Data a confirmar'
  }

  return dateFormatter.format(parsed)
}

export function formatEventDateTime(date: string): string {
  const parsed = new Date(date)

  if (Number.isNaN(parsed.getTime())) {
    return 'Data a confirmar'
  }

  return dateTimeFormatter.format(parsed)
}

export function formatCurrency(value: number): string {
  return currencyFormatter.format(value)
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) {
    return text
  }

  return `${text.slice(0, maxLength).trimEnd()}…`
}
