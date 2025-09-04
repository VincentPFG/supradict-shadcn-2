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
        <Button>Wiktionary</Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuItem asChild>
          <a
            href={`https://en.wiktionary.org/wiki/${search}`}
          >
            English
          </a>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <a
            href={`https://es.wiktionary.org/wiki/${search}`}
          >
            Spanish
          </a>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <a
            href={`https://fr.wiktionary.org/wiki/${search}`}
          >
            French
          </a>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
