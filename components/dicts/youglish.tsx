import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs'

import { YouGlishWidget } from '@/components/youglish-widget'

import type {
  DictionaryDefinition,
  DictionaryProps,
} from '@/components/dicts/dictionary-types'

function YouGlishTab(_props: DictionaryProps) {
  return <TabsTrigger value='yg'>YG</TabsTrigger>
}

function YouGlishContent({
  search,
  languages,
}: DictionaryProps) {
  return (
    <TabsContent value='yg' className='w-full'>
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
            <YouGlishWidget
              search={search}
              language={language}
            />
          </TabsContent>
        ))}
      </Tabs>
    </TabsContent>
  )
}

export const youGlishDictionary = {
  code: 'yg',
  name: 'YouGlish',
  Tab: YouGlishTab,
  Content: YouGlishContent,
} satisfies DictionaryDefinition
