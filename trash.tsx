const englishLinks = [
  // {
  //   label: 'Merriam-Webster',
  //   href: `https://www.merriam-webster.com/dictionary/${search}`,
  // },
  // {
  //   label: 'Oxford',
  //   href: `https://www.oxfordlearnersdictionaries.com/search/american_english/?q=${search}`,
  // },
  // {
  //   label: 'WordReference ES',
  //   href: `https://www.wordreference.com/enes/${search}`,
  // },
  // {
  //   label: '⭐ WordReference FR',
  //   href: `https://www.wordreference.com/enfr/${search}`,
  // },
  {
    label: 'WordReference FR',
    href: `https://www.wordreference.com/enfr/${search}`,
  },
  {
    label: 'WordReference ES',
    href: `https://www.wordreference.com/enes/${search}`,
  },

  {
    label: 'Wiktionary',
    href: `https://en.wiktionary.org/wiki/${search}`,
  },
  // {
  //   label: 'YouGlish',
  //   href: `https://youglish.com/pronounce/${search}/english/us`,
  // },
  // {
  //   label: 'Reverso ES',
  //   href: `https://www.reverso.net/text-translation#sl=eng&tl=spa&text=${search}`,
  // },
  // {
  //   label: 'Reverso FR',
  //   href: `https://www.reverso.net/text-translation#sl=eng&tl=fra&text=${search}`,
  // },
  // {
  //   label: 'Linguee FR',
  //   href: `https://www.linguee.com/english-french/search?query=${search}`,
  // },
  // {
  //   label: 'Linguee ES',
  //   href: `https://www.linguee.com/english-spanish/search?query=${search}`,
  // },
  // {
  //   label: 'Google ES',
  //   href: `https://translate.google.com/?op=translate&sl=en&tl=es&text=${search}`,
  // },
  // {
  //   label: 'Google FR',
  //   href: `https://translate.google.com/?op=translate&sl=en&tl=fr&text=${search}`,
  // },
  // {
  //   label: 'Cambridge',
  //   href: `https://dictionary.cambridge.org/search/direct/?datasetsearch=essential-american-english&q=${search}`,
  // },
]
// .sort((a, b) => a.label.localeCompare(b.label))

const spanishLinks = [
  // {
  //   label: '⭐ WordReference FR',
  //   href: `https://www.wordreference.com/esfr/${search}`,
  // },
  {
    label: 'WordReference FR',
    href: `https://www.wordreference.com/esfr/${search}`,
  },
  {
    label: 'WordReference EN',
    href: `https://www.wordreference.com/esen/${search}`,
  },
  {
    label: 'Wikcionario',
    href: `https://es.wiktionary.org/wiki/${search}`,
  },
  // {
  //   label: 'YouGlish',
  //   href: `https://youglish.com/pronounce/${search}/spanish/la`,
  // },
  // {
  //   label: 'Reverso EN',
  //   href: `https://www.reverso.net/traducción-texto#sl=spa&tl=eng&text=${search}`,
  // },
  // {
  //   label: 'Reverso FR',
  //   href: `https://www.reverso.net/traducción-texto#sl=spa&tl=fra&text=${search}`,
  // },
  // {
  //   label: 'Linguee FR',
  //   href: `https://www.linguee.es/espanol-frances/search?query=${search}`,
  // },
  // {
  //   label: 'Linguee EN',
  //   href: `https://www.linguee.es/espanol-ingles/search?query=${search}`,
  // },
  // {
  //   label: 'Google EN',
  //   href: `https://translate.google.com/?op=translate&sl=es&tl=en&text=${search}`,
  // },
  // {
  //   label: 'Google FR',
  //   href: `https://translate.google.com/?op=translate&sl=es&tl=fr&text=${search}`,
  // },
]
// .sort((a, b) => a.label.localeCompare(b.label))

const frenchLinks = [
  // {
  //   label: '⭐ WordReference EN',
  //   href: `https://www.wordreference.com/fren/${search}`,
  // },
  // {
  //   label: '⭐ WordReference ES',
  //   href: `https://www.wordreference.com/fres/${search}`,
  // },
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
  // {
  //   label: 'YouGlish',
  //   href: `https://youglish.com/pronounce/${search}/french/fr`,
  // },
  // {
  //   label: 'Le Robert',
  //   href: `https://dictionnaire.lerobert.com/definition/${search}`,
  // },
  // {
  //   label: 'Reverso EN',
  //   href: `https://www.reverso.net/traduction-texte#sl=fra&tl=eng&text=${search}`,
  // },
  // {
  //   label: 'Reverso ES',
  //   href: `https://www.reverso.net/traduction-texte#sl=fra&tl=spa&text=${search}`,
  // },
  // {
  //   label: 'Linguee EN',
  //   href: `https://www.linguee.fr/francais-anglais/search?query=${search}`,
  // },
  // {
  //   label: 'Linguee ES',
  //   href: `https://www.linguee.fr/francais-espagnol/search?query=${search}`,
  // },
  // {
  //   label: 'Google EN',
  //   href: `https://translate.google.com/?op=translate&sl=fr&tl=en&text=${search}`,
  // },
  // {
  //   label: 'Google ES',
  //   href: `https://translate.google.com/?op=translate&sl=fr&tl=es&text=${search}`,
  // },
]
// .sort((a, b) => a.label.localeCompare(b.label))

const iframeLinks = [
  {
    label: 'MW',
    href: `https://www.merriam-webster.com/dictionary/${search}`,
  },
  {
    label: 'EN',
    href: `https://www.linguee.fr/francais-anglais/search?query=${search}`,
  },
  {
    label: 'ES',
    href: `https://www.linguee.fr/francais-espagnol/search?query=${search}`,
  },
]

{
  /* <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>
              EN
            </NavigationMenuTrigger>
            <NavigationMenuContent className='min-w-[200px]'>
              {englishLinks.map(dict => (
                <NavigationMenuLink
                  key={dict.label}
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
            <NavigationMenuContent className='min-w-[200px]'>
              {spanishLinks.map(dict => (
                <NavigationMenuLink
                  key={dict.label}
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
            <NavigationMenuContent className='min-w-[200px]'>
              {frenchLinks.map(dict => (
                <NavigationMenuLink
                  key={dict.label}
                  className=''
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
          </NavigationMenuItem> */
}
{
  /* </NavigationMenuList> */
}
{
  /* </NavigationMenu> */
}

{
  /* <iframe
        src={`https://www.merriam-webster.com/dictionary/${search}`}
        className='w-full h-[50vh]'
      ></iframe> */
}
