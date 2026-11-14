'use client'

import { useState, type ReactNode } from 'react'
import { Tabs, TabsList } from '@/components/ui/tabs'

type DictionaryPickerProps = {
  hasDictionaries: boolean
  contentCodes: string[]
  defaultDictionary: string
  triggers: ReactNode
  children: ReactNode
}

export function DictionaryPicker({
  hasDictionaries,
  contentCodes,
  defaultDictionary,
  triggers,
  children,
}: DictionaryPickerProps) {
  const [selectedCode, setSelectedCode] = useState(defaultDictionary)
  if (!hasDictionaries) return null

  return (
    <Tabs
      value={selectedCode}
      onValueChange={code => { if (contentCodes.includes(code)) setSelectedCode(code) }}
      className='w-full min-w-0 items-center'
    >
      <TabsList aria-label='Dictionaries' className='w-full max-w-md justify-start overflow-x-auto'>
        {triggers}
      </TabsList>
      {children}
    </Tabs>
  )
}
