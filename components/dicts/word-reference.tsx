import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { ButtonGroup } from '@/components/ui/button-group'
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

function WordReferenceTab({
  search: _search,
  languages: _languages,
}: DictionaryProps) {
  return <TabsTrigger value='wr'>WR</TabsTrigger>
}

function WordReferenceContent({
  search,
  languages,
}: DictionaryProps) {
  return (
    <TabsContent
      value='wr'
      className='w-full flex justify-center'
    >
      <Tabs className='w-full items-center'>
        <TabsList className='w-full max-w-md'>
          {languages.map(sourceLanguage => (
            <TabsTrigger
              value={sourceLanguage}
              key={sourceLanguage}
            >
              {sourceLanguage.toUpperCase()}
            </TabsTrigger>
          ))}
        </TabsList>

        {languages.map(sourceLanguage => (
          <TabsContent
            value={sourceLanguage}
            className='w-full max-w-md'
            key={sourceLanguage}
          >
            <ButtonGroup
              className='grid w-full'
              style={{
                gridTemplateColumns: `repeat(${
                  languages.length - 1
                }, minmax(0, 1fr))`,
              }}
            >
              {languages
                .filter(
                  targetLanguage =>
                    targetLanguage !==
                    sourceLanguage,
                )
                .map(targetLanguage => (
                  <Button
                    asChild
                    variant='outline'
                    key={targetLanguage}
                  >
                    <Link
                      href={`https://www.wordreference.com/${sourceLanguage}${targetLanguage}/${search}`}
                    >
                      {targetLanguage.toUpperCase()}
                    </Link>
                  </Button>
                ))}
            </ButtonGroup>
          </TabsContent>
        ))}
      </Tabs>
    </TabsContent>
  )
}

export const wordReferenceDictionary = {
  code: 'wr',
  name: 'WordReference',
  Tab: WordReferenceTab,
  Content: WordReferenceContent,
} satisfies DictionaryDefinition
