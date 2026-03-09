import type { Metadata } from 'next'
import { Inter, Bebas_Neue } from 'next/font/google'

import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const bebas = Bebas_Neue({
  subsets: ['latin'],
  variable: '--font-bebas',
  weight: '400', // Bebas only has 400
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Fondation E.S.D.R. - Ensemble pour l\'avenir de nos jeunes',
  description: 'La Fondation E.S.D.R. est un organisme de bienfaisance qui soutient financièrement des projets structurants pour l\'école secondaire du Rocher et toute la communauté.',
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-96x96.png", type: "image/png", sizes: "96x96" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: "/favicon.ico",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className={`${inter.variable} ${bebas.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
