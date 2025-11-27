import { DeepLDropdown } from '@/components/dictionaries/DeepLDropdown'
import { LeRobertDropdown } from '@/components/dictionaries/LeRobertDropdown'
import { MerriamWebster } from '@/components/dictionaries/MerriamWebster'
import { MerriamWebsterDropdown } from '@/components/dictionaries/MerriamWebsterDropdown'
import { Oxford } from '@/components/dictionaries/Oxford'
import { OxfordAmerican } from '@/components/dictionaries/OxfordAmerican'
import { OxfordDropdown } from '@/components/dictionaries/OxfordDropdown'
import { WiktionaryDropdown } from '@/components/dictionaries/WiktionaryDropdown'
import { WordReferenceDropdown } from '@/components/dictionaries/WordReferenceDropdown'
import { YouGlishDropdown } from '@/components/dictionaries/YouGlishDropdown'
import { French } from '@/components/languages/French'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import { Spanish } from './../components/languages/Spanish'
import { English } from '@/components/languages/English'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from '@/components/ui/navigation-menu'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs'
import { ScrollArea } from '@/components/ui/scroll-area'
// import { useState } from 'react'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'

import { Button } from '@/components/ui/button'
import { ButtonGroup } from '@/components/ui/button-group'
import {
  ArrowLeftRight,
  ArrowRight,
} from 'lucide-react'

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

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ search?: string }>
}) {
  const { search = '' } = await searchParams

  return (
    <div className='grid w-full place-items-center gap-5 p-5'>
      <h1 className='text-4xl sm:text-5xl font-semibold'>
        <Link
          href='/'
          className='text-inherit no-underline hover:underline'
        >
          SupraDictionary
        </Link>
      </h1>

      <form className='w-full max-w-md'>
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

      <Tabs defaultValue='wr' className='w-full'>
        <TabsList className='w-full'>
          <TabsTrigger value='wr'>WR</TabsTrigger>

          <TabsTrigger value='mw'>MW</TabsTrigger>
          <TabsTrigger value='en'>EN</TabsTrigger>
          <TabsTrigger value='es'>ES</TabsTrigger>

          <TabsTrigger value='w'>W</TabsTrigger>
        </TabsList>
        <TabsContent
          value='wr'
          className='flex justify-center'
        >
          <div className='grid gap-2 w-full max-w-md'>
            <ButtonGroup className='grid grid-cols-2 w-full'>
              <Button
                asChild
                className='bg-purple-500 hover:bg-purple-600'
              >
                <Link
                  href={`https://www.wordreference.com/enes/${search}`}
                >
                  EN
                  <ArrowRight />
                  ES
                </Link>
              </Button>
              <Button
                asChild
                className='bg-purple-500 hover:bg-purple-600'
              >
                <Link
                  href={`https://www.wordreference.com/enfr/${search}`}
                >
                  EN
                  <ArrowRight />
                  FR
                </Link>
              </Button>
            </ButtonGroup>

            <ButtonGroup className='grid grid-cols-2 w-full'>
              <Button
                asChild
                className='bg-red-500 hover:bg-red-600'
              >
                <Link
                  href={`https://www.wordreference.com/esen/${search}`}
                >
                  ES
                  <ArrowRight />
                  EN
                </Link>
              </Button>
              <Button
                asChild
                className='bg-red-500 hover:bg-red-600'
              >
                <Link
                  href={`https://www.wordreference.com/esfr/${search}`}
                >
                  ES
                  <ArrowRight />
                  FR
                </Link>
              </Button>
            </ButtonGroup>

            <ButtonGroup className='grid grid-cols-2 w-full'>
              <Button
                asChild
                className='bg-slate-500 hover:bg-slate-600'
              >
                <Link
                  href={`https://www.wordreference.com/fren/${search}`}
                >
                  FR
                  <ArrowRight />
                  EN
                </Link>
              </Button>
              <Button
                asChild
                className='bg-slate-500 hover:bg-slate-600'
              >
                <Link
                  href={`https://www.wordreference.com/fres/${search}`}
                >
                  FR
                  <ArrowRight />
                  ES
                </Link>
              </Button>
            </ButtonGroup>
          </div>
        </TabsContent>
        <TabsContent value='mw'>
          <iframe
            src={`https://www.merriam-webster.com/dictionary/${search}`}
            className='w-full h-[50vh]'
          ></iframe>
        </TabsContent>

        <TabsContent value='en'>
          <iframe
            src={`https://www.linguee.fr/francais-anglais/search?query=${search}`}
            className='w-full h-[50vh]'
          ></iframe>
        </TabsContent>
        <TabsContent value='es'>
          <iframe
            src={`https://www.linguee.fr/francais-espagnol/search?query=${search}`}
            className='w-full h-[50vh]'
          ></iframe>
        </TabsContent>

        <TabsContent value='w'>
          <Tabs className='w-full'>
            <TabsList className='w-full'>
              <TabsTrigger value='en'>
                EN
              </TabsTrigger>
              <TabsTrigger value='es'>
                ES
              </TabsTrigger>
              <TabsTrigger value='fr'>
                FR
              </TabsTrigger>
            </TabsList>
            <TabsContent value='en'>
              <iframe
                src={`https://en.wiktionary.org/wiki/${search}`}
                className='w-full h-[50vh]'
              ></iframe>
            </TabsContent>
            <TabsContent value='es'>
              <iframe
                src={`https://es.wiktionary.org/wiki/${search}`}
                className='w-full h-[50vh]'
              ></iframe>
            </TabsContent>
            <TabsContent value='fr'>
              <iframe
                src={`https://fr.wiktionary.org/wiki/${search}`}
                className='w-full h-[50vh]'
              ></iframe>
            </TabsContent>
          </Tabs>
        </TabsContent>
      </Tabs>
    </div>
  )
}
