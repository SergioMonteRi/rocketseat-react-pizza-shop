import { Outlet } from 'react-router'

export const AuthLayout = () => {
  return (
    <div>
      <h1>AuthLayout</h1>

      <div>
        <Outlet />
      </div>
    </div>
  )
}
