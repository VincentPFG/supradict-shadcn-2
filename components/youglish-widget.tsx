'use client'

import {
  useEffect,
  useId,
  useRef,
  useState,
} from 'react'

const YOUGLISH_VARIETIES = {
  en: {
    language: 'english',
    accent: 'us',
  },
  fr: {
    language: 'french',
    accent: 'fr',
  },
  es: {
    language: 'spanish',
    accent: 'la',
  },
} as const

type YouGlishVariety =
  (typeof YOUGLISH_VARIETIES)[keyof typeof YOUGLISH_VARIETIES]

type YouGlishLanguage =
  YouGlishVariety['language']

type YouGlishAccent = YouGlishVariety['accent']

type YouGlishWidgetOptions = {
  autoStart?: 0 | 1
  components?: number
  restrictionMode?: 0 | 1
  videoQuality?:
    | 'default'
    | 'small'
    | 'medium'
    | 'highres'
}

type YouGlishWidgetInstance = {
  fetch: (
    query: string,
    language: YouGlishLanguage,
    accent?: YouGlishAccent,
  ) => void
}

type YouGlishApi = {
  Widget: new (
    elementId: string,
    options?: YouGlishWidgetOptions,
  ) => YouGlishWidgetInstance
}

declare global {
  interface Window {
    YG?: YouGlishApi
    onYouglishAPIReady?: () => void
  }
}

const SCRIPT_ID = 'youglish-widget-api'

const SCRIPT_SRC =
  'https://youglish.com/public/emb/widget.js'

let apiPromise: Promise<YouGlishApi> | null = null

function loadYouGlishApi(): Promise<YouGlishApi> {
  if (window.YG) {
    return Promise.resolve(window.YG)
  }

  if (apiPromise) {
    return apiPromise
  }

  apiPromise = new Promise((resolve, reject) => {
    const resolveApi = () => {
      if (window.YG) {
        resolve(window.YG)
      }
    }

    window.onYouglishAPIReady = resolveApi

    let script = document.getElementById(
      SCRIPT_ID,
    ) as HTMLScriptElement | null

    if (!script) {
      script = document.createElement('script')

      script.id = SCRIPT_ID
      script.src = SCRIPT_SRC
      script.async = true
      script.charset = 'utf-8'

      document.head.appendChild(script)
    }

    script.addEventListener('load', resolveApi, {
      once: true,
    })

    script.addEventListener(
      'error',
      () => {
        apiPromise = null
        script?.remove()

        reject(
          new Error(
            'The YouGlish script could not be loaded.',
          ),
        )
      },
      { once: true },
    )

    resolveApi()
  })

  return apiPromise
}

type YouGlishWidgetProps = {
  search: string
  language: string
}

export function YouGlishWidget({
  search,
  language,
}: YouGlishWidgetProps) {
  const hostRef = useRef<HTMLDivElement>(null)

  const reactId = useId()

  const targetId = `youglish-${reactId.replace(
    /[^a-zA-Z0-9_-]/g,
    '',
  )}`

  const [error, setError] = useState<
    string | null
  >(null)

  const query = search.trim()

  const languageCode =
    language.toLowerCase() as keyof typeof YOUGLISH_VARIETIES

  const variety = YOUGLISH_VARIETIES[languageCode]

  useEffect(() => {
    const host = hostRef.current

    if (!host || !query || !variety) {
      return
    }

    let cancelled = false

    setError(null)

    const target = document.createElement('div')

    target.id = targetId

    host.replaceChildren(target)

    void loadYouGlishApi()
      .then(api => {
        if (cancelled) {
          return
        }

        const currentTarget =
          document.getElementById(targetId)

        if (
          !currentTarget ||
          currentTarget.parentElement !== host
        ) {
          return
        }

        const widget = new api.Widget(targetId, {
          autoStart: 1,

          // Title
          // + caption
          // + speed controls
          // + playback controls
          components: 4 + 8 + 16 + 64,

          videoQuality: 'default',
        })

        widget.fetch(
          query,
          variety.language,
          variety.accent,
        )
      })
      .catch(reason => {
        if (cancelled) {
          return
        }

        setError(
          reason instanceof Error
            ? reason.message
            : 'YouGlish could not be loaded.',
        )
      })

    return () => {
      cancelled = true
    }
  }, [query, variety, targetId])

  if (!query) {
    return null
  }

  if (!variety) {
    return (
      <p className='text-sm text-destructive'>
        YouGlish is not configured for the
        language code “{language}”.
      </p>
    )
  }

  return (
    <div className='w-full'>
      {error && (
        <p
          className='mb-3 text-sm text-destructive'
          role='alert'
        >
          {error}
        </p>
      )}

      <div
        ref={hostRef}
        className='min-h-[200px] w-full'
      />
    </div>
  )
}
