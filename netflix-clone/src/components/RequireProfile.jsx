import { Navigate, Outlet } from 'react-router-dom'
import { useApp } from '../state/appContext'

// Guards every page after onboarding. Data lives in memory, so a refresh lands back on "/".
export default function RequireProfile() {
  const { profile } = useApp()
  if (!profile) return <Navigate to="/" replace />
  return <Outlet />
}
