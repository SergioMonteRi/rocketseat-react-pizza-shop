import { Outlet } from 'react-router'

export const AppLayout = () => {
  return (
    <div>
      <h1>AppLayout</h1>

      <div>
        <Outlet />
      </div>
    </div>
  )
}
