import { Badge } from "@/components/ui/badge"

interface CSSBadgeProps {
  score: number
}

export function CSSBadge({ score }: CSSBadgeProps) {
  const variant = score >= 80 ? "default" : score >= 60 ? "secondary" : "destructive"

  return <Badge variant={variant}>CSS: {score}</Badge>
}
