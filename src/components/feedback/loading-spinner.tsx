import { Loader2 } from "lucide-react"

import { cn } from "@/lib/utils"

type LoadingSpinnerProps = {
  className?: string
  label?: string
}

export function LoadingSpinner({ className, label = "Carregando..." }: LoadingSpinnerProps) {
  return (
    <div
      role="status"
      aria-label={label}
      className={cn("flex items-center justify-center gap-2 text-muted-foreground", className)}
    >
      <Loader2 className="size-5 animate-spin" />
      <span className="text-sm">{label}</span>
    </div>
  )
}
