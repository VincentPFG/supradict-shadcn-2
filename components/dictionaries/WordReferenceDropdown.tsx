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

      <DropdownMenuContent>
        {/* English submenu */}
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            English
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem asChild>
              <a
                href={`https://www.wordreference.com/enes/${search}`}
              >
                Spanish
              </a>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <a
                href={`https://www.wordreference.com/enfr/${search}`}
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
              >
                English
              </a>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <a
                href={`https://www.wordreference.com/esfr/${search}`}
              >
                French
              </a>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <a
                href={`https://www.wordreference.com/conj/esverbs.aspx?v=${search}`}
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
              >
                English
              </a>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <a
                href={`https://www.wordreference.com/fres/${search}`}
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
