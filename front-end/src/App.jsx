import { Navigate, Route, Routes } from 'react-router-dom'
import PublicOnly from './components/PublicOnly.jsx'
import RequireAuth from './components/RequireAuth.jsx'
import RequireProfile from './components/RequireProfile.jsx'
import Home from './pages/Home.jsx'
import LogIn from './pages/LogIn.jsx'
import MovieModal from './pages/MovieModal.jsx'
import Onboarding from './pages/Onboarding.jsx'
import SignUp from './pages/SignUp.jsx'
import WatchlistModal from './pages/WatchlistModal.jsx'

export default function App() {
  return (
    <Routes>
      <Route element={<PublicOnly />}>
        <Route path="/" element={<LogIn />} />
        <Route path="signup" element={<SignUp />} />
      </Route>
      <Route element={<RequireAuth />}>
        <Route path="onboarding" element={<Onboarding />} />
        <Route element={<RequireProfile />}>
          {/* Child routes render as modals over Home through its <Outlet />. */}
          <Route path="home" element={<Home />}>
            <Route path="movie/:id" element={<MovieModal />} />
            <Route path="watchlist" element={<WatchlistModal />} />
          </Route>
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
