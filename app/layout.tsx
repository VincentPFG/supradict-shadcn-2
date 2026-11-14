import type { Viewport } from 'next'
import {
  Geist,
  Geist_Mono,
} from 'next/font/google'
import './globals.css'

export const viewport: Viewport = {
  colorScheme: 'dark',
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
    <html lang='en' className='dark' style={{ colorScheme: 'only dark' }}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  )
}
