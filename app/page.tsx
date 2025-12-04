import { Input } from '@/components/ui/input'
import Link from 'next/link'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs'
import { ScrollArea } from '@/components/ui/scroll-area'

import { Button } from '@/components/ui/button'
import { ButtonGroup } from '@/components/ui/button-group'
import { ReactNode } from 'react'

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ search?: string }>
}) {
  const { search = '' } = await searchParams

  return {
    title: `SupraDictionary${
      search && ` – ${search}`
    }`,
    description: 'A polyglot’s companion.',
    icons: {
      icon: '/SD.png',
    },
  }
}

// const languages = ['en', 'es', 'fr', 'it', 'pt']
// const tabsList = (
//   <TabsList className='w-full max-w-md'>
//     {languages.map(sl => (
//       <TabsTrigger value={sl} key={sl}>
//         {sl.toUpperCase()}
//       </TabsTrigger>
//     ))}
//   </TabsList>
// )

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{
    search?: string
    lang?: string
  }>
}) {
  const { search = '', lang = '' } =
    await searchParams

  const languages = lang.split('-')

  const twoSubTabs = (
    url: (
      sl: string,
      tl: string,
      search: string
    ) => string
  ) => (
    <ButtonGroup
      className={`grid grid-cols-2 w-full max-w-md`}
    >
      {[0, 1].map(n => {
        const sl = languages[n]
        const tl = languages[(n + 1) % 2]
        return (
          <Button
            asChild
            variant='outline'
            key={languages[n]}
          >
            <Link href={url(sl, tl, search)}>
              {sl.toUpperCase()}
            </Link>
          </Button>
        )
      })}
    </ButtonGroup>
  )

  const tabsList = (
    <TabsList className='w-full max-w-md'>
      {languages.map(sl => (
        <TabsTrigger value={sl} key={sl}>
          {sl.toUpperCase()}
        </TabsTrigger>
      ))}
    </TabsList>
  )

  const subTabs = (
    url: (
      sl: string,
      tl: string,
      search: string
    ) => string
  ) => (
    <Tabs className='w-full items-center'>
      {tabsList}

      {languages.map(sl => (
        <TabsContent
          value={sl}
          className='w-full max-w-md'
          key={sl}
        >
          <ButtonGroup
            className={`grid w-full`}
            style={{
              gridTemplateColumns: `repeat(${
                languages.length - 1
              }, minmax(0, 1fr))`,
            }}
          >
            {languages
              .filter(tl => tl != sl)
              .map(tl => (
                <Button
                  asChild
                  variant='outline'
                  key={tl}
                >
                  <Link
                    href={url(sl, tl, search)}
                  >
                    {tl.toUpperCase()}
                  </Link>
                </Button>
              ))}
          </ButtonGroup>
        </TabsContent>
      ))}
    </Tabs>
  )

  return (
    <div className='grid w-full place-items-center gap-5 p-5'>
      <h1 className='text-4xl sm:text-5xl font-semibold'>
        <Link
          href={`?lang=${lang}`}
          className='text-inherit no-underline hover:underline'
        >
          SupraDictionary
        </Link>
      </h1>

      <form className='w-full max-w-md'>
        <input
          type='hidden'
          name='lang'
          value={lang}
        />
        <Input
          id='search'
          type='text'
          name='search'
          placeholder='Type here then press Enter'
          autoFocus
          autoCapitalize='off'
        />
      </form>

      <ScrollArea className='h-[50px] w-full max-w-md rounded-md border px-1'>
        {search}
      </ScrollArea>

      <Tabs
        defaultValue='wr'
        className='w-full items-center'
      >
        <TabsList className='w-full max-w-md'>
          <TabsTrigger value='wr'>WR</TabsTrigger>
          {languages.includes('en') && (
            <TabsTrigger value='mw'>
              MW
            </TabsTrigger>
          )}
          <TabsTrigger value='g'>G</TabsTrigger>
          <TabsTrigger value='w'>W</TabsTrigger>
        </TabsList>

        <TabsContent
          value='wr'
          className='w-full flex justify-center'
        >
          {(() => {
            const wrURL = (
              sl: string,
              tl: string
            ) =>
              `https://www.wordreference.com/${sl}${tl}/${search}`
            return languages.length === 2
              ? twoSubTabs(wrURL)
              : subTabs(wrURL)
          })()}
        </TabsContent>

        {languages.includes('en') && (
          <TabsContent
            value='mw'
            className='w-full'
          >
            <iframe
              src={`https://www.merriam-webster.com/dictionary/${search}`}
              className='w-full h-[50vh]'
            ></iframe>
          </TabsContent>
        )}

        <TabsContent
          value='g'
          className='w-full flex justify-center'
        >
          {(() => {
            const wrURL = (
              sl: string,
              tl: string
            ) =>
              `https://translate.google.com/?op=translate&sl=${sl}&tl=${tl}&text=${search}`
            return languages.length === 2
              ? twoSubTabs(wrURL)
              : subTabs(wrURL)
          })()}
        </TabsContent>

        <TabsContent value='w' className='w-full'>
          <Tabs className='w-full items-center'>
            {tabsList}
            {languages.map(sl => (
              <TabsContent
                value={sl}
                className='w-full'
                key={sl}
              >
                <iframe
                  src={`https://${sl}.wiktionary.org/wiki/${search}`}
                  className='w-full h-[50vh]'
                ></iframe>
              </TabsContent>
            ))}
          </Tabs>
        </TabsContent>
      </Tabs>
    </div>
  )
}
