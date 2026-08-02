import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs'

import type {
  DictionaryDefinition,
  DictionaryProps,
} from '@/components/dicts/dictionary-types'

function WiktionaryTab(_props: DictionaryProps) {
  return <TabsTrigger value='w'>W</TabsTrigger>
}

function WiktionaryContent({
  search,
  languages,
}: DictionaryProps) {
  return (
    <TabsContent value='w' className='w-full'>
      <Tabs className='w-full items-center'>
        <TabsList className='w-full max-w-md'>
          {languages.map(language => (
            <TabsTrigger
              value={language}
              key={language}
            >
              {language.toUpperCase()}
            </TabsTrigger>
          ))}
        </TabsList>

        {languages.map(language => (
          <TabsContent
            value={language}
            className='w-full'
            key={language}
          >
            <iframe
              src={`https://${language}.wiktionary.org/wiki/${search}`}
              className='w-full h-[70dvh]'
              title={`Wiktionary — ${language.toUpperCase()}`}
            />
          </TabsContent>
        ))}
      </Tabs>
    </TabsContent>
  )
}

export const wiktionaryDictionary = {
  code: 'w',
  name: 'Wiktionary',
  Tab: WiktionaryTab,
  Content: WiktionaryContent,
} satisfies DictionaryDefinition
