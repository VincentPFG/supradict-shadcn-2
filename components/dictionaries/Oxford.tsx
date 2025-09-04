import { Button } from '@/components/ui/button'

export function Oxford({
  search,
}: {
  search: string
}) {
  return (
    <Button asChild>
      <a
        href={`https://www.oxfordlearnersdictionaries.com/definition/english/${search
          .trim()
          .replace(/\s+/g, '-')}`}
      >
        Oxford
      </a>
    </Button>
  )
}
