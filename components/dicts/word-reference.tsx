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

const wordReferenceCodes = new Set('en ar zh cs nl fr de el it ja ko pl pt ro es sv tr ru is'.split(' '))
const pathCodes: Record<string, string> = { cs: 'cz', el: 'gr' }

function supportedLanguages(languages: string[]) {
  return languages.map(language => language.startsWith('zh-') ? 'zh' : language.split('-')[0])
    .filter((code, index, codes) => wordReferenceCodes.has(code) && codes.indexOf(code) === index)
}

function supportsPair(source: string, target: string) {
  return source !== target && (source === 'en' || target === 'en' ||
    !['ru', 'is'].some(code => code === source || code === target))
}

function WordReferenceTab({
  search: _search,
  languages: _languages,
}: DictionaryProps) {
  return <TabsTrigger value='wr'>WR</TabsTrigger>
}

function WordReferenceContent({
  search,
  languages: configuredLanguages,
}: DictionaryProps) {
  const supported = supportedLanguages(configuredLanguages)
  const languages = supported.filter(source => supported.some(target => supportsPair(source, target)))
  return (
    <TabsContent
      value='wr'
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
                  targetLanguage => supportsPair(sourceLanguage, targetLanguage),
                )
                .map(targetLanguage => (
                  <Button
                    asChild
                    variant='outline'
                    key={targetLanguage}
                  >
                    <Link
                      href={`https://www.wordreference.com/${pathCodes[sourceLanguage] ?? sourceLanguage}${pathCodes[targetLanguage] ?? targetLanguage}/${encodeURIComponent(search)}`}
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
  isAvailable: ({ languages }: DictionaryProps) => {
    const supported = supportedLanguages(languages)
    return supported.some(source => supported.some(target => supportsPair(source, target)))
  },
} satisfies DictionaryDefinition
