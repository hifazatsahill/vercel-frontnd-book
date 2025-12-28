import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Providers } from './providers'
import MainNav from '@/components/Navigation/MainNav'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AI Medical Laboratory Diagnostics',
  description: 'Interactive book with RAG chatbot for medical laboratory diagnostics',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MainNav />
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}