import { MOVIES } from '../data/movies'
import Poster from './Poster.jsx'
import './AuthShell.css'

const WALL_ROWS = [MOVIES.slice(0, 12), MOVIES.slice(12, 24), MOVIES.slice(24)]

// Shared frame for the signed-out and setup screens: the drifting poster wall, the logo, and a form panel.
export default function AuthShell({ children }) {
  return (
    <main className="auth-shell">
      <div className="auth-shell__wall" aria-hidden="true">
        {WALL_ROWS.map((row, i) => (
          <div key={i} className="auth-shell__wall-row">
            {[...row, ...row].map((movie, j) => (
              <Poster key={`${movie.id}-${j}`} movie={movie} className="auth-shell__wall-poster" />
            ))}
          </div>
        ))}
      </div>

      <p className="auth-shell__logo">NETFLIX</p>

      {children}
    </main>
  )
}
