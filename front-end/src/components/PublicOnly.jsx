import { Navigate, Outlet } from 'react-router-dom'
import { useApp } from '../state/appContext'
import LoadingScreen from './LoadingScreen.jsx'

// Sign-in and sign-up are for signed-out visitors. A signed-in user goes on to Home,
// or to onboarding if they haven't finished it.
export default function PublicOnly() {
  const { status, profile } = useApp()
  if (status === 'loading') return <LoadingScreen />
  if (status === 'signedIn') return <Navigate to={profile?.region ? '/home' : '/onboarding'} replace />
  return <Outlet />
}
