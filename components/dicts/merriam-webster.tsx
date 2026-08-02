import Link from 'next/link'

import { TabsTrigger } from '@/components/ui/tabs'

import type {
  DictionaryDefinition,
  DictionaryProps,
} from '@/components/dicts/dictionary-types'

function MerriamWebsterTab({
  search,
}: DictionaryProps) {
  return (
    <TabsTrigger value='mw' asChild>
      <Link
        href={`https://www.merriam-webster.com/dictionary/${search}`}
      >
        MW
      </Link>
    </TabsTrigger>
  )
}

export const merriamWebsterDictionary = {
  code: 'mw',
  name: 'Merriam-Webster',
  Tab: MerriamWebsterTab,

  isAvailable: ({ languages }: DictionaryProps) =>
    languages.includes('en'),
} satisfies DictionaryDefinition
