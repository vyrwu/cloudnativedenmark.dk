export const theme = {
  colors: {
    primary: '#262f59',
    background: '#0026ce',
    backgroundHover: '#001ba0',
    backgroundDark: '#11347e',
    backgroundLight: '#d7dff4',
    white: '#ffffff',
    black: '#000000',
    error: '#dc2626',
    success: '#16a34a',
    warning: '#f59e0b',
    pending: '#6b7280',
    gray: {
      50: '#f9fafb',
      100: '#f3f4f6',
      200: '#e5e7eb',
      300: '#d1d5db',
      400: '#9ca3af',
      500: '#6b7280',
      600: '#4b5563',
      700: '#374151',
      800: '#1f2937',
      900: '#111827',
    },
  },
  fonts: {
    sans: 'PlusJakartaSans',
    sansFallback:
      '"Plus Jakarta Sans", "Plus Jakarta Sans Fallback", ui-sans-serif, system-ui, sans-serif',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 16,
    xl: 24,
    full: 9999,
  },
  fontSize: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    xxxl: 32,
  },
} as const

export type Theme = typeof theme
