'use client'

import { useId, useState, type FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { ChevronDown, GripVertical, Settings } from 'lucide-react'
import { Dialog, Popover } from 'radix-ui'
import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { SEARCH_FORM_ID } from '@/components/dicts/dictionary-search'
import styles from './dictionary-settings.module.css'

type Option = { code: string; name: string }

type SelectionProps = {
  label: string
  options: Option[]
  selected: string[]
  onChange: (codes: string[]) => void
}

function MultipleChoice({ label, options, selected, onChange }: SelectionProps) {
  const [query, setQuery] = useState('')
  const filter = query.trim().toLowerCase()
  const matches = options.filter(({ code, name }) =>
    name.toLowerCase().includes(filter) || code.toLowerCase().includes(filter),
  )

  return (
    <Popover.Root onOpenChange={open => { if (!open) setQuery('') }}>
      <Popover.Trigger asChild>
        <Button type='button' variant='outline' className={`min-h-11 w-full justify-start ${styles.surface}`}>
          {label}
          <span className='text-muted-foreground ml-auto font-normal'>
            {selected.length} selected
          </span>
          <ChevronDown className='size-4' aria-hidden='true' />
        </Button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          aria-label={label}
          sideOffset={5}
          collisionPadding={16}
          className={`z-[60] flex max-h-[min(40dvh,18rem,var(--radix-popover-content-available-height))] w-(--radix-popover-trigger-width) flex-col gap-2 rounded-md border p-2 ${styles.panel}`}
        >
          {options.length > 12 && (
            <Input
              aria-label={`Search ${label.toLowerCase()}`}
              placeholder={`Search ${label.toLowerCase()}`}
              value={query}
              onChange={event => setQuery(event.target.value)}
            />
          )}
          <fieldset className={`min-h-0 overflow-y-auto overscroll-contain rounded px-2 ${styles.choices}`}>
            <legend className='sr-only'>{label}</legend>
            {matches.map(({ code, name }) => (
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
            {!matches.length && <p className='py-2 text-sm'>No matches</p>}
          </fieldset>
          <Popover.Close asChild>
            <Button type='button' variant='outline' size='sm'>Done</Button>
          </Popover.Close>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}

function OrderItem({ code, name, disabled }: Option & { disabled: boolean }) {
  const {
    attributes, listeners, setNodeRef, setActivatorNodeRef,
    transform, transition, isDragging,
  } = useSortable({ id: code, disabled })

  return (
    <li
      ref={setNodeRef}
      style={{ transform: CSS.Translate.toString(transform), transition }}
      data-dragging={isDragging || undefined}
      className={`flex min-h-11 items-center gap-2 rounded-md border pl-3 text-sm data-dragging:relative data-dragging:z-10 ${styles.surface}`}
    >
      <span className='min-w-0 flex-1'>{name}</span>
      {!disabled && (
        <Button
          ref={setActivatorNodeRef}
          type='button'
          variant='ghost'
          size='icon'
          className='size-11 touch-none cursor-grab active:cursor-grabbing'
          {...attributes}
          {...listeners}
          aria-label={`Reorder ${name}`}
        >
          <GripVertical aria-hidden='true' />
        </Button>
      )}
    </li>
  )
}

function OrderedSelection(props: SelectionProps) {
  const { label, options, selected, onChange } = props
  const id = useId()
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  )

  return (
    <div className='space-y-2'>
      <MultipleChoice {...props} />
      {selected.length > 0 && (
        <DndContext
          id={id}
          sensors={sensors}
          collisionDetection={closestCenter}
          accessibility={{ announcements: {
            onDragStart: ({ active }) => `Picked up ${options.find(option => option.code === active.id)?.name ?? active.id}.`,
            onDragOver: ({ over }) => over ? `Position ${selected.indexOf(String(over.id)) + 1} of ${selected.length}.` : undefined,
            onDragEnd: ({ over }) => over ? `Placed at position ${selected.indexOf(String(over.id)) + 1}.` : 'Order unchanged.',
            onDragCancel: () => 'Order unchanged.',
          } }}
          onDragEnd={({ active, over }) => {
            if (!over || active.id === over.id) return
            const from = selected.indexOf(String(active.id))
            const to = selected.indexOf(String(over.id))
            if (from >= 0 && to >= 0) onChange(arrayMove(selected, from, to))
          }}
        >
          <SortableContext items={selected} strategy={verticalListSortingStrategy}>
            <ol aria-label={`${label} display order`} className='space-y-1'>
              {selected.map(code => (
                <OrderItem
                  key={code}
                  code={code}
                  name={options.find(option => option.code === code)?.name ?? code}
                  disabled={selected.length < 2}
                />
              ))}
            </ol>
          </SortableContext>
        </DndContext>
      )}
    </div>
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
      lang: selectedLanguages.join(selectedLanguages.some(code => code.includes('-')) ? ',' : '-'),
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
        <Button type='button' variant='outline' size='sm' className={styles.trigger}>
          <Settings aria-hidden='true' />
          Settings
        </Button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className='fixed inset-0 z-50 bg-black/55 backdrop-blur-[2px]' />
        <Dialog.Content className={`fixed left-1/2 top-1/2 z-50 max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-lg border p-5 ${styles.panel}`}>
          <Dialog.Title className='text-lg font-semibold'>Settings</Dialog.Title>
          <Dialog.Description className='text-muted-foreground mt-1 text-sm'>
            Choose the languages and dictionaries to show.
          </Dialog.Description>

          <form onSubmit={applySettings} className='mt-4 space-y-4'>
            <OrderedSelection
              label='Languages'
              options={languageOptions}
              selected={selectedLanguages}
              onChange={setSelectedLanguages}
            />
            <OrderedSelection
              label='Dictionaries'
              options={dictionaries}
              selected={selectedDictionaries}
              onChange={setSelectedDictionaries}
            />

            {error && <p role='alert' className='text-destructive text-sm'>{error}</p>}

            <div className='flex justify-end gap-2'>
              <Dialog.Close asChild>
                <Button type='button' variant='outline'>Cancel</Button>
              </Dialog.Close>
              <Button type='submit' className={styles.apply}>Apply</Button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
