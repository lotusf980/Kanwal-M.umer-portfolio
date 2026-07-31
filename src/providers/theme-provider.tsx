"use client"

import { ThemeProvider as NextThemesProvider } from "next-themes"
import type { ComponentProps } from "react"

type ThemeProviderProps = ComponentProps<typeof NextThemesProvider>

/**
 * Wraps the app with next-themes.
 *
 * - `attribute="class"` toggles the `.dark` class used by our design tokens.
 * - `defaultTheme="system"` follows the OS preference out of the box.
 * - `enableColorScheme` keeps native controls (scrollbars, form fields)
 *   consistent with the selected theme.
 */
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      enableColorScheme
      {...props}
    >
      {children}
    </NextThemesProvider>
  )
}
