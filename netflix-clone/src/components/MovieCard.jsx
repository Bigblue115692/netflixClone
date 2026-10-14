import { Link } from 'react-router-dom'
import Poster from './Poster.jsx'
import './MovieCard.css'

// `inApp` state tells the modal it can close with history back instead of a fresh push.
export default function MovieCard({ movie, highlighted = false, children }) {
  return (
    <li className={`movie-card${highlighted ? ' movie-card--highlighted' : ''}`}>
      <Link to={`/home/movie/${movie.id}`} state={{ inApp: true }} className="movie-card__link">
        <Poster movie={movie} />
        <span className="movie-card__title">{movie.title}</span>
        <span className="movie-card__desc">{movie.description}</span>
      </Link>
      {children && <div className="movie-card__actions">{children}</div>}
    </li>
  )
}
