/**
 * DANZ Theme Configuration
 * Preset themes and custom color scheme definitions
 */

export interface ThemeColors {
  // Primary colors
  primary: string
  primaryAlt: string
  // Neon accents
  neonPink: string
  neonPurple: string
  neonBlue: string
  // Backgrounds
  bgPrimary: string
  bgSecondary: string
  bgCard: string
  bgHover: string
  // Text colors
  textPrimary: string
  textSecondary: string
  textMuted: string
}

export interface Theme {
  id: string
  name: string
  description: string
  colors: ThemeColors
  isDark: boolean
}

export const themes: Record<string, Theme> = {
  'neon-dark': {
    id: 'neon-dark',
    name: 'Neon Dark',
    description: 'Default purple/pink neon theme',
    isDark: true,
    colors: {
      primary: '#d25ca7',
      primaryAlt: '#926f8e',
      neonPink: '#ff6ec7',
      neonPurple: '#b967ff',
      neonBlue: '#00d4ff',
      bgPrimary: '#0a0a0f',
      bgSecondary: '#12121a',
      bgCard: '#1a1a24',
      bgHover: '#222230',
      textPrimary: '#ffffff',
      textSecondary: '#b8b8c8',
      textMuted: '#7a7a8e',
    },
  },
  'cyber-blue': {
    id: 'cyber-blue',
    name: 'Cyber Blue',
    description: 'Cool cyan and blue tones',
    isDark: true,
    colors: {
      primary: '#00d4ff',
      primaryAlt: '#0099cc',
      neonPink: '#00f5ff',
      neonPurple: '#00b4d8',
      neonBlue: '#48cae4',
      bgPrimary: '#0a0f14',
      bgSecondary: '#101820',
      bgCard: '#162028',
      bgHover: '#1e2a34',
      textPrimary: '#ffffff',
      textSecondary: '#90e0ef',
      textMuted: '#48cae4',
    },
  },
  'sunset-warm': {
    id: 'sunset-warm',
    name: 'Sunset Warm',
    description: 'Warm oranges and reds',
    isDark: true,
    colors: {
      primary: '#ff6b35',
      primaryAlt: '#f7931e',
      neonPink: '#ff8c42',
      neonPurple: '#c44569',
      neonBlue: '#f8b500',
      bgPrimary: '#1a0a0a',
      bgSecondary: '#241212',
      bgCard: '#2e1a1a',
      bgHover: '#3a2424',
      textPrimary: '#fff5e4',
      textSecondary: '#ffb6c1',
      textMuted: '#d4a5a5',
    },
  },
  'forest-green': {
    id: 'forest-green',
    name: 'Forest Green',
    description: 'Nature-inspired greens',
    isDark: true,
    colors: {
      primary: '#52b788',
      primaryAlt: '#40916c',
      neonPink: '#74c69d',
      neonPurple: '#2d6a4f',
      neonBlue: '#95d5b2',
      bgPrimary: '#081c15',
      bgSecondary: '#0f2920',
      bgCard: '#1b4332',
      bgHover: '#234d3c',
      textPrimary: '#d8f3dc',
      textSecondary: '#b7e4c7',
      textMuted: '#74c69d',
    },
  },
  'royal-gold': {
    id: 'royal-gold',
    name: 'Royal Gold',
    description: 'Luxurious gold and purple',
    isDark: true,
    colors: {
      primary: '#ffd700',
      primaryAlt: '#daa520',
      neonPink: '#ffdf00',
      neonPurple: '#9d4edd',
      neonBlue: '#f5c542',
      bgPrimary: '#0d0a14',
      bgSecondary: '#151020',
      bgCard: '#1e1830',
      bgHover: '#28203c',
      textPrimary: '#fffbeb',
      textSecondary: '#e8d5b7',
      textMuted: '#a89070',
    },
  },
  'midnight-blue': {
    id: 'midnight-blue',
    name: 'Midnight Blue',
    description: 'Deep blues with subtle accents',
    isDark: true,
    colors: {
      primary: '#6366f1',
      primaryAlt: '#4f46e5',
      neonPink: '#818cf8',
      neonPurple: '#a78bfa',
      neonBlue: '#60a5fa',
      bgPrimary: '#0f0f1a',
      bgSecondary: '#161625',
      bgCard: '#1e1e32',
      bgHover: '#26263e',
      textPrimary: '#f8fafc',
      textSecondary: '#cbd5e1',
      textMuted: '#94a3b8',
    },
  },
  'rose-light': {
    id: 'rose-light',
    name: 'Rose Light',
    description: 'Soft pink light theme',
    isDark: false,
    colors: {
      primary: '#db2777',
      primaryAlt: '#be185d',
      neonPink: '#f472b6',
      neonPurple: '#a855f7',
      neonBlue: '#ec4899',
      bgPrimary: '#fdf2f8',
      bgSecondary: '#fce7f3',
      bgCard: '#ffffff',
      bgHover: '#fbcfe8',
      textPrimary: '#1f1f1f',
      textSecondary: '#4a4a4a',
      textMuted: '#737373',
    },
  },
  'clean-light': {
    id: 'clean-light',
    name: 'Clean Light',
    description: 'Minimal light theme',
    isDark: false,
    colors: {
      primary: '#7c3aed',
      primaryAlt: '#6d28d9',
      neonPink: '#a78bfa',
      neonPurple: '#8b5cf6',
      neonBlue: '#6366f1',
      bgPrimary: '#f8fafc',
      bgSecondary: '#f1f5f9',
      bgCard: '#ffffff',
      bgHover: '#e2e8f0',
      textPrimary: '#0f172a',
      textSecondary: '#475569',
      textMuted: '#94a3b8',
    },
  },
}

export const defaultThemeId = 'neon-dark'

export const getTheme = (id: string): Theme => {
  return themes[id] || themes[defaultThemeId]
}

export const getAllThemes = (): Theme[] => {
  return Object.values(themes)
}

export const getDarkThemes = (): Theme[] => {
  return Object.values(themes).filter(t => t.isDark)
}

export const getLightThemes = (): Theme[] => {
  return Object.values(themes).filter(t => !t.isDark)
}
