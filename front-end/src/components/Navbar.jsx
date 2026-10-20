import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useApp } from '../state/appContext'
import './Navbar.css'

export default function Navbar() {
  const { user, profile, watchlist, signOut } = useApp()
  const { pathname } = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const onWatchlist = pathname.startsWith('/home/watchlist')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`navbar${scrolled ? ' navbar--solid' : ''}`}>
      <Link to="/home" className="navbar__logo" aria-label="Netflix clone home">
        NETFLIX
      </Link>
      <nav aria-label="Main">
        <ul className="navbar__links">
          <li>
            {/* Home stays active while a description modal is open over it. */}
            <Link to="/home" className={onWatchlist ? undefined : 'active'} aria-current={onWatchlist ? undefined : 'page'}>
              Home
            </Link>
          </li>
          <li>
            <NavLink to="/home/watchlist" state={{ inApp: true }}>
              Watchlist
              {watchlist.length > 0 && (
                <span className="navbar__count">
                  {watchlist.length}
                  <span className="visually-hidden"> saved</span>
                </span>
              )}
            </NavLink>
          </li>
        </ul>
      </nav>
      {profile && (
        <span className="navbar__profile" title={`Signed in as ${user.email}`}>
          <span className="navbar__avatar" aria-hidden="true">
            {profile.name.charAt(0).toUpperCase()}
          </span>
          <span className="navbar__name">{profile.name}</span>
        </span>
      )}
      {/* RequireAuth sends the signed-out user back to the sign-in screen. */}
      <button type="button" className="button button--ghost navbar__signout" onClick={signOut}>
        <svg className="navbar__signout-icon" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className="navbar__signout-label">Sign out</span>
      </button>
    </header>
  )
}
