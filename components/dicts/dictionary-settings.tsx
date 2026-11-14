'use client'

import { useState, type FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { Settings } from 'lucide-react'
import { Dialog } from 'radix-ui'

import { Button } from '@/components/ui/button'

type Option = { code: string; name: string }

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

  function applySettings(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const selectedLanguages = form.getAll('lang').map(String)
    const selectedDictionaries = form.getAll('dicts').map(String)

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
    if (search) params.set('search', search)

    setOpen(false)
    router.push(`/?${params}`, { scroll: false })
  }

  return (
    <Dialog.Root open={open} onOpenChange={nextOpen => {
      setError('')
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
            <fieldset>
              <legend className='font-medium'>Languages</legend>
              <div className='mt-1 grid grid-cols-2'>
                {languageOptions.map(({ code, name }) => (
                  <label key={code} className='flex min-h-10 items-center gap-2 text-sm'>
                    <input type='checkbox' name='lang' value={code} defaultChecked={languages.includes(code)} />
                    {name}
                  </label>
                ))}
              </div>
            </fieldset>

            <fieldset>
              <legend className='font-medium'>Dictionaries</legend>
              <div className='mt-1'>
                {dictionaries.map(({ code, name }) => (
                  <label key={code} className='flex min-h-10 items-center gap-2 text-sm'>
                    <input type='checkbox' name='dicts' value={code} defaultChecked={dictionaryCodes.includes(code)} />
                    {name}
                    {code === 'mw' && <span className='text-muted-foreground'>(English)</span>}
                  </label>
                ))}
              </div>
            </fieldset>

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
