import Link from "next/link"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Users, Settings, Layers, Briefcase, FileText, Cpu } from "lucide-react"

interface CategoryCardProps {
  title: string
  description?: string
  icon?: string
  href?: string
}

export default function CategoryCard({ title, description, icon, href }: CategoryCardProps) {
  const iconMap = {
    users: Users,
    settings: Settings,
    layers: Layers,
    briefcase: Briefcase,
    "file-text": FileText,
    cpu: Cpu,
  }

  const IconComponent = icon ? iconMap[icon as keyof typeof iconMap] : null

  const cardContent = (
    <Card className="hover:bg-accent/50 transition-colors cursor-pointer">
      <CardHeader>
        <div className="flex items-center gap-3">
          {IconComponent && <IconComponent className="h-6 w-6 text-primary" />}
          <div className="flex-1">
            <CardTitle className="text-lg">{title}</CardTitle>
            {description && <CardDescription className="mt-1">{description}</CardDescription>}
          </div>
          <ArrowRight className="h-5 w-5 text-muted-foreground" />
        </div>
      </CardHeader>
    </Card>
  )

  if (href) {
    return <Link href={href}>{cardContent}</Link>
  }

  return cardContent
}
