'use client'

import { useState, type FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowDown, ArrowUp, ChevronDown, Settings } from 'lucide-react'
import { Dialog } from 'radix-ui'

import { Button } from '@/components/ui/button'
import { SEARCH_FORM_ID } from '@/components/dicts/dictionary-search'

type Option = { code: string; name: string }

type SelectionProps = {
  label: string
  options: Option[]
  selected: string[]
  onChange: (codes: string[]) => void
}

function MultipleChoice({ label, options, selected, onChange }: SelectionProps) {
  return (
    <details className='rounded-md border'>
      <summary className='flex min-h-11 cursor-pointer list-none items-center gap-2 px-3 text-sm font-medium [&::-webkit-details-marker]:hidden'>
        {label}
        <span className='text-muted-foreground ml-auto font-normal'>
          {selected.length} selected
        </span>
        <ChevronDown className='size-4' aria-hidden='true' />
      </summary>
      <fieldset className='border-t px-3 py-1'>
        <legend className='sr-only'>{label}</legend>
        {options.map(({ code, name }) => (
          <label key={code} className='flex min-h-10 items-center gap-2 text-sm'>
            <input
              type='checkbox'
              checked={selected.includes(code)}
              onChange={event => onChange(event.target.checked
                ? [...selected, code]
                : selected.filter(item => item !== code))}
            />
            {name}
          </label>
        ))}
      </fieldset>
    </details>
  )
}

function SelectionOrder({ label, options, selected, onChange }: SelectionProps) {
  function move(index: number, direction: number) {
    const reordered = [...selected]
    const target = index + direction
    reordered[index] = selected[target]
    reordered[target] = selected[index]
    onChange(reordered)
  }

  return (
    <fieldset>
      <legend className='text-sm font-medium'>{label}</legend>
      {selected.length === 0 && <p className='text-muted-foreground text-sm'>No selection</p>}
      <ol className='mt-1 divide-y'>
        {selected.map((code, index) => {
          const name = options.find(option => option.code === code)?.name ?? code

          return (
            <li key={code} className='flex min-h-10 items-center gap-2 text-sm'>
              <span className='min-w-0 flex-1'>{name}</span>
              <Button
                type='button'
                variant='ghost'
                size='icon'
                disabled={index === 0}
                aria-label={`Move ${name} up`}
                onClick={() => move(index, -1)}
              >
                <ArrowUp aria-hidden='true' />
              </Button>
              <Button
                type='button'
                variant='ghost'
                size='icon'
                disabled={index === selected.length - 1}
                aria-label={`Move ${name} down`}
                onClick={() => move(index, 1)}
              >
                <ArrowDown aria-hidden='true' />
              </Button>
            </li>
          )
        })}
      </ol>
    </fieldset>
  )
}

type DictionarySettingsProps = {
  search: string
  languages: string[]
  dictionaryCodes: string[]
  languageOptions: Option[]
  dictionaries: Option[]
}

export function DictionarySettings({
  search,
  languages,
  dictionaryCodes,
  languageOptions,
  dictionaries,
}: DictionarySettingsProps) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [error, setError] = useState('')
  const [selectedLanguages, setSelectedLanguages] = useState(languages)
  const [selectedDictionaries, setSelectedDictionaries] = useState(dictionaryCodes)

  function applySettings(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!selectedLanguages.length || !selectedDictionaries.length) {
      setError('Select at least one language and one dictionary.')
      return
    }

    if (selectedDictionaries.every(code => code === 'mw') && !selectedLanguages.includes('en')) {
      setError('Merriam-Webster requires English. Select English or another dictionary.')
      return
    }

    const params = new URLSearchParams({
      lang: selectedLanguages.join('-'),
      dicts: selectedDictionaries.join('-'),
    })
    const searchForm = document.getElementById(SEARCH_FORM_ID)
    const currentSearch = searchForm instanceof HTMLFormElement
      ? String(new FormData(searchForm).get('search') ?? '')
      : search
    if (currentSearch) params.set('search', currentSearch)

    setOpen(false)
    router.push(`/?${params}`, { scroll: false })
  }

  return (
    <Dialog.Root open={open} onOpenChange={nextOpen => {
      setError('')
      if (nextOpen) {
        setSelectedLanguages(languages)
        setSelectedDictionaries(dictionaryCodes.filter(code =>
          dictionaries.some(dictionary => dictionary.code === code)))
      }
      setOpen(nextOpen)
    }}>
      <Dialog.Trigger asChild>
        <Button type='button' variant='outline' size='sm'>
          <Settings aria-hidden='true' />
          Settings
        </Button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className='fixed inset-0 z-50 bg-black/45' />
        <Dialog.Content className='bg-background fixed left-1/2 top-1/2 z-50 max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-lg border p-5 shadow-lg'>
          <Dialog.Title className='text-lg font-semibold'>Settings</Dialog.Title>
          <Dialog.Description className='text-muted-foreground mt-1 text-sm'>
            Choose the languages and dictionaries to show.
          </Dialog.Description>

          <form onSubmit={applySettings} className='mt-4 space-y-4'>
            <MultipleChoice
              label='Languages'
              options={languageOptions}
              selected={selectedLanguages}
              onChange={setSelectedLanguages}
            />
            <MultipleChoice
              label='Dictionaries'
              options={dictionaries}
              selected={selectedDictionaries}
              onChange={setSelectedDictionaries}
            />

            <section aria-labelledby='settings-order' className='space-y-3 border-t pt-3'>
              <h3 id='settings-order' className='font-semibold'>Display order</h3>
              <SelectionOrder
                label='Languages'
                options={languageOptions}
                selected={selectedLanguages}
                onChange={setSelectedLanguages}
              />
              <SelectionOrder
                label='Dictionaries'
                options={dictionaries}
                selected={selectedDictionaries}
                onChange={setSelectedDictionaries}
              />
            </section>

            {error && <p role='alert' className='text-destructive text-sm'>{error}</p>}

            <div className='flex justify-end gap-2'>
              <Dialog.Close asChild>
                <Button type='button' variant='outline'>Cancel</Button>
              </Dialog.Close>
              <Button type='submit'>Apply</Button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
