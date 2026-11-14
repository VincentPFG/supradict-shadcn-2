import type { ComponentType } from 'react'

export type DictionaryProps = {
  search: string
  languages: string[]
}

export type DictionaryDefinition = {
  code: string
  name: string

  Tab: ComponentType<DictionaryProps>

  Content?: ComponentType<DictionaryProps>
  getHref?: (props: DictionaryProps) => string

  isAvailable?: (
    props: DictionaryProps,
  ) => boolean
}
