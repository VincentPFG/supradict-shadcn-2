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

// https://github.com/wikimedia/mediawiki-config/blob/master/dblists/wiktionary.dblist
const editions = new Set('aa ab af ak am ang an ar ast as av ay az bcl be bew bg bh bi bjn blk bm bn bo br bs btm ca chr ch ckb co cr csb cs cy da de diq dv dz el en eo es et eu fa fi fj fo fr fy ga gd gl gn gom gor gu guw gv ha he hif hi hr hsb hu hy ia id ie ig ik io is it iu ja jbo jv kaa ka kbd kcg kk kl km kn ko ks ku kw ky la lb li lmo ln lo lt lv mad mg mh min mi mk ml mni mn mnw mr ms mt my nah na nds ne nia nl nn no oc om or pa pi pl pnb ps pt qu rm rn roa-rup ro ru rw sat sa scn sc sd sg shn sh shy simple si skr sk sl sm sn so sq sr ss st su sv sw ta tcy te tg th ti tk tl tn to tpi tr ts tt tw ug uk ur uz vec vi vo wa wo xh yi yo yue za zgh zh-min-nan zh zu'.split(' '))
const aliases: Record<string, string> = { iw: 'he', jw: 'jv', bik: 'bcl', 'pa-Arab': 'pnb' }

function supportedEditions(languages: string[]) {
  return [...new Set(languages.map(language => aliases[language] ??
    (editions.has(language) ? language : language.split('-')[0])))].filter(code => editions.has(code))
}

function WiktionaryTab(_props: DictionaryProps) {
  return <TabsTrigger value='w'>W</TabsTrigger>
}

function WiktionaryContent({
  search,
  languages: configuredLanguages,
}: DictionaryProps) {
  const languages = supportedEditions(configuredLanguages)
  return (
    <TabsContent value='w' className='w-full'>
      <Tabs className='w-full items-center'>
        <TabsList className='w-full max-w-md justify-start overflow-x-auto'>
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
              src={`https://${language}.wiktionary.org/wiki/${encodeURIComponent(search)}`}
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
  isAvailable: ({ languages }: DictionaryProps) => supportedEditions(languages).length > 0,
} satisfies DictionaryDefinition
