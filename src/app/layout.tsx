import type { Metadata } from 'next'
import { ThemeProvider } from '@/providers/ThemeProvider'
import './globals.css'

export const metadata: Metadata = {
  title: 'Authentication App',
  description: 'Beautiful authentication pages',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}