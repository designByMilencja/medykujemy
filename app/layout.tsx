import "./globals.css"
import React from "react"
import type { Metadata } from "next"
import { Inter, Poppins } from "next/font/google"
import AuthProvider from "@/components/AuthProvider"
import { ThemeProvider } from "@/context/ThemeProvider"
import Head from "next/head"

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
})
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
})

export const metadata: Metadata = {
  title: "Portal dla pielęgniarek",
  description: "Procedury i praca - przestrzeń rozwoju dla pielęgniarek",
  icons: {
    icon: "/assets/icons/pulse.svg",
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <Head>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <AuthProvider>
        <body className={`${inter.variable} ${poppins.variable}`}>
          <ThemeProvider>{children}</ThemeProvider>
        </body>
      </AuthProvider>
    </html>
  )
}
