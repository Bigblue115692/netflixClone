import { Navigate, Route, Routes } from 'react-router-dom'
import RequireProfile from './components/RequireProfile.jsx'
import Home from './pages/Home.jsx'
import MovieModal from './pages/MovieModal.jsx'
import Onboarding from './pages/Onboarding.jsx'
import WatchlistModal from './pages/WatchlistModal.jsx'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Onboarding />} />
      <Route element={<RequireProfile />}>
        {/* Child routes render as modals over Home through its <Outlet />. */}
        <Route path="home" element={<Home />}>
          <Route path="movie/:id" element={<MovieModal />} />
          <Route path="watchlist" element={<WatchlistModal />} />
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
