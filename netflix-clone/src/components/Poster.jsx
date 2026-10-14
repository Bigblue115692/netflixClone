import './Poster.css'

// A generated, image-free poster: a two-tone gradient from the movie's hue, with the title set as the artwork.
export default function Poster({ movie, className = '' }) {
  return (
    <div className={`poster ${className}`} style={{ '--hue': movie.hue }} aria-hidden="true">
      <span className="poster__year">{movie.year}</span>
      <span className="poster__title">{movie.title}</span>
    </div>
  )
}
