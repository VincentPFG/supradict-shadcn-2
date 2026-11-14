'use client'

import { useState, type ReactNode } from 'react'
import { ChevronDown } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Tabs, TabsList } from '@/components/ui/tabs'

type DictionaryOption = {
  code: string
  name: string
  href?: string
}

type DictionaryPickerProps = {
  options: DictionaryOption[]
  defaultDictionary: string
  triggers: ReactNode
  children: ReactNode
}

export function DictionaryPicker({
  options,
  defaultDictionary,
  triggers,
  children,
}: DictionaryPickerProps) {
  const [selectedCode, setSelectedCode] = useState(defaultDictionary)
  const active = options.find(
    option => option.code === selectedCode && !option.href,
  ) ?? options.find(option => option.code === defaultDictionary)
  const activeCode = active?.code ?? ''

  if (options.length === 0) return null

  return (
    <Tabs
      value={activeCode}
      onValueChange={setSelectedCode}
      className='w-full items-center'
    >
      <div className='w-full max-w-md sm:hidden'>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              type='button'
              variant='outline'
              className='h-11 w-full justify-between'
              aria-label={active ? `Dictionary: ${active.name}` : 'Dictionary'}
            >
              {active?.name ?? 'Choose a dictionary'}
              <ChevronDown aria-hidden='true' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align='start'
            className='w-(--radix-dropdown-menu-trigger-width)'
          >
            <DropdownMenuRadioGroup
              value={activeCode}
              onValueChange={setSelectedCode}
            >
              {options.map(({ code, name, href }) =>
                href ? (
                  <DropdownMenuItem key={code} asChild>
                    <a href={href}>{name}</a>
                  </DropdownMenuItem>
                ) : (
                  <DropdownMenuRadioItem key={code} value={code}>
                    {name}
                  </DropdownMenuRadioItem>
                ),
              )}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <TabsList className='hidden w-full max-w-md sm:inline-flex'>
        {triggers}
      </TabsList>
      {children}
    </Tabs>
  )
}
