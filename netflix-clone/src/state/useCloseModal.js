import { useLocation, useNavigate } from 'react-router-dom'

// Modals opened from inside the app close with history back, so the browser Back
// button and the close button behave the same. A direct visit falls back to /home.
export function useCloseModal() {
  const navigate = useNavigate()
  const location = useLocation()
  return () => {
    if (location.state?.inApp) navigate(-1)
    else navigate('/home', { replace: true })
  }
}
