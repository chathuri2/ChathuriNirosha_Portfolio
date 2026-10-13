import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import { MotionProvider } from "@/components/motion-provider"
import { Navigation } from "@/components/navigation"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://chathuri-nirosha-portfolio.vercel.app"

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Chathuri Nirosha - Portfolio",
  description: "Software Engineer, Frontend Developer, and UI/UX Designer",
  openGraph: {
    title: "Chathuri Nirosha - Portfolio",
    description: "Software Engineer, Frontend Developer, and UI/UX Designer",
    url: siteUrl,
    siteName: "Chathuri Nirosha Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Chathuri Nirosha - Portfolio",
    description: "Software Engineer, Frontend Developer, and UI/UX Designer",
  },
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.png",
        type: "image/png",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <MotionProvider>
            <Navigation />
            {children}
          </MotionProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
