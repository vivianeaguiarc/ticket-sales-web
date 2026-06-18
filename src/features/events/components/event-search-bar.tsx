'use client'

import { Search } from 'lucide-react'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

type EventSearchBarProps = {
  search: string
  location: string
  onSearchChange: (value: string) => void
  onLocationChange: (value: string) => void
}

export function EventSearchBar({
  search,
  location,
  onSearchChange,
  onLocationChange
}: EventSearchBarProps) {
  return (
    <div className="grid gap-4 rounded-2xl border border-border bg-white p-4 shadow-sm sm:grid-cols-2">
      <div className="space-y-2">
        <Label htmlFor="event-search">Buscar por nome</Label>
        <div className="relative">
          <Search
            className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden
          />
          <Input
            id="event-search"
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Show, festival, teatro..."
            className="pl-9"
            aria-label="Buscar eventos por nome"
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="event-location">Local</Label>
        <Input
          id="event-location"
          value={location}
          onChange={(event) => onLocationChange(event.target.value)}
          placeholder="Cidade ou local do evento"
          aria-label="Filtrar eventos por local"
        />
      </div>
    </div>
  )
}
