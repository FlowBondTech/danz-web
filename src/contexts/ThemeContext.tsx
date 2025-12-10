'use client'

import { type Theme, defaultThemeId, getTheme, themes } from '@/src/constants/themes'
import {
  type ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'

interface CustomColors {
  [key: string]: string
}

interface ThemeContextType {
  theme: Theme
  themeId: string
  customColors: CustomColors
  setTheme: (id: string) => void
  setCustomColor: (key: string, value: string) => void
  resetCustomColors: () => void
  saveCustomTheme: (name: string) => void
  deleteCustomTheme: (id: string) => void
  getCustomThemes: () => Theme[]
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

const THEME_STORAGE_KEY = 'danz-theme'
const CUSTOM_COLORS_KEY = 'danz-custom-colors'
const CUSTOM_THEMES_KEY = 'danz-custom-themes'

// Convert hex to RGB values (space-separated for CSS)
function hexToRgb(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  if (!result) return '0 0 0'
  return `${Number.parseInt(result[1], 16)} ${Number.parseInt(result[2], 16)} ${Number.parseInt(result[3], 16)}`
}

function applyThemeToDOM(theme: Theme, customColors: CustomColors = {}) {
  const root = document.documentElement
  const colors = { ...theme.colors, ...customColors }

  // Apply CSS custom properties as RGB values for opacity support
  root.style.setProperty('--color-primary-rgb', hexToRgb(colors.primary))
  root.style.setProperty('--color-primary-alt-rgb', hexToRgb(colors.primaryAlt))
  root.style.setProperty('--color-neon-pink-rgb', hexToRgb(colors.neonPink))
  root.style.setProperty('--color-neon-purple-rgb', hexToRgb(colors.neonPurple))
  root.style.setProperty('--color-neon-blue-rgb', hexToRgb(colors.neonBlue))
  root.style.setProperty('--color-bg-primary-rgb', hexToRgb(colors.bgPrimary))
  root.style.setProperty('--color-bg-secondary-rgb', hexToRgb(colors.bgSecondary))
  root.style.setProperty('--color-bg-card-rgb', hexToRgb(colors.bgCard))
  root.style.setProperty('--color-bg-hover-rgb', hexToRgb(colors.bgHover))
  root.style.setProperty('--color-text-primary-rgb', hexToRgb(colors.textPrimary))
  root.style.setProperty('--color-text-secondary-rgb', hexToRgb(colors.textSecondary))
  root.style.setProperty('--color-text-muted-rgb', hexToRgb(colors.textMuted))

  // Set color scheme for browser UI
  root.style.setProperty('color-scheme', theme.isDark ? 'dark' : 'light')

  // Add theme class for conditional styling
  root.classList.remove('theme-dark', 'theme-light')
  root.classList.add(theme.isDark ? 'theme-dark' : 'theme-light')
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [themeId, setThemeId] = useState(defaultThemeId)
  const [customColors, setCustomColors] = useState<CustomColors>({})
  const [mounted, setMounted] = useState(false)

  // Load saved theme on mount
  useEffect(() => {
    const savedThemeId = localStorage.getItem(THEME_STORAGE_KEY)
    const savedCustomColors = localStorage.getItem(CUSTOM_COLORS_KEY)

    if (savedThemeId && themes[savedThemeId]) {
      setThemeId(savedThemeId)
    }

    if (savedCustomColors) {
      try {
        setCustomColors(JSON.parse(savedCustomColors))
      } catch (e) {
        console.error('Failed to parse custom colors:', e)
      }
    }

    setMounted(true)
  }, [])

  // Apply theme whenever it changes
  useEffect(() => {
    if (mounted) {
      const theme = getTheme(themeId)
      applyThemeToDOM(theme, customColors)
    }
  }, [themeId, customColors, mounted])

  const setTheme = useCallback((id: string) => {
    const allThemes = { ...themes, ...getStoredCustomThemes() }
    if (allThemes[id]) {
      setThemeId(id)
      localStorage.setItem(THEME_STORAGE_KEY, id)
      setCustomColors({})
      localStorage.removeItem(CUSTOM_COLORS_KEY)
    }
  }, [])

  const setCustomColor = useCallback((key: string, value: string) => {
    setCustomColors(prev => {
      const updated = { ...prev, [key]: value }
      localStorage.setItem(CUSTOM_COLORS_KEY, JSON.stringify(updated))
      return updated
    })
  }, [])

  const resetCustomColors = useCallback(() => {
    setCustomColors({})
    localStorage.removeItem(CUSTOM_COLORS_KEY)
  }, [])

  const saveCustomTheme = useCallback(
    (name: string) => {
      const baseTheme = getTheme(themeId)
      const customTheme: Theme = {
        id: `custom-${Date.now()}`,
        name,
        description: 'Custom theme',
        isDark: baseTheme.isDark,
        colors: { ...baseTheme.colors, ...customColors } as Theme['colors'],
      }

      const stored = getStoredCustomThemes()
      stored[customTheme.id] = customTheme
      localStorage.setItem(CUSTOM_THEMES_KEY, JSON.stringify(stored))

      setThemeId(customTheme.id)
      localStorage.setItem(THEME_STORAGE_KEY, customTheme.id)
      setCustomColors({})
      localStorage.removeItem(CUSTOM_COLORS_KEY)
    },
    [themeId, customColors]
  )

  const deleteCustomTheme = useCallback(
    (id: string) => {
      const stored = getStoredCustomThemes()
      delete stored[id]
      localStorage.setItem(CUSTOM_THEMES_KEY, JSON.stringify(stored))

      if (themeId === id) {
        setTheme(defaultThemeId)
      }
    },
    [themeId, setTheme]
  )

  const getCustomThemes = useCallback((): Theme[] => {
    return Object.values(getStoredCustomThemes())
  }, [])

  const theme = getTheme(themeId) || getStoredCustomThemes()[themeId] || getTheme(defaultThemeId)

  // Prevent flash of unstyled content
  if (!mounted) {
    return null
  }

  return (
    <ThemeContext.Provider
      value={{
        theme,
        themeId,
        customColors,
        setTheme,
        setCustomColor,
        resetCustomColors,
        saveCustomTheme,
        deleteCustomTheme,
        getCustomThemes,
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

function getStoredCustomThemes(): Record<string, Theme> {
  if (typeof window === 'undefined') return {}

  try {
    const stored = localStorage.getItem(CUSTOM_THEMES_KEY)
    return stored ? JSON.parse(stored) : {}
  } catch {
    return {}
  }
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
