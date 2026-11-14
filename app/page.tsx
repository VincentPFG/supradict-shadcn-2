import Link from 'next/link'

import { DictionaryPicker } from '@/components/dicts/dictionary-picker'
import { DictionarySearch } from '@/components/dicts/dictionary-search'
import { DictionarySettings } from '@/components/dicts/dictionary-settings'
import { googleLanguageCodes, languageName, readLanguageOrder } from '@/components/dicts/google-languages'

import {
  DICTIONARIES,
  getDictionary,
} from '@/components/dicts/dictionary-registry'

const DEFAULT_DICTIONARIES = 'wr-mw-g-w'
const DEFAULT_LANGUAGES = 'en-fr-es'

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
    lang: requestedLanguages,
    dicts: requestedDictionaries,
  } = await searchParams

  const needsSetup = requestedLanguages === undefined && requestedDictionaries === undefined
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
