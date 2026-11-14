import Link from 'next/link'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { DictionaryPicker } from '@/components/dicts/dictionary-picker'
import { DictionarySearch } from '@/components/dicts/dictionary-search'
import { DictionarySettings } from '@/components/dicts/dictionary-settings'
import { googleLanguageCodes, languageName, readLanguageOrder } from '@/components/dicts/google-languages'
import { DICTIONARY_PREFERENCES_COOKIE } from '@/lib/dictionary-preferences'

import {
  DICTIONARIES,
  getDictionary,
} from '@/components/dicts/dictionary-registry'

const DEFAULT_DICTIONARIES = 'wr-mw-g-w'
const DEFAULT_LANGUAGES = 'en-fr-es'

type SearchParams = {
  search?: string | string[]
  lang?: string | string[]
  dicts?: string | string[]
}

function firstParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value
}

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<SearchParams>
}) {
  const search = firstParam((await searchParams).search) ?? ''

  return {
    title: `SupraDictionary${
      search ? ` – ${search}` : ''
    }`,
    description: 'A polyglot’s companion.',
    icons: {
      icon: '/SD.png',
      apple: '/icon-192.png',
    },
  }
}

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<SearchParams>
}) {
  const params = await searchParams
  const search = firstParam(params.search) ?? ''
  const requestedLanguages = firstParam(params.lang)
  const requestedDictionaries = firstParam(params.dicts)

  const needsSetup = requestedLanguages === undefined && requestedDictionaries === undefined
  if (needsSetup) {
    const saved = new URLSearchParams((await cookies()).get(DICTIONARY_PREFERENCES_COOKIE)?.value)
    const savedLanguages = saved.get('lang')
    const savedDictionaries = saved.get('dicts')
    if (savedLanguages && savedDictionaries) {
      const restored = new URLSearchParams({ lang: savedLanguages, dicts: savedDictionaries })
      if (search) restored.set('search', search)
      redirect(`/?${restored}`)
    }
  }
  const lang = requestedLanguages ?? (needsSetup ? '' : DEFAULT_LANGUAGES)
  const dicts = requestedDictionaries ?? (needsSetup ? '' : DEFAULT_DICTIONARIES)
  const languages = readLanguageOrder(lang)
  const languageOptions = [...new Set([...googleLanguageCodes, ...languages])]
    .map(code => ({ code, name: languageName(code) }))
    .sort((a, b) => a.name.localeCompare(b.name, 'en'))

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

  const dictionaryOptions = DICTIONARIES
    .map(({ code, name }) => ({
      code,
      name: code === 'mw' ? `${name} (English)` : name,
    }))
    .sort((a, b) => a.name.localeCompare(b.name, 'en'))

  const defaultDictionary =
    selectedDictionaries.find(
      dictionary =>
        dictionary.Content !== undefined,
    )

  return (
    <div className='grid w-full grid-cols-[minmax(0,1fr)] place-items-center gap-5 p-5'>
      <h1 className='text-4xl sm:text-5xl font-semibold'>
        <Link
          href={needsSetup ? '/' : `?${new URLSearchParams({ lang, dicts })}`}
          className='text-inherit no-underline hover:underline'
        >
          SupraDictionary
        </Link>
      </h1>

      <div className='flex w-full max-w-md items-center gap-2'>
        <DictionarySearch search={search} />
        <DictionarySettings
          key={needsSetup ? 'initial-setup' : 'configured'}
          initiallyOpen={needsSetup}
          search={search}
          languages={languages}
          dictionaryCodes={dictionaryCodes}
          languageOptions={languageOptions}
          dictionaries={dictionaryOptions}
        />
      </div>

      {selectedDictionaries.length === 0 && (
        <p className='text-muted-foreground text-center text-sm'>
          {needsSetup
            ? 'Choose your languages and dictionaries in Settings.'
            : 'Choose supported languages or another dictionary in Settings.'}
        </p>
      )}

      <DictionaryPicker
        key={`${lang}:${dicts}`}
        defaultDictionary={defaultDictionary?.code ?? ''}
        hasDictionaries={selectedDictionaries.length > 0}
        contentCodes={selectedDictionaries.filter(dictionary => dictionary.Content).map(dictionary => dictionary.code)}
        triggers={selectedDictionaries.map(dictionary => {
          const DictionaryTab = dictionary.Tab

          return (
            <DictionaryTab
              key={dictionary.code}
              search={search}
              languages={languages}
            />
          )
        })}
      >
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
      </DictionaryPicker>
    </div>
  )
}
