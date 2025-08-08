import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'

export function LeRobertDropdown({
  search,
}: {
  search: string
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='default'>
          Le Robert ▼
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuItem asChild>
          <a
            href={`https://dictionnaire.lerobert.com/definition/${search}`}
            target='_blank'
            rel='noopener noreferrer'
          >
            Definition
          </a>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <a
            href={`https://dictionnaire.lerobert.com/conjugaison/${search}`}
            target='_blank'
            rel='noopener noreferrer'
          >
            Conjugation
          </a>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
