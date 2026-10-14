import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useApp } from '../state/appContext'
import './Navbar.css'

export default function Navbar() {
  const { profile } = useApp()
  const [scrolled, setScrolled] = useState(false)

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
            <NavLink to="/home" end>
              Home
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
