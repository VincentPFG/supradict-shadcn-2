import Link from 'next/link'
import { googleLanguageCodes } from '@/components/dicts/google-languages'

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

function GoogleTranslateTab(
  _props: DictionaryProps,
) {
  return <TabsTrigger value='g'>G</TabsTrigger>
}

function GoogleTranslateContent({
  search,
  languages: configuredLanguages,
}: DictionaryProps) {
  const languages = configuredLanguages.filter(code => googleLanguageCodes.has(code))
  return (
    <TabsContent
      value='g'
      className='w-full flex justify-center'
    >
      <Tabs className='w-full items-center'>
        <TabsList className='w-full max-w-md justify-start overflow-x-auto'>
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
              className='grid w-full grid-cols-[repeat(auto-fit,minmax(4rem,1fr))]'
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
                      href={`https://translate.google.com/?${new URLSearchParams({
                        op: 'translate',
                        sl: sourceLanguage,
                        tl: targetLanguage,
                        text: search,
                      })}`}
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

export const googleTranslateDictionary = {
  code: 'g',
  name: 'Google Translate',
  Tab: GoogleTranslateTab,
  Content: GoogleTranslateContent,
  isAvailable: ({ languages }: DictionaryProps) => languages.filter(code => googleLanguageCodes.has(code)).length >= 2,
} satisfies DictionaryDefinition
