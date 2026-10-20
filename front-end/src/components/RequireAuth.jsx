import { Navigate, Outlet } from 'react-router-dom'
import { useApp } from '../state/appContext'
import LoadingScreen from './LoadingScreen.jsx'

// Guards every page that needs an account. Signed-out visitors go to the sign-in screen.
export default function RequireAuth() {
  const { status } = useApp()
  if (status === 'loading') return <LoadingScreen />
  if (status !== 'signedIn') return <Navigate to="/" replace />
  return <Outlet />
}
