'use client'

import { useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { X } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export const SEARCH_FORM_ID = 'dictionary-search'

export function DictionarySearch({ search }: { search: string }) {
  const router = useRouter()
  const input = useRef<HTMLInputElement>(null)
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const lastRequested = useRef<string | undefined>(undefined)

  useEffect(() => {
    const field = input.current
    if (field && lastRequested.current === undefined && timer.current === undefined) {
      field.value = search
    }
    if (search === lastRequested.current) lastRequested.current = undefined
  }, [search])

  useEffect(() => {
    function restoreSearch() {
      clearTimeout(timer.current)
      timer.current = undefined
      lastRequested.current = undefined
      if (input.current) {
        input.current.value = new URLSearchParams(window.location.search).get('search') ?? ''
      }
    }
    window.addEventListener('popstate', restoreSearch)
    return () => {
      clearTimeout(timer.current)
      window.removeEventListener('popstate', restoreSearch)
    }
  }, [])

  function updateSearch() {
    clearTimeout(timer.current)
    timer.current = undefined
    const value = input.current?.value ?? ''
    const params = new URLSearchParams(window.location.search)
    if (value === (params.get('search') ?? '') && lastRequested.current === undefined) return
    if (value === lastRequested.current) return

    lastRequested.current = value
    if (value) params.set('search', value)
    else params.delete('search')
    const query = params.toString()
    router.replace(query ? `/?${query}` : '/', { scroll: false })
  }

  function scheduleSearch() {
    clearTimeout(timer.current)
    timer.current = setTimeout(updateSearch, 350)
  }

  return (
    <form
      id={SEARCH_FORM_ID}
      role='search'
      className='relative min-w-0 flex-1'
      onSubmit={event => {
        event.preventDefault()
        updateSearch()
      }}
    >
      <Input
        ref={input}
        type='text'
        name='search'
        aria-label='Search'
        placeholder='Type a word or phrase'
        className='peer pr-10'
        defaultValue={search}
        autoFocus
        autoCapitalize='off'
        onChange={event => {
          if (!(event.nativeEvent as InputEvent).isComposing) scheduleSearch()
        }}
        onCompositionStart={() => {
          clearTimeout(timer.current)
          timer.current = undefined
        }}
        onCompositionEnd={scheduleSearch}
      />
      <Button
        type='button'
        variant='ghost'
        size='icon'
        className='absolute inset-y-0 right-0 text-muted-foreground peer-placeholder-shown:hidden'
        aria-label='Clear search'
        onClick={() => {
          const field = input.current
          if (!field) return
          field.value = ''
          field.focus()
          updateSearch()
        }}
      >
        <X aria-hidden='true' />
      </Button>
    </form>
  )
}
