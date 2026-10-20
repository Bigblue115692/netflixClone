import { Navigate, Outlet } from 'react-router-dom'
import { useApp } from '../state/appContext'

// Guards Home until onboarding is done. The sign-up trigger leaves region empty until then.
export default function RequireProfile() {
  const { profile } = useApp()
  if (!profile?.region) return <Navigate to="/onboarding" replace />
  return <Outlet />
}
