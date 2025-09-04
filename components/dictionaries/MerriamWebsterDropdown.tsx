import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { MerriamWebster } from './MerriamWebster'

export function MerriamWebsterDropdown({
  search,
}: {
  search: string
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='default'>
          Merriam-Webster
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuItem asChild>
          <a
            href={`https://www.merriam-webster.com/dictionary/${search}`}
          >
            Dictionary
          </a>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <a
            href={`https://www.merriam-webster.com/thesaurus/${search}`}
          >
            Thesaurus
          </a>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
