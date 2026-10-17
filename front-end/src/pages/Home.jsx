import { useEffect, useMemo } from 'react'
import { Outlet } from 'react-router-dom'
import Carousel from '../components/Carousel.jsx'
import MovieCard from '../components/MovieCard.jsx'
import Navbar from '../components/Navbar.jsx'
import { buildHomeRows } from '../data/recommendations'
import { useApp } from '../state/appContext'
import './Home.css'

export default function Home() {
  const { profile } = useApp()
  const rows = useMemo(() => buildHomeRows(profile), [profile])

  // Arriving from the onboarding form would otherwise keep its scroll position.
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <Navbar />
      <main className="home">
        <h1 className="home__title">{profile.name}’s potential next watches</h1>
        {rows.map((row) => (
          <section key={row.id} className="home__row" aria-labelledby={`${row.id}-heading`}>
            <h2 id={`${row.id}-heading`} className="home__row-title">
              {row.title}
            </h2>
            <Carousel label={row.title} size={row.featured ? 'featured' : 'regular'}>
              {row.movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </Carousel>
          </section>
        ))}
      </main>
      {/* Movie description and watchlist render here as modals over Home. */}
      <Outlet />
    </>
  )
}
