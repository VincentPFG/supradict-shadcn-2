import type { DictionaryDefinition } from '@/components/dicts/dictionary-types'

import { googleTranslateDictionary } from '@/components/dicts/google-translate'
import { merriamWebsterDictionary } from '@/components/dicts/merriam-webster'
import { wiktionaryDictionary } from '@/components/dicts/wiktionary'
import { wordReferenceDictionary } from '@/components/dicts/word-reference'
import { youGlishDictionary } from '@/components/dicts/youglish'

export const DICTIONARIES: DictionaryDefinition[] =
  [
    wordReferenceDictionary,
    merriamWebsterDictionary,
    googleTranslateDictionary,
    wiktionaryDictionary,
    youGlishDictionary,
  ]

export function getDictionary(
  code: string,
): DictionaryDefinition | undefined {
  return DICTIONARIES.find(
    dictionary => dictionary.code === code,
  )
}
