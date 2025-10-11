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
      href: `https://www.oxfordlearnersdictionaries.com/definition/american_english/${search}`,
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
      label: 'DeepL ES',
      href: `https://www.deepl.com/en/translator#en/es/${search}`,
    },
    {
      label: 'DeepL FR',
      href: `https://www.deepl.com/en/translator#en/fr/${search}`,
    },
    {
      label: 'Wiktionary',
      href: `https://en.wiktionary.org/wiki/${search}`,
    },
    {
      label: 'YouGlish',
      href: `https://youglish.com/pronounce/${search}/english/us`,
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
      label: 'DeepL EN',
      href: `https://www.deepl.com/es/translator#es/en/${search}`,
    },
    {
      label: 'DeepL FR',
      href: `https://www.deepl.com/es/translator#es/fr/${search}`,
    },
    {
      label: 'Wikcionario',
      href: `https://es.wiktionary.org/wiki/${search}`,
    },
    {
      label: 'YouGlish',
      href: `https://youglish.com/pronounce/${search}/spanish/la`,
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
      label: 'DeepL EN',
      href: `https://www.deepl.com/fr/translator#fr/en/${search}`,
    },
    {
      label: 'DeepL ES',
      href: `https://www.deepl.com/fr/translator#fr/es/${search}`,
    },
    {
      label: 'Wiktionnaire',
      href: `https://fr.wiktionary.org/wiki/${search}`,
    },
    {
      label: 'YouGlish',
      href: `https://youglish.com/pronounce/${search}/french/fr`,
    },
  ]

  return (
    // <div className='grid w-full place-items-center min-h-screen'>
    <div className='grid w-full place-items-center gap-5 p-5'>
      <h1 className='text-5xl font-semibold'>
        <Link
          href='/'
          className='text-inherit no-underline hover:underline'
        >
          SupraDictionary
        </Link>
      </h1>

      {/* <div className='flex gap-2'>
        <Badge variant='outline'>English</Badge>
        <Badge variant='outline'>Spanish</Badge>
        <Badge variant='outline'>French</Badge>
      </div> */}
      <form className='w-full max-w-md'>
        <Input
          id='search'
          type='text'
          name='search'
          placeholder='Type then press Enter'
          autoFocus
          autoCapitalize='off'
        />
      </form>

      {/* <div className='flex gap-5'>
        <English search={search}></English>
        <Spanish search={search}></Spanish>
        <French search={search}></French>
      </div> */}
      {/* <div className='w-full max-w-md grid gap-y-2 px-5'>
        <Label htmlFor='search'>Search</Label>
        <Input
          id='search'
          type='text'
          name='search'
          placeholder='Type then press Enter'
          autoFocus
          autoCapitalize='off'
        />
      </div> */}

      {/* <div className='px-5'> */}
      <ScrollArea className='h-[50px] w-full max-w-md rounded-md border px-1'>
        {search}
      </ScrollArea>
      {/* </div> */}

      <NavigationMenu
      // viewport={false}
      >
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>
              English
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              {englishLinks
                .sort((a, b) =>
                  a.label.localeCompare(b.label)
                )
                .map(dict => (
                  <NavigationMenuLink
                    key={dict.label}
                    className='grid w-[300px]'
                    href={dict.href}
                  >
                    {dict.label}
                  </NavigationMenuLink>
                ))}
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>
              Español
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              {spanishLinks
                .sort((a, b) =>
                  a.label.localeCompare(b.label)
                )
                .map(dict => (
                  <NavigationMenuLink
                    key={dict.label}
                    className='grid w-[300px]'
                    href={dict.href}
                  >
                    {dict.label}
                  </NavigationMenuLink>
                ))}
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>
              Français
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              {frenchLinks
                .sort((a, b) =>
                  a.label.localeCompare(b.label)
                )
                .map(dict => (
                  <NavigationMenuLink
                    key={dict.label}
                    className='grid w-[300px]'
                    href={dict.href}
                  >
                    {dict.label}
                  </NavigationMenuLink>
                ))}
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      {/* <Tabs
        defaultValue='account'
        className='w-[400px]'
      >
        <TabsList>
          <TabsTrigger value='en'>
            English
          </TabsTrigger>
          <TabsTrigger value='es'>
            Español
          </TabsTrigger>
          <TabsTrigger value='fr'>
            Français
          </TabsTrigger>
        </TabsList>
        <TabsContent value='en'>
          {englishLinks
            .sort((a, b) =>
              a.label.localeCompare(b.label)
            )
            .map(dict => (
              <Link href={dict.href}>
                {dict.label}
              </Link>
            ))}
        </TabsContent>
        <TabsContent value='es'>
          {spanishLinks
            .sort((a, b) =>
              a.label.localeCompare(b.label)
            )
            .map(dict => (
              <Link href={dict.href}>
                {dict.label}
              </Link>
            ))}
        </TabsContent>
        <TabsContent value='fr'>
          Change your password here.
        </TabsContent>
      </Tabs> */}
    </div>
    // </div>
  )
}
