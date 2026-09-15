import type { Metadata, Viewport } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Burger Tier List | McDonald’s Deutschland",
  description: "Erstelle deine persönliche Rangliste der McDonald’s Burger in Deutschland.",
}
export const viewport: Viewport = {
  themeColor: "#101010",
  colorScheme: "dark",
  userScalable: false,
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de">
      <body>
        {children}
      </body>
    </html>
  )
}
