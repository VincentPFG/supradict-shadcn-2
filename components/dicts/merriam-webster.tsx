import Link from 'next/link'

import { TabsTrigger } from '@/components/ui/tabs'

import type {
  DictionaryDefinition,
  DictionaryProps,
} from '@/components/dicts/dictionary-types'

function getHref({ search }: DictionaryProps) {
  return `https://www.merriam-webster.com/dictionary/${encodeURIComponent(search)}`
}

function MerriamWebsterTab(props: DictionaryProps) {
  return (
    <TabsTrigger value='mw' asChild>
      <Link
        href={getHref(props)}
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
  getHref,

  isAvailable: ({ languages }: DictionaryProps) =>
    languages.includes('en'),
} satisfies DictionaryDefinition
