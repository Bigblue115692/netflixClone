import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useApp } from '../state/appContext'
import './Navbar.css'

export default function Navbar() {
  const { profile, watchlist } = useApp()
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
        <span className="navbar__profile" title={profile.name}>
          <span className="navbar__avatar" aria-hidden="true">
            {profile.name.charAt(0).toUpperCase()}
          </span>
          <span className="navbar__name">{profile.name}</span>
        </span>
      )}
    </header>
  )
}
