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

export function DeepLDropdown({
  search,
}: {
  search: string
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>DeepL ▼</Button>
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
                href={`https://www.deepl.com/en/translator#en/es/${search}`}
                target='_blank'
                rel='noopener noreferrer'
              >
                Spanish
              </a>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <a
                href={`https://www.deepl.com/en/translator#en/fr/${search}`}
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
                href={`https://www.deepl.com/es/translator#es/en/${search}`}
                target='_blank'
                rel='noopener noreferrer'
              >
                English
              </a>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <a
                href={`https://www.deepl.com/es/translator#es/fr/${search}`}
                target='_blank'
                rel='noopener noreferrer'
              >
                French
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
                href={`https://www.deepl.com/fr/translator#fr/en/${search}`}
                target='_blank'
                rel='noopener noreferrer'
              >
                English
              </a>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <a
                href={`https://www.deepl.com/fr/translator#fr/es/${search}`}
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
