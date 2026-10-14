import { useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import Modal from '../components/Modal.jsx'
import Poster from '../components/Poster.jsx'
import { getMovie, REGIONS } from '../data/movies'
import { useApp } from '../state/appContext'
import { useCloseModal } from '../state/useCloseModal'
import './MovieModal.css'

export default function MovieModal() {
  const { id } = useParams()
  const navigate = useNavigate()
  const close = useCloseModal()
  const { isInWatchlist, addToWatchlist, removeFromWatchlist } = useApp()
  const [status, setStatus] = useState('')
  const movie = getMovie(id)

  if (!movie) return <Navigate to="/home" replace />

  const saved = isInWatchlist(movie.id)
  const region = REGIONS.find((r) => r.id === movie.region).singular

  function handleAdd() {
    addToWatchlist(movie.id)
    // Replace, so closing the watchlist goes back to wherever the description was opened from.
    navigate('/home/watchlist', { replace: true, state: { inApp: true, added: movie.id } })
  }

  function handleRemove() {
    removeFromWatchlist(movie.id)
    setStatus(`Removed ${movie.title} from your watchlist.`)
  }

  return (
    <Modal labelledBy="movie-title" onClose={close} className="movie-modal">
      <div className="movie-modal__hero" style={{ '--hue': movie.hue }}>
        <Poster movie={movie} className="movie-modal__poster" />
      </div>
      <div className="movie-modal__body">
        <h2 id="movie-title" className="movie-modal__title">
          {movie.title}
        </h2>
        <ul className="movie-modal__meta" aria-label="Details">
          <li>{movie.year}</li>
          <li>{region}</li>
          {movie.genres.map((genre) => (
            <li key={genre} className="movie-modal__genre">
              {genre}
            </li>
          ))}
        </ul>
        <p className="movie-modal__description">{movie.description}</p>
        {saved ? (
          <button type="button" className="button button--secondary" onClick={handleRemove}>
            <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
              <path d="m5 12 5 5L20 7" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Remove from watchlist
          </button>
        ) : (
          <button type="button" className="button button--primary" onClick={handleAdd}>
            <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
              <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
            Add to watchlist
          </button>
        )}
        <p className="visually-hidden" role="status">
          {status}
        </p>
      </div>
    </Modal>
  )
}
