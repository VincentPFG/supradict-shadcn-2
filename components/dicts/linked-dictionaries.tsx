import Link from 'next/link'

import { TabsTrigger } from '@/components/ui/tabs'
import type { DictionaryDefinition, DictionaryProps } from './dictionary-types'

function linkedDictionary(
  code: string,
  name: string,
  language: string,
  lookup: (term: string) => string,
): DictionaryDefinition {
  function getHref({ search }: DictionaryProps) {
    return lookup(encodeURIComponent(search.trim()))
  }

  function Tab(props: DictionaryProps) {
    return (
      <TabsTrigger value={code} asChild>
        <Link href={getHref(props)} aria-label={name} title={name}>
          {code.toUpperCase()}
        </Link>
      </TabsTrigger>
    )
  }

  return {
    code,
    name,
    Tab,
    getHref,
    isAvailable: ({ languages }) => languages.some(code => code.split('-')[0] === language),
  }
}

export const linkedDictionaries = [
  linkedDictionary('lr', 'Le Robert', 'fr', term =>
    `https://dictionnaire.lerobert.com/definition/${term}`),
  linkedDictionary('rae', 'Real Academia Española', 'es', term =>
    `https://dle.rae.es/${term}`),
  linkedDictionary('ox', 'Oxford Advanced Learner’s Dictionary', 'en', term =>
    `https://www.oxfordlearnersdictionaries.com/search/english/?q=${term}`),
  linkedDictionary('cam', 'Cambridge Learner’s Dictionary', 'en', term =>
    `https://dictionary.cambridge.org/search/direct/?datasetsearch=learner-english&q=${term}`),
  linkedDictionary('du', 'Duden', 'de', term =>
    `https://www.duden.de/suchen/dudenonline/${term}`),
  linkedDictionary('tr', 'Treccani', 'it', term =>
    `https://www.treccani.it/vocabolario/ricerca/${term}/`),
  linkedDictionary('pri', 'Priberam', 'pt', term =>
    `https://dicionario.priberam.org/${term}`),
]
