import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'

export function WiktionaryDropdown({
  search,
}: {
  search: string
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>Wiktionary ▼</Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuItem asChild>
          <a
            href={`https://en.wiktionary.org/wiki/${search}`}
            target='_blank'
            rel='noopener noreferrer'
          >
            English
          </a>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <a
            href={`https://es.wiktionary.org/wiki/${search}`}
            target='_blank'
            rel='noopener noreferrer'
          >
            Spanish
          </a>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <a
            href={`https://fr.wiktionary.org/wiki/${search}`}
            target='_blank'
            rel='noopener noreferrer'
          >
            French
          </a>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
