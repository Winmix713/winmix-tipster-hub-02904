interface NarrativeSectionProps {
  title: string
  content: string
}

export function NarrativeSection({ title, content }: NarrativeSectionProps) {
  return (
    <section className="space-y-2">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-muted-foreground">{content}</p>
    </section>
  )
}
