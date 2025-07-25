import { createBrowserRouter } from 'react-router'

import { Dashboard, SignIn } from '@/pages'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Dashboard />,
  },
  {
    path: '/sign-in',
    element: <SignIn />,
  },
])
