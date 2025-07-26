import type { Metadata } from 'next'
import { ThemeProvider } from './providers/ThemeProvider'
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
        <div className="min-h-screen bg-[#f7fafd] dark:bg-[#141c26] text-gray-800 dark:text-gray-100 transition-colors">
          <ThemeProvider>
            {children}
          </ThemeProvider>
        </div>
      </body>
    </html >
  )
}