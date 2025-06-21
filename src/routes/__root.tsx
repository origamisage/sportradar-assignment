import { MantineProvider } from '@mantine/core'
import { Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import '@mantine/core/styles.css'

export const Route = createRootRoute({
  component: () => (
    <>
      <MantineProvider>
        <Outlet />
      </MantineProvider>
      <TanStackRouterDevtools />
    </>
  ),
})
