import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'

export function WordReferenceDropdown({
  search,
}: {
  search: string
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>WordReference ▼</Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align='start'>
        {/* English submenu */}
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            English
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem asChild>
              <a
                href={`https://www.wordreference.com/enes/${search}`}
                target='_blank'
                rel='noopener noreferrer'
              >
                Spanish
              </a>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <a
                href={`https://www.wordreference.com/enfr/${search}`}
                target='_blank'
                rel='noopener noreferrer'
              >
                French
              </a>
            </DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>

        {/* Spanish submenu */}
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            Spanish
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem asChild>
              <a
                href={`https://www.wordreference.com/esen/${search}`}
                target='_blank'
                rel='noopener noreferrer'
              >
                English
              </a>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <a
                href={`https://www.wordreference.com/esfr/${search}`}
                target='_blank'
                rel='noopener noreferrer'
              >
                French
              </a>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <a
                href={`https://www.wordreference.com/conj/esverbs.aspx?v=${search}`}
                target='_blank'
                rel='noopener noreferrer'
              >
                Conjugation
              </a>
            </DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>

        {/* French submenu */}
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            French
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem asChild>
              <a
                href={`https://www.wordreference.com/fren/${search}`}
                target='_blank'
                rel='noopener noreferrer'
              >
                English
              </a>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <a
                href={`https://www.wordreference.com/fres/${search}`}
                target='_blank'
                rel='noopener noreferrer'
              >
                Spanish
              </a>
            </DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
