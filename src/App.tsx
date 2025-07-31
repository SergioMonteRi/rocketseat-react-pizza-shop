import { Helmet, HelmetProvider } from 'react-helmet-async'
import { RouterProvider } from 'react-router'
import { Toaster } from 'sonner'

import { router } from '@/routes'

import { ThemeProvider } from './components'

export function App() {
  return (
    <HelmetProvider>
      <ThemeProvider storageKey="pizza-shop-theme" defaultTheme="dark">
        <Toaster richColors />
        <Helmet titleTemplate="%s | Pizza Shop" />
        <RouterProvider router={router} />
      </ThemeProvider>
    </HelmetProvider>
  )
}
