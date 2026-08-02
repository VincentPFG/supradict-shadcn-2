import { Fragment } from 'react'
import Link from 'next/link'
import { Info } from 'lucide-react'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Tabs,
  TabsList,
} from '@/components/ui/tabs'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'

import {
  DICTIONARIES,
  getDictionary,
} from '@/components/dicts/dictionary-registry'

const DEFAULT_DICTIONARIES = 'wr-mw-g-w'

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{
    search?: string
  }>
}) {
  const { search = '' } = await searchParams

  return {
    title: `SupraDictionary${
      search ? ` – ${search}` : ''
    }`,
    description: 'A polyglot’s companion.',
    icons: {
      icon: '/SD.png',
    },
  }
}

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{
    search?: string
    lang?: string
    dicts?: string
  }>
}) {
  const {
    search = '',
    lang = '',
    dicts = DEFAULT_DICTIONARIES,
  } = await searchParams

  const languages = lang
    .split('-')
    .filter(Boolean)

  const dictionaryProps = {
    search,
    languages,
  }

  /*
   * La chaîne de l’URL détermine :
   *
   * - les dictionnaires affichés ;
   * - leur ordre.
   *
   * Les doublons et les codes inconnus
   * sont ignorés.
   */
  const dictionaryCodes = [
    ...new Set(dicts.split('-').filter(Boolean)),
  ]

  const selectedDictionaries =
    dictionaryCodes.flatMap(code => {
      const dictionary = getDictionary(code)

      if (!dictionary) {
        return []
      }

      if (
        dictionary.isAvailable &&
        !dictionary.isAvailable(dictionaryProps)
      ) {
        return []
      }

      return [dictionary]
    })

  const helpDictionaries = [...DICTIONARIES].sort(
    (firstDictionary, secondDictionary) =>
      firstDictionary.name.localeCompare(
        secondDictionary.name,
      ),
  )

  const defaultDictionary =
    selectedDictionaries.find(
      dictionary =>
        dictionary.Content !== undefined,
    )

  const Help = () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant='ghost'
          size='icon'
          aria-label='Show help information'
        >
          <Info className='!h-5 !w-5' />
        </Button>
      </PopoverTrigger>

      <PopoverContent className='space-y-2 grid grid-cols-[1fr_2fr]'>
        {helpDictionaries.map(dictionary => (
          <Fragment key={dictionary.code}>
            <span>
              {dictionary.code.toUpperCase()}
            </span>

            <span>{dictionary.name}</span>
          </Fragment>
        ))}

        <Separator className='col-span-2' />

        <span>Row 1</span>
        <span>Dictionary</span>

        <span>Row 2</span>
        <span>Source Language</span>

        <span>Row 3</span>
        <span>Target Language</span>
      </PopoverContent>
    </Popover>
  )

  return (
    <div className='grid w-full place-items-center gap-5 p-5'>
      <h1 className='text-4xl sm:text-5xl font-semibold'>
        <Link
          href={`?lang=${lang}&dicts=${dicts}`}
          className='text-inherit no-underline hover:underline'
        >
          SupraDictionary
        </Link>
      </h1>

      <form className='w-full max-w-md'>
        <input
          type='hidden'
          name='lang'
          value={lang}
        />

        <input
          type='hidden'
          name='dicts'
          value={dicts}
        />

        <Input
          id='search'
          type='text'
          name='search'
          placeholder='Type here then press Enter'
          autoFocus
          autoCapitalize='off'
        />
      </form>

      <div className='w-full max-w-md flex items-center space-x-1'>
        <ScrollArea className='h-[50px] w-full max-w-md rounded-md border px-1'>
          {search}
        </ScrollArea>

        <Help />
      </div>

      <Tabs
        defaultValue={defaultDictionary?.code}
        className='w-full items-center'
      >
        <TabsList className='w-full max-w-md'>
          {selectedDictionaries.map(
            dictionary => {
              const DictionaryTab = dictionary.Tab

              return (
                <DictionaryTab
                  key={dictionary.code}
                  search={search}
                  languages={languages}
                />
              )
            },
          )}
        </TabsList>

        {selectedDictionaries.map(dictionary => {
          const DictionaryContent =
            dictionary.Content

          if (!DictionaryContent) {
            return null
          }

          return (
            <DictionaryContent
              key={dictionary.code}
              search={search}
              languages={languages}
            />
          )
        })}
      </Tabs>
    </div>
  )
}
