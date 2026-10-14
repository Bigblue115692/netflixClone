import { useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Carousel from '../components/Carousel.jsx'
import Modal from '../components/Modal.jsx'
import MovieCard from '../components/MovieCard.jsx'
import { getMovie } from '../data/movies'
import { useApp } from '../state/appContext'
import { useCloseModal } from '../state/useCloseModal'
import './WatchlistModal.css'

export default function WatchlistModal() {
  const { profile, watchlist, removeFromWatchlist } = useApp()
  const location = useLocation()
  const close = useCloseModal()
  const headingRef = useRef(null)
  const addedId = location.state?.added
  const added = addedId && watchlist.includes(addedId) ? getMovie(addedId) : null
  const [status, setStatus] = useState(added ? `Added ${added.title} to your watchlist.` : '')
  const movies = watchlist.map(getMovie)

  function handleRemove(movie) {
    removeFromWatchlist(movie.id)
    setStatus(`Removed ${movie.title} from your watchlist.`)
    // The focused Remove button is about to disappear; keep focus inside the dialog.
    headingRef.current.focus()
  }

  return (
    <Modal labelledBy="watchlist-title" onClose={close} className="watchlist-modal">
      <div className="watchlist">
        <h2 id="watchlist-title" ref={headingRef} tabIndex={-1} className="watchlist__title">
          {profile.name}’s watchlist
        </h2>
        <p className="watchlist__count">
          {movies.length === 1 ? '1 title' : `${movies.length} titles`}
        </p>
        <p className="watchlist__status" role="status">
          {status}
        </p>

        {movies.length > 0 ? (
          <Carousel label="Your watchlist">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} highlighted={movie.id === added?.id}>
                <button
                  type="button"
                  className="button button--ghost watchlist__remove"
                  onClick={() => handleRemove(movie)}
                  aria-label={`Remove ${movie.title} from watchlist`}
                >
                  Remove
                </button>
              </MovieCard>
            ))}
          </Carousel>
        ) : (
          <div className="watchlist__empty">
            <p>Your watchlist is empty. Open any title on Home and choose Add to watchlist to save it here.</p>
            <button type="button" className="button button--primary" onClick={close}>
              Browse titles
            </button>
          </div>
        )}
      </div>
    </Modal>
  )
}
