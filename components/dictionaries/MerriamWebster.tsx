import { Button } from '@/components/ui/button'

export function MerriamWebster({
  search,
}: {
  search: string
}) {
  return (
    <Button asChild>
      <a
        href={`https://www.merriam-webster.com/dictionary/${search}`}
      >
        Merriam-Webster
      </a>
    </Button>
  )
}
