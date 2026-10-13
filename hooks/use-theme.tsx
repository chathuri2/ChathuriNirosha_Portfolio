"use client"

import { useTheme as useNextThemesTheme } from "next-themes"

type Theme = "light" | "dark"

export function useTheme() {
  const { resolvedTheme, setTheme } = useNextThemesTheme()
  const theme = (resolvedTheme === "dark" ? "dark" : "light") as Theme

  return {
    theme,
    setTheme: (newTheme: Theme) => setTheme(newTheme),
    toggleTheme: () => setTheme(theme === "light" ? "dark" : "light"),
  }
}
