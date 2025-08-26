import { Button } from '@/components/ui/button'

export function OxfordAmerican({
  search,
}: {
  search: string
}) {
  return (
    <Button asChild>
      <a
        href={`https://www.oxfordlearnersdictionaries.com/definition/american_english/${search}`}
      >
        Oxford
      </a>
    </Button>
  )
}
