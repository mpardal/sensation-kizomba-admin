import { extendTheme, ThemeConfig, withDefaultColorScheme } from '@chakra-ui/react'

const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
}

export const theme = extendTheme(
  {
    config,
    styles: {
      global: {
        body: {
          bg: 'gray.800',
          color: 'whiteAlpha.900',
        },
      },
    },
    fonts: {
      heading:
        '"Alatsi", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    },
    colors: {
      gray: {
        50: '#f7fafc',
        100: '#edf2f7',
        200: '#e2e8f0',
        300: '#cbd5e0',
        400: '#a0aec0',
        500: '#718096',
        600: '#4a5568',
        700: '#1f2733',
        800: '#1a202c',
        900: '#171923',
      },
    },
  },
  withDefaultColorScheme({ colorScheme: 'orange' })
)
