import type { Metadata, Viewport } from 'next'
import {
  Geist,
  Geist_Mono,
} from 'next/font/google'
import './globals.css'

export const metadata: Metadata = {
  appleWebApp: { capable: true, title: 'SupraDictionary' },
}

export const viewport: Viewport = {
  // Chromium's automatic darkening opt-out preserves our authored dark palette.
  colorScheme: 'only light',
  themeColor: '#101116',
}

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' className='dark' style={{ colorScheme: 'only light' }}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  )
}
