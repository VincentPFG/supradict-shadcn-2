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

  const englishLinks = [
    {
      label: 'Merriam-Webster',
      href: `https://www.merriam-webster.com/dictionary/${search}`,
    },
    {
      label: 'Oxford',
      href: `https://www.oxfordlearnersdictionaries.com/search/american_english/?q=${search}`,
    },
    {
      label: 'WordReference ES',
      href: `https://www.wordreference.com/enes/${search}`,
    },
    {
      label: 'WordReference FR',
      href: `https://www.wordreference.com/enfr/${search}`,
    },
    {
      label: 'Wiktionary',
      href: `https://en.wiktionary.org/wiki/${search}`,
    },
    {
      label: 'YouGlish',
      href: `https://youglish.com/pronounce/${search}/english/us`,
    },
    {
      label: 'Reverso ES',
      href: `https://www.reverso.net/text-translation#sl=eng&tl=spa&text=${search}`,
    },
    {
      label: 'Reverso FR',
      href: `https://www.reverso.net/text-translation#sl=eng&tl=fra&text=${search}`,
    },
    {
      label: 'Linguee FR',
      href: `https://www.linguee.com/english-french/search?query=${search}`,
    },
    {
      label: 'Linguee ES',
      href: `https://www.linguee.com/english-spanish/search?query=${search}`,
    },
  ]

  const spanishLinks = [
    {
      label: 'WordReference EN',
      href: `https://www.wordreference.com/esen/${search}`,
    },
    {
      label: 'WordReference FR',
      href: `https://www.wordreference.com/esfr/${search}`,
    },
    {
      label: 'Wikcionario',
      href: `https://es.wiktionary.org/wiki/${search}`,
    },
    {
      label: 'YouGlish',
      href: `https://youglish.com/pronounce/${search}/spanish/la`,
    },
    {
      label: 'Reverso EN',
      href: `https://www.reverso.net/traducción-texto#sl=spa&tl=eng&text=${search}`,
    },
    {
      label: 'Reverso FR',
      href: `https://www.reverso.net/traducción-texto#sl=spa&tl=fra&text=${search}`,
    },
    {
      label: 'Linguee FR',
      href: `https://www.linguee.es/espanol-frances/search?query=${search}`,
    },
    {
      label: 'Linguee EN',
      href: `https://www.linguee.es/espanol-ingles/search?query=${search}`,
    },
  ]

  const frenchLinks = [
    {
      label: 'WordReference EN',
      href: `https://www.wordreference.com/fren/${search}`,
    },
    {
      label: 'WordReference ES',
      href: `https://www.wordreference.com/fres/${search}`,
    },
    {
      label: 'Wiktionnaire',
      href: `https://fr.wiktionary.org/wiki/${search}`,
    },
    {
      label: 'YouGlish',
      href: `https://youglish.com/pronounce/${search}/french/fr`,
    },
    {
      label: 'Le Robert',
      href: `https://dictionnaire.lerobert.com/definition/${search}`,
    },
    {
      label: 'Reverso EN',
      href: `https://www.reverso.net/traduction-texte#sl=fra&tl=eng&text=${search}`,
    },
    {
      label: 'Reverso ES',
      href: `https://www.reverso.net/traduction-texte#sl=fra&tl=spa&text=${search}`,
    },
    {
      label: 'Linguee EN',
      href: `https://www.linguee.fr/francais-anglais/search?query=${search}`,
    },
    {
      label: 'Linguee ES',
      href: `https://www.linguee.fr/francais-espagnol/search?query=${search}`,
    },
  ]

  const iframeLinks = [
    {
      label: 'MW',
      href: `https://www.merriam-webster.com/dictionary/${search}`,
    },
    // {
    //   label: 'EN↔FR',
    //   href: `https://www.linguee.com/english-french/search?query=${search}&source=french`,
    // },
    // {
    //   label: 'EN ES',
    //   href: `https://www.linguee.com/english-spanish/search?query=${search}`,
    // },
    // {
    //   label: 'ES FR',
    //   href: `https://www.linguee.es/espanol-frances/search?query=${search}`,
    // },
    {
      label: 'EN',
      href: `https://www.linguee.fr/francais-anglais/search?query=${search}`,
    },
    {
      label: 'ES',
      href: `https://www.linguee.fr/francais-espagnol/search?query=${search}`,
    },
    // {
    //   label: 'IT',
    //   href: `https://www.linguee.fr/francais-italien/search?query=${search}`,
    // },
    // {
    //   label: 'PT',
    //   href: `https://www.linguee.fr/francais-portugais/search?query=${search}`,
    // },
  ]

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

      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>
              EN
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              {englishLinks
                .sort((a, b) =>
                  a.label.localeCompare(b.label)
                )
                .map(dict => (
                  <NavigationMenuLink
                    key={dict.label}
                    className='w-[200px]'
                    href={dict.href}
                  >
                    {dict.label}
                  </NavigationMenuLink>
                ))}
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>
              ES
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              {spanishLinks
                .sort((a, b) =>
                  a.label.localeCompare(b.label)
                )
                .map(dict => (
                  <NavigationMenuLink
                    key={dict.label}
                    className='w-[200px]'
                    href={dict.href}
                  >
                    {dict.label}
                  </NavigationMenuLink>
                ))}
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>
              FR
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              {frenchLinks
                .sort((a, b) =>
                  a.label.localeCompare(b.label)
                )
                .map(dict => (
                  <NavigationMenuLink
                    key={dict.label}
                    className='w-[200px]'
                    href={dict.href}
                  >
                    {dict.label}
                  </NavigationMenuLink>
                ))}
            </NavigationMenuContent>
          </NavigationMenuItem>
          {/* <NavigationMenuItem>
            <NavigationMenuTrigger>
              ⭐
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              {iframeLinks
                .sort((a, b) =>
                  a.label.localeCompare(b.label)
                )
                .map(dict => (
                  <NavigationMenuLink
                    key={dict.label}
                    className='w-[300px]'
                    href={dict.href}
                  >
                    {dict.label}
                  </NavigationMenuLink>
                ))}
            </NavigationMenuContent>
          </NavigationMenuItem> */}
        </NavigationMenuList>
      </NavigationMenu>

      {/* <iframe
        src={`https://www.merriam-webster.com/dictionary/${search}`}
        className='w-full h-[50vh]'
      ></iframe> */}

      <Tabs className='w-full'>
        <TabsList className='w-full'>
          {iframeLinks.map(dict => (
            <TabsTrigger
              value={dict.label}
              key={dict.label}
            >
              {dict.label}
            </TabsTrigger>
          ))}
        </TabsList>
        {iframeLinks.map(dict => (
          <TabsContent
            value={dict.label}
            key={dict.label}
          >
            <iframe
              src={dict.href}
              className='w-full h-[50vh]'
            ></iframe>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
