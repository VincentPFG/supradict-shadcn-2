import { DeepLDropdown } from '@/components/dictionaries/DeepLDropdown'
import { LeRobertDropdown } from '@/components/dictionaries/LeRobertDropdown'
import { MerriamWebster } from '@/components/dictionaries/MerriamWebster'
import { OxfordDropdown } from '@/components/dictionaries/OxfordDropdown'
import { WiktionaryDropdown } from '@/components/dictionaries/WiktionaryDropdown'
import { WordReferenceDropdown } from '@/components/dictionaries/WordReferenceDropdown'
import { YouGlishDropdown } from '@/components/dictionaries/YouGlishDropdown'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ search?: string }>
}) {
  const { search = '' } = await searchParams
  return (
    <div className='grid place-items-center min-h-screen gap-4'>
      <h1 className='text-2xl font-semibold'>
        <Link
          href='/'
          className='text-inherit no-underline hover:underline'
        >
          SupraDictionary
        </Link>
      </h1>

      <div className='flex gap-2'>
        <Badge variant='outline'>English</Badge>
        <Badge variant='outline'>Spanish</Badge>
        <Badge variant='outline'>French</Badge>
      </div>

      <form className='w-full max-w-md grid gap-y-1 px-4'>
        <Label htmlFor='search'>Search</Label>
        <Input
          id='search'
          type='text'
          name='search'
          placeholder='Type then press Enter'
          autoFocus
          autoCapitalize='off'
        />
      </form>
      {search && (
        <Badge variant='outline'>{search}</Badge>
      )}

      <MerriamWebster
        search={search}
      ></MerriamWebster>
      <WordReferenceDropdown
        search={search}
      ></WordReferenceDropdown>
      <OxfordDropdown
        search={search}
      ></OxfordDropdown>
      <DeepLDropdown
        search={search}
      ></DeepLDropdown>
      <LeRobertDropdown
        search={search}
      ></LeRobertDropdown>
      <WiktionaryDropdown
        search={search}
      ></WiktionaryDropdown>
      <YouGlishDropdown
        search={search}
      ></YouGlishDropdown>
    </div>
  )
}
