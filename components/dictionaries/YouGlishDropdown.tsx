import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'

export function YouGlishDropdown({
  search,
}: {
  search: string
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>YouGlish ▼</Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuItem asChild>
          <a
            href={`https://youglish.com/pronounce/${search}/english`}
            target='_blank'
            rel='noopener noreferrer'
          >
            English
          </a>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <a
            href={`https://youglish.com/pronounce/${search}/spanish`}
            target='_blank'
            rel='noopener noreferrer'
          >
            Spanish
          </a>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <a
            href={`https://youglish.com/pronounce/${search}/french`}
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
