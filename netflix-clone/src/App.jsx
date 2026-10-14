import { Navigate, Route, Routes } from 'react-router-dom'
import RequireProfile from './components/RequireProfile.jsx'
import Home from './pages/Home.jsx'
import Onboarding from './pages/Onboarding.jsx'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Onboarding />} />
      <Route element={<RequireProfile />}>
        <Route path="home" element={<Home />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
