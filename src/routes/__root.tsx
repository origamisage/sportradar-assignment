import { MantineProvider, createTheme } from '@mantine/core'
import { Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import type { MantineColorsTuple } from '@mantine/core'
import '@mantine/core/styles.css'
import '@/styles.css'

const brandColors: MantineColorsTuple = [
  '#e0e0ff',
  '#c5c4ff',
  '#8885ff',
  '#4942ff',
  '#1300b6',
  '#02003a',
  '#010030',
  '#010030',
  '#010020',
  '#010020',
]

const theme = createTheme({
  fontFamily: 'Lexend, sans-serif',
  primaryColor: 'brand',
  primaryShade: 5,
  colors: {
    brand: brandColors,
  },
})

export const Route = createRootRoute({
  component: () => (
    <>
      <MantineProvider theme={theme}>
        <Outlet />
      </MantineProvider>
      <TanStackRouterDevtools />
    </>
  ),
})
